import React from "react";
import "./WeatherCard.css";

const WeatherCard = () => {
  const current = {
    location: "Seattle",
    temp: 11,
    condition: "Cloudy",
    high: 16,
    low: 11,
    feelsLike: 11,
    updated: "Now",
  };

  return (
    <div>
        <header>{current.location}</header>
      <main className="glass weather-card">
        <div className="temp">{current.temp}°</div>
        <div className="details">
          <div className="condition">{current.condition}</div>
          <div className="hi-lo">
            H:{current.high}° • L:{current.low}°
          </div>
          <div className="feels">Feels like {current.feelsLike}°</div>
        </div>
      </main>
    </div>
  );
};

export default WeatherCard;
