import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Marker from 'react-icons2/md/room';
import autobind from 'core-decorators/lib/autobind';
import GoogleMapReact from 'google-map-react';
import { css } from '@emotion/core';
import SearchBox from './SearchBox';
// import { Icon } from './Geo2.styles';

const markerWrapperStyle = css`
/* border: 1px red solid; */
`;
const markerStyle = css`
  font-size: 48px;
  color: #B71C1C;
  /* border: 1px black solid; */
  position: relative;
  left: -26px;
  top: -53px;
`;


class Geo2 extends Component {
  constructor(props) {
    super(props);
    const val = props.field.value || [59.95, 30.33];
    // props.field.value[0];
    // props.field.value[0];
    this.state = {
      // zoom: 9,
      center: {
        lat: val[1],
        lng: val[0],
      },
      mapsApiLoaded: false,
      mapInstance: null,
      mapsapi: null,
    };
  }


  // @autobind
  // onCircleInteraction(childKey, childProps, mouse) {
  //   this.setState({
  //     draggable: false,
  //     lat: mouse.lat,
  //     lng: mouse.lng,
  //   });
  //   console.log('onCircleInteraction called with', childProps);
  // }

  // @autobind
  // onCircleInteraction3(childKey, childProps) {
  //   this.setState({ draggable: true });
  //   console.log('onCircleInteraction called with', childProps);
  // }

  @autobind
  onChange({ center, zoom }) {
    const { field, form } = this.props;
    form.setFieldValue(field.name, [center.lng, center.lat]);
    // console.log('onChange', center, zoom);
    this.setState({
      center,
      // zoom,
    });
  }

  @autobind
  apiLoaded({ map, maps }) {
    this.setState({
      mapsApiLoaded: true,
      mapInstance: map,
      mapsApi: maps,
    });
  }


  render() {
    const {
      field, form, height = 300, width = '100%', apiKey, search = true, ...props
    } = this.props;
    const {

      mapsApiLoaded,
      mapInstance,
      mapsApi,
    } = this.state;

    return (
      <div style={{ height, width, position: 'relative' }}>
        {/* {apiKey} */}
        {search && mapsApiLoaded && (
          <div
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              zIndex: 2,
            }}
          >
            <SearchBox map={mapInstance} mapsApi={mapsApi} onPlacesChanged={console.log} />
          </div>
        )}
        <GoogleMapReact
          // {...this.field}
          // {...props}
          // style={{ height: '100vh', width: 100 }}

          bootstrapURLKeys={{
            key: apiKey,
            language: 'ru',
            region: 'ru',
            libraries: search ? 'places' : '',
          }}
          // bootstrapURLKeys={`${apiKey}&callback=initMap`}
          // defaultCenter={this.props.center}
          defaultCenter={{
            lat: 59.95,
            lng: 30.33,
          }}
          // defaultZoom={this.props.zoom}
          draggable={this.state.draggable}
          onChange={this.onChange}
          center={this.state.center}
          defaultZoom={9}
          layerTypes={['TrafficLayer', 'TransitLayer']}
          options={maps => ({
            panControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            scrollwheel: true,
            fullscreenControl: true,
            // styles: [{ stylers: [{ saturation: -100 }, { gamma: 0.8 }, { lightness: 4 }, { visibility: 'on' }] }],
          })}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={this.apiLoaded}
          {...props}

          // zoom={this.state.zoom}
          // {...props}
          // onChildMouseDown={this.onCircleInteraction}
          // onChildMouseUp={this.onCircleInteraction3}
          // onChildMouseMove={this.onCircleInteraction}
          // onChildClick={() => console.log('child click')}
          // onClick={() => console.log('mapClick')}
        >
          <div className={markerWrapperStyle} >
            <span className={markerStyle} >
              <Marker />
            </span>
          </div>
        </GoogleMapReact>
      </div>
    );
  }
}

export default Geo2;


// const {
//   field, form, height = 300, width = 300, apiKey, ...props
// } = this.props;
// return (
//   <div style={{ height, width }}>
//     <GoogleMapReact
//       // {...this.field}
//       // {...props}
//       // style={{ height: '100vh', width: 100 }}

//       bootstrapURLKeys={apiKey}
//       defaultCenter={this.props.center}
//       defaultCenter={{
//         lat: 59.95,
//         lng: 30.33,
//       }}
//       defaultZoom={this.props.zoom}

//       draggable={this.state.draggable}
//       onChange={this.onChange}
//       // center={this.state.center}
//       // zoom={this.state.zoom}
//       onChildMouseDown={this.onCircleInteraction}
//       onChildMouseUp={this.onCircleInteraction3}
//       onChildMouseMove={this.onCircleInteraction}
//       onChildClick={() => console.log('child click')}
//       onClick={() => console.log('mapClick')}
//     >
//       <div
//         className="place"
//       >
//         <Marker />
//         {/* <Icon>
//           <Marker />
//         </Icon> */}
//       </div>
//     </GoogleMapReact>
//   </div>
// );

