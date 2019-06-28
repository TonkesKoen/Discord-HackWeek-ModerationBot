const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
        let servericon = message.guild.displayAvatarURL;
            let serverembed = new discord.RichEmbed()
                .setDescription('Server information')
                .setColor('#0032f1')
                .setThumbnail(servericon)
                .addField('Server Name', message.guild.name)
                .addField('Server created at', message.guild.createdAt)
                .addField('You joined at', message.member.joinedAt)
                .addField("Total Members", message.guild.memberCount);


            return message.channel.send(serverembed);
}
module.exports.help = {
    name: "serverinfo",
    description: "shows the info about the server",
    usage: "serverinfo "
}
