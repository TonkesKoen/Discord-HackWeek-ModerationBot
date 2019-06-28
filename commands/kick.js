const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
            let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if (!kUser) return message.channel.send("Can't find user!");
            let kReason = args.join(" ").slice(22);
            if (!kReason) return message.channel.send('You did not include a reason for the kick.');
            if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You are not allowed to use this command!");
            if (kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("That person can't be kicked!");

            let kickEmbed = new discord.RichEmbed()
                .setDescription("~Kick~")
                .setColor("#e56b00")
                .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
                .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
                .addField("Kicked In", message.channel)
                .addField("Time", message.createdAt)
                .addField("Reason", kReason);

            let kickChannel = message.guild.channels.find(`name`, "incidents");
            if (!kickChannel) return message.channel.send("Can't find incidents channel.");


            await bot.users.get(kUser.id).send(`You have been kicked from ${message.guild.name} for the following reason: ${kReason}, if you do not agree with this kick please contact an administrator!`);
            message.guild.member(kUser).kick(kReason);
            kickChannel.send(kickEmbed);
            message.delete().catch(O_o => {
            });
}
module.exports.help = {
    name: "kick",
    description: "kicks a user from the server",
    usage: "kick [user] [reason]"
}

