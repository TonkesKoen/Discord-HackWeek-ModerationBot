# Discord-HackWeek-ModerationBot
This is my first discord bot i ever made.


This Discord-ModerationBot is a simple moderation bot made for the hackweek by DutchCrazyGamer.

# How to setup
You need node.js for this project. To install all the packages type the command ```npm install ``` in the terminal of your folder. You can run this program in two ways. If you don't want to make changes just run the command ```node .```, this starts your bot. The other way to do this is with nodemon: https://nodemon.io/. You do this by running the commmand ``` nodemon index.js```. Your bot now automaticly restarts when you make changes to the code.

#prefix of the commands
The current prefix right now is ```!```, however other prefixes work as well.
# User Commands

The user can execute a few commands. Below here you can find some examples of those.

```!botinfo``` This command shows the information about the bot (if you set your token and owner in the ```botconfig.json``` file then this command will show the botinfo you set for your bot)

```!userinfo``` This command will show the info about you.

```!userinfo @johndoe#9999``` This command will show you the info about the mention user. (Name, the date of joining the server and the avatar of the user)

```!serverinfo``` This command will show you the info about the server you are currently on.

```!report @johndoe#9999 racism``` This command will send a report to the #report channel (only people with moderating permissions can see this, you can change this if you want)

```!help``` This command shows all the commands.

```!warnlevel @johndoe#9999``` This command shows the number of warnings for a user.

# Moderator/Administrator commands

The Administrator has the most commands. Below here you can find some examples of those commands.

```!kick @johndoe#9999 spam``` This command kicks the user from the server. There will be an embed posted in the #incidents channel. The bot will send a PM to the kicked user containing the reason for the kick.

```!ban @johndoe#9999 spam``` This command bans the user from the server.  There will be an embed posted in the #incidents channel. The bot will send a PM to the banned user containing the reason for the ban.

```!unban @johndoe#9999 sorry``` This command unbans the user from the server.  There will be an embed posted in the #incidents channel.(Somehow you cant acces the banned user so he has to find an invite link himself somehow)

```!tempmute @johndoe#9999 1min spam``` This command temporarily mutes the user on the server after a period of time the mute role will be removed.

```!warn @johndoe#9999 spam``` This command warns the user and the bot sends him a DM.

```!clear 5``` This command deletes the last 5 messages.(including the command message)

```!deletemessages dumb``` This command deletes all the messages containing the word (in this case dumb). (This might be a little buggy somehow).

```!mute @johndoe#9999 spam``` This command permanenlty mutes the user. The user can contact the owner if he does not agree with it.

```!unmute @johndoe#9999``` This command will unmute the mentioned user.

# Creator of the bot
I (DutchCrazyGamer) am the only creator of this bot. Some code came from tutorials.
