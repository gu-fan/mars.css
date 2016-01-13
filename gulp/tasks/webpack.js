var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");

var watch_list = require('gulp/config').watch_list

gulp.task('webpack', function(callback){
    gutil.log('[webpack]', 'Compile webpack')
    webpack({
        entry: './src/bundle/webpack/main.js',
        output: {
            path: './public/js',
            filename: 'webpack.js'
        },
        module: {
          loaders: [
            {
              test: /\.js?$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel', // 'babel-loader' is also a legal name to reference
              query: {
                presets: ['es2015','react']
              }
            }
          ]
        }
    }, function(err, stats){
        if(err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
        }))
        callback()
    })

})

watch_list.push([['src/bundle/webpack/**/*.js'], ['webpack']])
