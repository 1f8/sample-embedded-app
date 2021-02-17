require('dotenv').config()
const withCSS = require('@zeit/next-css')
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack')

const apiKey =  JSON.stringify(process.env.SHOPIFY_API_KEY)
const host =  JSON.stringify(process.env.HOST)

module.exports = withCSS({
  webpack: (config) => {
    const env = { API_KEY: apiKey, HOST: host }
    config.plugins.push(new webpack.DefinePlugin(env))
    return config
  },
})