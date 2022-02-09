const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const terser = require("gulp-terser");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const replace = require("gulp-replace");
const browsersync = require("browser-sync").create();

// File paths
const files = {
  scssPath: "app/scss/**/*.scss",
  jsPath: "app/js/**/*.js",
};

// Sass task: compiles the style.scss file into style.css
function scssTask() {
  return src(files.scssPath, { sourcemaps: true })
    .pipe(sass()) // compile SCSS to CSS
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest("dist/css"));
}

// JS task: concatenates and uglifies JS files to script.js
function jsTask() {
  return src([files.jsPath], { sourcemaps: true })
    .pipe(concat("all.js"))
    .pipe(terser())
    .pipe(dest("dist/js"));
}

// Cachebust
function cacheBustTask() {
  var cbString = new Date().getTime();
  return src(["index.html"])
    .pipe(replace(/cb=\d+/g, "cb=" + cbString))
    .pipe(dest("."));
}

// Browsersync Tasks
function browsersyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: ".",
    },
  });
  cb();
}

function browsersyncReload(cb) {
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask() {
  watch("*.html", browsersyncReload);
  watch(
    ["app/scss/**/*.scss", "app/js/**/*.js"],
    series(scssTask, jsTask, browsersyncReload)
  );
}

// Default Gulp task
exports.default = series(scssTask, jsTask, browsersyncServe, watchTask);
