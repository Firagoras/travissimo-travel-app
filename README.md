# Travissimo Trip Planner

## About the Project

This is the capstone project of the [Udacity Front End Web Developer Nanodegree program](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd0011).

The project aims to build a personal travel planner application that obtains a desired trip location, departure date and return date from the user, and displays weather conditins and an image of the location by calling external APIs: Geonames API, Weatherbit API and Pixabay API.

### Built with

- Front-end: HTML, SASS and JavaScript
- Back-end: Node and ExpressJS
- Build tool: Webpack
- PWA: Workbox
- Testing: Jest

### Functionality

- Call three different APIs from the server-side
- Update the user interface dynamically to log the latest information from the API responses
- Implement an offline functionality using Workbox
- Apply unit tests using Jest
- Apply simple form validation and return an error to alert the user when the input is empty.

## Getting Started

### Prerequisites

Make sure Node and NPM are installed on your computer. Otherwise, install both.

1. Node: Binaries, installers, and source tarballs are available at <https://nodejs.org/en/download/>.

2. NPM: From the terminal
   ```sh
   npm install npm -g
   ```

### Dependencies

#### Development Dependencies

- @babel/core: ^7.16.12
- @babel/plugin-transform-modules-commonjs: ^7.17.7
- @babel/preset-env: ^7.16.11
- babel-loader: ^8.2.3
- css-loader: ^6.5.1
- css-minimizer-webpack-plugin: 3.4.1
- html-loader: ^3.1.0
- html-webpack-plugin: ^5.5.0
- jest: 27.4.7
- mini-css-extract-plugin: ^2.5.2
- node-sass: ^7.0.1
- sass-loader: ^12.4.0
- style-loader: ^3.3.1
- webpack: ^5.67.0
- webpack-cli: ^4.9.1
- webpack-dev-server: ^4.7.3
- workbox-webpack-plugin: ^6.4.2

#### Production Dependencies

- body-parser: ^1.19.1
- cors: ^2.8.5
- dotenv: ^14.2.0
- express: ^4.17.2,
- node-fetch: ^2.6.7

### Installation

1. Get a free API Key for :

- [GeoNames](http://www.geonames.org/)
- [Weatherbit](https://www.weatherbit.io/api/)
- [Pixabay](https://pixabay.com/api/docs/)

2. Clone the project repo

   ```sh
   git clone https://github.com/Firagoras/travissimo-travel-app.git
   ```

3. Install NPM packages

   ```sh
   npm install
   ```

4. Configure environment variables using dotenv package

   - Create a new `.env` file in the root of your project

   - Fill the `.env` file with your API keys like this:
     ```
     GEONAMES_API_KEY = 'ENTER YOUR API'
     WEATHERBIT_API_KEY = 'ENTER YOUR API'
     PIXABAY_API_KEY = 'ENTER YOUR API'
     ```

5. Start the project front-end

   - Run on development mode
     ```sh
     npm run build-dev
     ```
   - Run on production mode
     ```sh
     npm run build-prod
     ```

6. Run the server

   ```sh
   npm run start
   ```

## Usage

Enter a distination city as well as a departure date and a return date and then click "Search Trip" button, the app displays information about your your trip and your destination, e.g. a picture, current weather and also weather upon arrival (if your arrival date is within the next 16 days).

## Testing

- Unit test
  ```sh
  npm run test
  ```
