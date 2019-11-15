import React from "react";
import { useGlobal } from 'reactn';
import AppBar from '@material-ui/core/AppBar';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles(theme => ({
  toolbar: {

  },
  tabs: {

  },
  tab: {

  },
  title: {

  },
  appBar: {
    backgroundColor: '#2196f3'
  }
}));

function Header(props) {
  const classes = useStyles();

  const {forecast} = props;
  const [daySelection, setDaySelection] = useGlobal('daySelection');
  const [hourSelection, setHourSelection] = useGlobal('hourSelection');

  const getPrettyDate = (dateStr) => {
    const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    let date = new Date(dateStr);
    return week[date.getDay()]+" "+date.getMonth()+"/"+date.getDate();
  }
  

  const handleClick = (dayNum) => {
    setDaySelection(dayNum);
    if(forecast[dayNum].length < hourSelection+1){
      setHourSelection(forecast[dayNum].length-1);
    }
  }

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography edge="start" variant="h6" className={classes.title} color="inherit">
          Cincinnati Weather
        </Typography>
        <Tabs value={daySelection} className={classes.tabs}>
          {forecast.map((day, i) => (
            <Tab
            key={i}
            label={getPrettyDate(day[0].dt_txt)}
            className={classes.tab}
            color="inherit"
            onClick={handleClick.bind(this, i)}
            />
          ))}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
