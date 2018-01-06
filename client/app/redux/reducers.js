'use strict';

import * as actions from './actions';
import {MonsterTypes} from '../constants';

const initialCardState = {
    name: 'Blue-Eyes White Dragon',
    level: 8,
    attribute: 'LIGHT',
    monsterType: MonsterTypes.NORMAL,
    fusionMaterials: ['"Blue-Eyes White Dragon"'],
    synchroMaterials: ['1 Tuner monster', '1 or more non-Tuner monsters'],
    lore: 'This legendary dragon is a powerful engine of destruction. Virtually invincible, very few have faced this awesome creature and lived to tell the tale.',
    tribes: ['Dragon'],
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
        case actions.UPDATE_MONSTER_TRIBE:
            return Object.assign({}, previousState, {
                tribes: action.tribes
            });
        case actions.UPDATE_FUSION_MATERIALS:
            return Object.assign({}, previousState, {
                fusionMaterials: action.fusionMaterials
            });
        case actions.UPDATE_SYNCHRO_MATERIALS:
            return Object.assign({}, previousState, {
                synchroMaterials: action.synchroMaterials
            });
        case actions.UPDATE_MONSTER_TYPE:
            return Object.assign({}, previousState, {
                monsterType: action.monsterType
            });
        case actions.UPDATE_LORE:
            return Object.assign({}, previousState, {
                lore: action.lore
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