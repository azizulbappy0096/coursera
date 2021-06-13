// --- modules
const express = require("express")
const authenticate = require("../authenticate")
const Promotions = require("../models/promotions")
const cors = require("./cors")

const promoRouter = express.Router()
// at endpoint "/"
promoRouter.route("/")
.options(cors.corsWithOptions, (req, res, next) => res.sendStatus(200))
.get(cors.cors ,(req,res,next) => {
    Promotions.find({})
    .then(promo => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo)
    }, err => next(err))
    .catch(err => next(err))
})
.post(cors.corsWithOptions, authenticate.verifyToken, authenticate.verifyAdmin, (req, res, next) => {
    Promotions.create(req.body)
    .then(promo => {
        console.log("Promotion created:::", promo)
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo)
    }, err => next(err))
    .catch(err => next(err))
})
.put(cors.corsWithOptions, authenticate.verifyToken, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete(cors.corsWithOptions, authenticate.verifyToken, authenticate.verifyAdmin, (req, res, next) => {
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
.options(cors.corsWithOptions, (req, res, next) => res.sendStatus(200))
.get(cors.cors, (req,res,next) => {
    Promotions.findById(req.params.promoId)
    .then(promo => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo)
    }, err => next(err))
    .catch(err => next(err))
})
.post(cors.corsWithOptions, authenticate.verifyToken, authenticate.verifyAdmin, (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /promotions/'+ req.params.promoId);
})
.put(cors.corsWithOptions, authenticate.verifyToken, authenticate.verifyAdmin, (req, res, next) => {
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
.delete(cors.corsWithOptions, authenticate.verifyToken, authenticate.verifyAdmin, (req, res, next) => {
    Promotions.findByIdAndDelete(req.params.promoId)
    .then(resp => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp)
    }, err => next(err))
    .catch(err => next(err))
});

module.exports = promoRouter;