'use strict';

// Actions
export const UPDATE_LEVEL = 'UPDATE_LEVEL';
export const UPDATE_NAME = 'UPDATE_NAME';
export const UPDATE_ATK = 'UPDATE_ATK';
export const UPDATE_DEF = 'UPDATE_DEF';
export const UPDATE_TYPE = 'UPDATE_TYPE';
export const UPDATE_MONSTER_SUBTYPE = 'UPDATE_MONSTER_SUBTYPE';
export const UPDATE_SPELL_SUBTYPE = 'UPDATE_SPELL_SUBTYPE';
export const UPDATE_TRAP_SUBTYPE = 'UPDATE_TRAP_SUBTYPE';
export const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION';
export const UPDATE_EFFECT = 'UPDATE_EFFECT';
export const UPDATE_ATTRIBUTE = 'UPDATE_ATTRIBUTE';

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
    return {
        type: UPDATE_ATK,
        atk: atk
    }
}

function updateDef(def){
    return {
        type: UPDATE_DEF,
        def: def
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

function updateType(type){
    return {
        type: UPDATE_TYPE,
        cardType: type
    }
}

function updateAttribute(attribute){
    return {
        type: UPDATE_ATTRIBUTE,
        attribute: attribute
    }
}

export {updateAtk, updateDef, updateName, updateEffect, updateType, updateDescription, updateLevel, updateAttribute}