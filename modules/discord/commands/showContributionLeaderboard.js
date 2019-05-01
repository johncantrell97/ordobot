const db = require("../../database/index");
const { table } = require("table");

module.exports = {
  name: 'showcontributionleaderboard',
  description: 'see contribution standings for the team',
  args: 0,
  guildOnly: true,
  usage: "showContributionLeaderboard()",
  execute: async (message, args) => {
    let contributions;

    try {
      contributions = await db.getContributionLeaderboard(message.guild.id);
    } catch(error) {
      console.error(error);
      return message.reply('there was an error trying to execute that command!');
    }

    if(contributions.length > 0){
      const tableData = [];
      const headers = ["Rank","User","Points"];
      tableData.push(headers);

      let rank = 1;
      contributions.forEach((contribution) => {
        tableData.push([rank, contribution.display_name, contribution.total_points]);
        rank += 1;
      });

      message.channel.send("```" + table(tableData) + "```");
    } else {
      message.channel.send("No contributions have been made yet");
    }
  }
}
