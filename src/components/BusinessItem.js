import React from 'react'
import logo from '../images/Yelp.png'
import './BusinessItem.scss'

function getStars(stars) {
  const file = stars % 1 === 0 ? stars : Math.floor(stars) + '_half'
  return require('../images/small_' + file + '.png')
}
function convertDistance(distance) {
  const feet = 3.28084
  const newDistance =
    distance / feet < 1320
      ? Math.floor(distance / feet) + ' ft'
      : (Math.floor(distance / feet) / 1320).toFixed(2) + ' miles'
  return newDistance
}

export default function BusinessItem({ business }) {
  return (
    <div className="business-item">
      <img src={business.image} className="business-item__image" />
      <div className="business-item__wrapper">
        <div className="business-item__content">
          <div className="business-item__meta">
            {business.price} | {business.categories.join(', ')}
          </div>
          <h3 className="business-item__title">{business.name}</h3>
          <div className="business-item__details">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                business.name
              )}${encodeURIComponent(business.address)}`}
            >
              {business.address}
            </a>
            <a href={`tel:${business.phone}`}>{business.phone}</a>
            {convertDistance(business.distance)}
          </div>
          <div className="business-item__rating">
            <img className="business-item__stars" src={getStars(business.rating)} />
            {business.reviewCount} Reviews
          </div>
          <img src={logo} className="business-item__logo" />
        </div>
      </div>
    </div>
  )
}
