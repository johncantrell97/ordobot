const db = require("../../database/index");

module.exports = {
  name: 'createvote',
  description: 'create a new team vote',
  args: 1,
  guildOnly: true,
  ownerOnly: true,
  mentionsRequired: 0,
  usage: "createVote(question)",
  execute: async (message, args) => {
    try {
      const question = args[0].trim();
      let visibleId;
      try { 
        visibleId = await db.createPoll(message.author.id, message.guild.id, question);
      } catch(e) {
        return message.reply("Failed to start the vote");
      }

      message.reply(`Successfully started a new vote with vote_id **${visibleId}**.  To cast your vote type ordo.castVote(${visibleId},yes|no)`);

    } catch(error) {
      console.error(error);
      message.reply('there was an error trying to execute that command!');
    }
  }
}
