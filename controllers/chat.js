const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const { Model } = require("../models");
const { Clean } = require("../util");
const PORT = process.env.PORT || 3001;
// Configuration gets passed to OpenAIApi constructor
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

async function go(message) {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: message }],
  });
  console.log(completion.data.choices[0].message.content);
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
  console.log(typeof arrayItems);

  // list.data.forEach((item) => {
  //   const model = new Model(item);
  //   console.log(model);
  // });
};

// getJokeGPT35T();

// go("How old is the earth?")

app.listen(PORT, () => console.log("Now listening ", PORT));
