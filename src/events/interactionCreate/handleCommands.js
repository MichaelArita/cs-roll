const { Client, Interaction } = require('discord.js');
const path = require('path');
// const { devs, testServer } = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');

/**
 * Handles the execution of Discord slash commands, including permission checks.
 *
 * @param {Client} client - The Discord client instance.
 * @param {Interaction} interaction - The Discord interaction object represnting the command interaction.
 * @returns {Promise<void>} - A promise that resolves after handling the command.
 */
module.exports = async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;

  // let subcommandError;
  const localCommands = getLocalCommands();
  try {
    const commandObject = localCommands.find(
      (localCommand) => localCommand.name === interaction.commandName,
    );

    if (!commandObject) return;

    // if (commandObject.devOnly) {
    //   if (!devs.includes(interaction.member.id)) {
    //     interaction.reply({
    //       content: 'Only developers are allowed to run this command.',
    //       ephermeral: true,
    //     });
    //     return;
    //   }
    // }

    // if (commandObject.testOnly) {
    //   if (!(interaction.guild.id === testServer)) {
    //     interaction.reply({
    //       content: 'This command cannot be ran here.',
    //       ephermeral: true,
    //     });
    //     return;
    //   }
    // }

    if (commandObject.permissionsRequired?.length) {
      for (const permission of commandObject.permissionsRequired) {
        if (!interaction.member.permission.has(permission)) {
          interaction.reply ({
            content: 'Not enough permissions.',
            ephermeral: true,
          });
          break;
        }
      }
    }

    if (commandObject.botPermissions?.length) {
      for (const permission of commandObject.botPermissions) {
        const bot = interaction.guild.members.me;

        if (!bot.permissions.has(permission)) {
          interaction.reply({
            content: 'I don\'t enough permissions.',
            ephermeral: true,
          });
          break;
        }
      }
    }

    await commandObject.callback(client, interaction);
  }
  catch (error) {
    console.log(`There was an error running this command: ${error}`);
  }
};