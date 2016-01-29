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
  - `limit` - Number, maximum number of results per page (Defaults to 100)
  - `offset` - Number, which offset to start reading from (Defaults to 0)
  - `page` - Number, what page to read
  - `tail` - Boolean, set to true if you want a `changes()` feed back
  - Any other options will be treated as a filters
- Returns the query

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
decl(User, {
  limit: 5,
  page: 0,
  name: 'Eric'
}).run(function(err, data){
  // do stuff with it
})
```


[downloads-image]: http://img.shields.io/npm/dm/rethink-decl.svg
[npm-url]: https://npmjs.org/package/rethink-decl
[npm-image]: http://img.shields.io/npm/v/rethink-decl.svg

[travis-url]: https://travis-ci.org/contra/rethink-decl
[travis-image]: https://travis-ci.org/contra/rethink-decl.png?branch=master
