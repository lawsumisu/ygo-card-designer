import { Field, Model } from "client/app/redux/utilities";
import { v4 } from 'uuid';
import { initialCard } from "client/app/redux/card/state";

export interface SetField extends Field {
  name: string;
  cards: string[];
}

const id = v4();

export const initialSet: SetField = {
  id,
  name: 'Set 001',
  cards: [initialCard.id]
};

export interface SetState extends Model<SetField> {}

export const initialState: SetState = {
  byId: {
    [id]: initialSet
  },
  allIds: [id]
};
