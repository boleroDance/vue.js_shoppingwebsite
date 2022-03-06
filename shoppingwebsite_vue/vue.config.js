'use strict'
const webpack = require('webpack')


module.exports = {
    publicPath: '/',
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