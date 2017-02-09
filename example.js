let Jey = require('./index.js');

let jey = new Jey();
let obj = {
	'lee': 555,
	'frank': 666
};
let length = jey.objectLength(obj);
console.log(`length is ${length} version: ${jey.version}`);
