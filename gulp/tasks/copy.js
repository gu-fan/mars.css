var gulp = require('gulp');
var plumber = require('gulp-plumber');
var watch_list = require('gulp/config').watch_list
var gutil = require("gulp-util");

// gulp.task('vanilla-js', function() {
//     gutil.log('Copy vanilla-js');
//     gulp.src('./src/js/vanilla#<{(||)}>#*.js')
//         .pipe(plumber())
//         .pipe(gulp.dest('./public/js'))
// });

// gulp.task('vanilla-css', function() {
//     gutil.log('Copy vanilla-css');
//     gulp.src('./src/css/vanilla#<{(||)}>#*.css')
//         .pipe(plumber())
//         .pipe(gulp.dest('./public/css'))
// });

// gulp.task('vanilla-html', function() {
//     gutil.log('Copy vanilla-html');
//     gulp.src('./src/html/vanilla#<{(||)}>#*.html')
//         .pipe(plumber())
//         .pipe(gulp.dest('./server/views'))
// });

gulp.task('assets', function() {
    gutil.log('Copy assets');
    gulp.src('./client/assets/**/*.*')
        .pipe(plumber())
        .pipe(gulp.dest('../public'))
});

gulp.task('html', function() {
    gutil.log('Copy html');
    gulp.src('./client/**/*.html')
        .pipe(plumber())
        .pipe(gulp.dest('../public'))
});

// gulp.task('copy', ['vanilla-js', 'vanilla-css','vanilla-html', 'img', 'ico'])
gulp.task('copy', ['assets', 'html'])

// watch_list.push(['src/js/vanilla#<{(||)}>#*.js', ['vanilla-js']])
// watch_list.push(['src/css/vanilla#<{(||)}>#*.css', ['vanilla-css']])
// watch_list.push(['src/html#<{(||)}>#*.html', ['vanilla-html']])
watch_list.push(['client/assets/**.*', ['assets']])
watch_list.push(['client/**/*.html', ['html']])
