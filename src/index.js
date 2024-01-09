const fs = require('fs');
const path = require('path');
const { Client, IntentsBitField, Collection } = require('discord.js');
require('dotenv').config();

const commandHandler = require('./handlers/commandHandler');
const eventHandler = require('./handlers/eventHandler');

const { DISCORD_TOKEN } = process.env;

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

// TODO: Move command handler and filePath reader out into separate utility functions
client.commands = new Collection();

commandHandler(client);
eventHandler(client);

client.login(DISCORD_TOKEN);