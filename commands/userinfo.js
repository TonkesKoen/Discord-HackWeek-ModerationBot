const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!args[0])
    {
        user = message.member;
    }
    let usericon = user.user.avatarURL;
            let userembed = new discord.RichEmbed()
                .setDescription('user information')
                .setColor('#de02f1')
                .setThumbnail(usericon)
                .addField('Username', user.user.username)
                .addField('User joined at', user.joinedAt);

            return message.channel.send(userembed);
}
module.exports.help = {
    name: "userinfo",
    description: "shows the info about you or another user",
    usage: "userinfo or userinfo [user]"
}
