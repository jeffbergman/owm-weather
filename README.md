I used create-react-app for the project. 

To run it locally, download the project, open the terminal, cd into it's directory and npm install.

Then you can npm run start to run it in developent mode, or npm run build to create a production build. At that point the build folder will be ready to be deployed. At that point, you can npm install -g serve and then serve -s build and it will be running on http://localhost:5000/.

I used react and redux, sass for the css, fetch for the network call, and redux-thunk for the asynchronous actions. 

You'll have to add a .env file to the root directory with the line:
REACT_APP_WEATHER_API_KEY=<Your key>
  
  
