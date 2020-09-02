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

let name = ""

function updateName(nickname) {
  return new Promise((resolve, reject) => {
    bot.users.fetch("260956223132794881").then((res1) => {
      bot.guilds.fetch("726932810459512843").then((res) => {
        res.member(res1).setNickname(nickname)
        resolve(true)
      }).catch((err) => {
        reject(err)
      })
    }).catch((err) => {
      reject(err)
    })
  })
}

async function getName() {
  return new Promise((resolve, reject) => {
    bot.users.fetch("260956223132794881").then((res1) => {
      bot.guilds.fetch("726932810459512843").then((res) => {
       resolve(res.member(res1).displayName)
      })
    })
  })
}

// function updateSavedName() {
//   bot.users.fetch("260956223132794881").then((res1) => {
//     bot.guilds.fetch("726932810459512843").then((res) => {
//       name = res.member(res1).displayName
//     })
//   })
// }

// setInterval(() => {
//   updateSavedName()
// }, 1000)

bot.login(discordToken)

module.exports = {
  updateName,
  getName
}