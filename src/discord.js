let Discord = require("discord.js");
require('dotenv').config()

let bot = new Discord.Client();

bot.on('ready', () => {
    console.log('FoxSwitch Discord Bot Connected');
    bot.user.setActivity("FoxSwitch.link", {
        type: 'PLAYING'
    })
    updateName()
})

bot.on('error', e => {
  console.log(e);
});


function updateName(){
  bot.users.fetch("260956223132794881").then((res1) => {
    bot.guilds.fetch("726932810459512843").then((res) => {
      res.member(res1).setNickname("foxup")
    })
  })
}

bot.login(token)



module.exports = {
  updateName
}