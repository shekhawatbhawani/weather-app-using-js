let input = document.querySelector("input");
let city = document.querySelector(".city");
let temperature = document.querySelector(".temperature");
let minTemp = document.querySelector(".min-temp");
let maxTemp = document.querySelector(".max-temp");
let feels = document.querySelector(".feels");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let pressure = document.querySelector(".pressure");
let lastTime = document.querySelector(".time");
let img = document.querySelector("img");
let value = "sikar";
input.addEventListener("input", () => {
  if (input.value === "") {
    value = "sikar";
    getDetails(value);
  } else {
    value = input.value;
    getDetails(value);
  }
});
let date = new Date();
let day = date.getDay();
let raj = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();
let hours = date.getHours();
let minutes = date.getMinutes();
let ampm = hours >= 12 ? "PM" : "AM";

hours = hours % 12;
hours = hours ? hours : 12;

minutes = minutes < 10 ? `0${minutes}` : minutes;

let dayArray = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let monthArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let dayName = dayArray[day];
let monthName = monthArray[month];
let finalDate = `${dayName}, ${monthName} ${raj}, ${year} at ${hours}:${minutes} ${ampm}`;

lastTime.textContent = finalDate;

function getDetails(value) {
  let API = `https://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=b87abf895c511c59dbf662c17d489357`;

  fetch(API)
    .then((res) => res.json())
    .then((data) => {
      let cityValue = data.name;
      let temp = +(data?.main?.temp - 273.15).toFixed(2);
      let temperatureValue = `${temp}&deg;c`
      let minTemps = +(data?.main?.temp_min - 273.15).toFixed(2);
      let minTempValue = `min: ${minTemps}&deg;C`
      let maxTemps = +(data?.main?.temp_max - 273.15).toFixed(2);
      let maxTempValue = ` max: ${maxTemps}&deg;C`
      let feel = +(data?.main?.feels_like - 273.15).toFixed(2);
      let feelsValue = `${feel}&deg;c`
      let humiditys = data?.main?.humidity;
      let humidityValue = `${humiditys}%`
      let winds = data?.wind?.speed;
      let windValue = `${winds}m/s`
      let pressures = data?.main?.pressure;
      let pressureValue = `${pressures} hPs`
      img.src = `https://openweathermap.org/img/wn/${data.weather?.[0]?.icon}@4x.png`;
      city.textContent = cityValue;
      temperature.innerHTML = temperatureValue;
      minTemp.innerHTML = minTempValue;
      maxTemp.innerHTML = maxTempValue;
      feels.innerHTML = feelsValue;
      humidity.innerHTML = humidityValue;
      wind.innerHTML = windValue;
      pressure.innerHTML = pressureValue;
    });
}
