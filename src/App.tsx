import { use, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

type Weather = {
  temp: number;
  condition: string;
  city: string;
  country: string;
  region: string;
  feelsLike: number;
  humidity: number;
  wind: number;
}



function App() {

  const [cityName, setCityName] = useState<string>("");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  function checkWeather(){
    console.log("Test PR change");

    if(!cityName){
      return;
    }
    setLoading(true);
    setError(null);

    fetch(`http://api.weatherapi.com/v1/current.json?key=f4790b6476d24862807143951262003&q=${cityName}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      setWeather({
        city: data.location.name,
        country: data.location.country,
        region: data.location.region,
        temp: data.current.temp_c,
        condition: data.current.condition.text,
        feelsLike: data.current.feelslike_c,
        humidity: data.current.humidity,
        wind: data.current.wind_kph,
      })
    })
    .catch(err => {
      setError(err.message);
    })
    .finally(function(){
      setLoading(false);
      console.log("ihbdshud");
    });


  }

  return (
    <div className="container">
      <div className="sidebar">
        <div className="search">
        <input
          className="searching"
          type="text"
          value={cityName}
          onChange={(evt) => setCityName(evt.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              checkWeather();
            }
          }}
        />
  
        <button className="searchButton" onClick={checkWeather}>
          Search
        </button>
        </div>
      </div>
  
      <div className="response">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
  
        {weather && (
          <div className="weather-response">
            <h2>{weather.city}, {weather.country}</h2>
            <p>{weather.region}</p>
            <p>Temperature: {weather.temp} C</p>
            <p>Feels like: {weather.feelsLike} C</p>
            <p>Humidity: {weather.humidity} %</p>
            <p>Wind: {weather.wind} km/h</p>
            <p>Condition: {weather.condition}</p>
          </div>
        )}
      </div>
  
    </div>
  );
  

}

export default App;// Test PR change
