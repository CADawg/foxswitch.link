require('dotenv').config()
let Discord = require("discord.js")
let bot = new Discord.Client()

let discordToken = process.env.DISCORD_TOKEN

bot.on('ready', () => {
    console.log('Bot has started')
})

bot.on('error', e => {
  console.log(e);
});


function updateName(nickname){
  bot.users.fetch("260956223132794881").then((res1) => {
    bot.guilds.fetch("726932810459512843").then((res) => {
      res.member(res1).setNickname(nickname)
    })
  })
}

async function getName(){
  return new Promise((resolve, reject) => {
    bot.users.fetch("260956223132794881").then((res1) => {
      bot.guilds.fetch("726932810459512843").then((res) => {
        resolve(res.member(res1).displayName)
      }).catch((err) => {
        reject(err)
      })
    }).catch((err) => {
      reject(err)
    })
  })
}

bot.login(discordToken)

module.exports = {
  updateName,
  getName
}