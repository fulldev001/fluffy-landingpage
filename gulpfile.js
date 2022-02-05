const { src, dest, watch, series, parallel } = require('gulp');
// Importing all the Gulp-related packages we want to use
const gulp = require('gulp');
const newer = require("gulp-newer");
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const csso = require('postcss-csso');
const discardDuplicate = require('postcss-discard-duplicates');
const autoprefixer = require('autoprefixer');
const browsersync = require("browser-sync").create();
const replace = require('gulp-replace');

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./"
    },
    port: 3000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}



// File paths
const files = {
    scssPath: 'src/app/scss/**/*.scss',
    jsPath: 'src/app/js/**/*.js',
    htmlPath: 'HTML'
}

// Sass task: compiles the style.scss file into style.css
function scssTask(){
    return src(files.scssPath)
        .pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(sass()) // compile SCSS to CSS
        .pipe(postcss([ autoprefixer(), csso(), discardDuplicate() ])) // PostCSS plugins
        .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
        .pipe(dest('src/dist/css')
    ); // put final CSS in dist folder
}

// JS task: concatenates and uglifies JS files to script.js
function jsTask(){
    return src([
        files.jsPath
        //,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
        ])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(dest('src/dist/js')
    );
}

// Watch task: watch SCSS and JS files for changes
function watchTask(){
    watch([files.scssPath, files.jsPath, files.htmlPath],
        parallel(browserSyncReload, scssTask, jsTask));
}

// Export the default Gulp task so it can be run
exports.default = series(
    parallel(browserSyncReload, browserSync, scssTask, jsTask),
    watchTask
);
