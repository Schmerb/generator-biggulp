'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    sassGlob = require('gulp-sass-glob'),
    livereload = require('gulp-livereload'),
    imagemin = require('gulp-imagemin'),
    modernizr = require('gulp-modernizr');


gulp.task('jshint', function() {
    gulp.src('build/js/src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build-js', function() {
    return gulp.src('./build/js/src/**/*.js')
        .pipe(uglify({
            console: true
        }))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('html/js/'))
        .pipe(livereload());
});

gulp.task('build-scss', function() {
    return gulp.src('build/scss/**/*.scss')
        .pipe(sassGlob())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('html/css'))
        .pipe(livereload());
});

gulp.task('build-html', function() {
    return gulp.src('html/**/*.html')
        .pipe(livereload());
});

gulp.task('build-images', function(){
    return gulp.src('build/img/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('html/img'))
        .pipe(livereload());
});

var modernizrConfig = {
    "cache" : false,
    "devFile" : false,
    "dest" : './build/js/plugins/modernizr.js',
    "options" : [
        "setClasses",
        "addTest",
        "html5printshiv",
        "testProp",
        "fnBind"
    ],
    "tests" : [],
    "excludeTests": [],
    "crawl" : true,
    "useBuffers" : false,
    "files" : {
        "src": [
            "*[^(g|G)runt(file)?].{js,css,scss}",
            "**[^node_modules]/**/*.{js,css,scss}",
            "!**/+(bourbon|neat)/**/*.scss"
        ]
    },
    "customTests" : []
};

gulp.task('build-modernizr', function() {
    gulp.src(['./html/css/screen.css', './html/js/main.js'])
        .pipe(modernizr(modernizrConfig))
        .pipe(uglify())
        .pipe(gulp.dest("./build/js/plugins/"));
});
 
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('build/js/**/*.js', ['jshint','build-js','build-modernizr']);
    gulp.watch('build/scss/**/*.scss', ['build-scss', 'build-modernizr']);
    gulp.watch('build/img/*.*', ['build-images']);
    gulp.watch('html/**/*.html', ['build-html']);
});