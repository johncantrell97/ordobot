const { ensureMember } = require("../helpers/index");

module.exports = (oldMember, newMember) => {
  ensureMember(newMember);
}
