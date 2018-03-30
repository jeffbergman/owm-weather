import React, { Component } from 'react';
import { titleCase, iconNbr } from '../helpers';

class Current extends Component {
	//displays the current weather data

	render() {

		let temp; 
		let desc;
		let iconClass;
		let id;
		let icon;

		//the else part should only happen the first time
		//when there's no data in localstorage, or if the 
		//user is in mobile sarafi in private mode
		if (this.props.current) {
			temp = Math.round(this.props.current.main.temp);
			id = this.props.current.weather[0].id;
			desc= titleCase(this.props.current.weather[0].description);
			icon = this.props.current.weather[0].icon;
			iconClass = iconNbr(id, icon);
		} else {
			temp = 0;
			desc= 'Loading data...';
			iconClass = 'owf-200';
		}

	  return (
    	<div>
	      <div className="icon-cont">
	        <i className={`owf ${iconClass} owf-8x`}></i>
	      </div>

	      <div className="weather-desc">
	        {desc}  
	      </div>
	      
	      <div className="temp-cont">
	        <span className="temp-nbr">{temp}</span>
	        <span className="temp-symbol">&deg;</span>
	      </div>
      </div>
    );
  } 
}

export default Current;