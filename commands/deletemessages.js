const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
//The word that will be deleted
let badword = args[0];

let deletedmessages = message.channel.messages.filterArray(msg => {
        const badwords = msg.content.includes(badword) ;

        return  badwords;

    });

    if (!args[0]) return message.channel.send('Error please define a second argument');
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You are not allowed to use this command!");
    if (deletedmessages.length >= 1)
    {
        message.channel.bulkDelete(deletedmessages);
        message.channel.send(`${deletedmessages.length} message(s) have been deleted`)
            .then(msg => {
                msg.delete(5000)
            })

    }
    else
    {
        message.channel.send(`Could not find any messages containing this word`)
    }


}
module.exports.help = {
    name: "deletemessages",
    description: "clears all the messages containing this word",
    usage: "deletemessages [word] "
}
