import React, { Component } from 'react';
import { connect } from 'react-redux';
import Current from './Current';
import Forecast from './Forecast';
import { fetchWeather, noGeo, geoError } from '../actions';

class Content extends Component {
	constructor(props) {
		super(props);
		this.geoLocate = this.geoLocate.bind(this);
		this.geoSuccess = this.geoSuccess.bind(this);
		this.geoErr = this.geoErr.bind(this);
	}

  componentDidMount() {
  	//get new data based on the geolocation when the component mounts
    this.geoLocate();
  }

  geoLocate() {
    if (!navigator.geolocation){
      this.props.noGeo();  
      return;
    }
    navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoErr);
  }

  //these next 2 functions call the action creators 
  //that fetch the weather info or process the error 
  //from the geolocation
  //This code is duplicated in the search, 
  //but the alternative to this small duplication seems to be 
  //passing the action creators into functions in helpers.js,
  //which didn't seem right 
  geoSuccess(position) {
    this.props.fetchWeather(position);
  }

  geoErr() {
    this.props.geoError();  
  }

  render() {

  	const current = this.props.weather.current;
  	const forecast = this.props.weather.forecast || [];
  	const display = this.props.weather.display

  	//map the array of forecast data, only 4 items 
  	const forecasts = forecast.map(item => {
  		return (
				<Forecast key={item.day} item={item} display={display}/>
			);
  	})

  	return (
  		<div className="outer">
        <div className="cont">
        	<Current current={current}/>
        	{forecasts}
        </div>
      </div>
  	);
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.error,
    weather: state.weather
  }
};

export default connect(mapStateToProps, { fetchWeather, noGeo, geoError })(Content);