const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

const cssLoaders = [
  MiniCssExtractPlugin.loader,
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
    entry: {
      app: ['./assets/scss/style.scss', './assets/js/index.js']
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: env.production ? '[name].[chunkhash:8].js' : '[name].js',
      publicPath: "/dist/",
      clean: true
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
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: env.production ? '[name].[contenthash:8].css' : '[name].css'
      }),
      new WebpackManifestPlugin()
    ]
  }
}
