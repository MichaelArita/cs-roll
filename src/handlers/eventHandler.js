const getAllFiles = require('../util/getAllFiles');
const path = require('path');

console.log(path.join(__dirname, '../events'));

module.exports = (client) => {
  const eventsPath = path.join(__dirname, '../events');
  const eventFiles = getAllFiles(eventsPath);
  for (const eventFile of eventFiles) {
    const event = require(eventFile);

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    }
    else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
};