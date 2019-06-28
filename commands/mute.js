const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let to_mute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            let mute_Role = message.guild.roles.find(`name`, "muted");
    if (to_mute.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Can't mute them!");
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("You are not allowed to use this command!")
    let Reason = args[1];
    if (!Reason) return message.channel.send('You did not include a reason for the permanent mute.');
            //start of create role
            if (!mute_Role) {
                try {
                    mute_Role = await message.guild.createRole({
                        name: "muted",
                        color: "#bc0000",
                        permissions: []
                    })
                    message.guild.channels.forEach(async (channel, id) => {
                        await channel.overwritePermissions(mute_Role, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false
                        });
                    });
                } catch (e) {
                    console.log(e.stack);
                }
            }
            if(!to_mute.roles.find(r => r.name === "muted"))
            {
                await (to_mute.addRole(mute_Role.id));
                message.channel.send(`<@${to_mute.id}> has been permanently muted for the following reason: ${Reason} `);
                await bot.users.get(to_mute.id).send(`You have been permanently muted on ${message.guild.name} for the following reason ${Reason}. If you dont agree with this mute then contact an administrator of that server`);
            }
            else
            {
                message.channel.send('This user is already muted')
            }

}
module.exports.help = {
    name: "mute",
    description: "permanently mutes a user",
    usage: "mute  [user] [reason]"
}
