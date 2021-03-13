const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
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
      app: ['./public/style.scss', './src/index.js']
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: env.production ? '[name].[chunkhash:8].js' : '[name].js',
      publicPath: "/dist/",
      clean: true
    },
    resolve: {
      extensions: ['.wasm', '.mjs', '.js', '.jsx', '.json']
    },
    devtool: env.production ? 'source-map' : 'eval-cheap-module-source-map',
    devServer: {
      // contentBase: path.join(__dirname, 'dist'),
      overlay: true,
      port: 3000
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
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
        },
        {
          test: /\.(png|jpg|gif)$/,
          type: 'asset/resource',
          generator: {
            filename: 'static/[hash][ext][query]'
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        inject: 'body',
        scriptLoading: 'blocking'
      }),
      new MiniCssExtractPlugin({
        filename: env.production ? '[name].[contenthash:8].css' : '[name].css'
      }),
      new WebpackManifestPlugin()
    ]
  }
}
