import React from "react";
import "./HourlyForecast.css";
import { ClipLoader } from "react-spinners";

const HourlyForecast = ({ cityName, forecast, loading }) => {
  const hasForecast = Array.isArray(forecast) && forecast.length > 0;

  const renderContent = () => {
    if (loading) {
      return (
        <div className="hourly-forecast__status hourly-forecast__status--loading">
          <ClipLoader
            color="white"
            loading={true}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      );
    }

    if (!hasForecast) {
      return <div className="hourly-forecast__status">Select a city to see the next hours.</div>;
    }

    return (
      <div className="hourly-forecast__grid">
        {forecast.map((entry) => {
          const formattedTime = new Date(entry.time).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          });

          return (
            <div key={entry.time} className="hourly-forecast__card">
              <div className="hourly-forecast__time">{formattedTime}</div>
              {entry.icon && (
                <img
                  className="hourly-forecast__icon"
                  src={`https://openweathermap.org/img/wn/${entry.icon}@2x.png`}
                  alt={entry.condition}
                />
              )}
              <div className="hourly-forecast__temp">{entry.temp}°</div>
              <div className="hourly-forecast__condition">{entry.condition}</div>
              <div className="hourly-forecast__feels">Feels like {entry.feelsLike}°</div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="hourly-forecast">
      <header className="hourly-forecast__header">
        <h1>{cityName ? `Next hours in ${cityName}` : "Hourly forecast"}</h1>
        <span className="hourly-forecast__subtitle">3-hour increments</span>
      </header>
      {renderContent()}
    </div>
  );
};

export default HourlyForecast;
