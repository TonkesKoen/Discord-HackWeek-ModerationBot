const discord = require('discord.js');
const botconfig = require('./botconfig.json');
const bot = new discord.Client({disableEveryone: true});
const token = botconfig.token;

const fs = require('fs');
bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

bot.on('ready', async () => {
    console.log('this bot is online!');
    console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
    bot.user.setActivity("Administrating", {type: "PLAYING"});
    // bot.user.setGame('surfing on the internet');
})

bot.on('message', async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    //
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);

    // switch (cmd) {
    //     case `${prefix}help`:
    //         message.channel.sendMessage('These are the following commands: !ping,!help, !clear, !bigoof,!botinfo,!serverinfo,!userinfo,!mute');
    //         break;
    //     case `${prefix}clear`:
    //         if (!args[0]) return message.reply('Error please define a second argument');
    //         message.channel.bulkDelete(args[0]);
    //         break;
    //     case `${prefix}botinfo`:
    //         let boticon = bot.user.displayAvatarURL;
    //         let botembed = new discord.RichEmbed()
    //             .setDescription('Bot information')
    //             .setColor('#d4f107')
    //             .setThumbnail(boticon)
    //             .addField('Bot Name', bot.user.username)
    //             .addField('Bot created at', bot.user.createdAt);
    //
    //         return message.channel.send(botembed);
    //
    //     case `${prefix}serverinfo`:
    //         let servericon = message.guild.displayAvatarURL;
    //         let serverembed = new discord.RichEmbed()
    //             .setDescription('Server information')
    //             .setColor('#0032f1')
    //             .setThumbnail(servericon)
    //             .addField('Server Name', message.guild.name)
    //             .addField('Server created at', message.guild.createdAt)
    //             .addField('User joined at', message.member.joinedAt);
    //
    //         return message.channel.send(serverembed);
    //         break;
    //     case `${prefix}userinfo`:
    //         let usericon = message.member.user.avatarURL;
    //         let userembed = new discord.RichEmbed()
    //             .setDescription('user information')
    //             .setColor('#de02f1')
    //             .setThumbnail(usericon)
    //             .addField('Username', message.member.user.username)
    //             .addField('User joined at', message.member.joinedAt);
    //
    //         return message.channel.send(userembed);
    //         break;
    //
    //     case `${prefix}tempmute`:
    //         let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    //         if (!tomute) return message.channel.send("Couldn't find user.");
    //         if (tomute.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Can't mute them!");
    //         if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("No can do pal!");
    //         let muterole = message.guild.roles.find(`name`, "muted");
    //         //start of create role
    //         if (!muterole) {
    //             try {
    //                 muterole = await message.guild.createRole({
    //                     name: "muted",
    //                     color: "#bc0000",
    //                     permissions: []
    //                 })
    //                 message.guild.channels.forEach(async (channel, id) => {
    //                     await channel.overwritePermissions(muterole, {
    //                         SEND_MESSAGES: false,
    //                         ADD_REACTIONS: false
    //                     });
    //                 });
    //             } catch (e) {
    //                 console.log(e.stack);
    //             }
    //         }
    //         //end of create role
    //         let mutetime = args[1];
    //         if (!mutetime) return message.reply("You didn't specify a time!");
    //
    //         await (tomute.addRole(muterole.id));
    //         message.channel.send(`<@${tomute.id}> has been muted for ${ms(ms(mutetime) / 1000)} second(s)`);
    //
    //
    //         setTimeout(function () {
    //             tomute.removeRole(muterole.id);
    //             message.channel.send(`<@${tomute.id}> has been unmuted!`);
    //         }, ms(mutetime));
    //
    //         return;
    //     case `${prefix}unmute`:
    //         let toUnmute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    //         let mute_role = message.guild.roles.find(`name`, "muted");
    //         if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("No can do pal!");
    //         toUnmute.removeRole(mute_role.id);
    //         message.channel.send(`<@${toUnmute.id}> has been unmuted!`);
    //         return;
    //     case `${prefix}mute`:
    //         let to_mute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    //         let mute_Role = message.guild.roles.find(`name`, "muted");
    //
    //         //start of create role
    //         if (!mute_Role) {
    //             try {
    //                 mute_Role = await message.guild.createRole({
    //                     name: "muted",
    //                     color: "#bc0000",
    //                     permissions: []
    //                 })
    //                 message.guild.channels.forEach(async (channel, id) => {
    //                     await channel.overwritePermissions(mute_Role, {
    //                         SEND_MESSAGES: false,
    //                         ADD_REACTIONS: false
    //                     });
    //                 });
    //             } catch (e) {
    //                 console.log(e.stack);
    //             }
    //         }
    //         await (to_mute.addRole(mute_Role.id));
    //         message.channel.send(`<@${to_mute.id}> has been muted `);
    //         await bot.users.get(to_mute.id).send(`You have been muted on this server. If you dont agree with this mute then contact an administrator`);
    //         return;
    //     case `${prefix}report`:
// let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get[args[0]]);
    // if (!rUser) return message.channel.send('Could not find this user.');
    // let rreason = args.join(" ").slice(22);
    // if (!rreason) return message.channel.send('You did not include a reason for the report.');
    // let reportEmbed = new discord.RichEmbed()
    //     .setDescription("Reports")
    //     .setColor("#15f153")
    //     .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    //     .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    //     .addField("Channel", message.channel)
    //     .addField("Time", message.createdAt)
    //     .addField("Reason", rreason);
    //
    // let reportschannel = message.guild.channels.find(`name`, "reports");
    // if (!reportschannel) return message.channel.send("Couldn't find reports channel.");
    //
    //
    // message.delete().catch(O_o => {
    // });
    // reportschannel.send(reportEmbed);
    //return;
    //     case `${prefix}kick`:
    //         let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    //         if (!kUser) return message.channel.send("Can't find user!");
    //         let kReason = args.join(" ").slice(22);
    //         if (!kReason) return message.channel.send('You did not include a reason for the kick.');
    //         if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("No can do pal!");
    //         if (kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("That person can't be kicked!");
    //
    //         let kickEmbed = new discord.RichEmbed()
    //             .setDescription("~Kick~")
    //             .setColor("#e56b00")
    //             .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    //             .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    //             .addField("Kicked In", message.channel)
    //             .addField("Time", message.createdAt)
    //             .addField("Reason", kReason);
    //
    //         let kickChannel = message.guild.channels.find(`name`, "incidents");
    //         if (!kickChannel) return message.channel.send("Can't find incidents channel.");
    //
    //
    //         await bot.users.get(kUser.id).send(`You have been kicked for the following reason: ${kReason}`);
    //         message.guild.member(kUser).kick(kReason);
    //         kickChannel.send(kickEmbed);
    //         message.delete().catch(O_o => {
    //         });
    //         return;
    //     case `${prefix}ban`:
    //         let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    //         if (!bUser) return message.channel.send("Can't find user!");
    //         let bReason = args.join(" ").slice(22);
    //         if (!bReason) return message.channel.send('You did not include a reason for the ban.');
    //         if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("No can do pal!");
    //         if (bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("That person can't be banned!");
    //
    //         let banEmbed = new discord.RichEmbed()
    //             .setDescription("~Ban~")
    //             .setColor("#bc0000")
    //             .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    //             .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    //             .addField("Banned In", message.channel)
    //             .addField("Time", message.createdAt)
    //             .addField("Reason", bReason);
    //
    //         let banChannel = message.guild.channels.find(`name`, "incidents");
    //         if (!banChannel) return message.channel.send("Can't find incidents channel.");
    //
    //
    //         await bot.users.get(bUser.id).send(`You have been banned for the following reason: ${bReason}`);
    //         message.guild.member(bUser).ban(bReason);
    //         banChannel.send(banEmbed);
    //         message.delete().catch(O_o => {
    //         });
    //         return;
    //     case `${prefix}unban`:
    //         let ubUser = args[0];
    //         if (!ubUser) return message.channel.send("Can't find user!");
    //         let ubReason = args.join(" ").slice(22);
    //         if (!ubReason) return message.channel.send('You did not include a reason for the unban.');
    //         if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No can do pal!");
    //         let ubanEmbed = new discord.RichEmbed()
    //             .setDescription("~Unban~")
    //             .setColor("#00ff00")
    //             .addField("Unbanned User", `${ubUser} with ID ${ubUser}`)
    //             .addField("Unbanned By", `<@${message.author.id}> with ID ${message.author.id}`)
    //             .addField("Unbanned In", message.channel)
    //             .addField("Time", message.createdAt)
    //             .addField("Reason", ubReason);
    //
    //         let unbanChannel = message.guild.channels.find(`name`, "incidents");
    //         if (!unbanChannel) return message.channel.send("Can't find incidents channel.");
    //
    //
    //         message.guild.unban(ubUser);
    //         unbanChannel.send(ubanEmbed);
    //         message.delete().catch(O_o => {
    //         });
    //         return;
    // }
})


bot.login(token);

