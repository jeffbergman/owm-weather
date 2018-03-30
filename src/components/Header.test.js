import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Header', () => {

	let props = {
		title: 'New York'
	};

	let header = shallow(<Header.WrappedComponent {...props} />);

	it('renders correctly', () => {
		expect(header).toMatchSnapshot();
	});

	it('contains a connected Search component', () => {
		expect(header.find('Connect(Search)').exists()).toBe(true);
	});

	it('displays "New York" when props.title is "New York"', () => {
		expect(header.find('.header__left').text()).toEqual('New York');
	});
	
});


