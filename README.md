# rethink-decl [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url]

Allows you to create RethinkDB queries from options objects. Useful for dealing grabbing querystring parameters and turning them into a query in an API endpoint.

## Install

```
npm install rethink-decl --save
```

## API

### decl(model, options)

- `model` is a thinky model object
- `options` is your object full of options
  - `limit`
    - Type: Number
    - Controls maximum number of results
  - `offset`
    - Type: Number
    - Controls which offset to start reading from
  - `sort`
    - Type: Array of field names or comma-separated field names
    - Ascending by default
    - Prefix field names with - for descending
  - Any other options will be treated as a filters
- Returns the query

Be advised: There is no default limit. All results will be returned.

## Example

```js
var decl = require('rethink-decl')

var User = thinky.createModel('User', {
  id: type.number(),
  name: type.string(),
  times: {
    created: Date,
    updated: Date
  }
})

// find me 5 users with the name 'Eric'
// start at offset 5
// this is equiv to fetching page #2
decl(User, {
  limit: 5,
  offset: 5,
  name: 'Eric',
  sort: [
    '-age'
  ]
}).run(function(err, data){
  // do stuff with it
})
```


[downloads-image]: http://img.shields.io/npm/dm/rethink-decl.svg
[npm-url]: https://npmjs.org/package/rethink-decl
[npm-image]: http://img.shields.io/npm/v/rethink-decl.svg

[travis-url]: https://travis-ci.org/contra/rethink-decl
[travis-image]: https://travis-ci.org/contra/rethink-decl.png?branch=master
