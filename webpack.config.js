const { merge } = require('webpack-merge');

const commonFile = require('./webpack/common');
const dotenv = require('./dotenv');

module.exports = (_env, { mode }) => {
  const devProdFiles = require(`./webpack/${mode}`);
  const mergeConfig = merge(commonFile, devProdFiles, dotenv);
  return mergeConfig;
};
