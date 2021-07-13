module.exports = {
  presets: [
    'babel-preset-expo',
  ],
  sourceMaps: true,
  env: {
    production: {},
  },
  plugins: [
    ["module:react-native-dotenv", {
      moduleName: "react-native-dotenv",
      // moduleName: "@env",
      path: "./app/config/.env",
      blacklist: null,
      whitelist: null,
      safe: false,
      allowUndefined: false
    }],
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true,
      },
    ],
    ["@babel/plugin-proposal-optional-catch-binding"],
    ["module-resolver", {
      root: ["."],
      extensions: [".ios.js", ".android.js", ".js", ".json"],
      alias: {
        components: "./app/components",
        images: "./assets/images",
        assets: "./assets",
        theme: "./app/theme",
        app: "./app",
      }
    }],
    // NOTE: REANIMATED HAS TO BE LAST
    'react-native-reanimated/plugin',
  ],
}
