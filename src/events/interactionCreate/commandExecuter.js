const consoleLog = require('../../tests/consoleLog');

module.exports = async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const commands = client.commands;

  // console.log('Commands Collection: ', commands);
  consoleLog(__filename, 8, `Commands Collection: ${JSON.stringify(commands, null, '\t')}`);
};