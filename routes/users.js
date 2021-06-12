// --- modules
var express = require('express');
var router = express.Router();
var Users = require("../models/users")
var passport = require("passport")
var authenticate = require("../authenticate")

/* GET users listing. */
router.get('/', authenticate.verifyToken, authenticate.verifyAdmin, function(req, res, next) {
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

router.post("/signup", (req, res, next) => {
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

router.post("/login", passport.authenticate("local"), (req, res) => {
  let token = authenticate.getToken({id: req.user._id})
  res.setHeader("Content-Type", "application/json")
  res.status(200).json({ status: 'You are successfully logged in!', success: true, token })
})

router.get("/logout", (req, res, next) => {
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

module.exports = router;
