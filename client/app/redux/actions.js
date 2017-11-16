'use strict';

var atkDefRegex = /^[0-9]+$/

var getValidBattlePoint= function(battlePoint){
    console.log(battlePoint);
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
export const UPDATE_SPELL_SUBTYPE = 'UPDATE_SPELL_SUBTYPE';
export const UPDATE_TRAP_SUBTYPE = 'UPDATE_TRAP_SUBTYPE';
export const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION';
export const UPDATE_EFFECT = 'UPDATE_EFFECT';
export const UPDATE_ATTRIBUTE = 'UPDATE_ATTRIBUTE';
export const NONE = 'NONE'

//Action creators
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
    console.log(tribes);
    return {
        type: UPDATE_MONSTER_TRIBE,
        tribes: tribes
    }
}

function updateDescription(description){
    return {
        type: UPDATE_DESCRIPTION,
        description: description
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

export {updateAtk, updateDef, updateName, updateEffect, updateDescription, updateLevel, updateAttribute, updateTribes}