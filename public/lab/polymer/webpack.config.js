const path = require('path');

module.exports = {
  entry: './js-src/index.js',
  output: {
    filename: 'mockServer.js',
    path: path.resolve(__dirname, 'js')
  }
};