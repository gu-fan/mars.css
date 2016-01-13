var gulp = require('gulp');
var gutil = require("gulp-util");
var chalk = gutil.colors
var spawn = require('child_process').spawn

var nodemon = require('nodemon');
var lr = require('./lib/lr')
var gulp_config = require('gulp/config')

// child process
var p,i
function main_task(debug){

    // The default task is merely a task manager
    gutil.log(chalk.yellow('####### Start Gulp Task #######'))

    gulp.watch(['gulpfile.js', 'gulp/**/*.js'], ['gulp-reload']);

    process.on('exit', function(code) {
        gutil.log(chalk.yellow('####### Finish Gulp Task#######'))
    });

    if (debug == 'debug') { 
        i = spawn('node-inspector', {stdio:'inherit'})
        i.on('error',function(e){
            console.log('node inspector not found, install:' + chalk.blue('npm install -g node-inspector'))
        })
    }

}

function watch_task(debug) {
    if (debug == 'debug') {
        // XXX we can not share the config between 'watch' child process.
        // so use process.env
        // gulp_config.debug = true
        gutil.log(chalk.blue('======= Start Watch (debug) ======='))
        process.env.DEBUG ='TRUE'
        p = spawn('gulp', ['watch'], {stdio:'inherit', env: process.env})
    } else {
        gutil.log(chalk.blue('======= Start Watch ======='))
        p = spawn('gulp', ['watch'], {stdio:'inherit', env:process.env})
    }
}

gulp.task('default', ['cwd', 'build'], function(){

    main_task()
    watch_task()

});

gulp.task('debug', function() {

    main_task('debug')
    watch_task('debug')

});

gulp.task('gulp-reload', function(){

    if (p && !p.killed) {
        gutil.log('kill gulp:' + p.pid)
        p.kill()
    } else {
        gutil.log('already dead')
    }
    setTimeout(watch_task, 100);

})
