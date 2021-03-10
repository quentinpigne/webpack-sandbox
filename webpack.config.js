const path = require('path')

const cssLoaders = [
  'style-loader',
  { loader: 'css-loader', options: { importLoaders: 1 } },
  { loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: ['autoprefixer']
      }
    }
  }
]

module.exports = (env, argv) => {
  return {
    mode: env.production ? 'production' : 'development',
    entry: './assets/js/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: "/dist/"
    },
    devtool: env.production ? 'source-map' : 'eval-cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: cssLoaders
        },
        {
          test: /\.s[ac]ss$/,
          use: [
            ...cssLoaders,
            'sass-loader'
          ]
        }
      ]
    }
  }
}
