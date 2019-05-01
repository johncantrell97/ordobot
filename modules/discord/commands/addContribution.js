const db = require("../../database/index");

module.exports = {
  name: 'addcontribution',
  description: 'record a new user contribution',
  args: 3,
  guildOnly: true,
  mentionsRequired: 1,
  ownerOnly: true,
  usage: "addContribution(@user,reason,points,details?)",
  execute: async (message, args) => {
    try {
      const taggedUser = message.mentions.users.first();
      const reason = args[1].trim();
      const points = parseInt(args[2].trim());
      const details = args[3];
      const approvalType = "admin";

      if(points === NaN){
        message.reply("Points need to be a number");
        return;
      }

      try {
        await db.createContribution(taggedUser.id, message.guild.id, points, reason, details, approvalType);
      } catch(e) {
        return message.reply("Failed to add contribution");
      }
      
      message.reply("Contribution added successfully");
    } catch(error) {
      console.error(error);
      message.reply('there was an error trying to execute that command!');
    }
  }
}
