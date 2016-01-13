var express = require('express');
var router = express.Router();

var fs = require('fs')
var exec = require('child_process').exec

router.get('/*', function(req, res, next) {
    var file = /^\/(.*)/.exec(req.path)[1]
    if (/\.rst$/.test(file)) {
        exec('python rst/parse.py ' + 'rst/doc/' + file, function(err, resp){
            if (err) return res.status(500).send(err.message)
            res.render('index.html', { doc: resp})
        })
    } else {
        next()
    }
}); 

module.exports = router;
