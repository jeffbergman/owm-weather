import React, { Component } from 'react';
import { titleCase, iconNbr } from '../helpers';
import { NIGHT } from '../actions';


class Dummy extends Component {
	//displays an item in the forecast array
	//if there aren't any it won't display

	render() {

		const { item, display } = this.props;

		if (!item) return null;

		const className = display === NIGHT ? 'next-days next-days--night' : 'next-days'; 
		const day = titleCase(item.day);
		const icon = item.high.weather[0].icon;
		const id = item.high.weather[0].id;
		const iconClass = iconNbr(id, icon);
		const temp = `${Math.round(item.low.main.temp)}/${Math.round(item.high.main.temp)}`;
		
		return (
			<div className={className}>
        <div className="day-small">
          {day} 
        </div>
        <div className="icon-cont-small">
          <i className={`owf ${iconClass} owf-2x`}></i>
        </div>
        <div className="temp-cont-small">
          <span className="temp-nbr-small">{temp}</span>
          <span className="temp-symbol-small">&deg;</span>
        </div>
      </div>
		);
	}

}

export default Dummy;