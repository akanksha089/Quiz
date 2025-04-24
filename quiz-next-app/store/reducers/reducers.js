import { combineReducers } from 'redux';
import homeReducer from './homeReducer';
import dashboardReducer from './dashboardReducer';

const rootReducer = combineReducers({
  apiData: homeReducer,
  dashboardData: dashboardReducer,
});

export default rootReducer;