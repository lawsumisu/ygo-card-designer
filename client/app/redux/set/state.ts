import {Field, Model} from "client/app/redux/utilities";

export interface SetField extends Field {
    name: string;
    cards: string[];
}

export interface SetState extends Model<SetField> {}

export const initialState: SetState = {
    byId: {
        '': {
            id: '',
            name: 'Set 001',
            cards: ['']
        }
    },
    allIds: ['']
};
