import selectReducer from './select';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  select: selectReducer,
});

export default rootReducer;
