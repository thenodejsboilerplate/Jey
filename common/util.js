  class Jey {
    constructor(sym = 'jey') {
      this.version = '0.0.1';
      this.sym = sym;
    }

    /**********************************
    get the number of the own properties of an object
    *********************************/
    objectLength(obj) {
      var getLength = 0;
      for(var prop in obj) {
        (obj.hasOwnProperty(prop)) ? getLength++ : getLength;
      }
      return getLength;
    }

    objIsEmpty(obj) {
      for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
          return false;
      }
      return true;
    }				
  }

  module.exports = Jey;