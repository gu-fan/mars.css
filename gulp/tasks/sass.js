var gulp = require('gulp');
var sass = require('gulp-sass');
var path = require('path');
var plumber = require('gulp-plumber');
var gutil = require("gulp-util");
var watch_list = require('gulp/config').watch_list

gulp.task('sass', function () {

  gutil.log('Compile sass');

  return gulp.src(['./src/css/sass/**.sass', './src//css/sass/**.scss'])
    .pipe(plumber())
    .pipe(sass({
        paths: [ path.join(__dirname, 'sass', 'includes') ]
    }))
    .pipe(gulp.dest('./public/css'));
});

watch_list.push([['src/css/**/*.sass', 'src/css/**/*.scss'], ['sass']])
