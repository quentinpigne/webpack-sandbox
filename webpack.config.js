const path = require('path')

module.exports = (env, argv) => {
  return {
    mode: env.production ? 'production' : 'development',
    entry: './assets/js/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        }
      ]
    }
  }
}
