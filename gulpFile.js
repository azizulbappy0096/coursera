"use strict";

var { src, dest, watch, task, start, series, parallel } = require("gulp"),
    gulpSass = require("gulp-sass"),
    browserSync = require("browser-sync")

// config gulp-sass
// gulpSass.compiler = require("node-sass") 

task("sass", function(){
    return src("./css/*.scss")
    .pipe(gulpSass().on("error", gulpSass.logError))
    .pipe(dest("./css"))
});

task("sass:watch", function(){
    watch("./css/*.scss", series("sass"))
});

task("browser-sync", function(){
    var files = [
        "./css/*.css",
        "./js/*.js",
        "./*.html"
    ];

    browserSync.init(files, {
        server: {
            baseDir: "./"
        }
    })
});

task("default", series("sass:watch", "browser-sync"))
