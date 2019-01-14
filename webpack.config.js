module.exports = (env, argv) => {
  return {
    output: {
      path: __dirname + '/dist/',
      globalObject: 'typeof self !== \'undefined\' ? self : this',
      filename: argv.mode === 'production' ? 'validatorjs-riot.min.js' : 'validatorjs-riot.js',
      library: 'ValidatorjsRiot',
      libraryTarget: 'umd'
    },
    externals: [
      {
        validatorjs: 'validatorjs'
      },
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          enforce: 'pre',
          use: [
            {
              loader: 'eslint-loader',
              options: {
                fix: true,
                emitWarning: true,
              },
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }
      ]
    },
    devtool: false,
  }
}