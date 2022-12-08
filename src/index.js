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

function showWeatherMain(response) {
  console.log(response);
  document.querySelector("#main-city").innerHTML = response.data.city;

  document.querySelector("#main-temp").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.condition.description;
  //document.querySelector("#low-temp").innerHTML = Math.round(response.data.main.temp_min); this will be in forecast
  //document.querySelector("#high-temp").innerHTML = Math.round(response.data.main.temp_max); this will be in forecast
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed * 1.943844
  );
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

search("Tralee");

function retrievePosition(response) {
  //console.log(position);
  let lon = response.coordinates.longitude;
  let lat = response.coordinates.latitude;
  let units = "metric";
  let apiKey = "8904bbdf33fa8fc0f4cabacact251o36";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}`).then(showWeatherMain);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getLocation);
