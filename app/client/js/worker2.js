postMessage('This is worker 2')
console.log('worker 222')

var stories = [{name:'1',body:'first'},{name:2,body:'second'}]
var count = 100

function post(item) {
    console.log(item)
    console.log(new Date().getTime())
    postMessage(item)
}

var p_lo = new Promise(function(resolve, reject){
    var _ = require('lodash');
    var t = new Date().getTime()
    var lo_tpl, lo_html
    for (var i=0; i < count; ++i) {
        lo_tpl = _.template(require('js/tpl/lodash.tpl'));
        lo_html = lo_tpl({name:'browserify:lodash template',stories:stories});
    }
    post({name:'lodash',  time:new Date().getTime() - t , num:count}) 
    resolve({name:'lodash',  time:new Date().getTime() - t , num:count}) 

})

var p_ha = new Promise(function(resolve, reject){
    var tpl, html, eng = require('handlebars')
    var t = new Date().getTime()
    for (var i=0; i < count; ++i) {
        tpl = eng.compile(require('js/tpl/handlebars.tpl'));
        html = tpl({name:'browserify:handlebars template',stories:stories});
    }
    resolve({name:'handlebars',  time:new Date().getTime() - t , num:count}) 
    post({name:'handlebars',  time:new Date().getTime() - t , num:count}) 
})

var p_ar = new Promise(function(resolve, rejectl){
    var tpl, html, eng = require('art-template')
    var t = new Date().getTime()
    for (var i=0; i < count; ++i) {
        tpl = eng.compile(require('js/tpl/art_template.tpl'));
        html = tpl({name:'browserify:art_template',stories:stories});
    }
    post({name:'art_template',  time:new Date().getTime() - t , num:count}) 
    resolve({name:'art_template',  time:new Date().getTime() - t , num:count}) 
})

var p_sw = new Promise(function(resolve, rejectl){
    var tpl, html, eng = require('swig')
    var t = new Date().getTime()
    for (var i=0; i < count; ++i) {
        tpl = eng.compile(require('js/tpl/swig.tpl'));
        html = tpl({name:'browserify:swig template',stories:stories});
    }
    post({name:'swig',  time:new Date().getTime() - t , num:count}) 
    resolve({name:'swig',  time:new Date().getTime() - t , num:count}) 
})

// Promise.all([p_lo, p_ha, p_ar, p_sw])
//     .then(function(list){
//         for (var item of list ) {
//             postMessage(item)
//         }
//     })

// for (var pro of [p_lo, p_ha, p_ar, p_sw]) {
//         pro.then(function(item){
//             console.log(item)
//             console.log(new Date().getTime())
//             postMessage(item)
//         })
// }
