const path = require('path');

module.exports = {
  mode: 'development', // or 'production'
  target: 'node',
  entry: './index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'MET',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  node: {
    global: true,
    __filename: 'mock',
    __dirname: 'mock',
    Buffer: true,
    process: true,
  },
  externals: {
    mqtt: 'commonjs mqtt'
  }
};
