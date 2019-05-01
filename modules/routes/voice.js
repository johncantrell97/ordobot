module.exports = (req, res) => {
  const twiml = new MessagingResponse();
  twiml.message('');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
};