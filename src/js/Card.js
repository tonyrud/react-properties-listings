import React from 'react'
import PropTypes from 'prop-types'
import {priceFormat} from './utils/Formatters'

const Card = ({ property, activeProperty, setActiveProperty }) => {
  const {
    price,
    address,
    city,
    picture,
    bedrooms,
    bathrooms,
    carSpaces,
    index
  } = property

  return (
    <div onClick={() => setActiveProperty(property, false)}
      id={`card-${index}`}
      className={`card col-sm-12 col-md-6 col-lg-4 ${property === activeProperty
        ? 'is-active'
        : ''}`}
    >
      <img src={picture} alt={`picture-${city}`} />
      <p className="price">
        {priceFormat(price)}
      </p>
      <div className="details">
        <span className="index">
          {index + 1}
        </span>
        <p className="location">
          {city}
          <br />
          {address}
        </p>
        <ul className="features">
          <li className="icon-bed">
            {bedrooms}
            <span>bedrooms</span>
          </li>
          <li className="icon-bath">
            {bathrooms}
            <span>bathrooms</span>
          </li>
          <li className="icon-car">
            {carSpaces}
            <span>parking spots</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

Card.propTypes = {
  property: PropTypes.object.isRequired,
  activeProperty: PropTypes.object.isRequired,
  setActiveProperty: PropTypes.func.isRequired
}

export default Card
