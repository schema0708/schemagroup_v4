'use strict';

var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
// var imageop = require('gulp-image-optimization');

gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(webserver({
      host:"localhost",
      port:3000,
      livereload: true,
      directoryListing: false,
      open: true
    }));
});


// gulp.task('images', function(cb) {
//     gulp.src(['app/images/**/*.png','app/images/**/*.jpg','app/images/**/*.gif','app/images/**/*.jpeg']).pipe(imageop({
//         optimizationLevel: 5,
//         progressive: true,
//         interlaced: true
//     })).pipe(gulp.dest('dist/images')).on('end', cb).on('error', cb);
// });

gulp.task('sass', function () {
  return gulp.src('app/sass/style.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('app/css'));
});
gulp.task('autoprefixer', function () {
    gulp.src('app/css/style.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('watch', function () {
  gulp.watch('app/sass/style.scss', ['sass']);
});
gulp.task('html', function () {
  return gulp.src('app/**/*.html').pipe(gulp.dest('dist/'));
});

gulp.task('build', ['html','autoprefixer']);

gulp.task('default', ['webserver','watch']);
