//NOTE this API key is exposed, but it's fine because this one is free
const apiKey = "accb9d3c49626138ea02283155a14f92";

function celToFah(val) {
  return Number(val) * 1.8 + 32;
}

function fahToCel(val) {
  return (Number(val) - 32) / 1.8
}

function displayData(data) {
  console.table(data);
}

function processJSON(data) {
  console.log(data);
  return {
    descripton: data.weather[0].description,
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    temp: Math.round(data.main.temp),//Celcius
    cityName: data.name,
    cloudiness: String(data.clouds.all) + "%"
  }
}

async function getWeatherData(location) {
  try {
    //NOTE get Celcius
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`, {
      mode: 'cors'
    });
    const json = await response.json();
    data = processJSON(json);
    displayData(data);
  }
  catch (error) {
    console.log(error);
  }
}

getWeatherData("Tainan");//default