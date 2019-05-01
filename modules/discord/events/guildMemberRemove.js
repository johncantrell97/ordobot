const { ensureMember } = require("../helpers/index");
const db = require("../../database/index");

module.exports = (member) => {
  ensureMember(member)
  .then(() => {
    db.updateMember(member.user.id, member.guild.id, member.displayName, false);
  });
}
