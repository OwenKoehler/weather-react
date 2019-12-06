import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { zipSelect } from '../actions';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Popper from '@material-ui/core/Popper';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const useStyles = makeStyles(theme => ({
  zipContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  zipTextContainer: {
    paddingLeft: '1.5em',
    marginBottom: '2em',
    width: '10em'
  },
  zipsButtonContainer: {
    marginRight: '1.5em',
    marginTop: '1.5em',
    backgroundColor: '#E0E0E0',
    borderRadius: '5%',
    width: '6em',
    height: '3em'
  }
}));

export default function Zipcode() {
  const classes = useStyles();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(true);

  const zipcode = useSelector(state => state.zipcode.zipcode);
  const zipIsValid = useSelector(state => state.zipcode.valid);
  const dispatch = useDispatch();

  const getFavs = useCallback(() => {
    axios.get('/zips').then(response => {
      let favs = [];
      response.data.forEach(fav => {
        favs.push(fav.zip);
      });
      setFavorites(favs);
    });
  }, [setFavorites]);


  useEffect(() => {
    getFavs();
    setIsFavorite(favorites.includes(zipcode));
  }, []);

  const handleTextChange = event => {
    event.persist();
    dispatch(zipSelect(event.target.value));
  };

  const handleFavClick = () => {
    if (favorites.includes(zipcode)) {
      axios
        .get(`/delete/${zipcode}`)
        .then(() => {
          setFavorites(favorites.filter(fav => fav !== zipcode));
          setIsFavorite(false);
        });
    } else {
      axios
        .post('/add', {
          zip: zipcode
        }).then(() => {
          let arr = favorites.slice();
          arr.push(zipcode);
          setFavorites(arr);
          setIsFavorite(true);
        });
    }
  };

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={classes.zipContainer}>
      <div className={classes.zipTextContainer}>
        <TextField
          id='zipcode-search'
          label='Zipcode'
          value={zipcode}
          error={!zipIsValid}
          helperText={zipIsValid ? '' : 'Enter a valid zipcode'}
          onChange={handleTextChange}
          margin='normal'
          variant='outlined'
        />
      </div>

      <div className={classes.zipsButtonContainer} ref={anchorRef}>
        <IconButton color='secondary' onClick={handleFavClick}>
          {favorites.includes(zipcode) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <IconButton color='primary' onClick={handleToggle}>
          <ExpandMoreIcon />
        </IconButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom'
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList>
                    {favorites.map((favorite, index) => (
                      <MenuItem
                        key={favorite}
                        disabled={
                          index === favorites.findIndex(fav => zipcode === fav)
                        }
                      >
                        {favorite}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
