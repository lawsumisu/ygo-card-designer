import { createStore, combineReducers, Reducer } from 'redux';
import { cardReducer } from './reducers';
import { CardState } from "client/app/redux/card/state";
import { entityReducer } from "client/app/redux/entities/reducers";
import { SetState } from "client/app/redux/set/state";

export type AppState = {
  cardReducer: any,
  entities: {
    cards: CardState,
    sets: SetState,
  },
}

const rootReducer: Reducer<AppState> = combineReducers({
  entities: entityReducer,
  cardReducer: cardReducer
});

let store = createStore(rootReducer);

export { store };