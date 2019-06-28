const discord = require("discord.js");
const fs = require("fs");
const ms = require("millisecond");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {
    let toWarn = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!toWarn) return message.channel.send("Can't find user!");
    let Reason = args.join(" ").slice(22);
    if (!Reason) return message.channel.send('You did not include a reason for the warning.');
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You are not allowed to exectue this command!");
    if(toWarn.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You cant warn this person");

   await bot.users.get(toWarn.id).send(`You have been warned on ${message.guild.name} for the following reason: ${Reason}`);

    if (!warns[toWarn.id]) warns[toWarn.id] = {
        warns: 0
    };

    warns[toWarn.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err)
    });

    // let usericon = toWarn.avatarURL;
    let warnEmbed = new discord.RichEmbed()
        .setDescription(`~Warning for ${toWarn.user.username}~`)
        .setColor("#00ff00")
        .addField("Warned In", message.channel)
        .addField("Number of Warnings", warns[toWarn.id].warns)
        .addField("Reason for warning", Reason);


    message.channel.send(warnEmbed);





    message.delete().catch(O_o => {
    });

    

}
module.exports.help = {
    name: "warn",
    description: "warns a user for a specific reason",
    usage: "!warn [user] [reason]"
}
