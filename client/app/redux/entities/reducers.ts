import { cardReducer as cardReducer2 } from 'client/app/redux/card/reducers';
import { combineReducers } from 'redux';
import { setReducer } from 'client/app/redux/set/reducers';

export const entityReducer = combineReducers({
  cards: cardReducer2,
  sets: setReducer,
});