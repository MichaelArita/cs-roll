const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute(interaction) {
    await interaction.deferReply();

    const reply = await interaction.fetchReply();

    const ping = reply.createdTimestamp - interaction.createdTimestamp;
    
    await interaction.editReply(`Pong!\n\n**Client**: ${ping}ms\n**Websocket**: ${interaction.client.ws.ping}ms`);
    // await interaction.editReply('Pong!');
  },
};