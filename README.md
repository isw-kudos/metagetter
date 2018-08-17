# metagetter
A simple nodejs utility that gets the metadata for a url to enable url/link previews

## Usage
```
//two exposed functions
import { expressHandler, getMetaData } from 'metagetter';

//express handler
//expects a query param 'url'
router.route('/metagetter').get(expressHandler);

//api
getMetaData('www.google.com').then(metaData => {
  console.log(metaData);
});
```

### Supported Tags
See `config.js` for tag config
