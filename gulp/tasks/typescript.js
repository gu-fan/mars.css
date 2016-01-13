var gulp = require('gulp');
var path = require('path');
var plumber = require('gulp-plumber');
var ts = require('gulp-typescript');
var gutil = require("gulp-util");
var watch_list = require('gulp/config').watch_list

gulp.task('typescript', function() {

    gutil.log('Compile typescript');

    return gulp.src('./src/js/typescript/*.ts')
        .pipe(plumber())
        .pipe(ts({
            noImplicitAny: true
        }))
        .pipe(gulp.dest('./public/js'));
});

watch_list.push(['src/js/**/*.ts', ['typescript']])
