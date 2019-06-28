const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
     let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get[args[0]]);
    if (!rUser) return message.channel.send('Could not find this user.');
    let rreason = args.join(" ").slice(22);
    if (!rreason) return message.channel.send('You did not include a reason for the report.');
    let reportEmbed = new discord.RichEmbed()
        .setDescription("Reports")
        .setColor("#15f153")
        .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
        .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
        .addField("Channel", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", rreason);

    let reportschannel = message.guild.channels.find(`name`, "reports");
    if (!reportschannel) return message.channel.send("Couldn't find reports channel.");


    message.delete().catch(O_o => {
    });
    reportschannel.send(reportEmbed);
}
module.exports.help = {
    name: "report",
    description: "report a user for an action",
    usage: "report [user] [reason]"
}
