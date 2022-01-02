module.exports = function (wallaby) {
  return {
    files: ["src/**/*.ts*"],

    tests: ["test/**/*Spec.ts*"],

    compilers: {
      "**/*.ts?(x)": wallaby.compilers.typeScript({
        module: "commonjs",
        jsx: "React",
      }),
    },
  }
}
