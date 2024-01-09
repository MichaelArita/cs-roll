const getAllFiles = require('../util/getAllFiles');
const path = require('path');

console.log(path.join(__dirname, '../events'));

module.exports = (client) => {
  // const eventsPath = path.join(__dirname, '../events');
  // const eventFiles = getAllFiles(eventsPath);
  // for (const eventFile of eventFiles) {
  //   const event = require(eventFile);

  //   if (event.once) {
  //     client.once(event.name, (...args) => event.execute(...args));
  //   }
  //   else {
  //     client.on(event.name, (...args) => event.execute(...args));
  //   }
  // }

  const eventsPath = path.join(__dirname, '../events');
  const eventFolders = getAllFiles(eventsPath, true);

  // console.log(eventFolders);
  for (const eventFolder of eventFolders) {
    const eventFiles = getAllFiles(eventFolder);
    eventFiles.sort((a, b) => a > b);

    const hasPropertyFile = eventFiles.includes(path.join(eventFolder, `-1-${path.basename(eventFolder)}-properties.js`));
    if (!hasPropertyFile) continue;

    const eventProperties = require(eventFiles.pop());
    console.log(eventProperties);

  }
};