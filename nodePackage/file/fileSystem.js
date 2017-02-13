'use strict';
const fs = require('fs');
const { resolve, dirname } = require('path');
const log = require('debug')('debug');

const mkdir = (dirpath) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(dirpath, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

const exists = (dirpath) => {
  return new Promise((resolve, reject) => {
    fs.stat(dirpath, (err, stats) => {
      if(err) {
        reject(err);
      }
      resolve(stats);
    });
  });
};
// const notExist = (fileOrFolder) => {
//   return exists(fileOrFolder).then(function(stats){
//     Promise.reject(stats);
//   })
//   .catch(function(err){
//     if(err.code === 'ENOENT'){
//       Promise.resolve();
//     }
//     throw new Error('文件不可使用');   
//   });
// };
// // !notEistAndIsFile: notEistAndIsFolder
// const notExistAndIsFile = (fileOrFolder) => {
//   return notExist(fileOrFolder).then(function(stats){
//     let includeDot = fileOrFolder.includes('.');
//     let indexOf = fileOrFolder.indexOf('.');
//     if(includeDot && indexOf !== (fileOrFolder.length-1) && indexOf !== 0) {
//       Promise.resolve();
//     }
//     Promise.reject();
//   })
//   .catch(function(err){
//     throw new Error('file exists');
//   });

// };
// const notExistAndIsFolder = (fileOrFolder) => {
//   return notExistAndIsFile(fileOrFolder)

// };
// const existOrCreate = (dirOrFile) => {
//   return exists(dirOrFile)
//          .then(function(stats){
//            log('File/Folder Eixsts');
//            return Promise.resolve();
//          })
//          .catch(function(err){
//            if(err.code === 'ENOENT'){
//              return mkdirRecursion(dirname(dirOrFile))
//                   .then(() => {
//                     return mkdir(dirOrFile);
//                   });
//            }
//            throw new Error('文件不可使用');           
//          });
// };
//old way:
// /**
//  * check if a directory exist! make it if it does not exist
//  * @param {String} dir/file : the directory's name
//  * @param {Function} callback: asyn function if checking dir finishes
//  * usage: require('./utility.js').checkDir(dataDir);
//  */
// existOrCreate(dirOrFile, callback = function () {}) {
//         // var callback = callback || function(){};
//   fs.stat(dirOrFile, function (err, stat) {
//     if (err == null) {
//       debug('Dir Exists');
//                 // you still need to rename the file(what the function do) if dir exists,it's a must'
//       callback();
//       return;
//     } else if (err.code == 'ENOENT') {
//                 // file does not exist
//       debug('no dir exists. Creating it...');
//       fs.mkdirSync(dir);

//       callback();

//                 // since the fs.stat is async so the action should be put here ensuring the dir is actually generated before the real action in the callback happens!
//       return;
//     } else {
//       debugError('Some other error: ', err.code);
//       return;
//     }
//   });
// }




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
  return exists(dirpath)
    .then(function(stats){
      log('File Eixst');
      return Promise.resolve();
    })
    .catch((err) => {
      if(err.code === 'ENOENT'){
        return mkdirRecursion(dirname(dirpath))
            .then(() => {
              return mkdir(dirpath);
            });
      }
      throw new Error('文件不可使用');
    });
};

const mkdirSync = (dirpath) => {
  try {
    let exist = fs.existsSync(dirpath);
    if(!exist) {
      log('making dir'+ resolve(dirpath));
      fs.mkdirSync(dirpath);
    }
  } catch (e) {
    throw new Error('文件不可使用');
  }
  log('crreated'+ resolve(dirpath));
  return;
};

module.exports = {
  readdir,
  mkdirRecursion,
  mkdirSync
};