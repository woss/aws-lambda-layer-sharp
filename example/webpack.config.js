const path = require('path')
const nodeExternals = require('webpack-node-externals')
const slsw = require('serverless-webpack')
const entries = {}

Object.keys(slsw.lib.entries).forEach(
  key => (entries[key] = ['./source-map-install.js', slsw.lib.entries[key]])
)
module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  devtool: 'source-map',
  // devtool: 'inline-source-map',
  // entry: entries,
  entry: slsw.lib.entries,
  target: 'node',
  externals: [nodeExternals(), 'sharp'],
  module: {
    rules: [{ test: /\.ts(x?)$/, loader: 'ts-loader' }]
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx']
  },
  // output: {
  //   libraryTarget: 'commonjs',
  //   path: path.join(__dirname, './../.dist'),
  //   filename: 'handler.js',
  //   devtoolModuleFilenameTemplate: '../../[resource-path]',
  // },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    sourceMapFilename: '[file].map',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]'
  },
  optimization: { minimize: false },
  plugins: [],
  performance: {
    // Turn on size warnings for entry points
    hints: 'warning'
  }
}
