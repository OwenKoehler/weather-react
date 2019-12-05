const initialState = {
  daySelect: 1,
  hourSelect: 1
};

const selectReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DAY_SELECT':
      return { ...state, daySelect: action.payload };
    case 'HOUR_SELECT':
      return { ...state, hourSelect: action.payload };
    default:
      return state;
  }
};

export default selectReducer;
