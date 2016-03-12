import omit from 'lodash.omit'

const ourOptions = [
  'limit',
  'offset',
  'sort'
]
const applySort = (q, sort) => {
  if (!Array.isArray(sort)) {
    if (typeof sort !== 'string') {
      throw new Error('sort must be a string or array')
    }
    sort = sort.split(',')
  }

  const r = q._r
  const orderBy = sort.map((prop) =>
    prop.indexOf('-') === 0
      ? r.desc(prop.substring(1))
      : r.asc(prop)
  )

  return q.orderBy(...orderBy)
}

export default (Model, options) => {
  const filter = omit(options, ourOptions)

  let q = Model.filter(filter)
  if (options.sort) {
    q = applySort(q, options.sort)
  }

  if (options.offset != null) {
    q = q.slice(options.offset, options.offset + (options.limit || 0))
  } else if (options.limit != null) {
    q = q.slice(0, options.limit)
  }

  return q
}
