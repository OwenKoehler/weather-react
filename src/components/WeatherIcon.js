import React from 'react';

export default function IconService(props) {
  const { code } = props;
  const weatherIcons = require('../resources/icons.json'); //with path
  const iconColor = '#637bfe';

  var prefix = 'wi wi-';
  var icon = weatherIcons[code].icon;
  // From https://gist.github.com/tbranyen/62d974681dea8ee0caa1
  const getIcon = () => {
    // If we are not in the ranges mentioned above, add a day/night prefix.
    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
      icon = 'day-' + icon;
    }
    // Finally tack on the prefix.
    icon = prefix + icon;
    return icon;
  };
  
  return (
    <i
      className={getIcon(code)}
      style={{ fontSize: 10 + 'em', color: iconColor }}
    ></i>
    
  )
}
