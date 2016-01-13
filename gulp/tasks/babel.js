var gulp = require('gulp');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var gutil = require("gulp-util");
var watch_list = require('gulp/config').watch_list

var src = ['src/js/babel/**/*.js', 'src/js/babel/**/*.jsx']
 
gulp.task('babel', function (d, e) {

    gutil.log('Compile babel (es6 & react)')

    return gulp.src(src)
        .pipe(plumber())
        .pipe(babel())
        .pipe(gulp.dest('public/js'));
});

watch_list.push([src, ['babel']])
