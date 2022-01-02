module.exports = {
  force: false,
  format: "ts",
  input: "http://localhost:5000/graphql?sdl",
  outDir: "./app/graphql",
  roots: ["Joke", "User", "Category", "UserJokeHistory"],
}
