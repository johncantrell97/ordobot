const db = require("../../database/index");

module.exports = (oldGuild, newGuild) => {
  db.updateGuild(newGuild.id, newGuild.name, true, newGuild.ownerID);
}
