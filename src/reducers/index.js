import { combineReducers } from 'redux';
import { currentUserReducer } from './currentUser';
import { favoriteReducer } from './favorites';

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  favorites: favoriteReducer
});

export default rootReducer;