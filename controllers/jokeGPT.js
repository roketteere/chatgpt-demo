const router = require("express").Router();

// import gpt cleaning library
const { Clean } = require("../util");

// config gets passed to openai constructor
const { Configuration, OpenAIApi } = require("openai");

// dontenv to hide our keys
require("dotenv").config();

// create new config for openai constructor using dotenv to hide key
const config = new Configuration({
  apiKey: process.env.API_KEY,
});

// create instance of openai using our new config
const openai = new OpenAIApi(config);

router.get("/", async (req, res) => {
  try {
    const joke = await getJokeGPT35T();
    res.status(200).json(joke);
  } catch (err) {
    res.status(400).json(err);
  }
});

// generate our joke using prompt
async function getJokeGPT35T() {
  const prompt = `
      Write a short joke in the Japanese Phonetic Alphabet,Hiragana only. Return in the following parsable JSON format (Please make sure the "front" is only Hiragana and the "back" only English translation):
      {
        "front": "なかれい、なかれい、あいうえおのまえ",
        "back": "Don't be so noisy in front of the aiueo"
      }
      `;

  const joke = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 1000,
    temperature: 1,
  });

  Clean.clean(joke);
}

module.exports = router;
