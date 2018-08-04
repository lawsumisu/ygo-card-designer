import {Action} from 'redux';
import {SetField} from 'client/app/redux/set/state';

export enum SetActionType {
    ADD_SET = 'ADD_SET',
    UPDATE_SET = 'UPDATE_SET',
    DELETE_SET = 'DELETE_SET'
}

export interface SetAction extends Action {
    type: SetActionType,
    payload: Partial<SetField>
}