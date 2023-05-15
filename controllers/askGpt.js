const router = require("express").Router();



router.post("/", async (req, res) => {
  let prompt = req.body.prompt;
  // console.log("\n=============\nPROMPT " + prompt);
  try {
    const gptResponse = await go(prompt);
    // console.log(prompt, "\n", gptResponse);
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

// go("How old is the earth?")

module.exports = router;
