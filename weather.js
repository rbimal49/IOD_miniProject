const API_KEY = "b7c01aa0f5c61220087f240d25e951f9";

// Function to fetch weather data
function fetchWeather() {
  // Clear any previous weather display
  document.getElementById("weatherDisplay").innerHTML = "";

  // Get the city input from the user
  const city = document.getElementById("cityInput").value;

  // Construct the URL for the API request
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  // Fetch weather data from the API
  fetch(url)
    .then((response) => {
      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Weather data not found");
      }
      return response.json();
    })
    .then((data) => updateWeatherDisplay(data)) // Display weather data
    .catch((error) => {
      // Handle errors
      console.error("Error fetching weather:", error);
      const displayError = document.createElement("p");
      displayError.textContent =
        "No weather data is available for the entered city name. Please make sure the city name is correct.";
      displayError.classList.add("displayError");
      document.getElementById("weatherDisplay").appendChild(displayError);
    });
}

// Function to update the weather display
function updateWeatherDisplay(data) {
  // Destructure the data object
  const { name, sys, main, wind, weather } = data;

  // Get the emoji corresponding to the weather condition
  const weatherEmoji = getWeatherEmoji(weather[0].id);

  // Format the weather description
  let weatherDescription = weather[0].description.split(" ");
  weatherDescription = weatherDescription
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Construct the weather display HTML
  const display = `
        <div class="card">
            <div class="card-body">
                <div class="weather-info">
                <h5 class="city-name">${name}, ${sys.country}</h5>
                <p class="city-temp">${main.temp.toFixed(1)} °C</p>
                <div class="city-tempMinMax">
                    <p class="card-text">Min: ${main.temp_min.toFixed(1)} °C</p>
                    <p class="card-text">Max: ${main.temp_max.toFixed(1)} °C</p>
                </div>
                <p class="city-sunrise">Wind: ${wind.speed} km/h</p>
                <p class="city-humidity">Humidity: ${main.humidity}%</p>
                <p class="card-text">Description: ${weatherDescription}</p>
                </div>
                <p class="weather-icon">${weatherEmoji}</p>
            </div>
        </div>
    `;

  // Update the weather display with the new data
  document.getElementById("weatherDisplay").innerHTML = display;
}

// Function to get the weather emoji based on the weather ID
// wether conditions link: https://openweathermap.org/weather-conditions
function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId <= 300:
      return "🌧️";
    case weatherId >= 300 && weatherId <= 400:
      return "🌦️";
    case weatherId >= 500 && weatherId <= 600:
      return "⛈️";
    case weatherId >= 600 && weatherId <= 700:
      return "❄️";
    case weatherId >= 700 && weatherId < 800:
      return "🌫️";
    case weatherId === 800:
      return "☀️";
    case weatherId >= 801 && weatherId < 810:
      return "☁️";
    default:
      return "?";
  }
}
