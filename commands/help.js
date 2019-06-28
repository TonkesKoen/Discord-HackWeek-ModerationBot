const discord = require("discord.js");
const botconfig = require('../botconfig.json');
module.exports.run = async (bot, message, args) => {
    let botembed = new discord.RichEmbed()
        .setColor('#546005')
        .addField('UserCommands', '!botinfo,!userinfo,!serverinfo,!report [user] [reason]')
        .addField('Admin Commands', '!deletemessages [word],!warn [user] [reason],!warnlevel [user], !mute [user] [reason], !kick [user] [reason], !ban [user] [reason], !tempmute [user] [time] [reason], !unban [userid] [reason],!clear [amount of messages]')

    return message.channel.send(botembed);
}
module.exports.help = {
    name: "help",
    description: "shows info about all the commands",
    usage: "help "
}
