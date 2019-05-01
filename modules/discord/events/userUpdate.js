const { ensureUser } = require("../helpers/index");

module.exports = (oldUser, newUser) => {
  ensureUser(newUser);
}
