'use strict';

var atkDefRegex = /^[0-9]+$/

var getValidBattlePoint= function(battlePoint){
    if (battlePoint === '' || battlePoint === '?') return battlePoint;
    else if ( atkDefRegex.test(battlePoint)){
        var battlePointAsNumber = parseInt(battlePoint);
        if (battlePointAsNumber < 10000) return battlePointAsNumber + ''; 
    }
}
// Actions
export const UPDATE_LEVEL = 'UPDATE_LEVEL';
export const UPDATE_NAME = 'UPDATE_NAME';
export const UPDATE_ATK = 'UPDATE_ATK';
export const UPDATE_DEF = 'UPDATE_DEF';
export const UPDATE_TYPE = 'UPDATE_TYPE';
export const UPDATE_MONSTER_TRIBE = 'UPDATE_MONSTER_TRIBE';
export const UPDATE_MONSTER_TYPE =  'UPDATE_MONSTER_TYPE';
export const UPDATE_FUSION_MATERIALS = 'UPDATE_FUSION_MATERIALS';
export const UPDATE_SYNCHRO_MATERIALS = 'UPDATE_SYNCHRO_MATERIALS';
export const UPDATE_XYZ_MATERIALS = 'UPDATE_XYZ_MATERIALS';
export const UPDATE_SPELL_SUBTYPE = 'UPDATE_SPELL_SUBTYPE';
export const UPDATE_TRAP_SUBTYPE = 'UPDATE_TRAP_SUBTYPE';
export const UPDATE_LORE = 'UPDATE_LORE';
export const UPDATE_EFFECT = 'UPDATE_EFFECT';
export const UPDATE_ATTRIBUTE = 'UPDATE_ATTRIBUTE';
export const NONE = 'NONE'

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
        updateFusionMaterials: updateFusionMaterials,
        updateSynchroMaterials: updateSynchroMaterials,
        updateXyzMaterials: updateXyzMaterials,
    }
}
function updateName(name){
    return {
        type: UPDATE_NAME,
        name: name
    }
}

function updateLevel(level){
    return {
        type: UPDATE_LEVEL,
        level: level
    }
}

function updateAtk(atk){
    var validatedAtk = getValidBattlePoint(atk);
    if (validatedAtk != undefined){
        return {
        type: UPDATE_ATK,
        atk: validatedAtk
        }
    } 
    else return {
        type: NONE
    }
}

function updateDef(def){
    var validatedDef = getValidBattlePoint(def);
    if (validatedDef != undefined){
        return {
        type: UPDATE_DEF,
        def: validatedDef
        }
    } 
    else return {
        type: NONE
    }
}

function updateTribes(tribes){
    return {
        type: UPDATE_MONSTER_TRIBE,
        tribes: tribes
    }
}

function updateMonsterType(monsterType){
    return {
        type: UPDATE_MONSTER_TYPE,
        monsterType: monsterType
    }
}

function updateFusionMaterials(fusionMaterials){
    return {
        type: UPDATE_FUSION_MATERIALS,
        fusionMaterials: fusionMaterials
    }
}

function updateSynchroMaterials(synchroMaterials){
    return {
        type: UPDATE_SYNCHRO_MATERIALS,
        synchroMaterials: synchroMaterials
    }
}

function updateXyzMaterials(xyzMaterials){
    return {
        type: UPDATE_XYZ_MATERIALS,
        xyzMaterials: xyzMaterials
    }
}

function updateLore(lore){
    return {
        type: UPDATE_LORE,
        lore: lore
    }
}

function updateEffect(effect){
    return {
        type: UPDATE_EFFECT,
        effect: effect
    }
}

function updateAttribute(attribute){
    return {
        type: UPDATE_ATTRIBUTE,
        attribute: attribute
    }
}

export {ActionCreators}