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
      "root": ["."],
      "alias": {
        "theme":"./app/theme",
        "app":"./app",
        "images": "./assets/images",
        
      }
    }]
  ],
}
