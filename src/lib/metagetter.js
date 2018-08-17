import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import { URL } from 'url';

/**
 * Fetches `url` and returns {contentType} if not HTML,
 * Otherwise parses content and returns meta data as defined in tagDefs
 * @param  {string} url A valid url with or without http[s] protocol. No other protocols allowed.
 * @return {object}     Object with contentType and html metaData if applicable
 */
export default function getMetaData(tagDefs, url) {
  if (!url) return Promise.reject({ message: 'Invalid url', status: 400 });
  url = ensureProtocol(url);
  return fetch(url).then(res => {
    const contentType = (res.headers.get('content-type') || '').toLowerCase();
    if (contentType.indexOf('html') === -1) return { contentType };
    const { ok, status, message } = res;
    if (!ok) return Promise.reject({ status, message });
    return res.text().then(text => {
      const { origin } = new URL(url);
      const { window } = new JSDOM(text);
      return {
        url,
        contentType,
        origin,
        ...getTags(window.document, tagDefs),
      };
    });
  });
}

/**
 * Gets tags as per tagDefs from the document doc
 * @param  {HTMLDocument} doc
 * @param  {Object} tagDefs - Array of tagDefs
 * @return {Object} - name:value props derived from tagDefs
 * Duplicate names get overritten based on order of definition in tagDefs
 */
function getTags(doc, tagDefs) {
  const ret = {};
  tagDefs.forEach(({ name, content = 'content', selector, htmlContent }) => {
    const tag = doc.querySelector(selector);
    if (tag)
      ret[name] = htmlContent ? tag.innerHTML : tag.getAttribute(content);
  });
  return ret;
}

/**
 * Checks if URL starts with http protocol and adds http:// if not
 * @param  {string} url
 * @return {string} - Url guaranteed to start with http[s]?://
 */
function ensureProtocol(url) {
  if (!/^http[s]?:\/\//.test(url)) {
    url = 'http://' + url;
  }
  return url;
}
