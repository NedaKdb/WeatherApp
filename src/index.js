function formatDate(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForcast(response) {
  let forcast = response.data.daily;
  console.log(forcast);
  let forcastElement = document.querySelector("#forcast");

  let forcastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  forcast.forEach(function (forcastDay, index) {
    if (index < 5) {
      forcastHTML =
        forcastHTML +
        `
          <div class="row predict">
            <div class="col-2 days">
              <div class="weather-forcast-day">${formatDay(forcastDay.dt)}</div>
              <img src="https://openweathermap.org/img/wn/${
                forcastDay.weather[0].icon
              }@2x.png" class="forcast-icon"/>
              <div class="weather-forcast-temperature">
                <span class="weather-forcast-temperature-max">${Math.round(
                  forcastDay.temp.max
                )}°</span
                ><span class="weather-forcast-temperature-min">${Math.round(
                  forcastDay.temp.min
                )}°</span>
              </div>
            </div>
          </div>`;
    }
  });

  forcastHTML = forcastHTML + `</dive>`;
  forcastElement.innerHTML = forcastHTML;
}

function getForcast(coordinates) {
  console.log(coordinates);
  let apiKey = "dff5c692192605ee5ed7f95b423ae857";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForcast);
}

function displayWeatherCondition(response) {
  console.log(response);
  document.querySelector("#searched-city").innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp;

  let temperature = Math.round(celsiusTemperature);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;

  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity}`;
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${wind}`;
  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${description}`;
  let dateElement = document.querySelector("#current-time");
  console.log(response.data.dt);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForcast(response.data.coord);
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "be11abfd3eaeef023fe1dffe539306d6";
  let city = document.querySelector("#city-input").value;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

let city = document.querySelector("#enter-city");
city.addEventListener("submit", searchCity);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let celsiusTemperature = null;
