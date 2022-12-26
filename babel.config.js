const plugins = [
  [
    'transform-inline-environment-variables',
    {
      exclude: 'NODE_ENV'
    }
  ],
  '@babel/plugin-transform-runtime',
  'babel-plugin-transform-typescript-metadata',
  ['@babel/plugin-proposal-decorators', { legacy: true }],
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      root: ['.'],
      alias: {
        components: './src/components',
        constants: './src/constants',
        screens: './src/screens',
        utils: './src/utils',
        app: './src/app',
        services: './src/services',
        IoC: './src/IoC'
      }
    }
  ]
]

const pluginsProd = ['transform-remove-console']

const configDev = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: plugins
}

const configProd = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [...plugins, ...pluginsProd]
}

const config = process.env.NODE_ENV === 'production' ? configProd : configDev

module.exports = config
