import React, { useEffect, useState } from "react";
import "./WeatherCard.css";
import { fetchCityWeather, fetchWeatherFromUserLocation } from "../utils/getWeather";

// Simple contract:
// - Props: city (string) optional, defaults to "Seattle"
// - Output: current weather card with temp, description, hi/lo, feels like, icon
// - Errors: shows an error message when fetch fails or when API key missing

const WeatherCard = ({ city = "Busan" }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const load = async () => {
      setLoading(true);
      try { 
        const weatherData = await fetchWeatherFromUserLocation();
        setData(weatherData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [city]);

  return (
    <div>
      <header className="weather-header">
        <h2>{data ? data.location : city}</h2>
        <div className="updated">{data ? data.updated : loading ? "Loading..." : "-"}</div>
      </header>

      <main className="glass weather-card">
        {loading ? (
          <div className="loading">Loading weather...</div>
        ) : data ? (
          <>
            <div className="temp">{data.temp}°</div>
            <div className="details">
              <div className="condition">
                    {data.icon && (
                      <img
                        className="weather-icon"
                        src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
                        alt={data.condition}
                      />
                    )}
                    <span className="condition-text">{data.condition}</span>
              </div>
              <div className="hi-lo">
                H:{data.high}° • L:{data.low}°
              </div>
              <div className="feels">Feels like {data.feelsLike}°</div>
            </div>
          </>
        ) : (
          <div>No data</div>
        )}
      </main>
    </div>
  );
};

export default WeatherCard;
