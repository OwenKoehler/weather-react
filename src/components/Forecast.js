import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { hourSelect, zipSelect } from '../actions';

import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';

import WeatherIcon from './WeatherIcon';
import '../resources/css/weather-icons.min.css';
import '../styles.css';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    marginTop: '4em'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    marginTop: '1.5em'
  },
  tab: {
    // flexDirection: 'row-reverse',   *in styles.css to overwrite generated MuiTab-wrapper*
    // justifyContent: 'space-evenly'   *in styles.css to overwrite generated MuiTab-wrapper*
  },
  icon: {},
  panel: {
    marginTop: '0em',
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
    justifyContent: 'space-around',
    marginTop: '8%',
  },
  infoItem: {
    // borderRadius: '50%',
    // border: '2px solid grey',
    // width: '12em',
    // height: '12em',
  },
  description: {
    color: '#2a3eb1'
  },
  searchContainer: {
    textAlign: 'left',
    paddingLeft: '1.5em',
    marginBottom: '2em'
  },
  searchField: {}
}));

function PanelContent(props) {
  const classes = useStyles();
  const { entry } = props;

  const zipcode = useSelector(state => state.zipcode.zipcode);
  const zipIsValid = useSelector(state => state.zipcode.valid);
  const dispatch = useDispatch();

  const handleTextChange = event => {
    event.persist();
    dispatch(zipSelect(event.target.value));
  };

  return (
    <div>
      <Fade in={true}>
        <CardContent className={classes.card}>
          <div className={classes.searchContainer}>
            <TextField
              id='zipcode-search'
              label='Zipcode'
              value={zipcode}
              error={!zipIsValid}
              helperText={zipIsValid ? '' : 'Enter a valid zipcode'}
              onChange={handleTextChange}
              className={classes.searchField}
              margin='normal'
              variant='outlined'
            />
          </div>
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
              <WeatherIcon
                code={entry.weather[0].id}
                size={10}
                hour={new Date(entry.dt_txt).getHours()}
              />
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
      </Fade>
    </div>
  );
}

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

export default function Forecast(props) {
  const { forecast } = props;
  const [day, setDay] = useState([]);

  const daySelection = useSelector(state => state.select.daySelect);
  const hourSelection = useSelector(state => state.select.hourSelect);
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
            <Tab
              label={getPrettyTime(entry.dt_txt)}
              key={i}
              className={classes.tab}
              wrapped={false}
              icon={
                <WeatherIcon
                  code={entry.weather[0].id}
                  size={1.5}
                  hour={new Date(entry.dt_txt).getHours()}
                  classname={classes.icon}
                />
              }
            />
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
