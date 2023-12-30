const { Client, IntentsBitField, Events } = require('discord.js');
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

client.on(Events.ClientReady, () => {
  console.log(`${client.user.tag} is online.`);
});

client.login(DISCORD_TOKEN);