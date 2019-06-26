const path = require('path');

module.exports = {
  entry: './mock-server/src/mock-server.js',
  output: {
    filename: 'mock-server.js',
    path: path.resolve(__dirname, 'mock-server/dist')
  }
};