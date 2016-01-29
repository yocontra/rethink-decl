import omit from 'lodash.omit'

const ourOptions = [
  'limit',
  'offset',
  'page',
  'tail'
]

export default (Model, options) => {
  let filter = omit(options, ourOptions)
  let limit = +options.limit || 100
  let offset = +options.offset || 0
  if (options.page) offset += options.page * limit

  let q = Model.filter(filter)
  if (options.tail) {
    q = q.changes()
  } else {
    q = q.slice(offset, offset + limit)
  }

  return q
}
