import React from 'react';
import { shallow } from 'enzyme';
import ErrorMsg from './ErrorMsg';

describe('ErrorMsg', () => {
	
	const props = { errMsg: 'city not found' };

	const errorMsg = shallow(<ErrorMsg.WrappedComponent {...props} />);

	it('renders correctly', () => {
		expect('errorMsg').toMatchSnapshot();
	});


	it('displays an error message from props', () => {
		expect(errorMsg.find('.error').text()).toEqual('city not found')
	});

});