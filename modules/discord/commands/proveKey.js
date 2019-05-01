module.exports = {
  name: 'provekey',
  description: 'allows user to prove they own a key share without revealing it',
  args: 1,
  usage: "proveKey(keyNumber)",
  execute: (message, args) => {
    message.reply("Sorry, until they make the pedersen commitments public I cannot implement this command.");
  }
}
