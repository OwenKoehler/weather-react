const initialState = {
  zipcode: 45150
};

const zipcodeReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case 'ZIP_SELECT':
      console.log({...state, zipcode: action.payload});
      return { ...state, zipcode: action.payload };
    default:
      return state;
  }
};

export default zipcodeReducer;
