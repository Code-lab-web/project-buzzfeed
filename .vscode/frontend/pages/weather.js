const API_KEY = "548773e920254208b83a2e2bdadb8f0e";
const body = document.getElementById("body");
https://pro.openweathermap.org/data/2.5/forecast/climate?lat={lat}&lon={lon}&appid={548773e}



const shortDescription = document.getElementById("shortDescription");
const temperature = document.getElementById("temperature");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const description = document.getElementById("description");
const forecast = document.getElementById("forecast");
const icon = document.getElementById("icon");
const errorMessage = document.getElementById("error");

const chosenCity = document.getElementById("chosenCity");
const searchButton = document.getElementById("citySearchButton");

let city = "London";

//Change description and styling
//based on weather
const pickTodaysDescription = (todaysDescription) => {
  body.classList.remove(...body.classList);

  if (todaysDescription === "Clouds") {
    icon.src = "./assets/d2-cloud.svg";
    body.classList.add("cloudy");
    description.innerHTML = `Light a fire and get cosy. ${city} is looking grey today.`;
  } else if (todaysDescription === "Clear") {
    icon.src = "./assets/d2-sun.svg";
    body.classList.add("sunny");
    description.innerHTML = `Get your sunnies on. ${city} is looking rather great today.`;
  } else if (
    todaysDescription === "Rain" ||
    todaysDescription === "Thunderstorm" ||
    todaysDescription === "Drizzle" ||
    todaysDescription === "Snow"
  ) {
    icon.src = "./assets/d2-rain.svg";
    body.classList.add("rainy");
    description.innerHTML = `Don't forget your umbrella. It's wet in ${city} today.`;
  } else {
    icon.src = "./assets/d2-unknown.svg";
    body.classList.add("unknown");
    description.innerHTML = `Be careful today in ${city}!`;
  }
};

const capitalizeFirstLetter = (string) => {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
};

//Fetching the weather data for today
const fetchWeather = (city) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${API_KEY}`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const sunriseTime = new Date((json.sys.sunrise + json.timezone) * 1000); //Gives us the time in "human" form (as a date), mult. by 1000 to get it in ms.
      sunriseTime.setMinutes(
        sunriseTime.getMinutes() + sunriseTime.getTimezoneOffset()
      );

      const sunsetTime = new Date((json.sys.sunset + json.timezone) * 1000);
      sunsetTime.setMinutes(
        sunsetTime.getMinutes() + sunsetTime.getTimezoneOffset()
      );
      console.log(sunriseTime);

      if (json.cod === "404") {
        errorMessage.innerHTML =
          "Can't find what you're looking for. Try another city, <br> or add the country as well: 'Stockholm, Sweden'!";
      } else {
        errorMessage.innerHTML = "";
        const todaysWeather = {
          temperature: json.main.temp.toFixed(),
          weather: json.weather[0],
          sunrise: sunriseTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          sunset: sunsetTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        shortDescription.innerHTML = todaysWeather.weather.description;
        temperature.innerHTML = `${todaysWeather.temperature} °C`;
        sunrise.innerHTML = `sunrise ${todaysWeather.sunrise}`;
        sunset.innerHTML = `sunset ${todaysWeather.sunset}`;

        pickTodaysDescription(todaysWeather.weather.main);
      }
    });
};

let dates = {};

const convertDate = (date) => {
  //Get the correct day
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const wholeDate = new Date(date);
  const dayName = dayNames[wholeDate.getDay()];
  return dayName;
};

//Fetching forecast
const fetchForecast = (city) => {
  fetch(
  `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${API_KEY}`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      if (json.list) {
        json.list.forEach((weather) => {
          const date = weather.dt_txt.split(" ")[0];
          if (dates[date]) {
            dates[date].push(weather);
          } else {
            dates[date] = [weather];
          }
        });

        //Emptying the forecast before populating it
        forecast.innerHTML = "";

        //Getting weather values
        Object.entries(dates).forEach((item, index) => {
          dates = {};
          const date = item[0];
          const weatherValues = item[1];
          const temps = weatherValues.map((value) => value.main.temp);

          const sum = temps.reduce((a, b) => a + b, 0);
          let averageTemp = sum / temps.length || 0;

          if (index === 0) {
            return;
          }

          let fixedTemp = averageTemp.toFixed();
          if (fixedTemp === "-0") {
            fixedTemp = "0";
          }

          const day = convertDate(date);

          try {
            forecast.innerHTML += `
              <div>
                <p>${day}</p>
                <p>${fixedTemp} °C</p>
              </div>
            `;
          } catch (error) {
            console.log(`Next day of forecast will come soon`);
          }
        });
      } else {
        console.log("No forecast available");
      }
    });
};

//Fetch again with new city input
const changeCity = () => {
  city = capitalizeFirstLetter(chosenCity.value);
  fetchWeather(city);
  fetchForecast(city);
  chosenCity.value = "";
};

//Listening to enter press when search for city
chosenCity.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    changeCity();
  }
});

searchButton.addEventListener("click", () => {
  changeCity();
});

//Fetch Stockholm data on page load
fetchWeather(city);
fetchForecast(city);