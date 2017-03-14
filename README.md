JS Small Utility Framework
============

##[Github]

Github: https://github.com/thenodejsboilerplate/Jey.git
------------

Functionality:
------------
1. Jey.Util: including .mobile() .objectLength() .objectIsEmpty() ..
2. Jey.Ajax
4. More...


Javascript Framework-jey:
---------------------------
1. No dependency
2. Fast
3. Easily customized


Installation
-------------
npm install/i jey


How to use it
-------------
```
let Jey = require('Jey');
const util = new Jey.Util(); 

let obj = {
	'lee': 555,
	'frank': 666
};
let length = util.objectLength(obj);

console.log(`length is ${length} version: ${util.version}`);

```


License
------------

MIT
