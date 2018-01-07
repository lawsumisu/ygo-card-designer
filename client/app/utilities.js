import {CardTypes, SpellActionTypes, TrapActionTypes} from 'client/app/constants';
import _ from 'lodash';

export const getValidActionTypes = function(cardType){
    switch(cardType){
    case CardTypes.SPELL:
        return [SpellActionTypes.QUICKPLAY, SpellActionTypes.EQUIP, SpellActionTypes.CONTINUOUS, SpellActionTypes.FIELD, SpellActionTypes.RITUAL];
    case CardTypes.TRAP:
        return [TrapActionTypes.CONTINUOUS, TrapActionTypes.COUNTER];
    default:
        return [];
    }
}

/**
 * Gets a Set of action types that are incompatible with inputted list of action types, for a specific card type.
 * @param {*} cardType 
 * @param {*} actionType 
 */
export const getIncompatibleActionTypes = function(cardType, actionTypes){
    let incompatibleActionTypes = new Set();
    if (cardType === CardTypes.SPELL){
        _.forEach(actionTypes, (actionType) => {
            if (actionType === SpellActionTypes.EQUIP || actionType === SpellActionTypes.FIELD){
                incompatibleActionTypes.add(SpellActionTypes.CONTINUOUS);
            }
            if (actionType === SpellActionTypes.CONTINUOUS || actionType === SpellActionTypes.FIELD){
                incompatibleActionTypes.add(SpellActionTypes.EQUIP);
            }
            if (actionType === SpellActionTypes.CONTINUOUS || actionType === SpellActionTypes.EQUIP){
                incompatibleActionTypes.add(SpellActionTypes.FIELD);
            }
        })
    }
    return incompatibleActionTypes;
}