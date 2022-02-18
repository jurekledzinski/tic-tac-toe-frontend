const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, '..', 'src', 'index.js'),
  output: {
    path: path.join(__dirname, '..', 'build'),
    filename: 'js/[contenthash:6].js',
    assetModuleFilename: 'img/[name][contenthash:6].[ext]',
    clean: true,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'public', 'index.html'),
      filename: './index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
  ],
};
