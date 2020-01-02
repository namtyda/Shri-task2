const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'linter.js',
    path: path.resolve(__dirname, 'build')
  }
}