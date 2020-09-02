let express = require('express');
let discord = require("../src/discord.js");

let router = express.Router();

router.post("/", async (req, res) => {
  if (req.body.on === true){
    let x = await discord.updateName("foxon")
  } else {
    let x = await discord.updateName("foxoff")
  }
  res.json({success : true})
});

router.options("/", async (req, res) => {
  res.json({name: await discord.getName()});
});


module.exports = router;