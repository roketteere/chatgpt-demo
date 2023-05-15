const gtpInput = document.getElementById("gpt-input");
const gptButton = document.getElementById("gpt-button");
const gptResponse = document.getElementById("gpt-response");

async function askGPT(prompt) {
  //   console.log(prompt);

  const request = await fetch("/askgpt", {
    method: "POST",
    body: prompt,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = request.json();
  console.log(JSON.stringify(res));

  return res;
}

// askGPT("How old is the sun?");

function makeJSON(ingredients) {
  const cooking = {
    prompt: ingredients,
  };
  return JSON.stringify(cooking);
}
const question = makeJSON("How old is the sun?");

// console.log(makeJSON("How old is the universe?"));

gtpInput.addEventListener("keypress", (event) => {
  if (event.key === "ENTER") {
    console.log("ENTER PRESS");
  }
});

gptButton.addEventListener("click", (event) => {
  event.target;
  const question = document.getElementById("gpt-input").value;
  //   const reply = await askGPT(question);
  const reply = question;
  const prompt = makeJSON(reply);
  //   gtpInput.innerText = "";
  //   gptResponse.innerText = makeJSON(reply);
  askGPT(prompt).then((res) => {
    gptResponse.innerText = res;
    console.log("REsponnnseee: ", res);
  });
});
