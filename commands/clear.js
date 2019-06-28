const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
            if (!args[0]) return message.reply('Error please define a second argument');
            if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You are not allowed to use this command!");
            message.channel.bulkDelete(args[0]);
}
module.exports.help = {
    name: "clear",
    description: "clears a number of messages in a channel",
    usage: "clear [ammount of messages] "
}
