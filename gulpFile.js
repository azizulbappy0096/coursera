"use strict";

var { src, dest, watch, task, series, parallel } = require("gulp"),
  gulpSass = require("gulp-sass"),
  browserSync = require("browser-sync"),
  del = require("del"),
  imagemin = require("gulp-imagemin");

var usemin = require("gulp-usemin"),
  uglify = require("gulp-uglify"),
  htmlmin = require("gulp-htmlmin"),
  cleanCss = require("gulp-clean-css"),
  flatmap = require("gulp-flatmap"),
  rev = require("gulp-rev");

// config gulp-sass
gulpSass.compiler = require("node-sass");

task("sass", function () {
  return src("./css/*.scss")
    .pipe(gulpSass().on("error", gulpSass.logError))
    .pipe(dest("./css"));
});

task("sass:watch", function () {
  watch("./css/*.scss", series("sass"));
});

task("browser-sync", function () {
  var files = ["./css/*.css", "./js/*.js", "./*.html"];

  browserSync.init(files, {
    server: {
      baseDir: "./",
    },
  });
});

task("clean", () => {
  return del(["./build"]);
});

task("copyFonts", () => {
  return src("node_modules/font-awesome/fonts/*").pipe(dest("build/fonts"));
});

task("imagemin", () => {
  return src("./img/**")
    .pipe(
      imagemin({
        interlaced: true,
        progressive: true,
        optimizationLevel: 5,
      })
    )
    .pipe(dest("./build/img"));
});

task("usemin", () => {
  return src("./*.html")
    .pipe(
      flatmap((stream, file) => {
        return stream.pipe(
          usemin({
            css: [rev()],
            html: [
              () =>
                htmlmin({
                  collapseWhitespace: true,
                }),
            ],
            js: [uglify(), rev()],
            inlinejs: [uglify()],
            inlinecss: [cleanCss(), "concat"],
          })
        );
      })
    )
    .pipe(dest("./build"));
});

task("default", parallel("browser-sync", "sass:watch"));
task("build", series("clean", parallel("copyFonts", "imagemin", "usemin")));
