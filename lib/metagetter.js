const fetch = require('node-fetch');
const { JSDOM, VirtualConsole } = require('jsdom');

module.exports = getMetaData;

/**
 * Fetches `url` and returns {contentType} if not HTML,
 * Otherwise parses content and returns meta data as defined in tagDefs
 * @param  {string} url A valid url with or without http[s] protocol. No other protocols allowed.
 * @return {object}     Object with contentType and html metaData if applicable
 */
function getMetaData(tagDefs, url) {
  const virtualConsole = new VirtualConsole();
  virtualConsole.sendTo(console, { omitJSDOMErrors: false });
  if (!url) return Promise.reject({ message: 'Invalid url', status: 400 });
  return fetch(ensureProtocol(url)).then(res => {
    const contentType = (res.headers.get('content-type') || '').toLowerCase();
    if (contentType.indexOf('html') === -1) return { contentType };
    return res.text().then(text => {
      const { window } = new JSDOM(text, { virtualConsole });
      return { contentType, ...getTags(window.document, tagDefs) };
    });
  });
}

/**
 * Checks if URL starts with http protocol and prepends http:// if it doesn't
 * @param  {string} url - url to check. Assumed to be valid strings
 * @return {string}     Url guaranteed to start with http[s]?://
 */
function ensureProtocol(url) {
  if (!/^http[s]?:\/\//.test(url)) {
    url = 'http://' + url;
  }
  return url;
}

/**
 * Gets tags as per tagDefs from the document doc
 * @param  {HTMLDocument} doc
 * @param  {Object} tagDefs - Object mapping tagNames to array of filters to match tags with
 * @return {Object} - Object mapping the name of matched tags with the value of matched tags as defined by the tagDefs. Duplicate names get overritten based on order of definition in tagDefs. Higher index means higher priority
 */
function getTags(doc, tagDefs) {
  const ret = {};
  Object.keys(tagDefs).forEach(
    ({ name, content = 'content', selector, htmlContent }) => {
      const tag = doc.querySelector(selector);
      if (!tag) return;
      ret[name] = htmlContent ? tag.innerHTML : tag.getAttribute(content);
    }
  );
  return ret;
}
