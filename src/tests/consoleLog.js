const path = require('path');

module.exports = (filePath, lineNumber, output, functionName = null) => {
  const fileName = path.basename(filePath);

  console.log(`${fileName}, Line ${lineNumber}: ${output}`);
};