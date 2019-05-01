const db = require("../../database/index");
const { buildTableResponse } = require("../helpers/index");

const buildKeysResponse = (keys) => {
  return buildTableResponse(keys, ["Id","Number","User","Percentage"], ["visible_id","number","display_name","ownership"], "keys");
}

module.exports = {
  name: 'showkeys',
  description: 'see which keys have been proven',
  args: 0,
  guildOnly: true,
  usage: "showKeys(@optionalUser)",
  execute: async (message, args) => {
    try {
      if(args[0] === ""){
        args = [];
      }
      let keys;

      if(args.length == 0){
        keys = await db.getKeysForGuild(message.guild.id);
      } else {
        const taggedUser = message.mentions.users.first();
        if(!taggedUser){
          return message.reply("The only valid argument is a tagged user");
        }
        keys = await db.getKeysForMember(message.guild.id, taggedUser.id);
      }

      message.channel.send(buildKeysResponse(keys));
    } catch(error) {
      console.error(error);
      message.reply('there was an error trying to execute that command!');
    }
  }
}
