//NOTE this API key is exposed, but it's fine because this one is free
const apiKey = "accb9d3c49626138ea02283155a14f92";
const cityName = document.getElementById("cityName");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const temp = document.getElementById("temp");
const cloudiness = document.getElementById("cloudiness");
const search = document.getElementById("search");
const tempUnitsBtn = document.getElementById("tempUnitsBtn");
const searchIcon = document.getElementById("searchIcon");
const errorMessage = document.getElementById("errorMessage");
let tempUnits = "°C";
let data;//will be initailized later

function celToFah(val) {
  return Math.round(Number(val) * 1.8 + 32);
}

function fahToCel(val) {
  return Math.round((Number(val) - 32) / 1.8);
}

function capitalize(str) {
  //capitalize every word
  let result = "";
  for (let i = 0; i < str.length; i++) {
    if (i == 0 || str[i - 1] == " ") {
      result += str[i].toUpperCase();
    }
    else {
      result += str[i];
    }
  }
  return result;
}

function displayData(data) {
  errorMessage.innerText = "";
  tempUnitsBtn.innerText = tempUnits;
  cityName.innerText = data.cityName;
  description.innerText = capitalize(data.description);
  humidity.innerText = "Humidity:" + data.humidity;
  cloudiness.innerText = "Cloudiness:" + data.cloudiness;
  feelsLike.innerText = "Feels Like:" + (tempUnits == "°F" ? celToFah(data.feelsLike) : data.feelsLike) + tempUnits;
  temp.innerText = "Temperature:" + (tempUnits == "°F" ? celToFah(data.temp) : data.temp) + tempUnits;
}

function displayError() {
  errorMessage.innerText = "Location Not Found"
}

function processJSON(data) {
  return {
    cityName: data.name,
    description: data.weather[0].description,
    feelsLike: String(Math.round(data.main.feels_like)),
    humidity: String(data.main.humidity) + "%",
    temp: String(Math.round(data.main.temp)),
    cloudiness: String(data.clouds.all) + "%"
  }
}

async function getWeatherData(location) {
  //NOTE Data is in Celcius
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`, {
      mode: 'cors'
    });
    const json = await response.json();
    data = processJSON(json);
    displayData(data);
  }
  catch (error) {//TODO display error when location isn't found
    console.log(error);
    displayError();
  }
}

search.addEventListener("keyup", function (event) {
  if (event.code === 'Enter') {
    //when enter is pressed
    getWeatherData(search.value);
  }
});

tempUnitsBtn.addEventListener("click", () => {
  if (tempUnits == "°C") {
    tempUnits = "°F";
    tempUnitsBtn.classList.remove("cel");
    tempUnitsBtn.classList.add("fah");
  }
  else {
    tempUnits = "°C";
    tempUnitsBtn.classList.remove("fah");
    tempUnitsBtn.classList.add("cel");
  }
  displayData(data);
})

searchIcon.addEventListener("click", () => {
  getWeatherData(search.value);
})

getWeatherData("Tainan");//default