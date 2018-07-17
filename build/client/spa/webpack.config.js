const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const paths = {
    src: path.resolve(__dirname, 'src'),
    dist: path.resolve(__dirname, 'dist')
};
const config = {
    context: paths.src,
    entry: {
        app: './index'
    },
    output: {
        path: paths.dist,
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'] // добавляем расширение tsx для файлов с react компонентами
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './index.html'
        }) // генерация html-файла на основе нашего шаблона
    ]
};
module.exports = config;
//# sourceMappingURL=webpack.config.js.map