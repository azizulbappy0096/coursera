"use strict";

module.exports = (grunt) => {
  require("time-grunt")(grunt);
  require("jit-grunt")(grunt, {
    useminPrepare: "grunt-usemin",
  });

  grunt.initConfig({
    // dev purpose
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
    // build purpose
    clean: {
      build: {
        src: ["build/"],
      },
    },
    copy: {
      fonts: {
        expand: true,
        src: "node_modules/font-awesome/fonts/*",
        dest: "build/fonts",
        flatten: true,
      },
      html: {
        expand: true,
        src: "*.html",
        dest: "build/",
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
    useminPrepare: {
      foo: {
        src: ["index.html", "contactus.html", "aboutus.html"],
      },
      options: {
        dest: "build",
        flow: {
          steps: {
            css: ["cssmin"],
            js: ["uglify"],
          },
        },
      },
    },
    usemin: {
      html: ["build/index.html", "build/contactus.html", "build/aboutus.html"],
      options: {
        assetsDirs: ["build", "build/css", "build/js"],
      },
    },
    htmlmin: {
      build: {
        options: {
          collapseWhitespace: true,
        },
        files: {
          "build/index.html": "build/index.html",
          "build/contactus.html": "build/contactus.html",
          "build/aboutus.html": "build/aboutus.html",
        },
      },
    },
    concat: {
      options: {
        separator: ";",
      },
      build: {},
    },
    uglify: {
      build: {},
    },
    cssmin: {
      build: {},
    },
    filerev: {
      options: {
          encoding: 'utf8',
          algorithm: 'md5',
          length: 20
      },

      release: {
      // filerev:release hashes(md5) all assets (images, js and css )
      // in build directory
          files: [{
              src: [
                  'build/js/*.js',
                  'build/css/*.css',
              ]
          }]
      }
  },
  });

  // development
  grunt.registerTask("default", ["browserSync", "watch"]);

  // build --- production
  grunt.registerTask("build", [
    "clean",
    "copy",
    "imagemin",
    "useminPrepare",
    "concat",
    "cssmin",
    "uglify",
    "filerev",
    "usemin",
    "htmlmin",
    
  ]);
};
