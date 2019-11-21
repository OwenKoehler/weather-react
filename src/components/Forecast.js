import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { hourSelect } from '../actions';

import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

import '../resources/css/weather-icons.min.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      {...other}
    >
      <Box className={classes.panel}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    marginTop: '6em'
  },
  panel: {
    marginTop: '3.5em',
    width: '100%'
  },
  summaryContainer: {
    display: 'flex',
    marginLeft: '25%',
    marginRight: '40%',
    marginBottom: '3em'
  },
  weatherContainer: {},
  iconContainer: {
    width: '8em',
    margin: 'auto',
    marginLeft: '2em'
  },
  card: {},
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '8%'
  },
  infoItem: {
    flexGrow: 1
  },
  description: {
    color: '#2a3eb1'
  }
}));

function PanelContent(props) {
  const classes = useStyles();
  const { entry } = props;
  const weatherIcons = require('../resources/icons.json'); //with path
  const iconColor = '#637bfe';

  // From https://gist.github.com/tbranyen/62d974681dea8ee0caa1
  const getIcon = () => {
    var prefix = 'wi wi-';
    var code = entry.weather[0].id;
    var icon = weatherIcons[code].icon;

    // If we are not in the ranges mentioned above, add a day/night prefix.
    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
      icon = 'day-' + icon;
    }

    // Finally tack on the prefix.
    icon = prefix + icon;
    return icon;
  };

  return (
    <div>
      <CardContent className={classes.card}>
        <div className={classes.summaryContainer}>
          <div className={classes.weatherContainer}>
            <Typography gutterBottom variant='h1' component='h2'>
              {Math.ceil(entry.main.temp)}&#176;F
            </Typography>
            <Typography
              gutterBottom
              variant='h3'
              component='h2'
              className={classes.description}
            >
              {entry.weather[0].description.toUpperCase()}
            </Typography>
          </div>
          <div className={classes.iconContainer}>
            <i
              className={getIcon()}
              style={{ fontSize: 10 + 'em', color: iconColor }}
            ></i>
          </div>
        </div>

        <Divider variant='inset' />

        <div className={classes.infoContainer}>
          <div className={classes.infoItem}>
            <Typography gutterBottom variant='h5' component='h3'>
              {entry.main.humidity}%
            </Typography>
            <Typography gutterBottom variant='h6' component='h3'>
              Humidity
            </Typography>
          </div>

          <div className={classes.infoItem}>
            <Typography gutterBottom variant='h5' component='h3'>
              {entry.clouds.all}%
            </Typography>
            <Typography gutterBottom variant='h6' component='h3'>
              Cloud Cover
            </Typography>
          </div>

          <div className={classes.infoItem}>
            <Typography gutterBottom variant='h5' component='h3'>
              {entry.wind.speed}mph at {entry.wind.deg}&#176;
            </Typography>
            <Typography gutterBottom variant='h6' component='h3'>
              Wind
            </Typography>
          </div>
        </div>
      </CardContent>
    </div>
  );
}

export default function Forecast(props) {
  const { forecast } = props;
  const [day, setDay] = useState([]);

  const daySelection = useSelector(state => state.daySelect);
  const hourSelection = useSelector(state => state.hourSelect);
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    setDay(forecast[daySelection]);
  }, [forecast, daySelection, day]);

  const getPrettyTime = dateStr => {
    let hour = new Date(dateStr).getHours();
    let suffix = ' AM';
    if (hour > 11) suffix = ' PM';
    if (hour > 12) hour -= 12;
    return hour + suffix;
  };

  const handleChange = (event, newHourSelection) => {
    dispatch(hourSelect(newHourSelection));
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation='vertical'
        variant='scrollable'
        value={hourSelection}
        onChange={handleChange}
        className={classes.tabs}
      >
        {day &&
          day.map((entry, i) => (
            <Tab label={getPrettyTime(entry.dt_txt)} key={i} />
          ))}
      </Tabs>

      {day &&
        day.map((entry, i) => (
          <TabPanel
            value={hourSelection}
            className={classes.panel}
            key={i}
            index={i}
          >
            <PanelContent entry={entry} />
          </TabPanel>
        ))}
    </div>
  );
}
