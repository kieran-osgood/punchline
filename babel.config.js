module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  env: {
    production: {},
  },
  plugins: [
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
    }]
  ],
}
