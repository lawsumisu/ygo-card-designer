import {CardTypes, SpellActionTypes, TrapActionTypes, BrowserTypes} from 'client/app/constants';
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

export const getBrowser = function(){
    // Opera 8.0+
    // var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

    // Firefox 1.0+
    if(typeof InstallTrigger !== 'undefined'){
        return BrowserTypes.FIREFOX;
    }
    // Chrome 1+
    else if (!!window.chrome && !!window.chrome.webstore){
        return BrowserTypes.CHROME;
    }
}