import React from 'react'
import Rating from 'react-rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons'

export default function RatingStars({ rating }) {
  return (
    <Rating
      emptySymbol={
        <FontAwesomeIcon icon={faSolidStar} size="lg" color="gray" />
      }
      fullSymbol={<FontAwesomeIcon icon={faSolidStar} size="lg" color="gold" />}
      fractions={2}
      initialRating={rating}
      readonly
    />
  )
}
