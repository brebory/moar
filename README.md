# moar

node.js wrapper for the 4chan api

## Getting Started
Install the module with: `npm install moar`

Include moar in your application with:
```javascript
var moar = require('moar');
```

## Documentation
```javascript
moar.get(options, callback)
```
Sends a GET request to api.4chan.org as specified by the options hash. 
| **key**         | **value**      | **example**          | **default**  | **description**                               |
|:----------------|:---------------|:---------------------|:-------------|:----------------------------------------------|
| `board`         | `string`       | `'tg'`               | `'b'`        | board name to retrive, no wrapping slashes    | 
| `threadcount`   | `integer`      | `23`                 | `10`         | number of threads to retrieve                 |
| `nosage`        | `boolean`      | `true`               | `false`      | filter sage posts                             |

```javascript
moar.search(options, callback)
```
Sends a GET request to api.4chan.org as specified by the options hash. Returns a list of all posts that contain `searchterm`


## Examples
```javascript
moar.get(options, function(err, data) {
  if(err) {
    // handle errors
  } else {
    // do stuff with returned json
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2013 brebory  
Licensed under the MIT license.
