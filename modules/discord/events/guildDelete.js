const db = require("../../database/index");

module.exports = (guild) => {
  db.updateGuild(guild.id, guild.name, false, guild.ownerId); 
}
