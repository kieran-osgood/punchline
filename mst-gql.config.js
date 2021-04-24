module.exports = {
  force: false,
  format: "ts",
  input: "schema.graphql",
  outDir: "./app/graphql",
  roots: ["Joke", "User", "Category", "UserJokeHistory"]
}
