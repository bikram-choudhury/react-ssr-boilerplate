const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    // devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src', 'index.html'),
                    to: path.resolve(__dirname, 'build', 'index.html')
                }
            ],
        }),
    ],
    output: {
        filename: 'bundle.js',
        path: __dirname + '/public'
    }
}