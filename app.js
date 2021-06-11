// --- modules
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var sessionStore = require("session-file-store")(session);
var passport = require("passport")
var authenticate = require("./authenticate")
var config = require("./config")

// --- routes
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var dishRouter = require("./routes/dishRouter");
var promoRouter = require("./routes/promoRouter");
var leaderRouter = require("./routes/leaderRouter");

var app = express();

// --- mongodb config
const mongoose = require("mongoose");
const url = config.mongoUrl;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(
    () => {
      console.log("DB connected!!!");
    },
    (err) => console.log(err)
  );

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// --- middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- cookies and session (start)
// app.use(cookieParser("12345-09876-54321-67890"));
// app.use(
//   session({
//     name: "session-id",
//     secret: "12345-09876-54321-67890",
//     resave: false,
//     saveUninitialized: false,
//     store: new sessionStore(),
//   })
// );
// --- cookies and session (end)

app.use(passport.initialize())
// app.use(passport.session())

// --- routes middleware
app.use("/", indexRouter);
app.use("/users", usersRouter);

// --- static files
app.use(express.static(path.join(__dirname, "public")));

// --- routes middleware
app.use("/dishes", dishRouter);
app.use("/promotions", promoRouter);
app.use("/leaders", leaderRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
