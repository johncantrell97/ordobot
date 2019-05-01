const { broadcastMessage } = require('../discord/index');

const smsBroadcastChannel = "ordo";

module.exports = (req, res) => {
  const from = req.body.From;
  const message = req.body.Body;
  broadcastMessage(`New SMS message received from ${from}`, smsBroadcastChannel);
  broadcastMessage(message, smsBroadcastChannel);
  res.send(`<Response></Response>`);
};
