require('dotenv').config()
const withCSS = require('@zeit/next-css')
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack')

const apiKey =  JSON.stringify(process.env.SHOPIFY_API_KEY)

module.exports = withCSS({
  webpack: (config) => {
    const env = { API_KEY: apiKey }
    config.plugins.push(new webpack.DefinePlugin(env))
    return config
  },
})