export const MonsterTypes = {
    BASIC: 'Basic',
    FUSION: 'Fusion',
    SYNCHRO: 'Synchro',
    RITUAL: 'Ritual',
    XYZ: 'Xyz',
    LINK: 'Link',
    PENDULUM: 'Pendulum',
    PURE: 'Pure'
}

export const OrderedMonsterTypeKeyList = [MonsterTypes.BASIC, MonsterTypes.FUSION, MonsterTypes.SYNCHRO, MonsterTypes.RITUAL, MonsterTypes.XYZ];
export const OrderedMonsterHybridTypeKeyList = ['PURE', 'PENDULUM'];

export const CardTypes = {
    MONSTER: 'MONSTER',
    SPELL: 'SPELL',
    TRAP: 'TRAP'
}

export const SpellActionTypes = {
    CONTINUOUS: 'CONTINUOUS',
    FIELD: 'FIELD',
    RITUAL: 'RITUAL',
    QUICKPLAY: 'QUICKPLAY',
    EQUIP: 'EQUIP',
}

export const TrapActionTypes = {
    CONTINUOUS: 'CONTINUOUS',
    COUNTER: 'COUNTER'
}

export const MonsterClasses = {
    NON_TUNER: 'Non-Tuner',
    TUNER: 'Tuner'
}

export const BrowserTypes = {
    MOZILLA: 'MOZILLA',
    CHROME: 'CHROME'
}

export const AllActionTypes = Object.assign({}, SpellActionTypes, TrapActionTypes);