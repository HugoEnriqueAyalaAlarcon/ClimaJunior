
import WeatherCard from './WeatherCard'
import React, { useEffect, useState } from "react";
const Temp = () => {
  const [searchValue, setSearchValue] = useState("Morelos, MX");
  const [tempInfo, setTempInfo] = useState({});
  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=b81d1235add18150329af82740e85f64`;
      const res = await fetch(url);
      const data = await res.json();
      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;
      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset
      };
      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
      alert("Ciudad no encontrada, intenta con otra");
    }
  };
  useEffect(() => {
    getWeatherInfo();
  }, []);
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search.."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Buscar
          </button>
        </div>
      </div>
      <WeatherCard tempInfo={tempInfo} />
      
    </>
  );
};

export default Temp;

