const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const config = {
  entry: './src/index.js',

  mode: 'development',

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: 'build/'
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css"
    })
  ],

  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
      },
      {
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
        test: /\.css$/,
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          // {
          //   loader: 'url-loader',
          //   options: { limit: 40000 }
          // },
          'file-loader'
        ]
      }
    ]
  }
};

module.exports = config;

