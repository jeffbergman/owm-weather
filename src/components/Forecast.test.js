import React from 'react';
import { shallow } from 'enzyme';
import Forecast from './Forecast';

describe('Forecast', () => {

	let props = {
		item: {
			"day":"Friday",
			"low": {
				"dt":1522476000,
				"weather":[
					{
						"id":801,
						"main":"Clouds",
						"description":"few clouds",
						"icon":"02n"
					}
				],
				"main": {
					"temp":39.6
				}
			},
			"high": {
				"dt":1522422000,
				"weather":[
					{
						"id":500,
						"main":"Rain",
						"description":"light rain",
						"icon":"10d"
					}
				],
				"main": {
					"temp":56.49
				}
			}
		}
	};

	let forecast = shallow(<Forecast {...props} />);

	it('renders correctly', () => {
		expect('forecast').toMatchSnapshot();
	});

	it('displays "Friday" when item.day is "Friday"', () => {
		expect(forecast.find('.day-small').text()).toEqual('Friday');
	});

	it('displays an icon of owf-500-d when item.high.weather[0].id is 500 and weather[0].icon is 10d', () => {
		expect(forecast.find('.owf-500-d').exists()).toBe(true);
	});

	it('displays a temperature of 40/56 when low.main.temp is 39.6 and high.main.temo is 56.49', () => {
		expect(forecast.find('.temp-nbr-small').text()).toEqual('40/56');
	});

	describe('When props.item === null', () => {
		beforeEach(() => {
			props.item = null;
			forecast = shallow(<Forecast {...props} />);
		});

		it('should not render', () => {
    	expect(forecast.type()).toEqual(null);
	  });
	});

});

