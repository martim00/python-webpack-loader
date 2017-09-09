function cwd (path) {
  return require('path').resolve(__dirname, path)
}

module.exports = {
  entry: cwd('main.js'),

  output: {
    path: cwd('dist'),
    filename: 'app.js'
  },

  module: {
    rules: [
      {
        test: /\.py$/,
        loader: 'py-loader'
      }
    ]
  }
}
