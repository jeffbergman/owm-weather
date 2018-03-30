//a few helper functions that seem like they should go here
export const titleCase = str => {
	if (!str) return str;
	return str.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
};

export const iconNbr = (id, icon = '') => {
	let first = `owf-${id}`;
	let second = icon ? `-${icon[icon.length - 1]}` : icon;
	return `${first}${second}`;
};

export const getLocalStorage = key => {
	let value = localStorage.getItem(key);
	value = value ? JSON.parse(value) : null;
	return value;
};

export const setLocalStorage = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value));
};


//all fetched and derived state is stored in localstorage
//so every use after the first, the user should see 
//the most recently retrieved data right away
//Note: I read that localstorage and session storage 
//are not available in Safari in private browsing mode
//something to correct for in the future
export const getInitialState = () => {
	const forecast = getLocalStorage('forecast');
	const display = getLocalStorage('display');
	const location = getLocalStorage('location');
	const geoPermission = getLocalStorage('geoPermission');
	let current = getLocalStorage('current');

	/* minimum default data to let user know we're loading
		this should only show once, or if user clears local storage
	*/
	if (!current) {
		current = {
			"weather": [
					{
					"id": 802,
					"main": "",
					"description": "",
					"icon": ""
					}
				],
			"main": {
				"temp": 0,
				"pressure": 0,
				"humidity": 0,
				"temp_min": 0,
				"temp_max": 0
			}	
		}
	}

		const initialState = { 
		  weather: {
				current, 
				forecast,
				location,
				display
			},
			geoPermission,
			network: false,
			error: '',
			zipcode: ''
		};

		return initialState;

	};

