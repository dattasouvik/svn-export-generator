const path = require('path');
const dotenv = require('dotenv');
const reportController = require('./controllers/reportController');

dotenv.config({ path: './config.env' });

const sourceFile = path.join(`${__dirname}`,'/','data','source.txt');

reportController.readSorceFile(sourceFile)
  .then(urls => reportController.generateSvnExportCommands(urls))
  .then( _ => console.log('😎 SVN commands have been geberated successfully'))
  .catch(error => console.log('😪 Something went wrong', error));