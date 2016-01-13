var path = require('path');
process.env.NODE_PATH = path.join(__dirname )
require('module').Module._initPaths();

require('gulp/watch')

// the gulp default task
require('gulp/build')

require('gulp/default')

