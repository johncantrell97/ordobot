const db = require("../../database/index");
const { buildTableResponse } = require("../helpers/index");

const buildPollsResponse = (polls) => {
  return buildTableResponse(polls, ["Id","User","Question","Open?"], ["visible_id","display_name","question","open"], "team votes");
};

module.exports = {
  name: 'showvotes',
  description: 'see all of the team votes',
  args: 0,
  guildOnly: true,
  usage: "showVotes()",
  execute: async (message, args) => {
    try {
      const polls = await db.getPollsForGuild(message.guild.id);
      message.channel.send(buildPollsResponse(polls));
    } catch(error) {
      console.error(error);
      message.reply('there was an error trying to execute that command!');
    }
  }
}
