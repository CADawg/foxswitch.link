let Discord = require("discord.js");
require('dotenv').config()

let bot = new Discord.Client();

bot.on('ready', () => {
    console.log('FoxSwitch Discord Bot Connected');
    bot.user.setActivity("FoxSwitch.link", {
        type: 'PLAYING'
    });
});

bot.on('error', e => {
  console.log(e);
});


bot.login(process.env.DISCORD_TOKEN);
