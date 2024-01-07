module.exports = {
  name: 'ping',
  description: 'Send pong!',

  callback: async (client, interaction) => {
    await interaction.deferReply();

    const reply = await interaction.fetchReply();

    const ping = reply.createdTimestamp - interaction.createdTimestamp;

    interaction.editReply(`Pong!\n\n**Client**: ${ping}ms\n**Websocket**: ${client.ws.ping}ms`);
  },
};