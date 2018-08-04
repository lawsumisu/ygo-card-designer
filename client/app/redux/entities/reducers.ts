import {cardReducer as cardReducer2} from "client/app/redux/card/reducers";
import {combineReducers} from "redux";

export const entityReducer = combineReducers({
    cards: cardReducer2,
});