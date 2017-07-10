'use strict';

var gulp        = require('gulp'),
    jshint      = require('gulp-jshint'),
    sass        = require('gulp-sass'),
    sassGlob    = require('gulp-sass-glob'),
    imagemin    = require('gulp-imagemin'),
    browserSync = require('browser-sync'),
    init        = require('./gulp/init.js');

gulp.task('build-js', function() {
    return gulp.src('build/js/**/*.js')
        .pipe(gulp.dest('public/js/'))
        .pipe(browserSync.stream());
});

gulp.task('build-scss', function() {
    return gulp.src('build/sass/**/*.scss')
        .pipe(sassGlob())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('public/stylesheets'))
        .pipe(browserSync.stream());
});

gulp.task('build-html', function() {
    return gulp.src('craft/templates/**/*.*')
        .pipe(browserSync.reload);
});

gulp.task('build-images', function(){
    return gulp.src('build/img/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/img'))
        .pipe(browserSync.reload);
});

gulp.task('jshint', function() {
    return gulp.src('build/js/**/*.js')
        .pipe(jshint({
            curly: true,
            eqeqeq: true,
            eqnull: true,
            browser: true,
            "globals": {
                "$": true
            }
        }))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('serve', init);

/**
 * Default task, running `gulp` will fire up the Harp site,
 * launch BrowserSync & watch files.
 */
gulp.task('default', ['serve']);

gulp.task('watch', function() {
  gulp.start('serve');
  gulp.watch('build/js/**/*.js', ['jshint','build-js']);
  gulp.watch('build/sass/**/*.scss', ['build-scss']);
  gulp.watch('build/img/*.*', ['build-images']);
  gulp.watch('public/**/*.ejs', ['build-html','build-images']);
});
