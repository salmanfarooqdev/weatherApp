let inputCity = document.querySelector('.inputcity');
let inputBtn = document.querySelector('.inputBtn');
let conditionEl = document.querySelector('.condition');
let locationEl = document.querySelector('.location');
let degreeEl = document.querySelector('.degree');
let feelslikeEl = document.querySelector('.feels-like');
let windEl = document.querySelector('.wind-mph');
let humidityEl = document.querySelector('.humidity');

inputBtn.addEventListener('click', function()
{
    const searchCity = inputCity.value;
    if(searchCity){
        showWeather(searchCity);
    }
    resetinput();
    
});

inputCity.addEventListener('keydown', function(event) 
{
    if (event.key === 'Enter') {
        event.preventDefault(); 
        const searchCity = inputCity.value;
        if (searchCity) {
            showWeather(searchCity);
        }
        resetinput();
    }
    
});

function resetinput()
{
    inputCity.value = '';
}


async function showWeather(searchCity)
{
    const apikey = '8f6f90ec5fbe47728db103426230609';
    const url =  `http://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${searchCity}`;

    const response = await fetch(url, {mode:'cors'});
    let weatherData = await response.json();
    console.log(weatherData);
    const newData = processData(weatherData);
    displayData(newData);
}

function processData(weatherData)
{
    const myData = {
        condition: weatherData.current.condition.text,
        feelsLike: weatherData.current.feelslike_c,
        wind: Math.round(weatherData.current.wind_mph),
        currentTemp: Math.round(weatherData.current.temp_c),
        humidity: weatherData.current.humidity,
        location: weatherData.location.name.toUpperCase(),
        country: weatherData.location.country.toUpperCase(),
    };

    return myData;

}

function displayData(myData)
{
    conditionEl.textContent = `${myData.condition}`;
    locationEl.innerHTML= `${myData.location}, ${myData.country}`;
    degreeEl.innerHTML=`${myData.currentTemp}&deg;`;
    feelslikeEl.textContent=`FEELS LIKE: ${myData.feelsLike}`;
    windEl.textContent=`WIND: ${myData.wind} MPH`;
    humidityEl.textContent=`HUMIDITY: ${myData.humidity}`;

}

document.addEventListener('DOMContentLoaded', function () {
    // Default city (Lahore) to display weather on page load
    const defaultCity = 'Lahore';
    showWeather(defaultCity);
});