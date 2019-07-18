import { compose, isNil, join, juxt, map, path, pick, prop, reject, trim } from 'ramda'
import { assocWith } from '@articulate/funky'
import yelp from 'yelp-fusion'
import config from '../config'
import restaurantTransformer from '../transformers/restaurant'

const buildSearch = assocWith(
  'term',
  compose(
    trim,
    join(' '),
    juxt([
      prop('search'),
      compose(
        join(' '),
        prop('criteria')
      ),
    ])
  )
)

const buildQuery = compose(
  pick(['term', 'price', 'location']),
  buildSearch,
  reject(isNil)
)

const search = criteria =>
  yelp
    .client(config.services.yelp)
    .search(buildQuery(criteria))
    .then(path(['jsonBody', 'businesses']))
    .then(map(restaurantTransformer))

export { search }
