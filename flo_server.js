var flo = require('fb-flo');
var fs = require('fs');
var exec = require('child_process').exec;

var server = flo('./', {
  port: 8888,
  dir: './',
  glob: ['./build/**/*.js', './build/**/*.css']
}, resolver);

server.once('ready', function() {
  console.log('Ready!');
});

function resolver(filepath, callback) {
    exec('gulp', function (err) {
      if (err) throw err;
      if (filepath.match(/\.js$/)) {
        callback({
          resourceURL: 'build/build.js',
          contents: fs.readFileSync('build/build.js').toString()
        })
      } else {
        callback({
          resourceURL: 'build/build.css',
          contents: fs.readFileSync('build/build.css').toString()
        })
      }
    });
  }
};
