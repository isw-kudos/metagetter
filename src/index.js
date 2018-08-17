import _getMetaData from './lib/metagetter';
import tagDefs from './config';

/**
 * handler function for express requests.
 * Calls getMetaData and responds with returned value
 * @param  {HTTPRequest} req
 * @param  {Response} res
 */
export function handle(req, res) {
  const { query } = req;
  const { url } = query;
  _getMetaData(tagDefs, url)
    .then(metaData => res.status(200).json(metaData))
    .catch(
      error =>
        console.log(`Error getting metaData for url ${url}`, error) ||
        res.status(error.status || 500).send(error)
    );
}

export const getMetaData = _getMetaData.bind(null, tagDefs);
