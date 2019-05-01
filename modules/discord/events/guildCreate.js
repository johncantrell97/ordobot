const db = require('../../database/index');
const { ensureMember, ensureGuild } = require("../helpers/index");

const ensureMembers = (guild) => {
  guild.fetchMembers()
  .then(({ members }) => {
    for(const [memberId, member] of members) {
      ensureMember(member);
    }
  })
  .catch((error) => {
    console.log("failed to fetch members from guild");
    console.log(error);
  });
};

// emitted whenever the bot joins a guild
module.exports = (guild) => {
  ensureGuild(guild)
  .then(() => {
    return db.removeAllMembersFromGuild(guild.id);
  })
  .then(() => {
    return ensureMembers(guild);
  })
  .catch((error) => {
    console.log("failed to ensure guild");
    console.log(error);
  });
};
