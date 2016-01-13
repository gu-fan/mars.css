var tinylr = require('tiny-lr');
var gutil = require("gulp-util");

var server = tinylr()

// fn will fire only once after the fn call is idled of a delay.
function debounce(fn, delay) {
  var _queue = []
  var timer = null;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    if (args.hasOwnProperty('0')) {
        _queue.push(args[0])
    }
    timer = setTimeout(function () {
      if (_queue.length) {
        fn.apply(context, [_queue]);
        // fn.apply(context, args);
      } else {
        fn.apply(context, null);
      }
      _queue = []
    }, delay);
  };
}

module.exports = {
    listen: function(port){
        port = port || 35729
        server.listen(port, function() {
            gutil.log('Livereload server start on %s ...', port);
        })
    },
    reload: debounce(function(files){
        if (files) {
            gutil.log('LiveReload with:' + files.toString())
        } else {
            gutil.log('Livereload')
        }
        server.changed({body:{files:files || 'index.html'}})
    }, 400)
}
