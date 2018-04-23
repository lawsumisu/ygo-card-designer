'use strict';

const atkDefRegex = /^[0-9]+$/

const getValidBattlePoint = function(battlePoint){
    if (battlePoint === '' || battlePoint === '?') return battlePoint;
    else if ( atkDefRegex.test(battlePoint)){
        let battlePointAsNumber = parseInt(battlePoint);
        if (battlePointAsNumber < 10000) return battlePointAsNumber + ''; 
    }
}

// Actions
const Actions = {
    UPDATE_LEVEL: 'UPDATE_LEVEL',
    UPDATE_NAME: 'UPDATE_NAME',
    UPDATE_ATK: 'UPDATE_ATK',
    UPDATE_DEF: 'UPDATE_DEF',
    UPDATE_TYPE: 'UPDATE_TYPE',
    UPDATE_MONSTER_TRIBE: 'UPDATE_MONSTER_TRIBE',
    UPDATE_MONSTER_TYPE:  'UPDATE_MONSTER_TYPE',
    UPDATE_MONSTER_HYBRID_TYPE: 'UPDATE_MONSTER_HYBRID_TYPE',
    UPDATE_MONSTER_CLASS: 'UPDATE_MONSTER_CLASS',
    UPDATE_MONSTER_ABILITIES: 'UPDATE_MONSTER_ABILITIES',
    UPDATE_PENDULUM_EFFECT: 'UPDATE_PENDULUM_EFFECT',
    UPDATE_PENDULUM_SCALE_RIGHT: 'UPDATE_PENDULUM_SCALE_RIGHT',
    UPDATE_PENDULUM_SCALE_LEFT: 'UPDATE_PENDULUM_SCALE_LEFT',
    UPDATE_LINK_ARROW: 'UPDATE_LINK_ARROW',
    UPDATE_FUSION_MATERIALS: 'UPDATE_FUSION_MATERIALS',
    UPDATE_SYNCHRO_MATERIALS: 'UPDATE_SYNCHRO_MATERIALS',
    UPDATE_XYZ_MATERIALS: 'UPDATE_XYZ_MATERIALS',
    UPDATE_LINK_MATERIALS: 'UPDATE_LINK_MATERIALS',
    UPDATE_SPELL_SUBTYPE: 'UPDATE_SPELL_SUBTYPE',
    UPDATE_TRAP_SUBTYPE: 'UPDATE_TRAP_SUBTYPE',
    UPDATE_LORE: 'UPDATE_LORE',
    UPDATE_EFFECT: 'UPDATE_EFFECT',
    UPDATE_ATTRIBUTE: 'UPDATE_ATTRIBUTE',
    UPDATE_ACTION_TYPES: 'UPDATE_ACTION_TYPES',
    NONE: 'NONE'
}

//Action creators
let ActionCreators = {
    general: {
        updateName: updateName,
        updateLore: updateLore,
        updateEffect: updateEffect,
        updateAttribute: updateAttribute
    },
    monster: {
        updateName: updateName,
        updateLevel: updateLevel,
        updateAtk: updateAtk,
        updateDef: updateDef,
        updateTribes: updateTribes,
        updateMonsterType: updateMonsterType,
        updateMonsterHybridType: updateMonsterHybridType,
        updateMonsterClass: updateMonsterClass,
        updateMonsterAbilities: updateMonsterAbilities,
        updateFusionMaterials: updateFusionMaterials,
        updateSynchroMaterials: updateSynchroMaterials,
        updateXyzMaterials: updateXyzMaterials,
        updateLinkMaterials: updateLinkMaterials,
        updatePendulumEffect: updatePendulumEffect,
        updatePendulumScale: updatePendulumScale,
        updateLinkArrow: updateLinkArrow
    },
    action: {
        updateActionTypes: updateActionTypes
    }
}
function updateName(name){
    return {
        type: Actions.UPDATE_NAME,
        name: name
    }
}

function updateLevel(level){
    return {
        type: Actions.UPDATE_LEVEL,
        level: level
    }
}

function updateAtk(atk){
    const validatedAtk = getValidBattlePoint(atk);
    if (validatedAtk != undefined){
        return {
        type: Actions.UPDATE_ATK,
        atk: validatedAtk
        }
    } 
    else return {
        type: Actions.NONE
    }
}

function updateDef(def){
    const validatedDef = getValidBattlePoint(def);
    if (validatedDef != undefined){
        return {
        type: Actions.UPDATE_DEF,
        def: validatedDef
        }
    } 
    else return {
        type: Actions.NONE
    }
}

function updateTribes(tribes){
    return {
        type: Actions.UPDATE_MONSTER_TRIBE,
        tribes: tribes
    }
}

function updateMonsterType(monsterType){
    return {
        type: Actions.UPDATE_MONSTER_TYPE,
        monsterType: monsterType
    }
}

function updateMonsterHybridType(monsterHybridType){
    return {
        type: Actions.UPDATE_MONSTER_HYBRID_TYPE,
        monsterHybridType: monsterHybridType
    }
}

function updateMonsterClass(monsterClass){
    return {
        type: Actions.UPDATE_MONSTER_CLASS,
        monsterClass: monsterClass
    }
}

function updateMonsterAbilities(monsterAbilities){
    return {
        type: Actions.UPDATE_MONSTER_ABILITIES,
        monsterAbilities: monsterAbilities
    }
}

function updateFusionMaterials(fusionMaterials){
    return {
        type: Actions.UPDATE_FUSION_MATERIALS,
        fusionMaterials: fusionMaterials
    }
}

function updateSynchroMaterials(synchroMaterials){
    return {
        type: Actions.UPDATE_SYNCHRO_MATERIALS,
        synchroMaterials: synchroMaterials
    }
}

function updateXyzMaterials(xyzMaterials){
    return {
        type: Actions.UPDATE_XYZ_MATERIALS,
        xyzMaterials: xyzMaterials
    }
}

function updateLinkMaterials(linkMaterials){
    return {
        type: Actions.UPDATE_LINK_MATERIALS,
        linkMaterials: linkMaterials
    }
}

function updateLore(lore){
    return {
        type: Actions.UPDATE_LORE,
        lore: lore
    }
}

function updateEffect(effect){
    return {
        type: Actions.UPDATE_EFFECT,
        effect: effect
    }
}

function updateAttribute(attribute){
    return {
        type: Actions.UPDATE_ATTRIBUTE,
        attribute: attribute
    }
}

function updateActionTypes(actionTypes){
    return {
        type: Actions.UPDATE_ACTION_TYPES,
        actionTypes: actionTypes
    }
}

function updatePendulumEffect(pendulumEffect){
    return {
        type: Actions.UPDATE_PENDULUM_EFFECT,
        pendulumEffect: pendulumEffect
    }
}

function updatePendulumScale(pendulumScale, isLeftNotRightScale){
    if (isLeftNotRightScale){
        return {
            type: Actions.UPDATE_PENDULUM_SCALE_LEFT,
            pendulumScale: pendulumScale
        }
    }
    else{
       return {
            type: Actions.UPDATE_PENDULUM_SCALE_RIGHT,
            pendulumScale: pendulumScale
        } 
    }
}

function updateLinkArrow(linkArrowValue, linkIndex){
    return {
        type: Actions.UPDATE_LINK_ARROW,
        linkArrowValue: linkArrowValue,
        linkIndex: linkIndex
    }
}

export {ActionCreators, Actions}