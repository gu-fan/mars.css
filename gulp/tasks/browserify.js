// browserify bundler
var browserify = require('browserify')
var gulp = require('gulp')
var gutil = require("gulp-util");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var glob = require('glob');
var es = require('event-stream');
var path = require('path')

var stringify = require('stringify');
var watch_list = require('gulp/config').watch_list


var watchify = require('watchify');

gulp.task('browserify-js', function(done){

    gutil.log('Bundle Browserify js')
    // web/app
    // NOTE: ONLY Bundle the first dir of file.
    glob('./client/js/*.js', function(err, files){

        if (err) done(err);

        var tasks = files.map(function(entry) {
            // XXX
            // What's the correct path ?????
            return browserify({paths:['./client',
                                    '../bower_components'],
                               plugin:[watchify],
                               cache:{},
                               packageCache:{}})
                .transform(stringify(['.html', '.tpl', '.svg']))
                .transform("babelify", {presets: ["es2015"]})
                .add(entry)
                .bundle()
                .on('error', function(err){
                    gutil.log(err.message);
                    // end this stream
                    this.emit('end');
                })
                .pipe(source(path.basename(entry)))
                .pipe(gulp.dest('../public/js'));
            });
        es.merge(tasks).on('end', done);

    })

})

gulp.task('browserify-jsx', function(done){

    gutil.log('Bundle Browserify jsx')
    // NOTE: ONLY Bundle the first dir of file.
    glob('./client/js/*.js', function(err, files){

        if (err) done(err);

        var tasks = files.map(function(entry) {
            return browserify({paths:['./client',
                                    '../bower_components'],
                               plugin:[watchify],
                               cache:{},
                               packageCache:{}})
                .transform(stringify(['.html', '.tpl', '.svg']))
                .transform("babelify", {presets: ["react"]})
                .add(entry)
                .bundle()
                .on('error', function(err){
                    gutil.log(err.message);
                    // end this stream
                    this.emit('end');
                })
                .pipe(source(path.basename(entry)))
                .pipe(gulp.dest('../public/js'));
            });
        es.merge(tasks).on('end', done);

    })

})

gulp.task('browserify', ['browserify-js', 'browserify-jsx'], function(){
    gutil.log('Bundle Browserify')
})

watch_list.push([['client/js/**/*.js', 'client/js/**/*.tpl', 'client/js/**/*.svg'], ['browserify-js']])
watch_list.push([['client/js/**/*.jsx', 'client/js/**/*.tpl', 'client/js/**/*.svg'], ['browserify-jsx']])
