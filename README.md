<p align="center">
  <img src="https://ordobot.com/images/android-chrome-192x192.png" />
</p>

# Introducing Ordo
 <a target="_blank" href="https://ordobot.com">Ordo</a> was built with the intention to address the challenges around forming and managing teams to hunt for Satoshi's Treasure.  You can think of Ordo as having four main features that all work together to efficiently run a team.

## Democratic Decision Making
Don't let a single trusted leader make all the decisions for the team.  Anytime there is a question that should be decided by all members on the team just create a new vote and let the team decide.  Easily let members cast their vote publicly in a channel or privately via a DM to Ordo.

## Contribution Tracking
Track any worthy contributions made by team members.  Can be useful for distributing a portion of the prize pool based on contributions or to rid your team of freeloaders who never contribute anything.  Use this in combination with team votes to decide on contributions in a democratic way.

## Key Verification & Sharing
Use this to prove ownership of a key without revealing it to anyone.  This will also record a timestamp of when the proof was provided and by who.  This will help your team distribute the prize pool based on who contributed which keys.  Ordo also supports sharing credit for a key with other team members.  **This feature is currently unavailable until the Satohi's Treasure team releases Pedersen commitments or public keys for each share so that I can implement a verification scheme.**

## Puzzle Tools
Currently, Ordo only supports sha256 calculation as an example of what is possible.  I will be quickly adding dozens of tools to be easily accessed directly by Ordo.  This can include anything from running steganographic analysis on an image to a simple xor operation.  Give your team access to the best tools without needing to leave the discussion.

# FAQs

- What platforms does Ordo support?
  - Currently, Ordo only works on Discord.  Support for Telegram and other platforms are coming soon.
- How much does Ordo cost?
  - Ordo is free! It is my contribution to the Satoshi Hunt community.
- Who can start a team vote?
  - Currently, only the owner of the Discord channel can start a vote.  This can easily be extended to any members with certain roles and permissions.
- Can I cast a vote without other members seeing my decision?
  - Yes! Just cast your vote directly to Ordo in a private message.
- Can I vote more than once?
  - Each member can only vote once.  If you cast a second vote it will override your original vote.  You can continue to edit your vote until the team vote is closed by the administrator.
- Who can log contributions?
  - Currently, only the owner of the Discord channel can record a contribution.  This can easily be extended to any members with certain roles.  It will also be possible to have a contribution recorded as the result of a team vote!
- How do I know when new features for Ordo are released?
  - Follow [@johncantrell97](https://www.twitter.com/johncantrell97) on Twitter.  I will be announcing new features as soon as they are released.  You can also ask Ordo with the help command: ordo.help()
- I have a great idea for a feature or I found a bug, what do I do?
  - For now, you can send any feedback to me directly on Twitter [@johncantrell97](https://www.twitter.com/johncantrell97).


# Contributing

Feel free to clone or fork the project and develop your feature in a separate branch.  Please open a pull request back to this repository for review.

# Running Locally

You will need to register a discord app to use for your development bot.

You can rename `.env.example` to `.env` and fill in the environment variables for your discord application and your local postgres database.

Please run `npm run migrate up` to ensure all migrations have run before trying to run Ordo.

To run ordo simple execute `node index.js`


# Tips

All work on this project is done for free and to benefit the whole community.  Tips are greatly appreciated!  Please send any satoshis to `34hxK6C8WFFEAd4NpTseTKZqDx3FwKeGz9`.  Thank you!
