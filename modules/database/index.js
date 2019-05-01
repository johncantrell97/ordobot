const { Pool } = require('pg')
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const generateVisibleId = () => {
  return Math.random().toString(36).substring(2, 15);
}

const allRows = (query, values) => {
  return new Promise((resolve, reject) => {
    pool.query(query, values, (error, results) => {
      if(error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const firstRow = (query, values) => {
  return new Promise((resolve, reject) => {
    allRows(query,values).then((rows) => {
      resolve(rows[0]);
    }).catch((error) => {
      reject(error);
    });
  });
};

module.exports = {
  query: (text, params) => {
    return pool.query(text, params)
  },
  findGuildById: (id) => {
    const query = "SELECT * FROM guilds WHERE external_id=$1";
    const values = [id];
    return firstRow(query, values);
  },
  createGuild: (externalId, name, ownerId) => {
    const query = "INSERT INTO guilds (external_id, name, owner_id) VALUES ($1,$2,$3)";
    const values = [externalId, name, ownerId];
    return allRows(query, values);
  },
  updateGuild: (id, name, botIsMember, ownerId) => {
    const query = "UPDATE guilds SET name=$1, bot_is_member=$2, owner_id=$3, updated_at=now() WHERE external_id=$4";
    const values = [name, botIsMember, ownerId, id];
    return allRows(query, values);
  },
  createOrUpdateGuild: (id, name, botIsMember, ownerId) => {
    const query = "INSERT INTO guilds (external_id, name, bot_is_member, owner_id) VALUES ($1,$2,$3,$4) ON CONFLICT (external_id) DO UPDATE SET name=$2, bot_is_member=$3, owner_id=$4, updated_at=now()";
    const values = [id, name, botIsMember, ownerId];
    return allRows(query, values);
  },
  findUserById: (id) => {
    const query = "SELECT * FROM users WHERE external_id=$1";
    const values = [id];
    return firstRow(query, values);
  },
  createUser: (externalId, username, discriminator) => {
    const query = "INSERT INTO users (external_id, username, discriminator) VALUES ($1,$2,$3)";
    const values = [externalId, username, discriminator];
    return allRows(query, values);
  },
  updateUser: (id, username, discriminator) => {
    const query = "UPDATE users SET username=$1, discriminator=$2, updated_at=now() WHERE external_id=$3";
    const values = [username, discriminator, id];
    return allRows(query, values);
  },
  createOrUpdateUser: (id, username, discriminator) => {
    const query = "INSERT INTO users (external_id, username, discriminator) VALUES ($1,$2,$3) ON CONFLICT (external_id) DO UPDATE SET username=$2, discriminator=$3, updated_at=now()";
    const values = [id, username, discriminator];
    return allRows(query, values);
  },
  findMember: (userId, guildId) => {
    const query = "SELECT * FROM members WHERE user_id=$1 and guild_id=$2";
    const values = [userId, guildId];
    return firstRow(query, values);
  },
  createMember: (userId, guildId, nickname) => {
    const query = "INSERT INTO members (user_id, guild_id, nickname) VALUES ($1,$2,$3)";
    const values = [userId, guildId, nickname];
    return allRows(query, values);
  },
  updateMember: (userId, guildId, nickname, isMember) => {
    const query = "UPDATE members SET nickname=$1, is_member=$2, updated_at=now() WHERE user_id=$3 and guild_id=$4";
    const values = [nickname, isMember, userId, guildId];
    return allRows(query, values);
  },
  createOrUpdateMember: (userId, guildId, nickname, isMember) => {
    const query = "INSERT INTO members (user_id, guild_id, nickname, is_member) VALUES ($1,$2,$3,$4) ON CONFLICT ON CONSTRAINT guild_user_unique DO UPDATE SET nickname=$3, is_member=$4, updated_at=now()";
    const values = [userId, guildId, nickname, isMember];
    return allRows(query, values);
  },
  removeAllMembersFromGuild: (guildId) => {
    const query = "UPDATE members SET is_member=false WHERE guild_id=$1";
    const values = [guildId];
    return allRows(query, values);
  },
  getKeysForGuild: (guildId) => {
    const query = "SELECT keys.*, members.nickname as display_name FROM keys, members WHERE members.guild_id=$1 AND members.user_id=keys.user_id AND keys.guild_id=$1";
    const values = [guildId];
    return allRows(query, values);
  },
  getKeysForMember: (guildId, userId) => {
    const query = "SELECT keys.*, members.nickname as display_name FROM keys, members WHERE members.guild_id=$1 AND members.user_id=$2 AND keys.guild_id=$1 AND keys.user_id=$2";
    const values = [guildId, userId];
    return allRows(query, values);
  },
  getContributionsForGuild: (guildId) => {
    const query = "SELECT contributions.*, members.nickname as display_name FROM contributions, members WHERE members.guild_id=$1 AND members.user_id=contributions.user_id AND contributions.guild_id=$1";
    const values = [guildId];
    return allRows(query, values);
  },
  getContributionLeaderboard: (guildId) => {
    const query = "SELECT members.nickname as display_name, sum(points) as total_points FROM contributions, members WHERE members.guild_id=$1 AND members.user_id=contributions.user_id AND contributions.guild_id=$1 GROUP BY display_name ORDER BY total_points DESC";
    const values = [guildId];
    return allRows(query, values);
  },
  getContributionsForMember: (guildId, userId) => {
    const query = "SELECT contributions.*, members.nickname as display_name FROM contributions, members WHERE members.guild_id=$1 AND members.user_id=$2 AND contributions.guild_id=$1 AND contributions.user_id=$2";
    const values = [guildId, userId];
    return allRows(query, values);
  },
  getContribution: (guildId, visibleId) => {
    const query = "SELECT contributions.*, members.nickname as display_name FROM contributions, members WHERE members.guild_id=contributions.guild_id AND members.user_id=contributions.user_id AND contributions.guild_id=$1 AND contributions.visible_id=$2";
    const values = [guildId, visibleId];
    return firstRow(query, values);
  },
  createContribution: (userId, guildId, points, reason, details, approvalType) => {
    const query = "INSERT INTO contributions (user_id, guild_id, visible_id, points, reason, details, approval_type) VALUES ($1,$2,$3,$4,$5,$6,$7)";
    const values = [userId, guildId, generateVisibleId(), points, reason, details, approvalType];
    return allRows(query, values);
  },
  destroyContribution: (guildId, visibleId) => {
    const query = "DELETE FROM contributions WHERE guild_id=$1 AND visible_id=$2";
    const values = [guildId, visibleId];
    return allRows(query, values);
  },
  getPollsForGuild: (guildId) => {
    const query = "SELECT polls.*, members.nickname as display_name FROM polls, members WHERE members.guild_id=$1 AND members.user_id=polls.user_id AND polls.guild_id=$1";
    const values = [guildId];
    return allRows(query, values);
  },
  getPollsForMember: (guildId, userId) => {
    const query = "SELECT polls.*, members.nickname as display_name FROM polls, members WHERE members.guild_id=$1 AND members.user_id=$2 AND polls.guild_id=$1 AND polls.user_id=$2";
    const values = [guildId, userId];
    return allRows(query, values);
  },
  findPoll: (pollId) => {
    const query = "SELECT * FROM polls WHERE visible_id=$1";
    const values = [pollId];
    return firstRow(query, values);
  },
  createPoll: (userId, guildId, question) => {
    const visibleId = generateVisibleId();
    const query = "INSERT INTO polls (user_id, guild_id, visible_id, question) VALUES ($1,$2,$3,$4)";
    const values = [userId, guildId, visibleId, question];
    return new Promise((resolve, reject) => {
      pool.query(query, values, (error, results) => {
        if(error){
          reject(error);
        } else {
          resolve(visibleId);
        }
      });
    });
  },
  destroyPoll: (guildId, visibleId) => {
    const query = "DELETE FROM polls WHERE guild_id=$1 AND visible_id=$2";
    const values = [guildId, visibleId];
    return allRows(query, values);
  },
  closePoll: (guildId, visibleId) => {
    const query = "UPDATE polls SET open=false, closed_at=now() WHERE guild_id=$1 AND visible_id=$2";
    const values = [guildId, visibleId];
    return allRows(query, values);
  },
  getPollResponsesForPoll: (guildId, pollId) => {
    const query = "SELECT poll_responses.*, members.nickname as display_name FROM poll_responses, members WHERE members.user_id=poll_responses.user_id AND members.guild_id=poll_responses.guild_id AND poll_responses.guild_id=$1 AND poll_responses.poll_id=$2";
    const values = [guildId, pollId];
    return allRows(query, values);
  },
  createPollResponse: (userId, guildId, pollId, response) => {
    const query = "INSERT INTO poll_responses (user_id, guild_id, visible_id, response, poll_id) VALUES ($1,$2,$3,$4,$5) ON CONFLICT ON CONSTRAINT user_poll_unique DO UPDATE SET response=$4";
    const values = [userId, guildId, generateVisibleId(), response, pollId];
    return allRows(query, values);
  },
  destroyPollResponse: (guildId, visibleId) => {
    const query = "DELETE FROM polls WHERE guild_id=$1 AND visible_id=$2";
    const values = [guildId, visibleId];
    return allRows(query, values);
  }
}
