import React from 'react';

export default function IconService(props) {
  const { code, size, hour } = props;
  const weatherIcons = require('../resources/icons.json'); //with path
  const iconColor = '#637bfe';

  var prefix = 'wi wi-';
  var icon = weatherIcons[code].icon;
  // From https://gist.github.com/tbranyen/62d974681dea8ee0caa1
  const getIcon = () => {
    
    if (hour > 6 && hour < 20) {
      //Day time
      icon = 'day-' + icon;
    } else {
      //Night time
      icon = 'night-alt-' + icon;
    }
    // Finally tack on the prefix.
    icon = prefix + icon;
    
    if(icon === 'wi wi-night-sunny' || icon === 'wi wi-night-alt-sunny'){
      icon = 'wi wi-night-clear'
    }
    console.log(icon);
    return icon;
  };

  return (
    <i
      className={getIcon(code)}
      style={{ fontSize: size + 'em', color: iconColor }}
    ></i>
  );
}
