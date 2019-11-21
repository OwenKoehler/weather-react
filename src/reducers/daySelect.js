const daySelectReducer = (state = 0, action) => {
  switch (action.type) {
    case 'DAY_SELECT':
      return action.payload;
    default:
      return state;
  }
};

export default daySelectReducer;
