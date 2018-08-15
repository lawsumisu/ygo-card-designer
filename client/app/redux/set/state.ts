import { Field, Model } from "client/app/redux/utilities";
import { v4 } from 'uuid';
import { initialCard } from "client/app/redux/card/state";

export interface SetField extends Field {
  name: string;
  cards: string[];
}

export interface SetState extends Model<SetField> {}

export const initialState: SetState = {
  byId: {},
  allIds: []
};
