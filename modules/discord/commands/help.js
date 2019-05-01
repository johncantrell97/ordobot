const prefix = process.env.DISCORD_BOT_PREFIX;

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	usage: 'ordo.help(command?)',
	execute(message, args) {
    try { 
      const data = [];
      const { commands } = message.client;

      if(args[0] === ""){
        args = [];
      }

      if (!args.length) {
        data.push('Here\'s a list of all my commands:');
        data.push(commands.map(command => command.name).join(', '));
        data.push(`\nYou can send \`${prefix}help(command)\` to get info on a specific command!`);

        return message.author.send(data, { split: true })
          .then(() => {
            if (message.channel.type === 'dm') return;
            message.reply('I\'ve sent you a DM with all my commands!');
          })
          .catch(error => {
            console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
            message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
          }); 
      }

      const name = args[0].toLowerCase();
      const command = commands.get(name);

      if (!command) {
        return message.reply('that\'s not a valid command!');
      }

      data.push(`**Name:** ${command.name}`);
      if (command.description) data.push(`**Description:** ${command.description}`);
      if (command.usage) data.push(`**Usage:** ${command.usage}`);
      message.channel.send(data, { split: true });
    } catch(error) {
      console.error(error);
      message.reply('there was an error trying to execute that command!');
    }
  }
};
