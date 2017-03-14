'use strict'
export class util {
  constructor () {
    this.version = '0.0.1'
  }

  getHTTPObject () {
    if (typeof (XMLHttpRequest === 'undefined')) {
      XMLHttpRequest = function () {
        try { return new ActiveXObject('Msxml2.XMLHTTP.6.0') } catch (e) {}
        try { return new ActiveXObject('Msxml2.XMLHTTP.3.0') } catch (e) {}
        try { return new ActiveXObject('Msxml2.XMLHTTP') } catch (e) {}

        return false
      }
      return new XMLHttpRequest()
    }
  }

  toQueryString (obj) {
    let arr = [],
      str = ''
    for (var prop in obj) {
      var query = prop + '=' + obj[prop]
      arr.push(query)
    }
    str = arr.join('&')
    return str
  }

  serialize (element) {
    if (element.nodeName.toLowerCase() !== 'form') {
      console.warn('serialize() needs a form')
      return
    }
    var elems = element.elements
    var serialized = [],
      i, len = elems.length,
      str = ''
    for (i = 0; i < len; i += 1) {
      var element = elems[i]
      var type = element.type
      var name = element.name
      var value = element.value
      switch (type) {
        case 'text':
        case 'textarea':
        case 'select-one':
        case 'hidden':
          str = name + '=' + value
          serialized.push(str)
          break
        case 'radio':
        case 'checkbox':
          if (element.checked) {
            str = name + '=' + value
            serialized.push(str)
          }
          break
        default:
          break
      }
    }
    return serialized.join('&')
  }

  getQueryString (element) {
    if (element.nodeName.toLowerCase() !== 'a') {
      console.warn('getQueryString() needs an a element')
      return
    }
    var str = element.href
    var query = str.split('?')
    return query[1]
  }
}
