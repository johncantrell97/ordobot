const db = require("../../database/index");
const { table } = require("table");

module.exports = {
  name: 'showresults',
  description: 'show the results of a team vote',
  args: 1,
  guildOnly: true,
  mentionsRequired: 0,
  usage: "showResults(vote_id)",
  execute: async (message, args) => {
    try { 
      const visibleId = args[0];
      let poll, responses, pollError = false;

      try {
        poll = await db.findPoll(visibleId);
      } catch(e) {
        pollError = e;
      }

      if(pollError || !poll){
        return message.reply("Failed to find a vote with that id");
      }

      try {
        responses = await db.getPollResponsesForPoll(message.guild.id, poll.id);
      } catch(e) {
        return message.reply("Failed to get vote results");
      }

      const tableData = [];
      const headers = ["Response", "Votes"];
      tableData.push(headers);
      const totalResponses = responses.length;
      const answerMap = {};
      responses.forEach((response) => {
        if(!answerMap[response.response]){
          answerMap[response.response] = 0;
        }
        answerMap[response.response] += 1;
      });

      for(const answer in answerMap){
        const votes = answerMap[answer];
        const pct = ((votes / totalResponses) * 100.0).toFixed(2);
        tableData.push([answer, votes + " (" + pct + "%)"]);
      }
      message.channel.send("```" + table(tableData) + "```");
      
    } catch(error) {
      console.error(error);
      message.reply('there was an error trying to execute that command!');
    }
  }
}
