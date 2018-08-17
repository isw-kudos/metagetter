# metagetter
A simple nodejs utility that gets the metadata for a url to enable url/link previews

## Usage
```
import { handle, getMetaData } from 'metagetter';
const router = new express.Router();

//express requests
router.route('/metagetter').get(handle);

//api
getMetaData('www.google.com').then(metaData => {
  console.log(metaData);
  /*
  {
    ...
  }
   */
});
```

### Supported Tags
See `config.js` for tag config
