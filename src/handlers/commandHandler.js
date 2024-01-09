const path = require('path');
const getAllFiles = require('../util/getAllFiles');

module.exports = (client) => {
  const foldersPath = path.join(__dirname, '../commands');
  const commandFolders = getAllFiles(foldersPath, true);

  for (const commandFolder of commandFolders) {
    const commandFiles = getAllFiles(commandFolder);

    for (const commandFile of commandFiles) {
      const command = require(commandFile);

      const isValidCommand = 'data' in command && 'execute' in command;
      if (!isValidCommand) {
        console.log(`[WARNING] The command at ${commandFile} is missing a required 'data' or 'execute property.`);
        continue;
      }

      client.commands.set(command.data.name, command);
    }
  }
};