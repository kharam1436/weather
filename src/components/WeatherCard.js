import React, { useEffect, useState } from "react";
import "./WeatherCard.css";
import { fetchCityWeather, fetchWeatherFromUserLocation } from "../utils/getWeather";

// Simple contract:
// - Props: city (string) optional, defaults to "Seattle"
// - Output: current weather card with temp, description, hi/lo, feels like, icon
// - Errors: shows an error message when fetch fails or when API key missing

const WeatherCard = ({ city, label, isActive = false, onSelect, onWeatherLoaded }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const load = async () => {
      setLoading(true);
      try {
    if(!city) {
      const weatherData = await fetchWeatherFromUserLocation();
            setData(weatherData);
              if (weatherData && onWeatherLoaded) {
                onWeatherLoaded(weatherData);
              }
        } else {
            const weatherData = await fetchCityWeather({ city });
            setData(weatherData);
              if (weatherData && onWeatherLoaded) {
                onWeatherLoaded(weatherData);
              }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [city]);

  const handleSelect = () => {
    if (loading || !data || !onSelect) {
      return;
    }

    onSelect(data);
  };

  const handleKeyDown = (event) => {
    if (!onSelect) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSelect();
    }
  };

  const title = data?.location || label || city || "Loading";
  const conditionLabel = loading ? "Fetching weather..." : data ? data.condition : "No data";

  return (
    <article
      className={`weather-card-wrapper${isActive ? " active" : ""}${loading ? " loading" : ""}${onSelect ? " selectable" : ""}`}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      aria-pressed={onSelect ? isActive : undefined}
    >
      <div className={`glass weather-card compact${loading ? " is-loading" : ""}`}>
        <div className="weather-card__top">
          <div className="weather-card__title">
            <span className="weather-card__label">{title}</span>
            <div className="weather-card__condition">
              {!loading && data?.icon && (
                <img
                  className="weather-icon"
                  src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
                  alt={data.condition}
                />
              )}
              <span className="condition-text">{conditionLabel}</span>
            </div>
          </div>
          <div className="weather-card__metrics">
            <div className="temp">{loading || !data ? "--" : `${data.temp}°`}</div>
          </div>
        </div>

        <div className="weather-card__meta">
          {data ? (
            <>
              <span className="hi-lo">H:{data.high}° • L:{data.low}°</span>
              <span className="feels">Feels like {data.feelsLike}°</span>
            </>
          ) : (
            <span className="hi-lo">{loading ? "Updating..." : "Weather unavailable"}</span>
          )}
        </div>
      </div>
    </article>
  );
};

export default WeatherCard;
