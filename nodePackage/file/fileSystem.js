let adirpath = '../../mydir/subdir/subbbsi';
let {resolve, dirname} = require('path');
let fs = require('fs');

const exists = (path) => {
  return fs.existsSync(path);
};
const mkdir = (dirpath) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(dirpath, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

/**
 * 遍历该文件夹，获取所有文件。
 *
 * @param  {String} dirname 文件夹路径
 * @return {[String]}         文件路径的数组
 */
const readdir = (dirname) => {
  return fs.readdirSync(dirname).map(filename => {
    const filePath = resolve(dirname, filename);
    const stat = fs.statSync(filePath);
    if(stat.isDirectory())
      return readdir(filePath);
    else if(stat.isFile())
      return [filePath];
  }).reduce((files, e) => [...files, ...e], []);
};

/**
 * 根据dirpath创建文件夹，如果此文件夹的上级目录不存在，则会递归创建
 *
 * @param {String} dirpath 文件夹路径
 * @return {Promise}
 */
const mkdirRecursion = (dirpath) => {
  if(exists(dirpath)){
    console.log('File/Folder exits');
    return Promise.resolve();
  }else{
    console.log('File/Folder not existing. creating it...');
    return mkdir(dirpath);
  }
};

// console.log(`mkdirRecursion's value: ${mkdirRecursion(adirpath)}`);
// mkdirRecursion(adirpath)
// .catch(function(err){
//   console.log(`mkdirRecursion error: ${err.stack, err.message}`);
// });

module.exports = {
  readdir,
  mkdirRecursion
};

