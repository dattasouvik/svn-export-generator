const path = require('path');
const fileHandler = require('./../utils/fileHandler');


/**
 * @var	url	String
 * Returns String
 */
const processUrl = url => {
  let output = "";
  let filePath = url.replace(process.env.SVN_HOST_URL, "");
  const  rest = filePath.substring(0, filePath.lastIndexOf("/") + 1);
  // const last = filePath.substring(filePath.lastIndexOf("/") + 1, filePath.length);

  output += `\r\n`;
  output += `cd ${rest}`;
  output += `\r\n`;
  output += `svn export --force  ${url}`;
  return output;
}

/**
 * @var	file String
 * Returns String
 */
module.exports.readSorceFile =async (file) => {
  const data = await fileHandler.readFilePro(file);
  return data;
}

module.exports.generateSvnExportCommands = async (urls) => {
  let data = "";
  const urlList = urls.split("\r\n");
  if(urlList.length === 0 || !urls ) {
    throw new Error("Url cannot be empty");
  }
  const records = urlList.length;
  const destination = path.join(`${__dirname}`,'..','data','export.txt');
  
  urlList.map(item => {
    data+= processUrl(item);
  });
  if(records){
    data+=`\r\n \r\n ***** ${records} urls processed *****`;
  }
  const output = await fileHandler.writeFilePro(destination,data);
  return output;
}
