import { CardState, initialCard, initialState } from 'client/app/redux/card/state';
import { CardAction, CardActionType } from 'client/app/redux/card/actions';
import * as _ from 'lodash';
import { v4 } from 'uuid';

export function cardReducer(state: CardState = initialState, action: CardAction): CardState {
  switch (action.type) {
    case CardActionType.UPDATE_CARD:
      if (!_.isUndefined(action.payload.id)) {
        return {
          ...state,
          byId: {
            ...state.byId,
            [action.payload.id]: {
              ...state.byId[action.payload.id],
              ...action.payload
            }
          }
        };
      }
      else {
        return state;
      }
    case CardActionType.ADD_CARD:
      const id = v4();
      return {
        byId: {
          ...state.byId,
          [id]: {
            ...initialCard,
            id: id
          }
        },
        allIds: [...state.allIds, id]
      };
    default:
      return state;
  }
}