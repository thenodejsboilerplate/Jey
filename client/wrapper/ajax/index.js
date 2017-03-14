'use strict'
import {Util} from './common.js'

export class Ajx extends Util {
  constructor () {
    super()
    this.version = '0.0.1'
  }

  xhr () {
    const request = this.getHTTPObject()
    if (!request) {
      alert('Sorry, your browser doesn\t support XMLHttpRequest')
    } else {
      return request
    }
  }

  getResponseType (resp) {
    let type = ''
    if (resp.indexOf('text/xml') !== -1 || resp.indexOf('application/xml') != -1) {
      type = 'xml'
    }
    if (resp.indexOf('application/json') !== -1) {
      type = 'json'
    }
    if (resp.indexOf('text/html') !== -1 || resp.indexOf('text/plain') != -1) {
      type = 'text'
    }
    return type
  }

/**
 * @param options Object
 * @param callback(error Object, result)
 */
  post (options, callback = function () {}) {
    const xhttp = this.xhr()
    let data
    options.type = 'POST'
    options.url = options.url || location.href// location.href=== window.location.href
    options.data = options.data || null
    if (typeof options.data === 'object') {
      data = this.toQueryString(options.data)
    } else {
      data = options.data
    }
    xhttp.open(options.type, options.url, true)
    if (data.length > 0) {
      xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      xhttp.send(data)
    } else {
      xhttp.send(null)
    }
    xhttp.onreadystatechange = function () {
      let stat = xhttp.status
      let state = xhttp.readyState
      if (stat === 200 && state == 4) {
        let headers = xhttp.getAllResponseHeaders()
        let type = this.getResponseType(headers)
        let responseType
        switch (type) {
          case 'xml':
            responseType = xhttp.responseXML
            break
          case 'json':
          case 'text':
            responseType = xhttp.responseText
            break
          default:
            responseType = xhttp.responseText
            break
        }
        callback(null, responseType)
      } else {
        let err = `Ajax Get error: xhttp.status is ${stat}, xhttp.readyState is ${state}`
        let error = {error: err, message: `Fetch error`}
        callback(error, null)
      }
    }
  }

/**
 * @param options Object
 * @param callback(error object, result)
 */
  get (options, callback = function () {}) {
    const xhttp = this.xhr()
    let data
    options.type = 'GET'
    options.url = options.url || location.href
    options.data = options.data || null
    if (typeof options.data === 'object') {
      data = this.toQueryString(options.data)
    } else {
      data = options.data
    }
    xhttp.open(options.type, options.url + '?' + data, true)
    xhttp.send(null)
    xhttp.onreadystatechange = function () {
      var stat = xhttp.status
      var state = xhttp.readyState
      if (stat === 200 && state === 4) {
// The XMLHttpRequest.getAllResponseHeaders() method returns all the response headers, separated by CRLF, as a string, or null if no response has been received.
        let headers = xhttp.getAllResponseHeaders()
        let type = this.getResponseType(headers)
        let responseType
        switch (type) {
          case 'xml':
            responseType = xhttp.responseXML
            break
          case 'json':
          case 'text':
            responseType = xhttp.responseText
            break
          default:
            responseType = xhttp.responseText
            break
        }
        callback(null, responseType)
      } else {
        let err = `Ajax Get error: xhttp.status is ${stat}, xhttp.readyState is ${state}`
        let error = {error: err, message: `Fetch error`}
        callback(error, null)
      }
    }
  }
/**
 * @param options Object
 * @param callback(error Object, result)
 */
  getJSON (options, callback =	function () {}) {
    const xhttp = this.xhr()
    let data
    options.url = options.url || location.href
    options.data = options.data || null
    options.type = options.type || 'json'
    if (typeof options.data === 'object') {
      data = this.toQueryString(options.data)
    } else {
      data = options.data
    }
    var url = options.url
    if (options.type === 'jsonp') {
      window.jsonCallback = callback//
      let $url = url.replace('callback=?', 'callback=jsonCallback')
      let script = document.createElement('script')
      script.src = $url
      document.body.appendChild(script)
    }
    xhttp.open('GET', options.url, true)
    xhttp.send(data)
    xhttp.onreadystatechange = function () {
      if (xhttp.status === 200 && xhttp.readyState === 4) {
        console.log(`xhttp.responseText: ${xhttp.responseText}`)
        callback(null, JSON.parse(xhttp.responseText))
      } else {
        let err = `Ajax getJson error: status is ${xhttp.status}, stat is ${xhttp.readyState}`
        let error = {error: err, message: `Fetch error`}
        callback(error, null)
      }
    }
  }
}
