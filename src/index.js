import _getMetaData from './lib/metagetter';
import tagDefs from './config';

export const getMetaData = _getMetaData.bind(null, tagDefs);

/**
 * Convenience function for handling express requests.
 */
export function expressHandler(req, res) {
  const { query } = req;
  const { url } = query;
  getMetaData(url)
    .then(meta => res.status(200).json(meta))
    .catch(err => {
      console.error(`metagetter err: ${url}`, err);
      res.status(err.status || 500).send(err);
    });
}
