import {createStore, combineReducers, Reducer} from 'redux';
import {cardReducer} from './reducers';
import {CardState} from "client/app/redux/card/state";
import {entityReducer} from "client/app/redux/entities/reducers";

export type AppState = {
    cardReducer: any,
    entities: {
        cards: CardState
    },
}

const rootReducer: Reducer<AppState> = combineReducers({
    entities: entityReducer,
    cardReducer: cardReducer
});

let store = createStore(rootReducer);

export {store};