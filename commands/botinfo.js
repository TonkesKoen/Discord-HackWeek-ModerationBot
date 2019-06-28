const discord = require("discord.js");
const botconfig = require('../botconfig.json');
const creator = botconfig.owner;
module.exports.run = async (bot, message, args) => {
            let boticon = bot.user.displayAvatarURL;
            let botembed = new discord.RichEmbed()
                .setDescription('Bot information')
                .setColor('#d4f107')
                .setThumbnail(boticon)
                .addField('Bot Name', bot.user.username)
                .addField('Bot created at', bot.user.createdAt)
                .addField('Owner', creator);

            return message.channel.send(botembed);
}
module.exports.help = {
    name: "botinfo",
    description: "shows the info about the bot",
    usage: "botinfo"
}
