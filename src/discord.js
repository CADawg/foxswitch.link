let Discord = require("discord.js")



let bot = new Discord.Client()

bot.on('ready', () => {
    console.log('Bot has started')
    bot.user.setActivity("Fox", {
        type: 'PLAYING'
    })
    updateName()
})

bot.on('error', e => {
  console.log(e)
})


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