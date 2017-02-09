// ;(function (global, factory) {
//     // typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
//     // typeof define === 'function' && define.amd ? define(factory) :
//     global.moment = factory();
// }(this, function () { 'use strict';
// 		let 
// }));

'use strict';
let Jey = require('./common/util');
let fileSystem = require('./nodePackage/file/fileSystem');
Jey.prototype.fileSystem = fileSystem;

module.exports = Jey;