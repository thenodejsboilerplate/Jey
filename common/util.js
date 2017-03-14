  let fs = require('fs')
  let myPackage = require('../package.json')

  class Util {
    constructor () {
      this.version = myPackage.version
    }

/** obj method */

    /**********************************
    get the number of the own properties of an object
    *********************************/
    objectLength (obj) {
      var getLength = 0
      for (var prop in obj) {
        (obj.hasOwnProperty(prop)) ? getLength++ : getLength
      }
      return getLength
    }

    objIsEmpty (obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) { return false }
      }
      return true
    }
    /**
     * @param origin: Object
     * clone: shallow clone. only clone the enumerable property
     */
    clone (origin) {
      return Object.assign({}, origin)
    }
    /**
     * @param origin: Object
     * deep clone . also clone the origin's proto
     */
    deepClone (origin) {
      let originProto = Object.getPrototypeOf(origin)
      return Object.assign(Object.create(originProto), origin)
    }

/** not obj */
    inArray (arr, ele) {
      return arr.some(function (v) {
        return v === ele
      })
    }
    getTime (time = '') {
      let date
      if (time === '') {
        date = new Date()
      } else {
        date = new Date(time)// equl to Date.now()
      }

      let year = date.getFullYear(),
        month = date.getMonth(),
        day = date.getDate()

      let getTimes = {
        'year': year,
        'month': month,
        'day': day
      }
      return getTimes
    }

    /**
     * slugify the url to make it  more beautiful
     * @param {String} url or text
     */
    slugify (text) {
      return text.toString().toLowerCase()
        .replace(/\s+/g, '-')        // Replace spaces with -
        .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
        .replace(/\-\-+/g, '-')      // Replace multiple - with single -
        .replace(/^-+/, '')          // Trim - from start of text
        .replace(/-+$/, '')         // Trim - from end of text
    }

    unslugify (text) {
      return text.toString().toLowerCase()
        .replace(/-/g, ' ')        // Replace spaces with -
        .replace(/[^\w\-]+/g, ' ')   // Remove all non-word chars
        .replace(/\-\-+/g, ' ')      // Replace multiple - with single -
        .replace(/^-+/, ' ')          // Trim - from start of text
        .replace(/-+$/, ' ')         // Trim - from end of text
    }

    /**
     *  use generator and promise for asynchronous task running;a function that can call a generator and start the iterator;It calls the generator to create an iterator and stores the iterator in task.
     * @param {Function}: a task definition (a generator function)
     * usage:
     */
    run (taskDef) {
        // create the iterator, make available elsewhere
      let task = taskDef()

        // start the task
      let result = task.next();

        // recursive function to iterate through
      (function step () {
            // if there's more to do
        if (!result.done) {
                // resolve to a promise to make it easy
          let promise = Promise.resolve(result.value)
          promise.then(function (value) {
            result = task.next(value)
            step()
          }).catch(function (error) {
            result = task.throw(error)
            step()
          })
        }
      }())
    }

    /**
     * use es6 set to eliminate duplicates of the array
     * @param {Function}: a task definition (a generator function)
     * usage:
     * let numbers = [1, 2, 3, 3, 3, 4, 5], noDuplicates = eliminateDuplicates(numbers); console.log(noDuplicates); // [1,2,3,4,5]
     */
    eliminateDuplicates (items) {
      [...new Set(items)]
    }

    isMobile (req) {
      const ua = req.headers['user-agent'].toLowerCase()
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(ua) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0, 4))) {
        return true
      } else {
        return false
      }
    }
  /**
   * get rid of white space at the beginning or end of the string
   * @param {String}
   **/
    trim (str) {
      if (String.prototype.trim()) {
        return str.trim(str)
      } else {
        // return str.replace(/(^\s+)|(\s+$)/g, '') //first version
        // got from:  http://blog.stevenlevithan.com/archives/faster-trim-javascript but faster
        str = str.replace(/^\s\s*/, '')
        let ws = /\s/
        let i = str.length
        while (ws.test(str.charAt(--i)));
        return str.slice(0, i + 1)
      }
    }

    fireKeyEvent (el, evtType, keyCode) {
      var doc = el.ownerDocument
      var win = doc.defaultView || doc.parentWindow
      var evtObj
      if (doc.createEvent) {
        if (win.KeyEvent) {
          evtObj = doc.createEvent('KeyEvents')
          evtObj.initKeyEvent(evtType, true, true, win, false, false, false, false, keyCode, 0)
        } else {
          evtObj = doc.createEvent('UIEvents')
          Object.defineProperty(evtObj, 'keyCode', {
            get: function () { return this.keyCodeVal }
          })
          Object.defineProperty(evtObj, 'which', {
            get: function () { return this.keyCodeVal }
          })
          evtObj.initUIEvent(evtType, true, true, win, 1)
          evtObj.keyCodeVal = keyCode
          if (evtObj.keyCode !== keyCode) {
            console.log('keyCode ' + evtObj.keyCode + ' 和 (' + evtObj.which + ') 不匹配')
          }
        }
        el.dispatchEvent(evtObj)
      } else if (doc.createEventObject) {
        evtObj = doc.createEventObject()
        evtObj.keyCode = keyCode
        el.fireEvent('on' + evtType, evtObj)
      }
    }
  }

  module.exports = Util
