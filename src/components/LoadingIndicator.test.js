import React from 'react';
import { shallow } from 'enzyme';
import LoadingIndicator from './LoadingIndicator';

describe('LoadingIndicator', () => {
	
	const props = { isLoading: true };

	const loadingIndicator = shallow(<LoadingIndicator.WrappedComponent {...props} />);

	it('renders correctly', () => {
		expect('loadingIndicator').toMatchSnapshot();
	});

	it('displays "Loading..." when props.isLoading = true', () => {
		expect(loadingIndicator.find('.loading').text()).toEqual('Loading...');
	});

});