import React, { useState, useEffect } from "react";
import { useGlobal } from 'reactn';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';

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
    width: '100%',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    marginTop: '6em',
  },
  panel: {
    marginTop: '3.5em',
    width: '100%'
  },
  iconContainer: {
    backgroundColor: '#637bfe',
    width: "8em",
    borderRadius: '50%',
    margin: 'auto',
    marginBottom: '2em',
  },
  // iconContainer: {
  //   backgroundColor: '#637bfe',
  //   width: "8em",
  //   borderRadius: '3%',
  //   margin: 'auto',
  //   marginBottom: '2em',
  // },
  card: {
    alignItems: 'center'
  },
  infoContainer: {
    display: 'flex',
    flexDirection: "row",
    flexWrap: 'wrap',
    marginTop: '5em',
  },
  infoItem: {
    flexGrow: 1,
  },
  description: {
    color: '#637bfe'
  }
}));

function PanelContent(props) {
  const classes = useStyles();
  const {entry} = props;
  const iconUrl = "http://openweathermap.org/img/wn/"+entry.weather[0].icon+"@2x.png"

  return (
    <div>
      <CardContent className={classes.card}>
        <div className={classes.iconContainer}>
          <img src={iconUrl} alt=""/>
        </div>
        <Typography gutterBottom variant="h4" component="h2" className={classes.description}>
          {entry.weather[0].description.toUpperCase()}
        </Typography>

        <div className={classes.infoContainer}>
          <div className={classes.infoItem}>
            <Typography gutterBottom variant="h5" component="h3">
              {entry.main.temp}&#176;F
            </Typography>
            <Typography gutterBottom variant="h6" component="h3">
              Temperature
            </Typography>
          </div>

          <div className={classes.infoItem}>
            <Typography gutterBottom variant="h5" component="h3">
              {entry.clouds.all}%
            </Typography>
            <Typography gutterBottom variant="h6" component="h3">
              Cloud Cover
            </Typography>
          </div>

          <div className={classes.infoItem}>
            <Typography gutterBottom variant="h5" component="h3">
              {entry.wind.speed}mph at {entry.wind.deg}&#176;
            </Typography>
            <Typography gutterBottom variant="h6" component="h3">
              Wind
            </Typography>
          </div>
        </div>

      </CardContent>
    </div>
  );
}

export default function Forecast(props) {
  const {forecast} = props;
  const [daySelection] = useGlobal('daySelection');
  const [hourSelection, setHourSelection] = useGlobal('hourSelection');
  const [day, setDay] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    setDay(forecast[daySelection])
  }, [forecast, daySelection, day])

  const handleChange = (event, newHourSelection) => {
    setHourSelection(newHourSelection);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={hourSelection}
        onChange={handleChange}
        className={classes.tabs}
      >
      {day && day.map((entry, i) => (
        <Tab label={entry.dt_txt.substring(11)} key={i}/>
      ))}
      </Tabs>

      {day && day.map((entry, i) => (
        <TabPanel value={hourSelection} className={classes.panel} key={i} index={i}>
          <PanelContent entry={entry}/>
        </TabPanel>
      ))}
        
    </div>
  );
}

