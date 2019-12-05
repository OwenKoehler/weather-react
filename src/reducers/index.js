import selectReducer from './select';
import zipcodeReducer from './zipcode'
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  select: selectReducer,
  zipcode: zipcodeReducer,
});

export default rootReducer;
