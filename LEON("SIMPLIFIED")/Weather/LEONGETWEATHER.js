//OPEN WEATHER API KEY: ffb8b7cbdf9b0f3bb06e477209791fdb
async function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function fetchWeather(lat, lon, apiKey) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
}

function updateUI(city, tempFahrenheitRounded, humidity, windSpeed) {
  let isOpen = true;
  firebase.database().ref("WEATHERWIDGET").set(isOpen);
  document.getElementById("weatherWidget").style.display = "block";
  document.getElementById("weatherHeader").innerHTML = "Weather in " + city;

  let weatherBody = document.getElementById("weatherBody");
  weatherBody.innerHTML = `
      <ul>
        <li>Temperature: ${tempFahrenheitRounded} F</li>
        <li>Humidity: ${humidity}%</li>
        <li>Wind Speed: ${windSpeed} mph</li>
      </ul>`;
}

async function getTheCurrentWeather() {
  try {
    const apiKey = "27e3070689e24914e167b1c5b0fa5e32";
    const position = await getCurrentPosition();
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const data = await fetchWeather(lat, lon, apiKey);
    const city = data.name;
    const tempCelsius = data.main.temp;
    const tempFahrenheit = (tempCelsius * 9) / 5 + 32;
    const tempFahrenheitRounded = Math.round(tempFahrenheit);
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    updateUI(city, tempFahrenheitRounded, humidity, windSpeed);
  } catch (error) {
    console.log("Error: ", error);
  }
}

if (!navigator.geolocation) {
  console.log("Geolocation is not supported by this browser.");
}
