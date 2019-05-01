const db = require("../../database/index");
const { buildTableResponse } = require("../helpers/index");

const buildContributionsResponse = (contributions) => {
  return buildTableResponse(contributions, ["Id","User","Reason","Points"], ["visible_id","display_name","reason","points"], "contributions");
}

module.exports = {
  name: 'showcontributions',
  description: 'see who has made contributions',
  args: 0,
  guildOnly: true,
  usage: "showContributions(@optionalUser)",
  execute: async (message, args) => {
    try {
      if(args[0] === ""){
        args = [];
      }

      let contributions;

      if(args.length == 0){
        contributions = await db.getContributionsForGuild(message.guild.id);
      } else {
        const taggedUser = message.mentions.users.first();
        if(!taggedUser){
          return message.reply("The only valid argument is a tagged user");
        }
        contributions = await db.getContributionsForMember(message.guild.id, taggedUser.id);
      }

      message.channel.send(buildContributionsResponse(contributions));
    } catch(error) {
      console.error(error);
      message.reply('there was an error trying to execute that command!');
    }
  }
}
