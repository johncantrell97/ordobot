module.exports = {
  name: 'sharekey',
  description: 'allows user to share credit for a key with another user',
  args: 3,
  usage: "shareKey(keyNumber,@userToShareWith,integerPercentageToShare)",
  execute: (message, args) => {
    message.reply("Sorry, only the user who has proven they first discovered this key can share the credit with others");
  }
}
