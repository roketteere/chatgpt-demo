const express = require("express");
const router = require("express").Router();
const app = express();
const path = require("path");
require("dotenv").config();
const { Model } = require("./models");
const { Clean } = require("./util");
const PORT = process.env.PORT || 3006;
// import routes
const routes = require("./controllers");
// Configuration gets passed to OpenAIApi constructor
const { Configuration, OpenAIApi } = require("openai");

// create new config for openai constructor using dotenv to hide key
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

router.use(routes);

app.post("/askgpt", async (req, res) => {
  let prompt = req.body.prompt;
  // console.log("\n=============\nPROMPT " + prompt);
  try {
    const gptResponse = await go(prompt);
    console.log(prompt, "\n", gptResponse);

    res.status(200).json(gptResponse);
  } catch (err) {
    res.status(400).json(err);
  }
});

async function go(message) {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: message }],
  });
  // console.log(completion.data.choices[0].message.content);
  return completion.data.choices[0].message.content;
}

async function getJokeD3() {
  const prompt = `
      Write a short joke in Japanese using Hiragana only. Return in the following parsable JSON format:
      {
        "front": "Japanese Hiragana Joke Goes Here",
        "back": "English translation goes here"
      }
      `;

  const joke = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 1000,
    temperature: 1,
  });
  const parsedJokes = JSON.parse(joke.data.choices[0].text);
  console.log("Are Jokes Parsable?\n", joke);
  console.log("Card Front: ", parsedJokes.front);
  console.log("Card Back: ", parsedJokes.back);
}

async function getJokeGPT35T() {
  let errorCount = 0;
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

const models = async () => {
  const list = await openai.listModels();
  console.log("Type: ", typeof list.data);
  const arrayItems = Object.assign([], list.data);
  console.log(arrayItems.data[0].id);
  arrayItems.data.forEach((model) => {
    console.log("Model: ", model.id);
  });
};

// getJokeGPT35T();

// go("How old is the earth?")

app.listen(
  PORT,
  /*async*/ () => {
    console.log("Now listening ", PORT);
    // await models();
  }
);
