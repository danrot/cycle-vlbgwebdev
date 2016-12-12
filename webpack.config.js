module.exports = {
    entry: './src/main.js',
    output: {
        path: 'build',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modues/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    plugins: ['syntax-jsx', 'transform-react-jsx', 'transform-object-assign']
                }
            }
        ]
    }
};
