const path = require('path');

module.exports = {
  entry: './server.tsx',
  devtool: 'inline-source-map',
  loaders:
  module: {
    rules: [
      {
        test: /\.ejs$/,

      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  target: "node"
};
