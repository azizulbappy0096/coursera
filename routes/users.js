// --- modules
var express = require('express');
var router = express.Router();
var Users = require("../models/users")
var passport = require("passport")
var authenticate = require("../authenticate")
const cors = require("./cors")

/* GET users listing. */
router.options("*" ,cors.corsWithOptions, (req, res) => res.sendStatus(200))

router.get('/', cors.corsWithOptions, authenticate.verifyToken, authenticate.verifyAdmin, function(req, res, next) {
  Users.find({}).then(users => {
    res.setHeader("Content-Type", "application/json")
    if(users === null) {
      res.status(404).json({
        status: "Not found any user!"
      })
    }else {
      res.status(200).json(users)
    }
  }).catch(err => next(err))
});

router.post("/signup", cors.corsWithOptions, (req, res, next) => {
  const { firstname, lastname, username, password } = req.body
  Users.register({ username, firstname, lastname }, password, (err, user) => {
    if(err) {
      res.setHeader("Content-Type", "application/json")
      res.status(500).json({ err })
    }else {
      passport.authenticate("local")(req, res, () => {
        res.setHeader("Content-Type", "application/json")
        res.status(200).json({ status: "Registration successful!", success: true })
      })
     
    }
  })
})

router.post("/login", cors.corsWithOptions, (req, res) => {

  passport.authenticate("local", { session: false }, (err, user, info) => {
    res.setHeader("Content-Type", "application/json")
    if(err) {
      next(err)
    }else if(!user) {
      res.status(401).json({ status: 'Login failed!', success: false, error: info })
    }else {
      let token = authenticate.getToken({id: req.user._id})
      res.status(200).json({ status: 'You are successfully logged in!', success: true, token })
    }
  })(req, res, next)

})

router.get("/facebook/token", passport.authenticate('facebook-token', { session: false }), (req, res) => {
  let token = authenticate.getToken({id: req.user._id})
  res.setHeader("Content-Type", "application/json")
  res.status(200).json({ status: 'You are successfully logged in!', success: true, token })
})

router.get("/logout", cors.corsWithOptions, (req, res, next) => {
  if(req.session) {
    req.session.destroy
    res.clearCookie("session-id")
    res.redirect("/")
  }else {
      var err = new Error('You are not logged in!');
      err.status = 403;
      next(err);  
  }
})

router.get("/checkToken", cors.corsWithOptions, (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    res.setHeader("Content-Type", "application/json")
    if(err) {
      next(err)
    }else if(!user) {
      res.status(401).json({ status: 'Invalid token', success: false, error: info })
    }else {
      res.status(200).json({ status: 'Valid token', success: true, user })
    }
  })(req, res, next)
})

module.exports = router;
