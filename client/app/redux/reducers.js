'use strict';

import * as actions from './actions';

const initialCardState = {
    name: 'Blue-Eyes White Dragon',
    level: 8,
    attribute: 'LIGHT',
    description: '',
    effect: '',
    atk: 3000,
    def: 2500,
}

function cardReducer(previousState=initialCardState, action){
    switch(action.type){
        case actions.UPDATE_ATK:
            return Object.assign({}, previousState, {
                atk: action.atk
            });
        case actions.UPDATE_DEF:
            return Object.assign({}, previousState, {
                def: action.def
            });
        case actions.UPDATE_ATTRIBUTE:
            return Object.assign({}, previousState, {
                attribute: action.attribute
            });
        case actions.UPDATE_DESCRIPTION:
            return Object.assign({}, previousState, {
                description: action.description
            });
        case actions.UPDATE_EFFECT:
            return Object.assign({}, previousState, {
                effect: action.effect
            });
        case actions.UPDATE_LEVEL:
            return Object.assign({}, previousState, {
                level: action.level
            });
        case actions.UPDATE_NAME:
            return Object.assign({}, previousState, {
                name: action.name
            });
        default:
            return previousState;
    }
}

export {cardReducer};