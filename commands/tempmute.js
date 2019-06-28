const discord = require("discord.js");
const ms = require("millisecond");

module.exports.run = async (bot, message, args) => {
            let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if (!tomute) return message.channel.send("Couldn't find user.");
            if (tomute.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Can't mute them!");
            if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("You are not allowed to use this command!");
            let muterole = message.guild.roles.find(`name`, "muted");
            //start of create role
            if (!muterole) {
                try {
                    muterole = await message.guild.createRole({
                        name: "muted",
                        color: "#bc0000",
                        permissions: []
                    })
                    message.guild.channels.forEach(async (channel, id) => {
                        await channel.overwritePermissions(muterole, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false
                        });
                    });
                } catch (e) {
                    console.log(e.stack);
                }
            }
            //end of create role
            let mutetime = args[1];
            console.log(args[1]);
            if (!mutetime) return message.reply("You didn't specify a time!");
    let Reason = args[2];
    if (!Reason) return message.channel.send('You did not include a reason for the mute.');
    if(!tomute.roles.find(r => r.name === "muted")){
        await (tomute.addRole(muterole.id));
        message.channel.send(`<@${tomute.id}> has been muted for ${ms(ms(mutetime) / 1000)} second(s) for this reason: ${Reason}`);


        setTimeout(function () {
            if(tomute.roles.find(r => r.name === "muted"))
            {
                tomute.removeRole(muterole.id);
                message.channel.send(`<@${tomute.id}> has been unmuted!`);
            }

        }, ms(mutetime));
    }
    else
    {
        message.channel.send('This user is already muted')
    }

}
module.exports.help = {
    name: "tempmute",
    description: "temporarily mutes a user",
    usage: "tempmute [user] [time] [reason]"
}
