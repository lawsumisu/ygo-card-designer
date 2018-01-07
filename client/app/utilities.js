import {CardTypes, SpellActionTypes, TrapActionTypes} from 'client/app/constants';

export const getValidActionTypes = function(cardType){
    switch(cardType){
    case CardTypes.SPELL:
        return [SpellActionTypes.EQUIP, SpellActionTypes.QUICKPLAY, SpellActionTypes.CONTINUOUS, SpellActionTypes.FIELD, SpellActionTypes.RITUAL];
    case CardTypes.TRAP:
        return [TrapActionTypes.CONTINUOUS, TrapActionTypes.COUNTER];
    default:
        return [];
    }
}