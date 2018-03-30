import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
	
	let app = shallow(<App.WrappedComponent />);

	it('renders correctly', () => {
		expect(app).toMatchSnapshot();
	});

	it('contains a connected Header component', () => {
		expect(app.find('Connect(Header)').exists()).toBe(true);
	});

	it('contains a connected LoadingIndicator component', () => {
		expect(app.find('Connect(LoadingIndicator)').exists()).toBe(true);
	});

	it('contains a connected Header component', () => {
		expect(app.find('Connect(ErrorMsg)').exists()).toBe(true);
	});

	it('contains a connected Header component', () => {
		expect(app.find('Connect(Content)').exists()).toBe(true);
	});

	describe('when the display prop is "NIGHT"', () => {
    beforeEach(() => {
      let props = { display: 'NIGHT' };
      app = shallow(<App.WrappedComponent {...props}/>);
    });

    it('has a class of night', () => {
      expect(app.find('.night').exists()).toBe(true);
    });
  });
	
});

