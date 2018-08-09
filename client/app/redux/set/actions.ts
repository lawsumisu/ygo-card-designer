import {Action} from 'redux';
import {SetField} from 'client/app/redux/set/state';
import { CardFields } from "client/app/redux/card/state";
import { CardAction, CardActionType } from "client/app/redux/card/actions";

export enum SetActionType {
    ADD_SET = 'ADD_SET',
    UPDATE_SET = 'UPDATE_SET',
    DELETE_SET = 'DELETE_SET'
}

export interface SetAction extends Action {
    type: SetActionType,
    payload: Partial<SetField>
}


export function updateSet(payload: Partial<CardFields>): SetAction {
  return {
    type: SetActionType.UPDATE_SET,
    payload: payload,
  }
}

export function addSet(): SetAction {
  return {
    type: SetActionType.ADD_SET,
    payload: {}
  }
}