// const { testServer } = require('../../../config.json');
require('dotenv').config();
const areCommandsDifferent = require('../../utils/areCommandsDifferent');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalCommands = require('../../utils/getLocalCommands');

const testServer = process.env.DISCORD_GUILD_ID;

module.exports = async (client) => {
  try {
    const localCommands = getLocalCommands();
    const applicationCommands = await getApplicationCommands(client, testServer);
    // console.log(localCommands);
    for (const localCommand of localCommands) {
      const { name, description, options } = localCommand;
      // console.log(name);
      const existingCommand = await applicationCommands.cache.find(
        (command) => command.name === name,
      );

      if (existingCommand) {
        if (localCommand.deleted) {
          await applicationCommands.delete(existingCommand.id);
          console.log(`Deleted command "${name}".`);
          continue;
        }

        if (areCommandsDifferent(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {
            description,
            options,
          });

          console.log(`Edited command "${name}".`);
        }
      }
      else {
        if (localCommand.deleted) {
          console.log(`Skipping registering command "${name}" as it's set to delete`);
          continue;
        }

        await applicationCommands.create({
          name,
          description,
          options,
        });

        console.log(`Registered command "${name}."`);
      }
    }
  }
  catch (error) {
    console.log(`There was an error: ${error}`);
  }
};