import { useCallback, useEffect, useState } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import HourlyForecast from "./components/HourlyForecast";
import { fetchThreeHourForecast } from "./utils/getWeather";

const CARD_CONFIGS = [
  { id: "current-location", label: "My Location" },
  { id: "busan", city: "Busan" },
  { id: "paris", city: "Paris" },
  { id: "tokyo", city: "Tokyo" },
  { id: "new-york", city: "New York" },
];

function App() {
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [selectedWeather, setSelectedWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [forecastLoading, setForecastLoading] = useState(false);

  const selectedCityLabel =
    selectedWeather?.location || selectedWeather?.friendlyLabel || null;

  useEffect(() => {
    if (!selectedWeather?.location) {
      return;
    }

    let isActive = true;

    const loadForecast = async () => {
      setForecastLoading(true);

      try {
        const result = await fetchThreeHourForecast({
          city: selectedWeather.location,
        });
        if (isActive) {
          setForecast(result || []);
        }
      } catch (err) {
        if (isActive) {
          setForecast([]);
        }
      } finally {
        if (isActive) {
          setForecastLoading(false);
        }
      }
    };

    loadForecast();

    return () => {
      isActive = false;
    };
  }, [selectedWeather]);

  const handleCardSelect = useCallback((cardId, weatherData) => {
    if (!weatherData) {
      return;
    }

    const friendlyLabel = CARD_CONFIGS.find(
      (card) => card.id === cardId
    )?.label;

    setSelectedCardId(cardId);
    setSelectedWeather({ ...weatherData, friendlyLabel });
  }, []);

  const handleWeatherLoaded = useCallback(
    (cardId, weatherData) => {
      if (!weatherData || selectedCardId !== cardId) {
        return;
      }

      const friendlyLabel = CARD_CONFIGS.find((card) => card.id === cardId)?.label;
      setSelectedWeather({ ...weatherData, friendlyLabel });
    },
    [selectedCardId]
  );

  return (
    <div className="App">
      <div className="app-layout">
        <aside className="sidebar" aria-label="Saved cities">
          {CARD_CONFIGS.map((card) => (
            <WeatherCard
              key={card.id}
              city={card.city}
              label={card.label}
              isActive={selectedCardId === card.id}
              onSelect={(weatherData) => handleCardSelect(card.id, weatherData)}
              onWeatherLoaded={(weatherData) =>
                handleWeatherLoaded(card.id, weatherData)
              }
            />
          ))}
        </aside>
        <main className="content" aria-live="polite">
          <HourlyForecast
            cityName={selectedCityLabel}
            forecast={forecast}
            loading={forecastLoading}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
