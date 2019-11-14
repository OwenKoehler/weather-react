import React, { useState, useEffect } from "react";
import { useGlobal } from 'reactn';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();

  return (
    <Typography
      component="div"
      role="tabpanel"
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
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    marginTop: '6em',
  },
  panel: {
    marginTop: '3.5em',
    marginLeft: '2em'
  }
}));

function PanelContent(props) {
  const {entry} = props;

  return (
    <div>
      <h1>{entry.weather[0].description.toUpperCase()}</h1>

      <h2>Temperature</h2>
      <p>{entry.main.temp}&#176;F</p>
      <h2>Cloud Cover</h2>
      <p>{entry.clouds.all}%</p>
      <h2>Wind</h2>
      <p>{entry.wind.speed}mph at {entry.wind.deg}&#176;</p>
    </div>
  );
}

export default function Forecast(props) {
  const {forecast} = props;
  const [selection] = useGlobal('selection');
  const [day, setDay] = useState([]);

  const classes = useStyles();
  const [value, setValue] = useState(0);

  useEffect(() => {
    setDay(forecast[selection])
  }, [forecast, selection, day])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        className={classes.tabs}
      >
      {day && day.map((entry, i) => (
        <Tab label={entry.dt_txt.substring(11)} key={i}/>
      ))}
      </Tabs>

      {day && day.map((entry, i) => (
        <TabPanel value={value} className={classes.panel} key={i} index={i}>
          <PanelContent entry={entry}/>
        </TabPanel>
      ))}

    </div>
  );
}

