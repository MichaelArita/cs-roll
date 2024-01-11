const path = require('path');

module.exports = async (client, interaction) => {
  console.log('we\'re running our exectutor');
  if (!interaction.isChatInputCommand()) return;

  const commands = client.commands;

  console.log('Commands Collection: ', commands);
};