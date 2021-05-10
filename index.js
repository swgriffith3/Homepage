// ---- Clock ----

function clock() {
  let hours = document.getElementById('hours');
  let minutes = document.getElementById('minutes');
  let amPM = document.getElementById('am-pm');

  let h = new Date().getHours();
  let m = new Date().getMinutes();
  let a = 'AM';

  if (h > 11) {
    a = 'PM';
  }

  if (h > 12) {
    h = h - 12;
  }

  m = m < 10 ? '0' + m : m;

  hours.innerHTML = h;
  minutes.innerHTML = m;
  amPM.innerHTML = a;
}

let interval = setInterval(clock, 1000);

// ---- Weather ----

const api = {
 // key: 'your key here',
  base: 'https://api.openweathermap.org/data/2.5/',
};

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
    console.log(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp).toFixed(0)}<span>°f</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;
}
