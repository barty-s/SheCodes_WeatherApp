function changeToFahrenheit(event) {
  event.preventDefault();
  document.querySelector("#main-temp").innerHTML = `${Math.round(
    (16 * 9) / 5 + 32
  )}°F`;
}

let tempFahrenheit = document.querySelector("#temp-fahrenheit");
tempFahrenheit.addEventListener("click", changeToFahrenheit);

function changeToCelcius(event) {
  event.preventDefault();
  document.querySelector("#main-temp").innnerHTML = `16°C`;
}

let tempCelcius = document.querySelector("#temp-celcius");
tempCelcius.addEventListener("click", changeToCelcius);

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

function search(event) {
  event.preventDefault();
  let apiKey = "2a2eaa51d996796495bf456e5b58adf4";
  let searchInput = document.querySelector("#search-text-input");
  let mainCity = document.querySelector("#main-city");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric`;
  if (searchInput.value) {
    mainCity.innerHTML = `${searchInput.value}`;
  } else {
    alert("Please enter a city!");
  }
  function showWeatherMain(response) {
    document.querySelector("#main-temp").innerHTML = Math.round(
      response.data.main.temp
    );
    document.querySelector("#weather-description").innerHTML =
      response.data.weather[0].main;
    document.querySelector("#low-temp").innerHTML = Math.round(
      response.data.main.temp_min
    );
    document.querySelector("#high-temp").innerHTML = Math.round(
      response.data.main.temp_max
    );
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind-speed").innerHTML = Math.round(
      response.data.wind.speed * 1.943844
    );
  }

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeatherMain);
  form.reset();
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function retrievePosition(response) {
  let lat = response.coords.latitude;
  let lon = response.coords.longitude;
  let units = "metric";
  let apiKey = "2a2eaa51d996796495bf456e5b58adf4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lon=${lon}&lat=${lat}&units=${units}&appid=${apiKey}`;

  function showWeatherMain(response) {
    document.querySelector("#main-city").innerHTML = response.data.name;
    document.querySelector("#main-temp").innerHTML = Math.round(
      response.data.main.temp
    );
    document.querySelector("#weather-description").innerHTML =
      response.data.weather[0].main;
    document.querySelector("#low-temp").innerHTML = Math.round(
      response.data.main.temp_min
    );
    document.querySelector("#high-temp").innerHTML = Math.round(
      response.data.main.temp_max
    );
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind-speed").innerHTML = Math.round(
      response.data.wind.speed * 1.943844
    );
  }
  axios.get(`${apiUrl}`).then(showWeatherMain);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getLocation);

function defaultCityWeather(city) {
  let apiKey = "2a2eaa51d996796495bf456e5b58adf4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

  function showWeatherMain(response) {
    document.querySelector("#main-city").innerHTML = `${city}`;
    document.querySelector("#main-temp").innerHTML = Math.round(
      response.data.main.temp
    );
    document.querySelector("#weather-description").innerHTML =
      response.data.weather[0].main;
    document.querySelector("#low-temp").innerHTML = Math.round(
      response.data.main.temp_min
    );
    document.querySelector("#high-temp").innerHTML = Math.round(
      response.data.main.temp_max
    );
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind-speed").innerHTML = Math.round(
      response.data.wind.speed * 1.943844
    );
  }

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeatherMain);
}

defaultCityWeather("Tralee");
