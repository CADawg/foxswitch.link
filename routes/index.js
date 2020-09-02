let express = require('express')
let discord = require("../src/discord.js")

let router = express.Router()


router.options("/", async(req, res) => {
  let name = await discord.getName()
  res.json({name : name})
})

router.post((req, res) => {
  if (req.body.on === true){
    discord.updateName("foxoff")
  } else {
    discord.updateName("foxon")
  }
  res.json({success : true})
})

module.exports = router