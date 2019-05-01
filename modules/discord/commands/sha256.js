const crypto = require('crypto');

module.exports = {
  name: 'sha256',
  description: 'calculates sha256 of the passed in argument',
  args: 1,
  usage: "sha256(value to hash)",
  execute: (message, args) => {
    try {
      const hexResult = crypto.createHash('sha256').update(args[0]).digest('hex');
      message.channel.send(hexResult);
    } catch(error) {
      console.error(error);
      message.reply('there was an error trying to execute that command!');
    }
  }
}
