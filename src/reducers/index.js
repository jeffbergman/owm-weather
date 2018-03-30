import { combineReducers } from 'redux';
import { 
	SET_ZIP_CODE,
  REQUEST_FAILED, 
  REQUEST_WEATHER,
  RECEIVE_WEATHER,
  NO_GEO,
  ALLOW_GEO
} from '../actions';

/*
	In a larger project, I'd put these reducers in separate files
*/

const error = (state = '', action) => {
  switch (action.type) {
    case REQUEST_FAILED:
    case NO_GEO:
      return action.payload;
    default:
      return '';
  }
};

const network = (state = false, action) => {
  switch (action.type) {
    case REQUEST_WEATHER:
    case ALLOW_GEO:
      return true;
    default:
      return false;
  }
};


const geoPermission = (state = false, action) => {
	//whether the user has allowed the app access to his/her geolocation
	switch (action.type) {
    case ALLOW_GEO:
      return true;
    default:
      return state;
  }
}

const weather = (state = {}, action) => {
	//note: the weather state object is 
	// {current, forecast, location, display}

	switch (action.type) {
    case REQUEST_FAILED:
    	return state;
    case RECEIVE_WEATHER:
      return action.payload; 
    default:
      return state;
  }
}

const zipcode = (state = '', action) => {
	//it's much easier to keep it separate from weather.location
	switch (action.type) {
		case SET_ZIP_CODE:
			return action.payload;
		default:
			return state;
	}
}


export default combineReducers({
	geoPermission,
	error, 
	network,
	weather,
	zipcode
});