const router = require("express").Router();
const home = require("./home");
const askGPT = require("./askGpt");
const joke = require("./jokeGPT");

router.use("/", home);
router.use("/askgpt", askGPT);
router.use("/joke", joke);

module.exports = router;
