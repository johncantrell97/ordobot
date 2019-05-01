const db = require("../../database/index");
const { table } = require("table");

const buildTableResponse = (entities, headers, keys, entity_name) => {
  if(!entity_name) {
    entity_name = "entities";
  }
  
  const tableData = [];

  if(entities.length === 0){
    tableData.push([`No ${entity_name} yet`]);
  } else {
    tableData.push(headers);
    entities.forEach((entity) => {
      const row = [];
      keys.forEach((key) => {
        row.push(entity[key]);
      });
      tableData.push(row);
    });
  }

  return "```" + table(tableData) + "```";
}

const ensureGuild = (guild) => {
  return db.createOrUpdateGuild(guild.id, guild.name, true, guild.ownerID);
};

const ensureUser = (user) => {
  return db.createOrUpdateUser(user.id, user.username, user.discriminator);
};

const ensureMember = (member) => {
  ensureGuild(member.guild)
  .then(() => {
    return ensureUser(member.user);
  })
  .then(() => {
    return db.createOrUpdateMember(member.user.id, member.guild.id, member.displayName, true);
  })
  .catch((error) => {

  });
}

module.exports = {
  ensureMember,
  ensureUser,
  ensureGuild,
  buildTableResponse
};
