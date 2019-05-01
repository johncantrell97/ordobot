const db = require("../../database/index");

module.exports = {
  name: 'closevote',
  description: 'close a team vote, no new responses will be accepted',
  args: 1,
  guildOnly: true,
  ownerOnly: true,
  mentionsRequired: 0,
  usage: "closeVote(vote_id)",
  execute: async (message, args) => {
    try {
      const visibleId = args[0].trim();
      let poll, pollError = false;

      try{
        poll = await db.findPoll(visibleId);
      } catch(e) {
        pollError = e;
      }

      if(pollError || !poll){
        return message.reply("Could not find a poll with that id");
      }

      try {
        await db.closePoll(message.guild.id, visibleId);
      } catch(e) {
        return message.reply("Failed to close the vote");
      }

      message.reply(`Successfully closed the vote.  To see the results type ordo.showResults(${visibleId})`);
    } catch(error) {
      console.error(error);
      message.reply('there was an error trying to execute that command!');
    }
  }
}
