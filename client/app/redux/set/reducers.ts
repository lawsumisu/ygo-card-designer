import { initialState, SetState } from 'client/app/redux/set/state';
import { SetAction, SetActionType } from 'client/app/redux/set/actions';
import { v4 } from 'uuid';
import * as _ from 'lodash';

let setCounter = 1;

export function setReducer(state: SetState = initialState, action: SetAction): SetState{
  switch(action.type){
    case SetActionType.UPDATE_SET:
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
    case SetActionType.ADD_SET:
      const id = v4();
      const setCounterString = _.padStart(`${setCounter++}`, 3, '0');
      return {
        byId: {
          ...state.byId,
          [id]: {
            id: id,
            name: `New Set ${setCounterString}`,
            cards: []
          }
        },
        allIds: [...state.allIds, id]
      };
    default:
      return state;
  }
}