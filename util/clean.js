class Clean {
  static clean(joke) {
    try {
      const splitCleanJokes = joke.data.choices[0].message.content.split(
        "{}",
        1
      );
      const parsedJokes = JSON.parse(splitCleanJokes);
      // console.log("Are Jokes Parsable?\n", joke);
      console.log("Card Front: ", parsedJokes.front);
      console.log("Card Back: ", parsedJokes.back);
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = { Clean };
