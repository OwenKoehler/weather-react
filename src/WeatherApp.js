import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import Forecast from './components/Forecast';
import Header from './layout/Header';

import './styles.css';
import { setValidFalse } from './actions';

function WeatherApp() {
  const [forecast, setForecast] = useState([]);
  const zipcode = useSelector(state => state.zipcode.zipcode);
  const zipIsValid = useSelector(state => state.zipcode.valid);
  const dispatch = useDispatch();

  useEffect(() => {
    if(zipIsValid){
      axios
      .get(
        `http://api.openweathermap.org/data/2.5/forecast?zip=${zipcode}&units=imperial&APPID=` +
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
        dispatch(setValidFalse());
        // console.log(err);
      });
    }
  }, [zipcode, zipIsValid, dispatch]);

  return (
    <div className='App'>
      <Header forecast={forecast} />
      <Forecast forecast={forecast} />
    </div>
  );
}

export default WeatherApp;
