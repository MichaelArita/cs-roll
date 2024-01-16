require('dotenv').config();
const getApplicationCommands = require('../../util/getApplicationCommands');
const areCommandsDifferent = require('../../util/areCommandsDifferent');
const consoleLog = require('../../tests/consoleLog');

const { DISCORD_GUILD_ID } = process.env;

module.exports = async (client) => {
  try {
    const localCommands = client.commands;
    const applicationCommands = await getApplicationCommands(client, DISCORD_GUILD_ID);

    for (const [commandName, commandObj] of localCommands) {
      const commandRegisteredOnApp = applicationCommands.cache.find(
        (command) => command.name === commandName,
      );

      if (commandRegisteredOnApp) {
        // consoleLog(__filename, 18, `${commandName} Command is registered`);
        if (areCommandsDifferent(commandRegisteredOnApp, commandObj.data)) {
          await applicationCommands.edit(commandRegisteredOnApp.id, {
            description: commandObj.data.description || '',
            options: commandObj.data.options || [],
          });

          console.log(`Edited command '${commandName}'.`);
        }
        // TODO: Deleting commands. Updating commands if changed.
        continue;
      }

      // consoleLog(__filename, 23, `${commandName} is not registered`);
      await applicationCommands.create({
        name: commandName,
        description: commandObj.data.description,
        options: commandObj.data.options,
      });

      console.log(`Registered command ${commandName}.`);
    }

    // applicationCommands.cache.forEach((command) => console.log(command.name));

    // ! The following portion may change once we move from single server commands to global

    // console.log(applicationCommands.cache);


    // Does the command actually exist    
      // True, so we perform the following checks
        // If deleted: true. Delete the command.
        // If Equal: false. update the already registered command.
      // False
        // If deleted: true. Skip
        // Create a new command from our local commands

  }
  catch (error) {
    console.log(`There was an error: ${error}`);
  }
};