import React from 'react';
import { connect } from 'react-redux';
import { fetchWeather, setZipCode, noGeo, geoError, useGeoLocation } from '../actions';


const Search = (props) => {
  //see notes in Content.js about 
  //a little bit of code duplication
  //regarding the geolocation
  
  const geoLocate = () => {
    
    props.useGeoLocation();

    if (!navigator.geolocation){
      props.noGeo();  
      return;
    }
    navigator.geolocation.getCurrentPosition(geoSuccess, geoErr);
  }

  const geoSuccess = (position) => {
    props.fetchWeather(position);
  }

  const geoErr = () => {
    props.geoError();  
  }
  
  const handleKeyDown = (evt) => {
    if(evt.keyCode === 13){
      props.fetchWeather(props.zipcode.trim());
    }
  }

  const handleGPSBtnClick = (evt) => {
    evt.preventDefault();
    
    geoLocate();
  }
  
  const geoButton = geoPermisson => {
    //no need to render this if user once clicked gps button,
    //but there's something weird going on with this prop
    if (geoPermisson) return null;

    //otherwise render the button
    return (
      <div className="inline-block">
        <button className="gps-button" onClick={handleGPSBtnClick}>
          Use GPS
        </button>
        <span className="span-or">or</span>
      </div>
    );
    
  }

  return (
    <div>
      {geoButton(props.geoPermisson)}
      <input 
        className="search"                     
        placeholder="zip code"    
        value={props.zipcode}
        onChange={(evt) => props.setZipCode(evt.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );

}


const mapStateToProps = (state) => {
  return {
  	zipcode: state.zipcode,
    geoPermisson: state.geoPermisson
  }
};


export default connect(mapStateToProps, { fetchWeather, setZipCode, useGeoLocation, noGeo, geoError })(Search);

