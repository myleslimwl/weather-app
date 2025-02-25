// weather app

const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const weatherButton = document.querySelector('.weatherButton');
const weatherContainer = document.querySelector('.weatherContainer');
const apiKey = "6b5637bd4236dbeeca38c32ada3d2708";

weatherForm.addEventListener('submit', (event) => {

  event.preventDefault();

  const city = cityInput.value;

  if(city){

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