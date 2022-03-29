import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  entry: './src/client/index.js',
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: '/dist',
    hot: true, 
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader','sass-loader' ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
    })
  ]
}