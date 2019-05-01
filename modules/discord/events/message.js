const prefix = process.env.DISCORD_BOT_PREFIX;

module.exports = (message) => {
  if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;
  const messageParts = message.content.match(/ordo\.(.*)\((.*)\)/i);
  if (!messageParts){
    message.reply("sorry, your request is malformed. Please format your request like this: ordo.command(arg1,arg2)");
    return;
  }
  try {
    const commandName = messageParts[1].toLowerCase().trim();
    const args = messageParts[2].split(",");

    const commands = message.client.commands;

    if (!commands.has(commandName)){
      message.reply(`sorry, I don't know the command '${commandName}'`);
      return;
    }

    const command = commands.get(commandName)

    if(args.length < command.args){
      message.reply(`looks like you are missing some arguments, please use this command like this: ${command.usage}`);
      return;
    }

    if(command.guildOnly && !message.guild){
      message.reply(`This command cannot be used in a DM, you must use it in a channel`);
      return;
    }

    if(command.mentionsRequired && command.mentionsRequired > 0){
      const mentions = message.mentions.users.array().length;
      if(mentions < command.mentionsRequired){
        message.reply(`This command requires you to mention at least ${command.mentionsRequired} users.`);
        return;
      }
    }

    if(command.ownerOnly && message.author.id !== message.guild.ownerID){
      message.reply(`Only the owner of this server can run that command`);
      return;
    }
    command.execute(message, args);
  } catch(error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
}
