const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

module.exports = function override(config, env) {
  config.devServer= {

//  proxy: [
//       {
//         context: ['/geoserver'],
//         target: 'http://localhost:7986/',
//         // pathRewrite: { '^/tdt': '' },
//       },
//     ],
  }
  // config.resolve.alias = {
  //   ...(config.resolve.alias || {}),
  //   cesium: path.resolve(__dirname, cesiumSource),
  // };

  // config.plugins = [
  //   ...(config.plugins || []),
  //   new CopyWebpackPlugin({
  //     patterns: [
  //       { from: path.join(cesiumSource, cesiumWorkers), to: 'Cesium/Workers' },
  //       { from: path.join(cesiumSource, 'Assets'), to: 'Cesium/Assets' },
  //       { from: path.join(cesiumSource, 'Widgets'), to: 'Cesium/Widgets' },
  //       { from: path.join(cesiumSource, 'ThirdParty'), to: 'Cesium/ThirdParty' }
  //     ],
  //   }),
  //   new webpack.DefinePlugin({
  //     CESIUM_BASE_URL: JSON.stringify('Cesium'),
  //   }),
  // ];
 
  return config;
};
