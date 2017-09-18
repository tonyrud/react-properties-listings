import React from 'react'
import data from './data/Data'

import Card from './Card'
import Header from './Header'
import GoogleMap from './GoogleMap'
import jump from 'jump.js'
import { easeInOutCubic } from './utils/Easing'
import image from './../images/location-map.svg'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      properties: data.properties,
      activeProperty: data.properties[0],
      filterIsVisible: false,
      filterBedrooms: 'any',
      filterBathrooms: 'any',
      filterCars: 'any',
      filteredProperties: [],
      isFiltering: false
    }

    this.setActiveProperty = this.setActiveProperty.bind(this)
    this.toggleFilter = this.toggleFilter.bind(this)
    this.clearFilter = this.clearFilter.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.filterProperties = this.filterProperties.bind(this)
  }

  handleFilterChange(e) {
    const target = e.target
    const { value, name } = target
    this.setState(
      {
        [name]: value
      },
      function(params) {
        // run after state has been set in callback, can also use componentDidUpdate
        this.filterProperties()
      }
    )
  }

  clearFilter(e, form) {
    e.preventDefault()

    this.setState({
      filterBedrooms: 'any',
      filterBathrooms: 'any',
      filterCars: 'any',
      filteredProperties: [],
      isFiltering: false,
      activeProperty: this.state.properties[0]
    })

    form.reset()
  }

  filterProperties() {
    const {
      properties,
      filterBedrooms,
      filterBathrooms,
      filterCars
    } = this.state
    const isFiltering =
      filterBedrooms !== 'any' ||
      filterBathrooms !== 'any' ||
      filterBathrooms !== 'any'

    const getFilteredProperties = properties => {
      const filteredProperties = []
      properties.map(property => {
        const { bedrooms, bathrooms, carSpaces } = property
        const match =
          (bedrooms === parseInt(filterBedrooms) || filterBedrooms === 'any') &&
          (bathrooms === parseInt(filterBathrooms) ||
            filterBathrooms === 'any') &&
          (carSpaces === parseInt(filterCars) || filterCars === 'any')

        // if match is true
        match && filteredProperties.push(property)
      })

      return filteredProperties
    }

    // console.log(isFiltering, filterBedrooms)
    this.setState({
      filteredProperties: getFilteredProperties(properties),
      isFiltering,
      activeProperty: getFilteredProperties(properties)[0] || properties[0]
    })
  }

  toggleFilter(e) {
    e.preventDefault()
    this.setState({
      filterIsVisible: !this.state.filterIsVisible
    })
  }

  setActiveProperty(property, scroll = true) {
    const { index } = property
    this.setState({
      activeProperty: property
    })

    const target = `#card-${index}`

    if (scroll) {
      jump(target, {
        duration: 800,
        easing: easeInOutCubic
      })
    }
  }

  render() {
    const {
      properties,
      activeProperty,
      filterIsVisible,
      filteredProperties,
      isFiltering
    } = this.state

    const propertiesList = isFiltering ? filteredProperties : properties

    return (
      <div>
        {/* listings - Start */}
        <div className="listings">
          <Header
            handleFilterChange={this.handleFilterChange}
            toggleFilter={this.toggleFilter}
            clearFilter={this.clearFilter}
            filterIsVisible={filterIsVisible}
          />

          <div className="cards container">
            <div className={`cards-list row ${propertiesList.length === 0 ? 'is-empty':''}`}>
              {propertiesList.map(property => (
                <Card
                  activeProperty={activeProperty}
                  key={property._id}
                  property={property}
                  setActiveProperty={this.setActiveProperty}
                />
              ))}
              {isFiltering &&
              propertiesList.length === 0 && (
                <p className="warning"><img src={image}/><br/>No properties were found.</p>
              )}
            </div>
          </div>
        </div>
        {/* listings - End */}

        {/* mapContainer - Start */}
        <GoogleMap
          properties={properties}
          activeProperty={activeProperty}
          setActiveProperty={this.setActiveProperty}
          filteredProperties={filteredProperties}
          isFiltering={isFiltering}
        />

        {/* mapContainer - End */}
      </div>
    )
  }
}

export default App
