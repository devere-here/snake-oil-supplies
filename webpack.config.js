const isDev = process.env.NODE_ENV === 'development'

module.exports = {
<<<<<<< HEAD
  entry: ['babel-polyfill', './client/index.js'],
=======
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    './client/index.js'
  ],
>>>>>>> master
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
