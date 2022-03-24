'use strict'
const webpack = require('webpack')

module.exports = {
    // publicPath: '/vue.js_shoppingwebsite/',
    // outputDir: 'dist',
    // runtimeCompiler: true,
    // 关闭map
    productionSourceMap: false,
    // lintOnSave: false,
    publicPath: process.env.NODE_ENV === 'production'
    ? '/vue.js_shoppingwebsite/'
    : '/',

    // 关闭eslint
    lintOnSave: false,

    
}