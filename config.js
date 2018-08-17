/**
 * Definition of tags to extract from HTML pages
 * Tag Props:
 * selector - css selector to find element
 * htmlContent - use innerHTML value as content
 * name - Tags with same `name` will get overritten in order of the definition
 * order . i.e. last definition will take priority
 * content - Attribute to get tag value. Defaults to the string 'content'
 * unless the `htmlContent` property is true. In which case innerHTML is used
 *  instead of an attribute value
 * @type {Array}
 */
module.exports = [
  // description
  {
    name: 'description',
    selector: 'meta[name="description"]',
  },
  {
    name: 'description',
    selector: 'meta[name="twitter:description"]',
  },
  {
    name: 'description',
    selector: 'meta[property="og:description"]',
  },
  // title
  {
    name: 'title',
    selector: 'title',
    htmlContent: true,
  },
  {
    name: 'title',
    selector: 'meta[name="twitter:title"]',
  },
  {
    name: 'title',
    selector: 'meta[property="og:title"]',
  },
  // image
  {
    name: 'image',
    selector: 'meta[name="twitter:image"]',
  },
  {
    name: 'image',
    selector: 'meta[property="og:image"]',
  },
  // favicon
  {
    name: 'favicon',
    selector: 'link[rel="icon"]',
    content: 'href',
  },
];
