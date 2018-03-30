import React from 'react';
import { shallow } from 'enzyme';
import Search from './Search';

describe('Search', () => {
	
	const props = {
		zipcode: '91607',
    geoPermisson: true
  }

	let search = shallow(<Search.WrappedComponent {...props} />);

	it('renders correctly', () => {
		expect('search').toMatchSnapshot();
	});
	
});