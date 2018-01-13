const webpack = require('webpack'),
    glob = require('glob'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    entries = {}


// create entries object
glob.sync(`${__dirname}/src/js/**/index.js`).some(item =>  {
    const prefix = item.replace(`${__dirname}/src/js/`, '').split('/')[0]
    entries[prefix] = '.' + item.replace(`${__dirname}/src`,'')
})

// create output HTML rule
const outputHtml = Object.keys(entries).map(key => {
    return new HtmlWebpackPlugin({
        filename: key === 'index' ? 'index.html' : `${key}/index.html` ,
        template: `${key}.pug`
    })
})


module.exports = {
    context: `${__dirname}/src`,
    entry: entries,
    output: {
        path: `${__dirname}/dist`,
        filename: "js/[name].min.js"
    },
    devServer: {
        contentBase: './dist',
        port: 8080
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude:/node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.pug$/,
                loader: ["html-loader", "pug-html-loader"]
            }
        ]
    },
    plugins: [
        ...outputHtml
    ]
}
