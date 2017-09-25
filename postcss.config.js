module.exports = {
    plugins: {
        'postcss-import': {},
        'postcss-cssnext': {},
        'autoprefixer': {
            browsers: ['iOS >= 5', 'ie 7', 'safari 7', 'Firefox >= 46']
        },
        'cssnano': {
            normalizeWhitespace: true,
            discardComments: true,
            orderedValues: false
        }
    }
}