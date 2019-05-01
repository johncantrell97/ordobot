const db = require("../../database/index");

module.exports = {
  name: 'castvote',
  description: 'cast a vote for a team vote',
  args: 2,
  guildOnly: false,
  mentionsRequired: 0,
  usage: "castVote(vote_id,yes|no)",
  execute: async (message, args) => {
    try {
      const pollId = args[0].trim();
      const response = args[1].trim();

      if(response !== "yes" && response !== "no"){
        message.reply("You can only vote yes or no");
        return;
      }

      let poll, member, pollError = false, memberError = false;

      try {
        poll = await db.findPoll(pollId);
      } catch(e) {
        pollError = e;
      }

      if(pollError || !poll) {
        return message.reply("Failed to find a vote with that id");
      }

      if(!poll.open){
        return message.reply("This poll has already closed");
      }

      try {
        member = await db.findMember(message.author.id, poll.guild_id);
      } catch(e) {
        memberError = e;
      }

      if(memberError || !member){
        return message.reply("You are not allowed to vote on this team vote");
      }

      try {
        await db.createPollResponse(message.author.id, poll.guild_id, poll.id, response);
      } catch(e) {
        return message.reply("Failed to cast your vote");
      }

      message.reply("Successfully recorded your vote");

    } catch(error) {
      console.error(error);
      message.reply('there was an error trying to execute that command!');
    }
  }
}
