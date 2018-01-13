const webpack = require('webpack'),
    glob = require('glob'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin'),
    entries = {}

const entryJsPath = `${__dirname}/src/js/entry`,
    outputJsExt = 'min.js'


// create entries object
glob.sync(`${entryJsPath}/**.js`).some(item =>  {
    const prefix = item.replace(`${entryJsPath}/`, '').replace('.js', '')
    entries[prefix] = `./js/entry/${prefix}.js`
})


// create output HTML rule
const outputHtml = Object.keys(entries).map(key => {

    const ignoreReg = new RegExp(`^(?!.*${key}.${outputJsExt}$).+$`)

    return new HtmlWebpackPlugin({
        filename: key === 'index' ? 'index.html' : `${key}/index.html` ,
        template: `${key}.pug`,
        excludeAssets: [ ignoreReg ]
    })
})


module.exports = {
    context: `${__dirname}/src`,
    entry: entries,
    output: {
        path: `${__dirname}/dist`,
        filename: `js/[name].${outputJsExt}`
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
        ...outputHtml,
        new HtmlWebpackExcludeAssetsPlugin()
    ]
}
