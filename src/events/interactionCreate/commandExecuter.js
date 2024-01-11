const consoleLog = require('../../tests/consoleLog');

module.exports = async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);
  try {
    if (!command) throw new Error('CommandMissing: Command not found in collection');

    // TODO: Create devOnly Permission

    // TODO: Create testOnly Permission

    if (command.permissionsRequired?.lenght) {
      for (const permission of command.permissionsRequired) {
        if (!interaction.member.permission.has(permission)) {
          interaction.reply({
            content: 'Not enough permissions.',
            ephemeral: true,
          });
        }
      }
    }

    if (command.botPermissions?.length) {
      for (const permission of command.botPermissions) {
        const bot = interaction.guild.members.me;
        if (!bot.permissions.has(permission)) {
          interaction.reply({
            content: 'I don\'t have enough permissions.',
            ephermeral: true,
          });
        }
      }
    }

    await command.execute(interaction);
  }
  catch (error) {
    console.log(`There was an error running this command: ${error}`);
  }
  // consoleLog(__filename, 8, `Commands Collection: ${JSON.stringify(command, null, '\t')}`);
};