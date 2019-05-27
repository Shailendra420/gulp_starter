const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const nunjucksRender = require('gulp-nunjucks-render');

// Include plugins
var iife = require('gulp-iife');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');

function style() {
    return gulp.src('scss/styles.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream());
}
function nunjucks() {
    return gulp.src('app/templates/views/**/*.html')
        .pipe(nunjucksRender({
            path: ['app/templates/']
        }))
        .pipe(gulp.dest('app'));
}
function jsCustomFeatures() {
    return gulp.src('app/js/custom/**/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('app/js'));
}
function watch() {
    browserSync.init({
        server: {
          baseDir: 'app'
        },
    });
    gulp.watch('scss/**/*.scss', style);
    gulp.watch('app/templates/**/*.html', nunjucks);
    gulp.watch('app/js/custom/**/*.js', jsCustomFeatures); // Watches any js file only under 'app/js/custom' folder
    gulp.watch('app/js/**/*.js').on('change', browserSync.reload); // And then reloads the browser when it detects any chsnges in any js file under the 'app/js' folder
    gulp.watch('app/templates/**/*.html').on('change', browserSync.reload);
    gulp.watch('app/js/**/*.js').on('change', browserSync.reload);
}

exports.watch = watch;