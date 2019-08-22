import React from 'react';
import {Map,InfoWindow,Marker,GoogleApiWrapper,Polyline} from 'google-maps-react';
import List from './List.js'

const API_KEY = 'API_KEY_HERE'

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {
        lat: 54.31600959373498,
        lng: 48.36563230820026
      },
      items: [],
      showingInfoWindow: false,
      activeMarker: {},
      title: ''
    }
    this.centerMoved = this.centerMoved.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.dragMarker = this.dragMarker.bind(this);
    this.dragItem = this.dragItem.bind(this);
    this.addMarkerKeyEnter = this.addMarkerKeyEnter.bind(this);
    this.inputRef = React.createRef();
  }

  centerMoved(mapProps, map) {
    this.setState({
      position: {
        lat: map.getCenter().lat(),
        lng: map.getCenter().lng()
      }
    })
  }

  addMarkerKeyEnter(event) {
    if(event.keyCode === 13) {
      this.addMarker()
    }
  }

  addMarker() {
    if(this.inputRef.current.value === '') {
      alert('Введите название пункта назначения')
    }
    else {
    if(this.state.items.length === 0 || this.state.length < 1) {
     this.setState({
      position: {
        lat: this.state.position.lat,
        lng: this.state.position.lng,
        value: this.inputRef.current.value
        },
      }, () => {
        this.setState({
          items: [...this.state.items, this.state.position]
        })
    })
    this.inputRef.current.value = '';
    }
    else {
      let objCoord = this.state.items.map((item)=> {
        return item
      });
      let currentPosition = this.state.position;
      let inputValue = this.inputRef.current.value;
      function findClone(element) {
        return element.lat === currentPosition.lat || element.value === inputValue
      }
      let clone = objCoord.find(findClone)
      if(clone !== undefined) {
        if (clone.lat === this.state.position.lat) {
          alert('В данной точке уже есть маркер, выберете другую точку на карте');
          this.inputRef.current.value = '';
        }
        else if (clone.value === this.inputRef.current.value) {
          alert(`Маркер ${clone.value} уже существует, выберете другое название`)
          this.inputRef.current.value = '';
        }
      }
      else {
        this.setState({
          position: {
            lat: this.state.position.lat,
            lng: this.state.position.lng,
            value: this.inputRef.current.value
            },
          }, () => {
            this.setState({
              items: [...this.state.items, this.state.position]
            })
        })
        this.inputRef.current.value = '';
        }
      }
    }
  }
    
  onMarkerClick = (props, marker, e) => {
    this.setState({
      title: props.name,
      activeMarker: marker,
      showingInfoWindow: true
    })
  };

  dragMarker(coord, index, item) {
    let marker = {
      lat: coord.latLng.lat(),
      lng: coord.latLng.lng(),
      value: item.value
    };
    this.state.items.splice(index, 1, marker)
    this.setState({
      items: this.state.items,
      showingInfoWindow: false
    })
  }

  dragItem(newItems) {
    this.setState({ items: newItems })
  }

  render() {
    const initialStyle = {
    maxWidth: '700px',
    height: '700px',
    width: '100%',
    overflow: 'hidden'
  }
  return (
    <div className="wrapper">
      <div className="wrapper__map">
      <Map initialCenter={{
        lat: this.state.position.lat,
        lng: this.state.position.lng}}
        onDragend={this.centerMoved} 
        style={initialStyle} 
        google={this.props.google} 
        zoom={14}>
        {
         this.state.items.map((item, index)=> {
            return  <Marker 
            onClick={this.onMarkerClick} 
            draggable={true}
            name={item.value} 
            key={index}
            position={{lat: item.lat, lng: item.lng}} 
            onDragend={(t, map, coord) => this.dragMarker(coord, index, item)} />
          })
        }
        <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
          <div>
            <h3>{this.state.title}</h3>
          </div>
        </InfoWindow>  
        <Polyline 
          path={this.state.items.map((item)=> {return item;})} 
          strokeColor="#0004ff" 
          strokeOpacity={1} 
          strokeWeight={4} />
      </Map>
      </div>
      <div className="wrapper__list list">
        <div className="list__input">
          <input onKeyUp={this.addMarkerKeyEnter}  ref={this.inputRef} type="text"/>
          <button onClick={this.addMarker}>Добавить</button>
        </div>  
      <List dragItemProps={this.dragItem} list={this.state.items}/>
    </div>
  </div>);
  }  
}
export default GoogleApiWrapper({
  apiKey: (API_KEY)
})(MapContainer)










