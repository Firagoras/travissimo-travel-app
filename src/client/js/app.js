// Function to create the trips section dynamically
function createSection () {
  const trips = document.createElement('section');
  trips.setAttribute('id', 'trips');
  trips.innerHTML = `
    <h3 class="section-title">My Trips</h3>
    <div id="trips-container" class="section-container"></div>
  `
  return trips;
}

// Function to create a new trip card
function createCard (apiData) {
  const dd = new Date(apiData.departureDate);
  const rd = new Date(apiData.returnDate);
  const trip = document.createElement('article');
  trip.classList.add('card');
  const cardContent = `
    <div class="card-image"><img src="${apiData.imageUrl}" alt="Photo of ${apiData.city}"></div>
    <div class="card-content">
      <h5 class="card-title">My next trip to</h5>
      <H4 class="destination-name">${apiData.city}, ${apiData.country}</H4>
      <p class="trip-duration"><span class="label">In </span>${apiData.departureCountdown} days <span class="label">for </span>${apiData.tripDuration} days</p>
      <p class="departure-date"><span class="label">Departure date:</span> ${dd.toLocaleDateString()}</p>
      <p class="return-date"><span class="label">Return date:</span> ${rd.toLocaleDateString()}</p>
      <p class="current-temperature"><span class="label">Current Weather:</span> ${apiData.currentWeatherDescription}, ${apiData.currentTemperature} °C</p>
      <p class="temperature-arrival"><span class="label">Forecast on Arrival:</span> ${apiData.weatherDescriptionArrival}, ${apiData.temperatureArrival} °C</p>
    </div>
  `
  trip.innerHTML = cardContent;
  return trip;
}

// Function to update the user interface with data received from the server
function updateUI(apiData) {
  let trips = document.getElementById('trips');

  // Check whether the trip section exists, otherwise create one and add it to the DOM
  if (trips === null) {
    const main = document.querySelector('main');
    trips = createSection();
    main.appendChild(trips);
  }

  const tripsContainer = document.getElementById('trips-container');
  tripsContainer.appendChild(createCard(apiData));
}

// Asynchronous function to make a POST request to the server
const postData = async (data) => {
  const response = await fetch('http://localhost:8085/postData', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const serverData = await response.json();
    // Update the user interface if no errors within server data, otherwise display an alert message
    if (!serverData.error) {
      updateUI(serverData);
    } else {
      alert(serverData.errorMessage);
    }
    
    return serverData;
  } catch (error) {
    console.log('error', error);
  }
}

// Function to handle the form submit event.
function handleSubmit(e) {
  e.preventDefault();
  const textInput = document.getElementById('destination');
  const departing = document.getElementById('departing');
  const returning = document.getElementById('returning');
  const data = {
    "destination": textInput.value,
    "departureDate": departing.value,
    "departureDateNumber": departing.valueAsNumber,
    "returnDate": returning.value,
    "returnDateNumber": returning.valueAsNumber
  };
  postData(data);
}

export { handleSubmit, postData };