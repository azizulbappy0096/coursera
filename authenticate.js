// --- modules
const User = require("./models/users")
const passport = require("passport")
const config = require("./config")
const jwt = require("jsonwebtoken")

// strategy
const LocalStrategy = require("passport-local").Strategy
const JWTStrategy = require("passport-jwt").Strategy
const ExtractJWT = require("passport-jwt").ExtractJwt
const FacebookStrategy = require("passport-facebook-token")

// --- local strategy configure
exports.Local = passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// --- JWT strategy configure
exports.getToken = (user) => {
    return jwt.sign(user, config.secretKey, {
        expiresIn: 3600
    })
}

var opts = {
    secretOrKey: config.secretKey,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}

exports.jwtPassport = passport.use(new JWTStrategy(opts, (payload, done) => {
    console.log(payload)
    User.findById(payload.id)
    .then(user => {
        console.log(user)
        if(user) {
            done(null, user)
        }else {
            done(null, false)
        }
    })
    .catch(err => done(err, false))
}))

exports.verifyToken = passport.authenticate("jwt", { session: false })
exports.verifyAdmin = (req, res, next) => {
    User.findById(req.user.id).then(user => {
        if(!user.admin) {
            let err = new Error("You are not authorized to perform this operation!")
            err.status = 403
            return next(err)
        }
        next()
    }).catch(err => next(err))
}

// --- Facebook strategy config 
exports.facebookPassport = passport.use(new FacebookStrategy({
    clientID: config.facebook.clientId,
    clientSecret: config.facebook.clientSecret
    },
    (accessToken, refreshToken, profile, cb) => {
        User.findOne({ facebookId: profile.id })
        .then(user => {
            if(user !== null) {
                return user
            }else {
                return User.create({
                    facebookId: profile.id,
                    firstname: profile.name.givenName,
                    lastname: profile.name.familyName,
                })
            }
        }).then(user => {
            cb(null, user)
        }).catch(err => cb(err, false))
    }
))

