const path = require('path')

module.exports = {
  mode: 'development',
  entry: './index.js',
  watch: true,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
}
