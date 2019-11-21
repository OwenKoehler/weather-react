const hourSelectReducer = (state = 0, action) => {
  switch (action.type) {
    case 'HOUR_SELECT':
      return action.payload;
    default:
      return state;
  }
};

export default hourSelectReducer;
