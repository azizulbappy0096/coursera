// --- modules
const express = require("express");
const Favourite = require("../models/favorite");
const cors = require("./cors");
const authenticate = require("../authenticate");

const favouriteRouter = express.Router();

favouriteRouter.options("*" ,cors.corsWithOptions, (req, res) => res.sendStatus(200))

// at endpoint "/"
favouriteRouter
  .route("/")
  .get(cors.corsWithOptions, authenticate.verifyToken, (req, res, next) => {
    Favourite.findOne({ user: req.user._id })
      .populate("user")
      .populate("dishes")
      .then((fav) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(fav);
      })
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyToken, (req, res, next) => {
    const dishes = req.body;
    Favourite.findOne({ user: req.user._id })
      .then((fav) => {
        if (fav !== null) {
          dishes.map((dish) => {
            if (fav.dishes.indexOf(dish._id) === -1) {
              fav.dishes.push(dish._id);
            }
          });
          return fav.save();
        } else {
          let newFav = new Favourite({
            user: req.user.id,
          });

          dishes.map((dish) => {
            newFav.dishes.push(dish._id);
          });
          return newFav.save();
        }
      })
      .then((fav) => {
          return fav.populate("user").populate("dishes").execPopulate()
      })
      .then(fav => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(fav);
      })
      .catch((err) => next(err));
  })
  .delete(cors.corsWithOptions, authenticate.verifyToken, (req, res, next) => {
    Favourite.findOneAndDelete({ user: req.user._id })
    .populate("user")
    .populate("dishes")
      .then((fav) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(fav);
      })
      .catch((err) => next(err));
  });

// at endpoint "/:dishId"
favouriteRouter
  .route("/:dishId")
  .get(cors.corsWithOptions, authenticate.verifyToken, (req, res, next) => {
    const dishId = req.params.dishId;
    Favourite.findOne({ user: req.user._id })
    .then(async fav => {
        if(!fav) {
            res.setHeader("Content-Type", "application/json")
            res.status(200).json({
                exists: false,
                favourites: await fav.populate("user").populate("dishes").execPopulate()
            })
        }else {
            if(fav.dishes.indexOf(dishId) < 0) {
                res.setHeader("Content-Type", "application/json")
                res.status(200).json({
                    exists: false,
                    favourites: await fav.populate("user").populate("dishes").execPopulate()
                })
            }else {
                res.setHeader("Content-Type", "application/json")
                res.status(200).json({
                    exists: true,
                    favourites: await fav.populate("user").populate("dishes").execPopulate()
                })
            }
        }
    })
    .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyToken, (req, res, next) => {
    const dishId = req.params.dishId;
    Favourite.findOne({ user: req.user._id })
      .then((fav) => {
        if (fav !== null) {
          if (fav.dishes.indexOf(dishId) === -1) {
            fav.dishes.push(dishId);
          }
          return fav.save();
        } else {
          let newFav = new Favourite({
            user: req.user.id,
          });
          newFav.dishes.push(dishId);
          return newFav.save();
        }
      })
      .then((fav) => {
        return fav.populate("user").populate("dishes").execPopulate()
        })
      .then((fav) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(fav);
      })
      .catch((err) => next(err));
  })
  .delete(cors.corsWithOptions, authenticate.verifyToken, (req, res, next) => {
    const dishId = req.params.dishId;
    Favourite.findOneAndUpdate(
      { user: req.user._id },
      {
        $pull: {
          dishes: { $in: dishId },
        },
      },
      {
        new: true,
      }
    )
    .populate("user")
    .populate("dishes")
      .then((fav) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(fav);
      })
      .catch((err) => next(err));
  });

module.exports = favouriteRouter;
