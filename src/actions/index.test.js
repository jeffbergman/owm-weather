import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { 
	SET_ZIP_CODE,
  REQUEST_WEATHER,
  RECEIVE_WEATHER,
  REQUEST_FAILED,
  REQUEST_GEO_ACCESS,
  NO_GEO,
  ALLOW_GEO,
  GEO_ERROR,
  setZipCode, 
  geoError,
  useGeoLocation,
  noGeo,
  fetchWeather
} from './index';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

describe('setSearchTerm', () => {
	it('creates an action to set the zip code', () => {
		const zipcode = '91607';
		const expectedAction = { type: SET_ZIP_CODE, payload: zipcode };

		expect(setZipCode(zipcode)).toEqual(expectedAction);
	});
});

describe('geoError', () => {
	it('creates an action to set a geolocation error message', () => {
		const GEO_ERROR_MSG = 'Unable to find your location';
		const expectedAction = { type: GEO_ERROR, payload: GEO_ERROR_MSG };

		expect(geoError()).toEqual(expectedAction);
	});
});

describe('noGeo', () => {
	it('creates an action to indicate that the browser does not support geolocation', () => {
		const NO_GEO_MSG = 'The browser does not support geolocation';
		const expectedAction = { type: NO_GEO, payload: NO_GEO_MSG };

		expect(noGeo()).toEqual(expectedAction);
	});
});

const createMockStore = configureMockStore([thunk]);
const mockResponse = 'Sorry, the request failed';

const store = createMockStore({ weather: {} });
fetchMock.get('http://api.openweathermap.org/data/2.5/weather?zip=10009&units=imperial&APPID=4c98ecf9e300905862f995c443100fdb', mockResponse);

describe('fetchWeather', () => {
	it('returns exptected response data on failed request', () => {
		const expectedActions = [
		  { type: REQUEST_WEATHER },
		  { type: REQUEST_FAILED, payload: mockResponse }
		];	

		return store.dispatch(fetchWeather('91607')).then(() => {
	    expect(store.getActions()).toEqual(expectedActions);
	  });
	});
});

