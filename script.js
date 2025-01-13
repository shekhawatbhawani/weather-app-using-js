
let input = document.querySelector("input");
let city = document.querySelector(".city");
let temperature = document.querySelector(".temperature");
let minTemp = document.querySelector(".min-temp");
let maxTemp = document.querySelector(".max-temp");
let feels = document.querySelector(".feels");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let pressure = document.querySelector(".pressure");
let lastTime = document.querySelector('.time')
let img = document.querySelector("img");
let value = "sikar"
input.addEventListener("input",()=>{
    value = input.value;
    getDetails(value)
})



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





function getDetails(value){
  let API = `https://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=b87abf895c511c59dbf662c17d489357`;

fetch(API).then(res => res.json()).then(data => {
    let cityValue = data.name;
    let temperatureValue = parseInt(data?.main?.temp - 273.15);
    let minTempValue = parseInt(data?.main?.temp_min - 273.15);
    let maxTempValue = parseInt(data?.main?.temp_max - 273.15);
    let feelsValue = parseInt(data?.main?.feels_like - 273.15);
    let humidityValue = data?.main?.humidity;
    let windValue = data?.wind?.speed;
    let pressureValue = data?.main?.pressure;
    img.src = `https://openweathermap.org/img/wn/${data.weather?.[0]?.icon}@4x.png`
    city.textContent = cityValue
    temperature.textContent = temperatureValue
    minTemp.textContent = minTempValue
    maxTemp.textContent = maxTempValue
    feels.textContent = feelsValue
    humidity.textContent = humidityValue
    wind.textContent = windValue
    pressure.textContent = pressureValue
})
}