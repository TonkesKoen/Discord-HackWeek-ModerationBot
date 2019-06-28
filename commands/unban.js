const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
           let ubUser = await bot.fetchUser(args[0]);
            if (!ubUser) return message.channel.send("Can't find user!");
            let ubReason = args.slice(1).join(" ");
            if (!ubReason) return message.channel.send('You did not include a reason for the unban.');
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You are not allowed to use this command!");

            try {
                let unbanChannel = message.guild.channels.find(`name`, "incidents");
                if (!unbanChannel) return message.channel.send("Can't find incidents channel.");

                let ubanEmbed = new discord.RichEmbed()
                    .setDescription("~Unban~")
                    .setColor("#00ff00")
                    .addField("Unbanned User", `${ubUser.tag}`)
                    .addField("Unbanned By", `<@${message.author.id}> with ID ${message.author.id}`)
                    .addField("Unbanned In", message.channel)
                    .addField("Time", message.createdAt)
                    .addField("Reason", ubReason);

                if(!message.guild.member(ubUser))
                {
                    message.guild.unban(ubUser)
                    unbanChannel.send(ubanEmbed);
                    message.channel.send(`${ubUser.tag} has been unbanned`)

                }
                else
                {
                    message.channel.send(`This user is already unbanned`)
                        .then(msg => {
                            msg.delete(5000)
                        })
                }
                message.delete().catch(O_o => {
                });
            }
            catch (e) {

            }



}
module.exports.help = {
    name: "unban",
    description: "shows the info about the server",
    usage: "unban [id of the user] [reason]"
}
