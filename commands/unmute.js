const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
            let toUnmute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            let mute_role = message.guild.roles.find(`name`, "muted");
            if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("You are not allowed to use this command!");
    if(toUnmute.roles.find(r => r.name === "muted")) {
        toUnmute.removeRole(mute_role.id);
        message.channel.send(`<@${toUnmute.id}> has been unmuted!`);
    }
    else
    {
        message.channel.send(`<@${toUnmute.id}> is already unmuted!`);
    }
}
module.exports.help = {
    name: "unmute",
    description: "unmutes a user",
    usage: "unmute [user] "
}
