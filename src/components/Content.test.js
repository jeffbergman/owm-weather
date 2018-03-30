import React from 'react';
import { mount, shallow } from 'enzyme';
import Content from './Content';

  const mockFetchWeather = jest.fn();
  const mockUseGeoLocation = jest.fn();
  const mockNoGeo = jest.fn();
  const mockGeoError = jest.fn();
  const mockGeoLocate = jest.fn();

  let props = { 
    fetchWeather: mockFetchWeather,
    useGeoLocation: mockUseGeoLocation,
    noGeo: mockNoGeo,
    geoError: mockGeoError,
    weather: {
      current: { 
        "weather":[
          {"id":721,"main":"Haze","description":"haze","icon":"50d"},
          {"id":701,"main":"Mist","description":"mist","icon":"50d"}
        ],
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
    } 
  };

describe('Content', () => {

  let content = shallow(<Content.WrappedComponent {...props}/>);

  it('renders properly', () => {
    expect(content).toMatchSnapshot();
  });

});