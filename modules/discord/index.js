const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const eventHandlers = require("./events/index");

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./modules/discord/commands").filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', eventHandlers.message);
client.on('guildCreate', eventHandlers.guildCreate);
client.on('guildDelete', eventHandlers.guildDelete);
client.on('guildMemberAdd', eventHandlers.guildMemberAdd);
client.on('guildMemberRemove', eventHandlers.guildMemberRemove);
client.on('guildUpdate', eventHandlers.guildUpdate);
client.on('guildMemberUpdate', eventHandlers.guildMemberUpdate);
client.on('userUpdate', eventHandlers.userUpdate);

module.exports = {
  login: () => {
    client.login(process.env.DISCORD_BOT_TOKEN);
  },
  broadcastMessage: (message, channelName) => {
    client.channels.forEach((channel) => {
      if(channel.name === channelName){
        channel.send(message);
      }
    });
  }
};
