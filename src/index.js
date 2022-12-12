//Get current date
function formatDate(date) {
  let currentDate = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) minutes = "0" + minutes;
  if (hours < 10) hours = "0" + hours;

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  return `${day} ${month} ${currentDate}, ${hours}:${minutes}`;
}

let dateTime = document.querySelector("#date-time");
let now = new Date();
dateTime.innerHTML = formatDate(now);

//Display current weather on screen - search and current location button
function showWeatherMain(response) {
  console.log(response);
  celsiusTemperature = response.data.temperature.current;
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  document.querySelector("#main-city").innerHTML = response.data.city;
  document.querySelector("#main-temp").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#weather-description").innerHTML =
    response.data.condition.description;
  //document.querySelector("#low-temp").innerHTML = Math.round(response.data.main.temp_min); this will be in forecast
  //document.querySelector("#high-temp").innerHTML = Math.round(response.data.main.temp_max); this will be in forecast
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed * 1.944
  );
  document
    .querySelector("#main-weather-icon")
    .setAttribute("src", response.data.condition.icon_url);

  getForecast(response.data.coordinates);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "8904bbdf33fa8fc0f4cabacact251o36";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function search(city) {
  let apiKey = "8904bbdf33fa8fc0f4cabacact251o36";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeatherMain);
  form.reset();
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  search(searchInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

// To retrieve weather for current location
function retrievePosition(response) {
  let lon = response.coords.longitude;
  let lat = response.coords.latitude;
  let units = "metric";
  let apiKey = "8904bbdf33fa8fc0f4cabacact251o36";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherMain);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getLocation);

//To convert temp to Fahrenheit/Celsius
function showFahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#main-temp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function showCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#main-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#temp-fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#temp-celsius");
celsiusLink.addEventListener("click", showCelsiusTemp);

let celsiusTemperature = null;

// Default search on loading page
search("Tralee");

//Suggested city search
function showVigoWeather(event) {
  event.preventDefault();
  search("Vigo");
}
let vigoWeather = document.querySelector("#vigo");
vigoWeather.addEventListener("click", showVigoWeather);

function showTraleeWeather(event) {
  event.preventDefault();
  search("Tralee");
}
let traleeWeather = document.querySelector("#tralee");
traleeWeather.addEventListener("click", showTraleeWeather);

function showHobartWeather(event) {
  event.preventDefault();
  search("Hobart");
}
let hobartWeather = document.querySelector("#hobart");
hobartWeather.addEventListener("click", showHobartWeather);

function showDublinWeather(event) {
  event.preventDefault();
  search("Dublin");
}
let dublinWeather = document.querySelector("#dublin");
dublinWeather.addEventListener("click", showDublinWeather);

//5-day forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return days[day];
}

function showForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily.slice(1, 6);
  let forecastElement = document.querySelector("#five-day-forecast");
  let forecastHTML = `<div class="row">`;
  document.querySelector("#low-temp").innerHTML = Math.round(
    response.data.daily[0].temperature.minimum
  );
  document.querySelector("#high-temp").innerHTML = Math.round(
    response.data.daily[0].temperature.maximum
  );

  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `<div class="col">
            <div class="card-body">
              <h5 class="card-title">${formatDay(forecastDay.time)}</h5>
              <p class="card-text"><img src=${
                forecastDay.condition.icon_url
              } alt = "weather-icon" id = "forecast-weather-icon"/></p>
              <p class="card-text"><span>${Math.round(
                forecastDay.temperature.minimum
              )}°</span> <br /><span><strong>${Math.round(
        forecastDay.temperature.maximum
      )}°</strong></span></p>
            </div>
          </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

showForecast();
