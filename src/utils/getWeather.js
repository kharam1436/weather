import { getLocationFromBrowser } from "./getLocationFromBrowser";

const apiKey = "c6956d09852e0da72c5e414567ff21dc";

export const fetchCityWeather = async ({ city }) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API error ${res.status}: ${text}`);
    }
    const json = await res.json();

    // map useful fields
    return {
      location: `${json.name}${
        json.sys && json.sys.country ? ", " + json.sys.country : ""
      }`,
      temp: Math.round(json.main.temp),
      high: Math.round(json.main.temp_max),
      low: Math.round(json.main.temp_min),
      feelsLike: Math.round(json.main.feels_like),
      condition:
        json.weather && json.weather[0] ? json.weather[0].description : "",
      icon: json.weather && json.weather[0] ? json.weather[0].icon : null,
      updated: new Date(json.dt * 1000).toLocaleTimeString(),
    };
  } catch (err) {
    console.error(err.message);
  } finally {
  }
};

export const fetchWeatherFromCoords = async ({ latitude, longitude }) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API error ${res.status}: ${text}`);
    }
    const json = await res.json();

    // map useful fields
    return {
      location: `${json.name}${
        json.sys && json.sys.country ? ", " + json.sys.country : ""
      }`,
      temp: Math.round(json.main.temp),
      high: Math.round(json.main.temp_max),
      low: Math.round(json.main.temp_min),
      feelsLike: Math.round(json.main.feels_like),
      condition:
        json.weather && json.weather[0] ? json.weather[0].description : "",
      icon: json.weather && json.weather[0] ? json.weather[0].icon : null,
      updated: new Date(json.dt * 1000).toLocaleTimeString(),
    };
  } catch (err) {
    console.error(err.message);
  } finally {
  }
};

export const fetchWeatherFromUserLocation = async () => {
    const location = await getLocationFromBrowser();
    if (location) {
        return fetchWeatherFromCoords(location);
    } else {
        throw new Error("Unable to get user location from browser");
    }
};

export const fetchThreeHourForecast = async ({ city, latitude, longitude }) => {
  try {
    let query = "";

    if (typeof latitude === "number" && typeof longitude === "number") {
      query = `lat=${latitude}&lon=${longitude}`;
    } else if (city) {
      query = `q=${encodeURIComponent(city)}`;
    } else {
      throw new Error("City or coordinates are required to fetch the forecast");
    }

    const url = `https://api.openweathermap.org/data/2.5/forecast?${query}&units=metric&appid=${apiKey}&cnt=5`;
    const res = await fetch(url);

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Forecast API error ${res.status}: ${text}`);
    }

    const json = await res.json();

    if (!Array.isArray(json.list)) {
      throw new Error("Forecast data is unavailable");
    }

    return json.list.map((item) => ({
      time: item.dt * 1000,
      temp: Math.round(item.main.temp),
      feelsLike: Math.round(item.main.feels_like),
      condition:
        item.weather && item.weather[0] ? item.weather[0].description : "",
      icon: item.weather && item.weather[0] ? item.weather[0].icon : null,
      humidity: item.main.humidity,
    }));
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};
