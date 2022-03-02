const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'development',
  optimization: {
    minimizer: [new CssMinimizerPlugin({})],
  },
  devServer: {
    open: true,
    port: 3000,
    historyApiFallback: true,
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(jpg|png|svg|gif|jpeg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(s(a|c)ss|css)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
};
