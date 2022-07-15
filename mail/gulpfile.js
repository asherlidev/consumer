var gulp = require("gulp");
var plumber = require("gulp-plumber");
var mjml = require("gulp-mjml");
var browserSync = require("browser-sync");
var fs = require("fs");
var reload = browserSync.reload;
var output = "index.html";

// File path variables

var basePaths = {
  src: "input/",
  dest: "output/",
};

var paths = {
  html: {
    src: basePaths.src + "**.mjml",
    dest: basePaths.dest + "",
  },
  includes: {
    src: basePaths.src + "includes/*.mjml",
  },
};

// Tasks

gulp.task("browserSync", function () {
  browserSync({
    port: 4001,
    ui: {
      port: 4001,
    },
    server: {
      baseDir: "./output/",
    },
  });
});

gulp.task("watch", function () {
  gulp.watch(paths.html.src, gulp.series("html"));
  gulp.watch(paths.includes.src, gulp.series("html"));
  gulp.watch(paths.html.dest + output).on("change", reload);
});

gulp.task("html", function () {
  return gulp.src(paths.html.src).pipe(mjml()).pipe(gulp.dest(paths.html.dest));
});

gulp.task("default", gulp.parallel("browserSync", "watch"));
