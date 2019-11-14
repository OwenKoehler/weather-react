import React from "react";
import { useGlobal } from 'reactn';
import AppBar from '@material-ui/core/AppBar';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  navButton: {
    margin: 'auto'
  },
  title: {
    margin: 'auto',
    marginLeft: '1em'
  },
}));

function Header(props) {
  const classes = useStyles();

  const {forecast} = props;
  const [selection, setSelection] = useGlobal('selection');
  

  const handleClick = (dayNum) => {
    setSelection(dayNum);
  }
  const handleChange = (dayNum) => {
    setSelection(dayNum);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography edge="start" variant="h6" className={classes.title} color="inherit">
            Cincinnati Weather
          </Typography>
          <Tabs value={selection} onChange={handleChange}>
            {forecast.map((day, i) => (
              <Tab
              key={i}
              label={day[0].dt_txt.substring(0,11)}
              className={classes.navButton}
              color="inherit"
              onClick={handleClick.bind(this, i)}
              />
            ))}
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;