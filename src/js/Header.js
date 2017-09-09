import React, { PropTypes } from 'react'
import image from '../images/house-location-pin.svg'
import Filter from './Filter'

const Header = ({filterIsVisible, toggleFilter}) => {
  return (
    <header className={`${filterIsVisible ? 'filter-is-visible' : ''}`}>
      <Filter toggleFilter={toggleFilter}/>

      <img src={image} />
      <h1>Property Listings</h1>
      <button onClick={(e) => toggleFilter(e)} className="btn-filter">Filter</button>
    </header>
  )
}

Header.propTypes = {
  filterIsVisible: PropTypes.bool.isRequired,
  toggleFilter: PropTypes.func.isRequired
}

export default Header