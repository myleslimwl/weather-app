// weather app

const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const weatherButton = document.querySelector('.weatherButton');
const weatherContainer = document.querySelector('.weatherContainer');
const apiKey = "6b5637bd4236dbeeca38c32ada3d2708";

weatherForm.addEventListener('submit', async event => {

  event.preventDefault();

  const city = cityInput.value;

  if(city){
    try{
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    }
    catch(error){
      console.error(error);
      displayError(error);
    }
  }
  else{
    displayError('Please enter a city name.');
  }
});

function displayError(message){

  const errorDisplay = document.createElement('p');
  errorDisplay.textContent = message;
  errorDisplay.classList.add('errorDisplay');

  weatherContainer.textContent = ''; 
  weatherContainer.style.display = 'flex';
  weatherContainer.appendChild(errorDisplay);
}

function displayWeatherInfo(data){

  const { name: city, 
          main: {temp, humidity}, 
          weather: [{description, id}]} = data;

  weatherContainer.textContent = '';
  weatherContainer.style.display = 'flex';

  // create elements
  const cityDisplay = document.createElement('h1');
  const tempDisplay = document.createElement('p');
  const humidityDisplay = document.createElement('p');
  const descDisplay = document.createElement('p');
  const weatherEmoji = document.createElement('p');

  // obtain text content
  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);

  // add class
  cityDisplay.classList.add('cityDisplay');
  tempDisplay.classList.add('tempDisplay');
  humidityDisplay.classList.add('humidityDisplay');
  descDisplay.classList.add('descDisplay');
  weatherEmoji.classList.add('weatherEmoji');

  // append to display
  weatherContainer.appendChild(cityDisplay);
  weatherContainer.appendChild(tempDisplay);
  weatherContainer.appendChild(humidityDisplay);
  weatherContainer.appendChild(descDisplay);
  weatherContainer.appendChild(weatherEmoji);
}

async function getWeatherData(city){

  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const response = await fetch(apiURL);

  if(!response.ok){
    throw new Error("Couldn't fetch weather data. Please try again.");
  }

  const data = await response.json();

  if (data.cod === '404') {
    throw new Error('City not found. Please enter a valid city name.');
  }

  return data;
}

function getWeatherEmoji(weatherId) {

  switch (true){
    case weatherId >= 200 && weatherId <= 300:
      return '🌧️';
    case weatherId >= 500 && weatherId <= 600:
      return '🌦️';
    case weatherId >= 700 && weatherId <= 800:
      return '☁️';
    case weatherId >= 800:
      return '🌞';
    default:
      return '🌞';
  }
}