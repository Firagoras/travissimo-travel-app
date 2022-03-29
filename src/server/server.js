import express from 'express';

import dotenv from 'dotenv';
dotenv.config();

import fetch from 'node-fetch';

const app = express();

/* --- Dependencies --- */

// Middleware
import bodyParser from 'body-parser';
import cors from 'cors';

// Configure express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// Set up empty JS object to act as endpoint for all routes
let projectData = {};

const todayNumber = Date.now();

/* --- API Setup --- */

// Base URLs for APIs
const geonamesBaseURL = 'http://api.geonames.org/searchJSON';
const weatherbitBaseURL = 'https://api.weatherbit.io/v2.0/forecast/daily';
const pixabayBaseURL = 'https://pixabay.com/api/';

// Personal Keys for APIs
const geonamesApiKey = process.env.GEONAMES_API_KEY;
const weatherbitApiKey = process.env.WEATHERBIT_API_KEY;
const pixabayApiKey = process.env.PIXABAY_API_KEY;

/* --- Routes Setup --- */

// Set up a get route
app.get('/', (req, res) => res.sendFile('dist/index.html'));

// Set up a POST route
app.post('/postData', postData);

/* --- Helper Functions --- */

// Function to calculate number of dates between two dates
function daysDiff (date1Number, date2Number) {
  const timestampDiff = Math.abs(date1Number - date2Number);
  return Math.ceil(timestampDiff / (1000 * 60 * 60 * 24));
}

// Function to search in weatherbit api data for the weather forcast at return date
function temperatureArrival(weatherData) {
  weatherData.forEach(day => {
    if (day.valid_date === projectData.departureDate) {
      projectData.temperatureArrival = day.temp;
      projectData.weatherDescriptionArrival = day.weather.description;
    }
  })
}

/* --- Main Functions --- */

// Asynchronous function to get data from MeaningCloud Sentiment Analysis API
const fetchApiData = async (url) => {
  const response = await fetch(url);
  try {
    const apiData = await response.json();
    return apiData;
  } catch (error) {
    console.log('error', error);
  }
};

// Function to handle a post request from the client side and update the app endpoint with the data received from APIs
function postData(req, res) {
  // Update the endpoint with user inputs 
  projectData = {
    destination: req.body.destination,
    departureDate: req.body.departureDate,
    departureDateNumber: req.body.departureDateNumber,
    departureCountdown: daysDiff(req.body.departureDateNumber, todayNumber),
    returnDate: req.body.returnDate,
    returnDateNumber: req.body.returnDateNumber,
    tripDuration: daysDiff(req.body.departureDateNumber, req.body.returnDateNumber)
  };

  // Establish a chain of promises to fetch data from different APIs
  // fetch geonames api data 
  const geonamesApiUrl = `${geonamesBaseURL}?q=${req.body.destination}&maxRows=1&username=${geonamesApiKey}`;
  fetchApiData(geonamesApiUrl)
  // Once the api data is successfully received, store selected data into the endpoint 
  .then(geonamesApiData => {
    // Check data returned for geonames API, if no results throw an error
    if (geonamesApiData.totalResultsCount === 0) {
      throw new Error('Destination Not Found');
    }
    // Otherwise update app endpoint
    projectData.country = geonamesApiData.geonames[0].countryName;
    projectData.city = geonamesApiData.geonames[0].name;
    projectData.latitude = geonamesApiData.geonames[0].lat;
    projectData.longitude = geonamesApiData.geonames[0].lng;
  })
  .then(() => {
    // fetch weatherbit api data 
    const weatherbitApiUrl = `${weatherbitBaseURL}?lat=${projectData.latitude}&lon=${projectData.longitude}&key=${weatherbitApiKey}`;
    return fetchApiData(weatherbitApiUrl);
  })
  .then(weatherbitApiData => {
    // Update app endpoint
    projectData.currentTemperature = weatherbitApiData.data[0].temp;
    projectData.currentWeatherDescription = weatherbitApiData.data[0].weather.description;
    temperatureArrival(weatherbitApiData.data);
  })
  .then(() => {
    // fetch pixabay api data 
    const pixabayApiUrl = `${pixabayBaseURL}?key=${pixabayApiKey}&q=${projectData.city}&image_type=photo`;
    return fetchApiData(pixabayApiUrl);
  })
  .then((pixabayApiData) => {
    // If pixabay retruns no image for a destination, look for an image for the destination's country 
    if (pixabayApiData.totalHits === 0) {
      const pixabayApiUrl = `${pixabayBaseURL}?key=${pixabayApiKey}&q=${projectData.country}&image_type=photo`;
      return fetchApiData(pixabayApiUrl);
    }
    return pixabayApiData;
  })
  .then((pixabayApiData) => {
    // If pixabay retruns no image for the country , throw an error 
    if (pixabayApiData.totalHits === 0) {
      throw new Error('Image Not Found');
    }
    // Otherwise update app endpoint
    projectData.imageUrl = pixabayApiData.hits[0].webformatURL;
  })
  .catch(error => {
    console.log(error);
    projectData.error = true;
    projectData.errorMessage = error.message;
  })
  // Send project data to the front-end
  .then(() => {
    res.send(projectData);
  });
}


export { app, daysDiff };
