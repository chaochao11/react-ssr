const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'development',
    target: 'node',
    entry: path.join(__dirname, '../src/server/app.tsx'),
    output: {
        filename: 'app.js',
        path: path.join(__dirname, '../dist'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: ['babel-loader'],
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json']
    },
    externals: [nodeExternals()],
};
