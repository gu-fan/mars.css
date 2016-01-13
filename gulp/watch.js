var gulp = require('gulp')
var gutil = require("gulp-util");

var chalk = gutil.colors

var path = require('path')
var rel = require('path').relative

// var nodemon = require('nodemon');
var lr = require('./lib/lr')
var gulp_config = require('gulp/config')
var watch_list = gulp_config.watch_list

var config = require('config')

var is_start = false ;

var spawn=require('child_process').spawn

var s 
function restart_server() {
   if (s && !s.killed) {
        console.log('RESTART: kill server: ' + s.pid)
        s.kill()
    }
   setTimeout(function() { 
        start_server()
   }, 20);
}

var PORT = '3000'
function start_server(){

    var spawn=require('child_process').spawn
    var ENV = process.env
    ENV.NODE_ENV = "development"
    ENV.PORT = PORT
    ENV.LIVERELOAD = "TRUE"
    s = spawn('node',['bin/www'], {
        env : ENV,
        stdio:'inherit'
    })

    gutil.log('START SERVER port:' + PORT + ' pid:'+ s.pid)

    if (!is_start) { 
        lr.listen() 
        is_start = true
    } else {
        lr.reload() 
    }

}


// NOTE:
// This task shoold be run as a child process of default task
gulp.task('watch', function(){

    process.chdir('./app')

    // watch files for tasks
    // gulp.watch('server/views#<{(||)}>#*.html', function(file){
    //     gutil.log('html ' + chalk.yellow(file.path) + ' changed')
    //     lr.reload(rel(config.public_dir, file.path))
    // })
    gulp.watch('client/**/*.html', function(file){
        gutil.log('html ' + chalk.yellow(file.path) + ' changed')
        lr.reload(rel(config.public_dir, file.path))
    })

    gulp.watch('../public/**/*.js', function(file){
        gutil.log('js ' + chalk.yellow(file.path) + ' changed')
        lr.reload(rel(config.public_dir, file.path))
    })

    gulp.watch('../public/**/*.css', function(file){
        gutil.log('css ' + chalk.yellow(file.path) + ' changed')
        lr.reload(rel(config.public_dir, file.path))
    })

    for (var i=0; i < watch_list.length; ++i) {
        gulp.watch(watch_list[i][0], watch_list[i][1])
    }

    gulp.watch('server/**/*.js', function(file){
        gutil.log('server js' + chalk.yellow(file.path) + ' changed')
        restart_server()
    })
    gulp.watch('server/**/*.html', function(file){
        gutil.log('server html' + chalk.yellow(file.path) + ' changed')
        lr.reload(rel(config.public_dir, file.path))
    })
    gulp.watch('rst/doc/**/*.rst', function(file){
        gutil.log('rst doc' + chalk.yellow(file.path) + ' changed')
        lr.reload(rel(config.public_dir, file.path))
    })
    start_server()

    process.on('exit', function(code) {
        // nodemon.emit('quit')
       if (s && !s.killed) {
            console.log('kill server:' + s.pid)
            s.kill()
        }
        gutil.log(chalk.blue('======= Finish Watch ======='))
    });
})
