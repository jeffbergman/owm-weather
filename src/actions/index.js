import moment from 'moment';
import { setLocalStorage } from '../helpers';

export const SET_ZIP_CODE = 'SET_ZIP_CODE';
export const REQUEST_WEATHER = 'REQUEST_WEATHER';
export const RECEIVE_WEATHER = 'RECEIVE_WEATHER';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const ALLOW_GEO = 'ALLOW_GEO';
export const NO_GEO = 'NO_GEO';
export const GEO_ERROR = 'GEO_ERROR';
export const DAY = 'DAY';
export const NIGHT = 'NIGHT';

const REQUEST_FAILED_MSG = 'Sorry, the request failed';
const NO_GEO_MSG = 'The browser does not support geolocation';
const GEO_ERROR_MSG = 'Unable to find your location';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

/* Notes: 
	1) I put all of my constants here rather than use a constants.js file. 
		Probably would change that in the future
	2) There are really only 5 actions here: 
		setZipCode, geoError, useGeoLocation, noGeo, and fetchWeather
	3) fetchWeather makes 2 api calls and massages and merges the data
		before returning it
*/

export const setZipCode = zipcode => {
	return {
		type: SET_ZIP_CODE,
		payload: zipcode
	}
}

export const geoError = () => {
	return {
		type: GEO_ERROR,
		payload: GEO_ERROR_MSG
	}
}

export const useGeoLocation = () => async dispatch => {

	setLocalStorage('geoPermission', true);

	dispatch({ 
		type: ALLOW_GEO,
		payload: true
 	});
}

export const noGeo = () => {
	return {
		type: NO_GEO, 
		payload: NO_GEO_MSG
	}
}

const locationFromUser = (location = '') => {
	/* Builds the location paramater of the api call when the user enters a zipcode

		city names are ambiguous, it doesn't accept the state
		so I'll indicate in the ui to US zip code, ignore any plus 4
		because they do, and let the api response
		alert the user to bad data
	*/

	return `zip=${location.slice(0, 5)}`;
	
}

const locationFromGeo = (lat, long) => {
	// Builds the location paramater of the api call from the geolocation
	return `lat=${lat}&lon=${long}`;
}

const buildURL = (locationParam, typeParam) => {
	//type is weather (for current weather) or forecast
	return `https://api.openweathermap.org/data/2.5/${typeParam}?${locationParam}&units=imperial&APPID=${API_KEY}`;
}

export const fetchWeather = (position) => async dispatch => {
	
	dispatch({ type: REQUEST_WEATHER });

	let locationParam;
	let currURL;
	let forecastURL;
	let currResp;
	let forecastResp;
	let currData;
	let forecastData;

	if (typeof position === 'string') {
		//this would be a user entered zipcode
		locationParam = locationFromUser(position);	
	} else {
		//this would be the geolocation's position object
		locationParam = locationFromGeo(position.coords.latitude, position.coords.longitude);	
	}

	//we're making 2 api calls
	currURL = buildURL(locationParam, 'weather');
	forecastURL = buildURL(locationParam, 'forecast');

	try {
		//the actual fetch call to the api is in fetchData
		currResp = await fetchData(currURL);
		forecastResp = await fetchData(forecastURL);
		currData = await currResp.json();
		forecastData = await forecastResp.json();

		//the cod field is a response code
		if (parseInt(currData.cod, 10) !== 200 || parseInt(forecastData.cod, 10) !== 200) {
			dispatch({ type: REQUEST_FAILED, payload: REQUEST_FAILED_MSG });
			return;	
		}

	} catch (error) {
		//I don't think we're getting here, but just in case
		console.log(error);
		dispatch({ type: REQUEST_FAILED, payload: REQUEST_FAILED_MSG });
		return;
	}
	
	//now we'll give that data a big 'ole massage before we send it back
	const current = currentFromWeather(currData);
	const display = displayFromWeather(currData);
	const location = locationFromWeather(forecastData);
	const forecast = forecastFromWeather(forecastData);

	//save it to local storage so we always have data we can show the user 
	setLocalStorage('current', current);
	setLocalStorage('display', display);
	setLocalStorage('location', location);
	setLocalStorage('forecast', forecast);

	//finally we dispatch the action
	dispatch({ 
		type: RECEIVE_WEATHER,
		payload: { 
			current,
			forecast,
			display,
			location
		}
 	});
}

const fetchData = async url => {
	//the actual fetch call to the api lives here

	try {
		const response = await fetch(url);
    return response;

	} catch (error) {
		//no matter what I do, we don't get here
		//an error gets logged in the console 
		//but it resolves in the try block
		//i'll handle the error in the calling function
		//but just in case
		console.log(error);
	}
}


const forecastFromWeather = forecastData => {
	//this is an array of 40 so forecasts over 5 days
	//we're gonna boil it down to a high and a low
	//for each day after the current day

	const forecasts = forecastData.list;

	//get it all now in case midnight happens during this function
	const now = moment();
	const todayDayOfYear = now.format("DDD") 
	
	let shortForecasts = [];
	let currDay = '';

	for (const item of forecasts) {
		//because it's in unix time which is seconds
		const itemDayOfYear = moment(item.dt * 1000).format("DDD");
		const itemDayOfWeek = moment(item.dt * 1000).format("dddd"); 
		
		//only use the items after today
		if (parseInt(itemDayOfYear) > parseInt(todayDayOfYear)) {
			
			//set up a new object with the day's info and push it to the forecastArr
			if (itemDayOfWeek !== currDay) {
				currDay = itemDayOfWeek;
				let { dt, weather, main } = item;

				let info = {
					day: currDay,
					low: {
						dt: dt,
						weather: weather,
						main: main	
					},
					high: {
						dt: dt,
						weather: weather,
						main: main	
					}
				}

				shortForecasts.push(info);
			}

			//now we'll compare each item to the current day's info
			//and replace it if it's a higher or lower temp
			let day = shortForecasts[shortForecasts.length - 1];

			if (item.main.temp < day.low.main.temp) {
				day.low.dt = item.dt;
				day.low.weather = item.weather;
				day.low.main = item.main;
			}

			if (item.main.temp > day.high.main.temp) {
				day.high.dt = item.dt;
				day.high.weather = item.weather;
				day.high.main = item.main;
			}
		
		}
	}

	return shortForecasts;

}

const locationFromWeather = forecastData => {
	//probably won't use this data
	return forecastData.city;
}

const displayFromWeather = currData => {
	//for colors in ui, day or night mode,
	//based on the sunrise and sunset

	/* current code is wrong if currData.dt is not current, 
		so I was going to move to this instead, but I realized
		that this would be wrong if we're looking for a city
		in a different time zone, so that change will have to wait for another time

	const now = moment();

	// * 1000 because they're in unix time
	const sunrise = moment(currData.sys.sunrise * 1000);
	const sunset = moment(currData.sys.sunrise * 1000);

	if (now.isAfter(sunrise) && now.isBefore(sunset))
	*/

	if (currData.dt > currData.sys.sunrise && currData.dt < currData.sys.sunset) {
		return DAY;
	} else {
		return NIGHT;
	}
}

const currentFromWeather = currData => {
	//this is the current weather data
	return {
		weather: currData.weather,
		main: currData.main,
		dt: currData.dt,
		sunrise: currData.sys.sunrise,
		sunset: currData.sys.sunset
	}
}




