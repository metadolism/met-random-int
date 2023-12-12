const path = require('path');

module.exports = {
  mode: 'development', // or 'production'
  entry: './index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  node: {
    global: true,
    __filename: 'mock',
    __dirname: 'mock',
    Buffer: true,
    process: true,
  },
};
