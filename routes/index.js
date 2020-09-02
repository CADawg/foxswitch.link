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

router.options("/", (req, res) => {
  res.json({name: discord.getName()});
});


module.exports = router;