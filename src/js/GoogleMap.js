import React from 'react'
import PropTypes from 'prop-types'

class GoogleMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      markers: []
    }
  }

  componentWillReceiveProps(nextProps) {
    const { activeProperty } = nextProps
    const { latitude, longitude, index } = activeProperty

    // hide all other info boxes
    this.hideAll()
    // show active property info window
    this.showIW(index)
  }
  
  showIW(index) {
    const {markers} = this.state
    markers[index] && markers[index].iw.open(this.map, markers[index])
  }
  
  hideAll() {
    const {markers} = this.state
      markers.forEach(marker => {
        marker.iw.close()
      })
  }

  componentDidMount() {
    const { properties, activeProperty } = this.props
    const { latitude, longitude } = activeProperty

    this.map = new google.maps.Map(this.refs.map, {
      center: { lat: latitude, lng: longitude },
      zoom: 15,
      mapTypeControl: false
    })

    this.createMarkers(properties)
  }

  createMarkers(properties) {
    const { setActiveProperty, activeProperty } = this.props
    const activePropertyIndex = activeProperty.index
    const { markers } = this.state

    properties.map(prop => {
      const { latitude, longitude, index, address } = prop
      this.marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: this.map,
        label: {
          color: '#ffffff',
          text: `${index + 1}`
        },
        icon: {
          url:
            'https://ihatetomatoes.net/react-tutorials/google-maps/images/img_map-marker.png',
          size: new google.maps.Size(22, 55),
          origin: new google.maps.Point(0, -15),
          anchor: new google.maps.Point(11, 52)
        }
      })

      const iw = new google.maps.InfoWindow({
        content: `<h1>${address}</h1>`
      })

      this.marker.iw = iw

      markers.push(this.marker)

      // show active property info window
      this.showIW(activePropertyIndex)

      this.marker.addListener('click', function() {
        // hide all info boxes
        this.hideAll()
        // set active property into state
        setActiveProperty(prop)
      }.bind(this))
    })
  }

  render() {
    return (
      <div className="mapContainer">
        <div id="map" ref="map" />
      </div>
    )
  }
}

GoogleMap.propTypes = {
  properties: PropTypes.array.isRequired,
  setActiveProperty: PropTypes.func.isRequired
}

export default GoogleMap
