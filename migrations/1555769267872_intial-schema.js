exports.shorthands = undefined;

// drop table contributions;drop table keys;drop table pgmigrations;drop table poll_responses;drop table polls;drop table members;drop table users;drop table guilds;

exports.up = (pgm) => {

  pgm.createTable("guilds", {
    external_id: { type: "varchar(1000)", notNull: true, primaryKey: true, unique: true },
    name: { type: "varchar(1000)", notNull: true },
    owner_id: { type: "varchar(1000)" },
    bot_is_member: { type: "boolean", notNull: true, default: true },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    }
  });

  pgm.createTable("users", {
    external_id: { type: "varchar(1000)", notNull: true, primaryKey: true, unique: true },
    username: { type: "varchar(1000)", notNull: true },
    discriminator: { type: "varchar(1000)", notNull: true},
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    }
  });

  pgm.createTable("members", {
    guild_id: { type: "varchar(1000)", notNull: true, references: '"guilds"'},
    user_id: { type: "varchar(1000)", notNull: true, references: '"users"'},
    nickname: { type: "varchar(1000)" },
    is_member: { type: "boolean", notNull: true, default: true },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    }
  });

  pgm.createConstraint("members", "guild_user_unique", { primaryKey: ["guild_id", "user_id"]})
  pgm.createIndex("members", ["guild_id","user_id"], { unique: true });
  
  pgm.createTable("keys", {
    id: "id",
    visible_id: { type: "varchar(1000)", notNull: true },
    user_id: { type: "varchar(1000)", notNull: true, references: '"users"'},
    guild_id: { type: "varchar(1000)", notNull: true, references: '"guilds"'},
    number: { type: "integer", notNull: true },
    commitment: { type: "text", notNull: true },
    ownership: { type: "integer", notNull: true, default: 100 },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    }
  });

  pgm.createIndex("keys", ["visible_id","guild_id"], {unique: true});

  // ordo.addContribution(@user, "reason", points, "details")
  // ordo.showContributions(@user?)
  // ordo.removeContribution(contribution_id)
  // ordo.showContributionDetails(contribution_id)
  pgm.createTable("contributions", {
    id: "id",
    visible_id: { type: "varchar(1000)", notNull: true },
    user_id: { type: "varchar(1000)", notNull: true, references: '"users"'},
    guild_id: { type: "varchar(1000)", notNull: true, references: '"guilds"'},
    points: { type: "integer", notNull: true, default: 0},
    reason: { type: "varchar(1000)", notNull: true },
    details: { type: "text" },
    approval_type: { type: "varchar(1000)", notNull: true },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    }
  });

  pgm.createIndex("contributions", ["visible_id","guild_id"], {unique: true});

  // ordo.createVote("question")
  // ordo.showVotes()
  // ordo.viewResults("vote_id")
  // ordo.closeVote("vote_id")
  pgm.createTable("polls", {
    id: "id",
    visible_id: { type: "varchar(1000)", notNull: true },
    user_id: { type: "varchar(1000)", notNull: true, references: '"users"'},
    guild_id: { type: "varchar(1000)", notNull: true, references: '"guilds"'},
    question: { type: "varchar(1000)", notNull: true },
    poll_type: { type: "integer", notNull: true, default: 0},
    open: { type: "boolean", notNull: true, default: true },
    closed_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    }
  });

  pgm.createIndex("polls", ["visible_id","guild_id"], {unique: true});

  // ordo.castVote("vote_id", "yes"|"no")
  pgm.createTable("poll_responses", {
    id: "id",
    visible_id: { type: "varchar(1000)", notNull: true, unique: true },
    user_id: { type: "varchar(1000)", notNull: true, references: '"users"'},
    guild_id: { type: "varchar(1000)", notNull: true, references: '"guilds"'},
    response: { type: "varchar(1000)", notNull: true },
    poll_id: { type: "integer", notNull: true, references: '"polls"'},
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    }
  });

  pgm.createConstraint("poll_responses", "user_poll_unique", { unique: ["poll_id", "user_id"]});

};

exports.down = (pgm) => {

};
