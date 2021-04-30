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
      },
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
    clean: {
      build: {
        src: ["build/"],
      },
    },
    copy: {
      build: {
        expand: true,
        src: "node_modules/font-awesome/fonts/*",
        dest: "build/fonts",
        flatten: true,
      },
    },
    imagemin: {
      dynamic: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: "./img",
            src: ["*.{png,jpg,gif}"],
            dest: "build/img",
          },
        ],
      },
    },
  });

  grunt.registerTask("default", ["browserSync", "watch"]);
  grunt.registerTask("css", ["sass"]);
  grunt.registerTask("del", ["clean"]);
  grunt.registerTask("image", ["imagemin"]);
};
