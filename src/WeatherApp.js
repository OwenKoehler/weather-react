import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Forecast from './components/Forecast';
import Header from './layout/Header';
import './styles.css';

function WeatherApp() {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    axios
      .get(
        'http://api.openweathermap.org/data/2.5/forecast?id=4508722&units=imperial&APPID=' +
          process.env.REACT_APP_OPEN_WEATHER_API_KEY
      )
      .then(response => {
        let list = response.data.list;
        let arr = [[]];
        let arrIndex = 0;
        let lastDate = list[0].dt_txt.substring(0, 11);

        list.forEach(entry => {
          if (!(lastDate === entry.dt_txt.substring(0, 11))) {
            arr.push([]);
            arrIndex++;
          } else {
            arr[arrIndex].push(entry);
          }
          lastDate = entry.dt_txt.substring(0, 11);
        });

        const days = arr.filter(day => day.length > 0);

        console.log(days);
        setForecast(days);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className='App'>
      <Header forecast={forecast} />
      <Forecast forecast={forecast} />
    </div>
  );
}

export default WeatherApp;
