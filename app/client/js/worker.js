postMessage('Start Working')
console.log('Working of worker')

var stories = [{name:'1',body:'first'},{name:2,body:'second'}]
var count = 100
var t = new Date().getTime()

var _ = require('lodash');
// _.templateSettings.interpolate = /{{([\s\S]+?)}}/g; // XXX Change This can not parse '('
var lo_tpl, lo_html

for (var i=0; i < count; ++i) {
    lo_tpl = _.template(require('js/tpl/lodash.tpl'));
    lo_html = lo_tpl({name:'browserify:lodash template',stories:stories});
}

var lo_t = new Date().getTime()

postMessage({name:'lodash', time:(lo_t-t)})

var Handlebars = require('handlebars');
var ha_tpl, ha_html
for (var i=0; i < count; ++i) {
    ha_tpl = Handlebars.compile(require('js/tpl/handlebars.tpl'));
    ha_html = ha_tpl({name:'browserify:handlebars template', stories: stories});
}
var ha_t = new Date().getTime()
postMessage({name:'handlebars', time:ha_t-lo_t })


var art = require('art-template');
var ar_tpl, ar_html
for (var i=0; i < count; ++i) {
    ar_tpl = art.compile(require('js/tpl/art_template.tpl'));
    ar_html = ar_tpl({name:'browserify:art_template', stories: stories});
}

var ar_t = new Date().getTime()
postMessage({name:'art_template', time:ar_t-ha_t})

var swig = require('swig');
var sw_tpl, sw_html
for (var i=0; i < count; ++i) {
    sw_tpl = swig.compile(require('js/tpl/swig.tpl'));
    sw_html = sw_tpl({name:'browserify:swig template', stories: stories});
}


var sw_t = new Date().getTime()
postMessage({name:'swig', time:sw_t-ar_t})
postMessage('Finish Working')
close()
