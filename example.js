let Jey = require('./index.js');
const util = new Jey.Util(); 

let obj = {
	'lee': 555,
	'frank': 666
};
let length = util.objectLength(obj);

console.log(`length is ${length} version: ${util.version}`);
