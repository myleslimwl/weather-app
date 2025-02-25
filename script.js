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

  console.log(data);

}

async function getWeatherData(city){

  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const response = await fetch(apiURL);

  if(!response.ok){
    throw new Error("Couldn't fetch weather data. Please try again.");
  }

  return await response.json();
}