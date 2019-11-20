import React, { useState, useEffect } from 'react';
import { setGlobal } from 'reactn';
import axios from 'axios';
import { CookiesProvider, useCookies } from 'react-cookie';

import Forecast from './components/Forecast';
import Header from './layout/Header';
import './App.css';

function WeatherApp() {
  const [forecast, setForecast] = useState([]);
  const [forecast2, setForecast2] = useState([]);
  const [cookies, setCookie] = useCookies(['lastCallTime', 'forecastCookie1', 'forecastCookie2']);

  setGlobal({
    daySelection: 0,
    hourSelection: 0
  });

  useEffect(() => {
    if (cookies.lastCallTime && new Date(cookies.lastCallTime).getMinutes() ) {
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

          let forecastArr = [];
          days.forEach((day, i) => {
            forecastArr.push([]);
            day.forEach(entry => {
              forecastArr[i].push(
                { dt_txt: entry.dt_txt,
                  wind_speed: entry.wind.speed,
                  wind_deg: entry.wind.deg,
                  clouds: entry.clouds.all,
                  humidity: entry.main.humidity,
                  temp: entry.main.temp
              })
            })
          })

          console.log(forecastArr)
          setCookie('lastCallTime', new Date(), { path: '/' });
          // var json_str = JSON.stringify(days);
          // console.log(json_str);
          // json_str = JSON.stringify(json_str);
          // console.log(json_str);
          // setCookie('forecastCookie', [[{a:1,b:2,c:3}], [{a:1,b:2,c:3}], [{a:1,b:2,c:3}]], { path: '/' });
          setCookie('forecastCookie1', forecastArr.slice(0,3), { path: '/' });
          setCookie('forecastCookie2', forecastArr.slice(3,6), { path: '/' });
          console.log(new Date(cookies.lastCallTime));
          // console.log(JSON.parse(json_str));
          // console.log(JSON.parse(JSON.parse(json_str)));
          console.log(cookies.forecastCookie1);
          console.log(cookies.forecastCookie2);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log('USING COOKIE');
      console.log(cookies.lastCallTime);
      console.log(cookies.forecastCookie);
      setForecast(JSON.parse(cookies.forecastCookie));
    }
  }, []);

  return (
    <CookiesProvider>
      <div className='App'>
        <Header forecast={forecast} />
        <Forecast forecast={forecast} />
      </div>
    </CookiesProvider>
  );
}

export default WeatherApp;
