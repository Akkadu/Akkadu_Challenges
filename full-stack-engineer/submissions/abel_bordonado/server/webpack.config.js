var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');
const EmitAllPlugin = require('webpack-emit-all-plugin');

var nodeModules = {};


fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });


module.exports = env => {
  return {
    entry: {
      app: './src/server.ts',
    },
    mode: process.env["NODE_ENV"] || "production",
    target: 'node',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'release'),
    },
    devtool: 'source-map',
    plugins: [
      new EmitAllPlugin({
        path: path.resolve(__dirname, 'release')
      }),
    
      new CopyPlugin([
        { from: `package.json`, to: `./` }
      ]),
  
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      symlinks: false
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            { loader: "ts-loader" },
     
          ]
        }
      ]
    },
    
    externals: nodeModules
  }
};

