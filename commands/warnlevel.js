const Discord = require("discord.js");
const fs = require("fs");
const ms = require("millisecond");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {



    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You are not allowed to use this command.");
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!wUser) return message.reply("Could not find this user");

    if(!warns[wUser.id]) var warnlevel = 0;
    else var warnlevel = warns[wUser.id].warns;

    message.channel.send(`<@${wUser.id}> has ${warnlevel} warnings.`);

}

module.exports.help = {
    name: "warnlevel",
    description: "shows the warnlevel of a user",
    usage: "warnlevel [user]"
}
