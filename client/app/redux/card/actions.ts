import { CardFields, CardState } from 'client/app/redux/card/state';

export enum CardActionType {
  UPDATE_CARD = 'UPDATE_CARD',
  ADD_CARD = 'ADD_CARD',
  DELETE_CARD = 'DELETE_CARD'
}

export interface CardAction {
  type: CardActionType;
  payload: Partial<CardFields>;
}

export function updateCard(payload: Partial<CardFields>): CardAction {
  return {
    type: CardActionType.UPDATE_CARD,
    payload: payload,

  }
}

export function addCard(): CardAction {
  return {
    type: CardActionType.ADD_CARD,
    payload: {}
  }
}