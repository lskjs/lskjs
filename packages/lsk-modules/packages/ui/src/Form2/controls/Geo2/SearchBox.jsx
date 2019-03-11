import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBox extends Component {
  static propTypes = {
    mapsApi: PropTypes.shape({
      places: PropTypes.shape({
        SearchBox: PropTypes.func,
      }),
      event: PropTypes.shape({
        clearInstanceListeners: PropTypes.func,
      }),
    }).isRequired,
    placeholder: PropTypes.string,
    onPlacesChanged: PropTypes.func,
  };

  static defaultProps = {
    placeholder: 'Search...',
    onPlacesChanged: null,
  };

  constructor(props) {
    super(props);

    this.searchInput = React.createRef();
  }

  componentDidMount() {
    const {
      mapsApi: { places },
    } = this.props;

    this.searchBox = new places.SearchBox(this.searchInput.current);
    this.searchBox.addListener('places_changed', this.onPlacesChanged);
  }

  componentWillUnmount() {
    const {
      mapsApi: { event },
    } = this.props;

    event.clearInstanceListeners(this.searchBox);
  }

  onPlacesChanged = () => {
    const { onPlacesChanged } = this.props;

    if (onPlacesChanged) {
      onPlacesChanged(this.searchBox.getPlaces());
    }
  };

  render() {
    const { placeholder } = this.props;

    return (
      <input
        ref={this.searchInput}
        placeholder={placeholder}
        type="text"
        // style={{
        //   width: '392px',
        //   height: '48px',
        //   fontSize: '20px',
        //   padding: '12px 104px 11px 64px',
        // }}
      />
    );
  }
}

export default SearchBox;


// class SearchBox {
//   constructor(props) {
//     super(props);
//     this.input = React.createRef();
//   }
//   render() {
//     return (
//       <div style={{ position: 'absolute', top: '0', left: '0' }} className="Searchboxfff">
//         <input
//           type="text"
//           id="search1"
//           onChange={this.handleChange}
//           ref="input"
//           placeholder="Customized your placeholder"
//         />
//       </div>
//     );
//     return <input ref={this.input} {...this.props} type="text" />;
//   }
//   componentDidMount() {
//     console.log('this.input', this.input);
//     const { input } = this;

//     // const input = ReactDOM.findDOMNode(this.input);
//     setTimeout(() => {
//       console.log(google.maps);

//       this.searchBox = new google.maps.places.SearchBox(input);
//       this.searchBox.addListener('places_changed', this.onPlacesChanged);
//     }, 1000);
//   }
//   handleChange = (e) => {
//     console.log(this.props, e);
//   }
//   onPlacesChanged = () => {
//     if (this.props.onPlacesChanged) {
//       this.props.onPlacesChanged(this.searchBox.getPlaces());
//     }
//   }
//   componentWillUnmount() {
//     // https://developers.google.com/maps/documentation/javascript/events#removing
//     google.maps.event.clearInstanceListeners(this.searchBox);
//   }
// }

// function apiIsLoaded() {
//   console.log('apiIsLoaded');
// }

// const MyGreatPlace = () => 'hi';
