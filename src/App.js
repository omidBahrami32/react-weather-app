import axios from "axios";
import "./App.css";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import Search from "./components/search/Search";
import { WEATHER_API_KEY, WEATHER_BASE_URL } from "./api/api";
import { useState } from "react";
import Forecast from "./components/forecast/Forecast";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const handleSearchChanged = async (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    try {
      const weatherResponse = await axios.get(`${WEATHER_BASE_URL}/weather`, {
        method: "GET",
        params: {
          lat: lat,
          lon: lon,
          appid: WEATHER_API_KEY,
          units: "metric",
        },
      });
      const forecastResponse = await axios.get(`${WEATHER_BASE_URL}/forecast`, {
        method: "GET",
        params: {
          lat: lat,
          lon: lon,
          appid: WEATHER_API_KEY,
          units: "metric",
        },
      });
      setCurrentWeather({ city: searchData.label, ...weatherResponse.data });
      setForecast({ city: searchData.label, ...forecastResponse.data });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(forecast);

  return (
    <div className="container">
      <Search onSearchChange={handleSearchChanged} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
