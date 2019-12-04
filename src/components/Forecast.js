import React, { useState, useEffect } from 'react';
import { useGlobal } from 'reactn';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Fade from '@material-ui/core/Fade';

import WeatherIcon from './WeatherIcon';
import '../resources/css/weather-icons.min.css';
import '../resources/city.list.json';
import '../styles.css';

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
    marginTop: '2em',
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
    marginTop: '8%',
    justifyContent: 'space-around'
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
  citySelect: {
    textAlign: 'left',
    marginLeft: '8%'
  },
  select: {
    width: '10em'
  }
}));

function CitySelect(props) {
  const classes = useStyles();
  const cities = require('../resources/city.list.json');
  const [filteredCities, setFilteredCities] = useState([]);

  const citiesProps = {
    options: cities,
    getOptionLabel: city => city.name
  };

  // source: https://dev.to/iam_timsmith/lets-build-a-search-bar-in-react-120j
  const handleChange = e => {
    // Variable to hold the original version of the list
    let currentList = [];
    // Variable to hold the filtered list before putting into state
    let newList = [];

    // If the search bar isn't empty
    if (e.target.value !== '' && e.target.value.length >= 4) {
      // Assign the original list to currentList
      currentList = cities;

      // Use .filter() to determine which items should be displayed
      // based on the search terms
      newList = currentList.filter(item => {
        // change current item to lowercase
        const lc = item.toLowerCase();
        // change search term to lowercase
        const filter = e.target.value.toLowerCase();
        // check to see if the current list item includes the search term
        // If it does, it will be added to newList. Using lowercase eliminates
        // issues with capitalization in search terms and search content
        return lc.includes(filter);
      });
    } else {
      // If the search bar is empty, set newList to original task list
      newList = this.props.items;
    }
    // Set the filtered state based on what our rules added to newList
    setFilteredCities(newList);
  };

  return (
    <div className={classes.citySelect}>
      <Autocomplete
        {...citiesProps}
        id='controlled-demo'
        renderInput={params => (
          <TextField {...params} label='controlled' margin='normal' fullWidth />
        )}
      />
    </div>
  );
}

function PanelContent(props) {
  const classes = useStyles();
  const { entry } = props;

  return (
    <div>
      <Fade in={true}>
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
              <WeatherIcon code={entry.weather[0].id} size={10} hour={(new Date(entry.dt_txt)).getHours()}/>
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

export default function Forecast(props) {
  const { forecast } = props;
  const [daySelection] = useGlobal('daySelection');
  const [hourSelection, setHourSelection] = useGlobal('hourSelection');
  const [day, setDay] = useState([]);

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
    setHourSelection(newHourSelection);
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
                  hour={(new Date(entry.dt_txt)).getHours()}
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
