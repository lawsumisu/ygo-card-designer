export enum MonsterTypes {
  BASIC = 'Basic',
  FUSION = 'Fusion',
  SYNCHRO = 'Synchro',
  DARK_SYNCHRO = 'Dark Synchro',
  RITUAL = 'Ritual',
  XYZ = 'Xyz',
  LINK = 'Link',
  PENDULUM = 'Pendulum',
  PURE = 'Pure'
}

export const OrderedMonsterTypeKeyList = [MonsterTypes.BASIC, MonsterTypes.FUSION, MonsterTypes.SYNCHRO, MonsterTypes.RITUAL, MonsterTypes.XYZ];
export const OrderedMonsterHybridTypeKeyList = ['PURE', 'PENDULUM'];

export enum CardTypes {
  MONSTER = 'Monster',
  SPELL = 'Spell',
  TRAP = 'Trap'
}

export enum SpellActionTypes {
  CONTINUOUS = 'CONTINUOUS',
  FIELD = 'FIELD',
  RITUAL = 'RITUAL',
  QUICKPLAY = 'QUICKPLAY',
  EQUIP = 'EQUIP',
}

export enum TrapActionTypes {
  CONTINUOUS = 'CONTINUOUS',
  COUNTER = 'COUNTER'
}

export enum MonsterClasses {
  NON_TUNER = 'Non-Tuner',
  TUNER = 'Tuner',
  DARK_TUNER = 'Dark Tuner'
}

export enum Rarities {
  COMMON = 'Common',
  RARE = 'Rare',
  ULTRA_RARE = 'Ultra Rare',
}

export enum BrowserTypes {
  FIREFOX = 'FIREFOX',
  CHROME = 'CHROME'
}

export enum Attribute {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
  WIND = 'WIND',
  WATER = 'WATER',
  EARTH = 'EARTH',
  FIRE = 'FIRE',
  DIVINE = 'DIVINE',
  SPELL = 'SPELL',
  TRAP = 'TRAP'
}

export type ActionType = SpellActionTypes | TrapActionTypes;

export const AllActionTypes = Object.assign({}, SpellActionTypes, TrapActionTypes);