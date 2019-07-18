import { join, pluck } from 'ramda'

export default restaurant => ({
  name: restaurant.name,
  alias: restaurant.alias,
  image: restaurant.image_url,
  rating: restaurant.rating,
  reviewCount: restaurant.review_count,
  address: join(' ', restaurant.location.display_address),
  phone: restaurant.display_phone,
  distance: restaurant.distance,
  price: restaurant.price,
  categories: pluck('title', restaurant.categories),
})
