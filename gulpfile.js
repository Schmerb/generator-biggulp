'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    sassGlob = require('gulp-sass-glob');


gulp.task('jshint', function() {
    return gulp.src('build/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build-js', function() {
    return gulp.src('build/js/**/*.js')
        .pipe(uglify({
            console: true
        }))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('html/js/'));
});

gulp.task('build-scss', function() {
    return gulp.src('build/scss/*.scss')
        .pipe(sassGlob())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('html/css'));
})



// 
gulp.task('watch', function() {
    gulp.watch('build/js/**/*.js', ['jshint', 'build-js']);
    gulp.watch('build/scss/**/*.scss', ['build-scss']);
});