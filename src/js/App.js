import React from 'react'
import data from './data/Data'

import Card from './Card'
import Header from './Header'
import GoogleMap from './GoogleMap'
import jump from 'jump.js'
import {easeInOutCubic} from './utils/Easing'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      properties: data.properties,
      activeProperty: data.properties[0],
      filterIsVisible: false,
      filterBedrooms: 'any',
      filteredProperties: [],
      isFiltering: false
    }

    this.setActiveProperty = this.setActiveProperty.bind(this)
    this.toggleFilter = this.toggleFilter.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.filterProperties = this.filterProperties.bind(this)
  }

  handleFilterChange(e) {
    const target = e.target
    const {value, name} = target
    this.setState({
      [name]: value
    }, function(params) {
       // run after state has been set in callback, can also use componentDidUpdate
      this.filterProperties()
    })
  }

  filterProperties() {
    const {properties, filterBedrooms} = this.state
    const isFiltering = filterBedrooms !== 'any'

    const getFilteredProperties = (properties) => {
      const filteredProperties = []
      properties.map(property => {
        const {bedrooms} = property
        const match = bedrooms === parseInt(filterBedrooms) || filterBedrooms === 'any'

        // if match is true
        match && filteredProperties.push(property)
      })

      return filteredProperties
    }

    // console.log(isFiltering, filterBedrooms)
    this.setState({
      filteredProperties: getFilteredProperties(properties),
      isFiltering,
      activeProperty: getFilteredProperties(properties)[0]
    })

  }

  toggleFilter(e) {
    e.preventDefault()
    this.setState({
      filterIsVisible: !this.state.filterIsVisible
    })
  }

  setActiveProperty(property, scroll = true) {
    const {index} = property
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
    const { properties, activeProperty, filterIsVisible, filteredProperties, isFiltering } = this.state

    const propertiesList = isFiltering ? filteredProperties : properties

    return (
      <div>
        {/* listings - Start */}
        <div className="listings">
         
         <Header handleFilterChange={this.handleFilterChange} toggleFilter={this.toggleFilter} filterIsVisible={filterIsVisible}/>

          <div className="cards container">
            <div className="cards-list row ">
              {propertiesList.map(property =>
                <Card
                  activeProperty={activeProperty}
                  key={property._id}
                  property={property}
                  setActiveProperty={this.setActiveProperty}
                />
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
