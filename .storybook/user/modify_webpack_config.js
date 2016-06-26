module.exports = function (config) {
  // This is the default webpack config defined in the `../webpack.config.js`
  // modify as you need.

  config.resolve = {
    // files that can be required without extension:
    extensions: ((config.resolve && config.resolve.extensions) || [])
      .concat(['', '.js', '.jsx', '.json'])
  }
}
