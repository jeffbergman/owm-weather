import React from 'react';
import { shallow } from 'enzyme';
import Current from './Current';

describe('Current', () => {
	
	let props = {};
	let current = shallow(<Current {...props} />);

	it('renders correctly', () => {
		expect('current').toMatchSnapshot();
	});

	describe('When !props.current', () => {

		it('displays a temperature of 0', () => {
			expect(current.find('.temp-nbr').text()).toEqual('0');
		});

		it('displays a Loading message', () => {
			expect(current.find('.weather-desc').text()).toEqual('Loading data...');
		});

		it('displays a default icon of owf-200', () => {
			expect(current.find('.owf-200').exists()).toBe(true);
		});
	});

	describe('When there are valid current props', () => {

		beforeEach(() => {
      props = { 
      	current: { 
	        "weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],
	        "main": {
	          "temp":65.84,
	          "pressure":1019,
	          "humidity":43,
	          "temp_min":59,
	          "temp_max":69.8
	        },
	        "dt":1522346340,
	        "sunrise":1522331019,
	        "sunset":1522375970
	      }  
      };
      current = shallow(<Current {...props} />);
    });

		it('displays a temperature of 66 when main.temp is 65.84', () => {
			expect(current.find('.temp-nbr').text()).toEqual('66');
		});


		it('displays a description "Clear Sky" weather[0].description is "clear sky"', () => {
			expect(current.find('.weather-desc').text()).toEqual('Clear Sky');
		});

		it('displays an icon of owf-800-d when weather[0].id is 800 and weather.icon is 01d', () => {
			expect(current.find('.owf-800-d').exists()).toBe(true);
		});

	});

});