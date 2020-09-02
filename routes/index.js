let express = require('express');
let discord = require("../src/discord.js");

let router = express.Router();

router.post("/", (req, res) => {
  if (req.body.on === true){
    discord.updateName("foxon")
  } else {
    discord.updateName("foxoff")
  }
  res.json({success : true})
});

router.options("/", async (req, res) => {
  res.json({name: await discord.getName()});
});


module.exports = router;