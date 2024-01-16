const path = require('path');

// TODO: Change name of file for less confusions
// TODO: Make use of functionName parameter
module.exports = (filePath, lineNumber, output, functionName = null) => {
  const fileName = path.basename(filePath);

  console.log(`${fileName}, Line ${lineNumber}: ${output}`);
};