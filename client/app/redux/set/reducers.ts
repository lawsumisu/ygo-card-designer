import { initialSet, initialState, SetState } from 'client/app/redux/set/state';
import { SetAction, SetActionType } from 'client/app/redux/set/actions';
import { v4 } from 'uuid';
import * as _ from 'lodash';

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
      return {
        byId: {
          ...state.byId,
          [id]: {
            ...initialSet,
            id: id
          }
        },
        allIds: [...state.allIds, id]
      };
    default:
      return state;
  }
}