import './App.css';
import WeatherCard from './components/WeatherCard';

function App() {
  return (
    <div className="App">
      <main>
        <WeatherCard />
        <WeatherCard city="Busan" />
        <WeatherCard city="Paris" />
        <WeatherCard city="Tokyo" />
        <WeatherCard city="New York" />
      </main>
    </div>
  );
}

export default App;
