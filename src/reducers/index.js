import daySelectReducer from './daySelect';
import hourSelectReducer from './hourSelect';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  daySelect: daySelectReducer,
  hourSelect: hourSelectReducer
});

export default rootReducer;
