module.exports = {

    entry: './src/index.js',
    output: {
        publicPath: './build/',
        path: './build',
        filename: 'bundle.js',
    },
    devtool: "source-map",
    target: 'electron',
    module: {
        preLoaders: [
            {
                test: /\.jsx$|\.js$/,
                loader: 'eslint-loader',
                include: __dirname + '/src',
                exclude: /build\.js$/
            }
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.json?$/,
                loader: 'json'
            },
            { test: /\.svg(\?.*)?$/,   loader: 'file?[name].[ext]&limit=10000&mimetype=image/svg+xml' }
        ]
    }
}