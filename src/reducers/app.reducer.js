
import { combineReducers } from 'redux';
import auth from './auth.reducer';
import route from './route.reducer';
import user from './user.reducer';
import history from './history.reducer';
const AppReducer = combineReducers({
  route,
  auth,
  user,
  history,
  profile
});

export default AppReducer;
