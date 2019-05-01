const db = require("../../database/index");

module.exports = {
  name: 'removecontribution',
  description: 'remove a user contribution',
  args: 1,
  guildOnly: true,
  ownerOnly: true,
  mentionsRequired: 0,
  usage: "removeContribution(contribution_id)",
  execute: async (message, args) => {
    try {
      const contributionId = args[0].trim();

      let contribution;

      try {
        contribution = await db.destroyContribution(message.guild.id, contributionId);
      } catch(e) {
        return message.reply("Failed to remove contribution");
      }

      if(contribution.rowCount === 0){  
        message.reply("Could not find a contribution with that id");
      } else {
        message.reply("Contribution removed successfully");
      }
      
    } catch(error) {
      console.error(error);
      message.reply('there was an error trying to execute that command!');
    }
  }
}
