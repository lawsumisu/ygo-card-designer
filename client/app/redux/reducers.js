'use strict';

import {Actions} from 'client/app/redux/actions';
import {MonsterTypes, MonsterClasses} from 'client/app/constants';

let initialCardState = {
    name: 'Blue-Eyes White Dragon',
    level: 8,
    attribute: 'LIGHT',
    actionTypes: [],
    monsterType: MonsterTypes.BASIC,
    monsterHybridType: MonsterTypes.PURE,
    monsterClass: MonsterClasses.NON_TUNER,
    monsterAbilities: [],
    fusionMaterials: ['"Blue-Eyes White Dragon"'],
    synchroMaterials: ['1 Tuner monster', '1 or more non-Tuner monsters'],
    xyzMaterials: '3 Normal Dragon-Type monsters',
    lore: 'This legendary dragon is a powerful engine of destruction. Virtually invincible, very few have faced this awesome creature and lived to tell the tale.',
    tribes: ['Dragon'],
    effect: '',
    pendulumEffect: '',
    leftPendulumScale: 0,
    rightPendulumScale: 13,
    linkArrows: [false, false, false, false, false, false, false, false],
    linkMaterials: '3+ LIGHT Normal Dragon-Type monsters',
    atk: 3000,
    def: 2500,
}


function cardReducer(previousState=initialCardState, action){
    switch(action.type){
        case Actions.UPDATE_ATK:
            return Object.assign({}, previousState, {
                atk: action.atk
            });
        case Actions.UPDATE_DEF:
            return Object.assign({}, previousState, {
                def: action.def
            });
        case Actions.UPDATE_ATTRIBUTE:
            return Object.assign({}, previousState, {
                attribute: action.attribute
            });
        case Actions.UPDATE_ACTION_TYPES:
            return Object.assign({}, previousState, {
                actionTypes: action.actionTypes
            });
        case Actions.UPDATE_MONSTER_TRIBE:
            return Object.assign({}, previousState, {
                tribes: action.tribes
            });
        case Actions.UPDATE_FUSION_MATERIALS:
            return Object.assign({}, previousState, {
                fusionMaterials: action.fusionMaterials
            });
        case Actions.UPDATE_SYNCHRO_MATERIALS:
            return Object.assign({}, previousState, {
                synchroMaterials: action.synchroMaterials
            });
        case Actions.UPDATE_XYZ_MATERIALS:
            return Object.assign({}, previousState, {
                xyzMaterials: action.xyzMaterials
            });
        case Actions.UPDATE_LINK_MATERIALS:
            return Object.assign({}, previousState, {
                linkMaterials: action.linkMaterials
            });
        case Actions.UPDATE_MONSTER_TYPE:
            return Object.assign({}, previousState, {
                monsterType: action.monsterType
            });
        case Actions.UPDATE_MONSTER_HYBRID_TYPE:
            return Object.assign({}, previousState, {
                monsterHybridType: action.monsterHybridType
            });
        case Actions.UPDATE_MONSTER_CLASS:
            return Object.assign({}, previousState,{
                monsterClass: action.monsterClass
            });
        case Actions.UPDATE_MONSTER_ABILITIES:
            return Object.assign({}, previousState,{
                monsterAbilities: action.monsterAbilities
            });
        case Actions.UPDATE_LORE:
            return Object.assign({}, previousState, {
                lore: action.lore
            });
        case Actions.UPDATE_EFFECT:
            return Object.assign({}, previousState, {
                effect: action.effect
            });
        case Actions.UPDATE_PENDULUM_EFFECT:
            return Object.assign({}, previousState, {
                pendulumEffect: action.pendulumEffect
            })
        case Actions.UPDATE_PENDULUM_SCALE_RIGHT:
            return Object.assign({}, previousState, {
                rightPendulumScale: action.pendulumScale
            });
        case Actions.UPDATE_PENDULUM_SCALE_LEFT:
            return Object.assign({}, previousState, {
                leftPendulumScale: action.pendulumScale
            });
        case Actions.UPDATE_LINK_ARROW:
            return Object.assign({}, previousState, {
                linkArrows: previousState.linkArrows.map((oldLinkArrowValue, linkIndex) => {
                    return linkIndex === action.linkIndex ? action.linkArrowValue : oldLinkArrowValue;
                })
            });
        case Actions.UPDATE_LEVEL:
            return Object.assign({}, previousState, {
                level: action.level
            });
        case Actions.UPDATE_NAME:
            return Object.assign({}, previousState, {
                name: action.name
            });
        default:
            return previousState;
    }
}

export {cardReducer};