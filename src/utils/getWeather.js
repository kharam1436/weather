const apiKey = "c6956d09852e0da72c5e414567ff21dc";

export const fetchWeather = async ({city}) => {
  
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
