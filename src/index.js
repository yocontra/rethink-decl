import omit from 'lodash.omit'

const ourOptions = [
  'limit',
  'offset',
  'page',
  'tail',
  'sort'
]

const applySort = (q, sort) => {
  if (!Array.isArray(sort)) {
    if (typeof sort !== 'string') {
      throw new Error('sort must be a string or array')
    }
    sort = sort.split(',')
  }

  let r = q._r
  let orderBy = sort.map((prop) =>
    prop.indexOf('-') === 0
      ? r.desc(prop.substring(1))
      : r.asc(prop)
  )

  return q.orderBy(...orderBy)
}

export default (Model, options) => {
  let filter = omit(options, ourOptions)
  let limit = +options.limit || 100
  let offset = +options.offset || 0
  if (options.page) offset += options.page * limit

  let q = Model.filter(filter)
  if (options.sort) {
    q = applySort(q, options.sort)
  }
  if (options.tail) {
    q = q.changes()
  } else {
    q = q.slice(offset, offset + limit)
  }

  return q
}
