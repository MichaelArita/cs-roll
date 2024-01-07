module.exports = (existingCommand, localCommand) => {
  const areChoicesDifferent = (existingChoices, localChoices) => {
    for (const localChoice of localChoices) {
      const existingChoice = existingChoices?.find(
        (choice) => choice.name === localChoice.name,
      );

      if (!existingChoice) {
        return true;
      }

      if (localChoice.value !== existingChoice.value) {
        return true;
      }
    }
    return false;
  };

  const areOptionsDifferent = (existingOptions, localOptions) => {
    for (const localOption of localOptions) {
      const existingOption = existingOptions?.find(
        (option) => option.name === localOption.name,
      );

      if (!existingOption) {
        return true;
      }
      if (
        localOption.description !== existingOption.description ||
        localOption.type !== existingOption.type ||
        /**
         * ! This is a poor work around which does not take in the full consequences and edge cases that may occur.
         * When setting up subcommands with type: 1 existingOption.required will always result in a keyvalue pair of required: undefined
         * However when done with other ApplicationCommandOptionType properties results with keyvalue pair of required: false.
         */
        (localOption.required || false) !== (existingOption.required || false)||
        (localOption.choices?.length || 0) !==
        (existingOption.choices?.length || 0) ||
        areChoicesDifferent(
          localOption.choices || [],
          existingOption.choices || [],
        )
      ) {
        return true;
      }
    }
    return false;
  };

  if (localCommand.name !== 'tournament' && localCommand.name !== 'level') return false;

  if (
    existingCommand.description !== localCommand.description ||
      existingCommand.options?.length !== (localCommand.options?.length || 0) ||
      areOptionsDifferent(existingCommand.options, localCommand.options || [])
  ) {
    return true;
  }

  return false;
};