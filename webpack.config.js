module.exports = {
    entry: './js/main.js',
    output: {
        path: __dirname + '/js',
        filename: 'bundle.js'
    },
    devServer: {
        inline: true,
        port: 8000
    }
}
