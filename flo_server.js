
var flo = require('fb-flo'),
    path = require('path');

var server = flo(
  "build",
  {
    port: 8888,
    host: 'localhost',
    verbose: false,
    glob: [
       // All JS files in `sourceDirToWatch` and subdirectories
      'build/*.js',
       // All CSS files in `sourceDirToWatch` and subdirectories
      'build/*.css'
    ]
  },
  function resolver(filepath, callback) {
    // 1. Call into your compiler / bundler.
    // 2. Assuming that `bundle.js` is your output file, update `bundle.js`
    //    and `bundle.css` when a JS or CSS file changes.
    callback({
      resourceURL: 'bundle.js' + path.extname(filepath),
      contents: fs.readFileSync(filepath)
    });
  }
);

module.exports = server;

// var flo  = require('fb-flo'),
//     path = require('path');
//     fs   = require('fs');
//
// function server() {
//   flo(
//     'build',
//     {
//       port: 8888,
//       host: 'localhost',
//       verbose: true,
//       glob: [
//       'build/**/*.js',
//       'build/**/*.css'
//       ]
//     },
//     function resolver(filepath, callback) {
//       callback({
//         resourceURL: filepath,
//         reload: true,
//         contents: fs.readFileSync(filepath)
//       });
//     }
//   );
//
// }
// module.exports = server;
