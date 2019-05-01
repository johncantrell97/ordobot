require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./modules/routes/index');
const discord = require('./modules/discord/index');

const app = express();
app.use(bodyParser.urlencoded({ extended: false}));
app.post('/sms', routes.smsRoute);
app.post('/voice', routes.voiceRoute);
app.listen(process.env.PORT);

discord.login();