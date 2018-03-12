import React from "react"
import { connect } from "react-redux"

import * as Map from "../actions/Map"

export default class MapInterface extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      zoom: 13,
      lat: -33.8688,
      lng: 151.2195,
      maptype: 'roadmap',
      place_formatted: '',
      place_id: '',
      place_location: '',
    };
  }

  componentDidMount() {
    let map = new window.google.maps.Map(document.getElementsByClassName('map')[0], {
      center: {lat: this.state.lat, lng: this.state.lng},
      zoom: 13,
      mapTypeId: 'roadmap',
    });
    map.addListener('zoom_changed', () => {
      this.setState({
        zoom: map.getZoom(),
      });
    });

    map.addListener('drag', (e) => {
      this.setState({
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      });
    });

    map.addListener('maptypeid_changed', () => {
      this.setState({
        maptype: map.getMapTypeId(),
      });
    });


    let marker = new window.google.maps.Marker({
      map: map,
      position: {lat: this.state.lat, lng: this.state.lng},
    });

    // initialize the autocomplete functionality using the #pac-input input box
    let inputNode = document.getElementsByClassName('map__container__location__input')[0];
    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(inputNode);
    let autoComplete = new window.google.maps.places.Autocomplete(inputNode);

    autoComplete.addListener('place_changed', () => {
      let place = autoComplete.getPlace();
      let location = place.geometry.location;

      this.setState({
        place_formatted: place.formatted_address,
        place_id: place.place_id,
        place_location: location.toString(),
      });

      // bring the selected place in view on the map
      map.fitBounds(place.geometry.viewport);
      map.setCenter(location);

      marker.setPlace({
        placeId: place.place_id,
        location: location,
      });
    });
  }

  render() {
    return (
      <div className="map__container">
        <div className='map__container__state'>
            Zoom level: {this.state.zoom}<br />
            Map type: {this.state.maptype}<br />
            Latitude: {this.state.lat}<br />
            Longtitude: {this.state.lng}<br />
            Place: {this.state.place_formatted}<br />
            Place ID: {this.state.place_id}<br />
            Location: {this.state.place_location}<br />
        </div>
        <div className='map__container__location'>
          <input className='map__container__location__input' type='text' placeholder='Enter a location' />
        </div>
        <div className='map' />
      </div>
    );
  }
}
