var coffee = require('gulp-coffee');
var gulp = require('gulp');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var watch_list = require('gulp/config').watch_list

gulp.task('coffee', function() {

    gutil.log('Compile coffee');

    gulp.src('./src/js/coffee/**.coffee')
        .pipe(plumber())
        .pipe(coffee({bare: true}))
        .on('error', function(err){
            gutil.log(err)
            this.emit('end')
        })
        .pipe(gulp.dest('./public/js'))
});

watch_list.push(['src/js/coffee/**.coffee', ['coffee']])
