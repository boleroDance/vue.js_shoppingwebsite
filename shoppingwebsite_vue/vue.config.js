'use strict'
const webpack = require('webpack')

module.exports = {
    publicPath: '/vue.js_shoppingwebsite/',
    outputDir: 'dist',
    runtimeCompiler: true,
    productionSourceMap: false,
    lintOnSave: false,

    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery",
                _: "lodash"
            })
        ]
    },
    
}