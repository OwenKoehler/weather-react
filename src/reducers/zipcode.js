const initialState = {
  zipcode: 45150,
  valid: true
};

const isValidUSZip = (zip) => {
  return /^\d{5}$/.test(zip);
}  

const zipcodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ZIP_SELECT':
      return { ...state, zipcode: action.payload, valid: isValidUSZip(action.payload)};
    case 'SET_VALID_FALSE':
      return { ...state, valid: false};
    default:
      return state;
  }
};

export default zipcodeReducer;
