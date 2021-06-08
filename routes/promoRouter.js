const express = require("express")
const promoRouter = express.Router()

const Promotions = require("../models/promotions")

// at endpoint "/"
promoRouter.route("/")
.get((req,res,next) => {
    Promotions.find({})
    .then(promo => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo)
    }, err => next(err))
    .catch(err => next(err))
})
.post((req, res, next) => {
    Promotions.create(req.body)
    .then(promo => {
        console.log("Promotion created:::", promo)
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo)
    }, err => next(err))
    .catch(err => next(err))
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res, next) => {
    Promotions.deleteMany({})
    .then(resp => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp)
    }, err => next(err))
    .catch(err => next(err))
});

// at endpoint ":/promoId"
promoRouter.route("/:promoId")
.get((req,res,next) => {
    Promotions.findById(req.params.promoId)
    .then(promo => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo)
    }, err => next(err))
    .catch(err => next(err))
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /promotions/'+ req.params.promoId);
})
.put((req, res, next) => {
    Promotions.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, {
        new: true
    })
    .then(promo => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo)
    }, err => next(err))
    .catch(err => next(err))
})
.delete((req, res, next) => {
    Promotions.findByIdAndDelete(req.params.promoId)
    .then(resp => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp)
    }, err => next(err))
    .catch(err => next(err))
});




module.exports = promoRouter;