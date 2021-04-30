"use strict";

module.exports = (grunt) => {
  require("time-grunt")(grunt);

  require("jit-grunt")(grunt);

  grunt.initConfig({
    sass: {
      options: {
        implementation: require("node-sass"),
      },
      dev: {
        files: {
          "css/styles.css": "css/*.scss",
        },
      },
    },
    watch: {
      dev: {
        files: ["css/*.scss"],
        tasks: ["sass"],
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: ["css/*.css", "js/*.js", "./*.html"],
        },
        options: {
        watchTask: true,
          server: "./",
        },
      },
    },
  });

  grunt.registerTask("css", ["sass"]);
  grunt.registerTask("default", ["browserSync", "watch"]);
};
