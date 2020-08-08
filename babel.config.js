module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.android.js',
            '.android.tsx',
            '.ios.js',
            '.ios.tsx',
          ],
          root: ['.'],
          alias: {
            src: './src/',
            main: './src/app/main/',
            auth: './src/app/auth/',
            components: './src/components/',
            images: './src/images/',
            utils: './src/utils',
          },
        },
      ],
    ],
  };
};
