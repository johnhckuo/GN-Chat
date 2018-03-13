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
    var searchBox = new google.maps.places.SearchBox(inputNode);
    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(inputNode);
    let autoComplete = new window.google.maps.places.Autocomplete(inputNode);
    
    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    searchBox.addListener('places_changed', () => {
      var places = searchBox.getPlaces();
      
      if (places.length == 0 ){
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];
      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }

        let location = place.geometry.location;
        this.setState({
          place_formatted: inputNode.value,
          place_id: place.place_id,
          place_location: location.toString(),
        });

      });
      map.fitBounds(bounds);
    });
  }

  getPostion(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          this.setState({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        });
    } else { 
        alert("Geolocation is not supported by this browser.");
    }
  }


  render() {
    return (
      <div className="map__container">
        <div className='map__container__state'>
            Zoom level: {this.state.zoom}<br />
            Map type: {this.state.maptype}<br />
            Latitude: {this.state.lat.toFixed(5)}<br />
            Longtitude: {this.state.lng.toFixed(5)}<br />
            Place: {this.state.place_formatted}<br />
            Place ID: {this.state.place_id}<br />
            Location: {this.state.place_location}<br />
        </div>
        <div className='map__container__location'>
          <input className='map__container__location__input' type='text' placeholder='Enter a location' />
          <button className="map__container__location__positioningBtn" onClick={this.getPostion.bind(this)}>Positioning</button>
        </div>
        <div className='map' />
      </div>
    );
  }
}
