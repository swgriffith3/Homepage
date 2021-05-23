// ---- Clock ----

function clock() {
  let hours = document.getElementById('hours');
  let minutes = document.getElementById('minutes');
  let timeColon = document.getElementById('time-colon');

  let h = new Date().getHours();
  let m = new Date().getMinutes();

  if (h > 12) {
    h = h - 12;
  }

  m = m < 10 ? '0' + m : m;

  hours.innerHTML = h;
  minutes.innerHTML = m;
  timeColon.innerHTML = ':';
}

let interval = setInterval(clock, 1000);

// ---- Weather ----

// const api = {
//   key: 'ff4431a8f6179f4f6191397cc3d614ef',
//   base: 'https://api.openweathermap.org/data/2.5/',
// };

// const searchbox = document.querySelector('.search-box');
// searchbox.addEventListener('keypress', setQuery);

// function setQuery(evt) {
//   if (evt.keyCode == 13) {
//     getResults(searchbox.value);
//     console.log(searchbox.value);
//   }
// }

// function getResults(query) {
//   fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
//     .then((weather) => {
//       return weather.json();
//     })
//     .then(displayResults);
// }

// function displayResults(weather) {
//   console.log(weather);
//   let city = document.querySelector('.location .city');
//   city.innerText = `${weather.name}, ${weather.sys.country}`;

//   let temp = document.querySelector('.current .temp');
//   temp.innerHTML = `${Math.round(weather.main.temp).toFixed(0)}<span>°f</span>`;

//   let weather_el = document.querySelector('.current .weather');
//   weather_el.innerText = weather.weather[0].main;
// }

function getWeather() {
  let temperature = document.getElementById('temperature');
  let description = document.getElementById('description');
  let location = document.getElementById('location');

  let api = 'https://api.openweathermap.org/data/2.5/weather';
  let apiKey = 'ff4431a8f6179f4f6191397cc3d614ef';

  location.innerHTML = 'allow location to retrieve weather';

  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    let url = `${api}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let temp = Math.round(data.main.temp).toFixed(0);
        temperature.innerHTML = `${temp}° F`;
        location.innerHTML = data.name;
        description.innerHTML = data.weather[0].main;
      });
  }

  function error() {
    location.innerHTML = 'Unable to retrieve your location';
  }
}

getWeather();
