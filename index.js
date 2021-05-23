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

function getWeather() {
  let temperature = document.getElementById('temperature');
  let description = document.getElementById('description');
  let location = document.getElementById('location');

  let api = 'https://api.openweathermap.org/data/2.5/weather';

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
