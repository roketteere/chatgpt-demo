const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

async function go() {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Hello world" }],
  });
  console.log(completion.data.choices[0].message);
}
go();

// 
// const OpenAPI = require("openai");
// const openAIConfig = new OpenAPI.Configuration({
//   organization: process.env.ORG_ID,
//   apiKey: process.env.API_KEY,
// });

// const openai = new OpenAPI.OpenAIApi(openAIConfig);
// async function goo() {
//   const response = await openai.listModels();
//   return response;
// }

// async function moo() {
//   goo().then((res) => {
//     const data = res.data.data;
//     console.log("res", data);
//   });
// }
// const url = `https://api.openai.com/v1/chat/completions`;
// 