let Discord = require("discord.js")



let bot = new Discord.Client()

bot.on('ready', () => {
    console.log('Bot has started')
    bot.user.setActivity("Fox", {
        type: 'PLAYING'
    })
})

bot.on('error', e => {
  console.log(e)
})


bot.login(token)
