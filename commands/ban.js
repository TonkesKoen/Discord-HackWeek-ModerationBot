const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
            let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if (!bUser) return message.channel.send("Can't find user!");
            let bReason = args.join(" ").slice(22);
            if (!bReason) return message.channel.send('You did not include a reason for the ban.');
            if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You are not allowed to use this command!");
            if (bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("That person can't be banned!");

            let banEmbed = new discord.RichEmbed()
                .setDescription("~Ban~")
                .setColor("#bc0000")
                .addField("Banned User", `${bUser} with ID ${bUser.id}`)
                .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
                .addField("Banned In", message.channel)
                .addField("Time", message.createdAt)
                .addField("Reason", bReason);

            let banChannel = message.guild.channels.find(`name`, "incidents");
            if (!banChannel) return message.channel.send("Can't find incidents channel.");


                await bot.users.get(bUser.id).send(`You have been banned from ${message.guild.name} for the following reason: ${bReason}`);
                message.guild.member(bUser).ban(bReason);
                banChannel.send(banEmbed);
                message.delete().catch(O_o => {
                });



}
module.exports.help = {
    name: "ban",
    description: "bans a user",
    usage: "ban [user] [reason]"
}
