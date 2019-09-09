import { combineReducers } from 'redux';
import { errorReducer } from './error';
import { currentUserReducer } from './currentUser';
import { favoriteReducer } from './favorites';

const rootReducer = combineReducers({
  error: errorReducer,
  currentUser: currentUserReducer,
  favorites: favoriteReducer
});

export default rootReducer;