import React from 'react'
import { Image } from 'react-bootstrap'

import true_star from '../../res/ItemPage/black_star.png'
import false_star from '../../res/ItemPage/star.png'

import '../../styles/Star_rating.css'
const StarRating = ({ rating }) => {
  const MAX_STARS = 5
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  const emptyStars = MAX_STARS - fullStars - (hasHalfStar ? 1 : 0)

  const starIcons = []
  for (let i = 0; i < fullStars; i++) {
    starIcons.push(
      <i key={i} className="fas fa-star">
        <Image className="true_false_rate_stars" src={true_star} />
      </i>
    )
  }
  if (hasHalfStar) {
    starIcons.push(<i key="half-star" className="fas fa-star-half-alt"></i>)
  }
  for (let i = 0; i < emptyStars; i++) {
    starIcons.push(
      <i key={i} className="far fa-star">
        <Image className="true_false_rate_stars" src={false_star} />
      </i>
    )
  }

  return <div>{starIcons}</div>
}
export default StarRating
