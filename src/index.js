const { Client, IntentsBitField, Events } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');
require('dotenv').config();

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

eventHandler(client);

client.login(DISCORD_TOKEN);