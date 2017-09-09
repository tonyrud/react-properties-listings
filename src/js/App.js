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
      filterBedrooms: 'any'
    }

    this.setActiveProperty = this.setActiveProperty.bind(this)
    this.toggleFilter = this.toggleFilter.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  handleFilterChange(e) {
    const target = e.target
    const {value, name} = target
    // console.log(value, name)
    this.setState({
      [name]: value,

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
    const { properties, activeProperty, filterIsVisible } = this.state

    return (
      <div>
        {/* listings - Start */}
        <div className="listings">
         
         <Header handleFilterChange={this.handleFilterChange} toggleFilter={this.toggleFilter} filterIsVisible={filterIsVisible}/>

          <div className="cards container">
            <div className="cards-list row ">
              {properties.map(property =>
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
        />

        {/* mapContainer - End */}
      </div>
    )
  }
}

export default App
