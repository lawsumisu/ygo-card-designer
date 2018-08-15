import { SpellActionTypes, MonsterTypes, MonsterClasses, Rarities, Attribute, ActionType } from 'client/app/constants';
import { Field, Model } from "client/app/redux/utilities";
import { v4 } from 'uuid';
import blueEyes from 'client/app/assets/BlueEyesWhiteDragon.png';

export type LinkArrows = [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean];

export interface CardFields extends Field {
  name: string;
  image: string | null;
  stars: number,
  attribute: Attribute;
  actionTypes: ActionType[];
  monsterType: MonsterTypes;
  monsterHybridType: MonsterTypes.PURE | MonsterTypes.PENDULUM;
  monsterClass: MonsterClasses;
  monsterAbilities: string[];
  fusionMaterials: string[];
  synchroMaterials: string[];
  darkSynchroMaterials: string[];
  xyzMaterials: string;
  lore: string;
  tribes: string[];
  effect: string;
  pendulumEffect: string;
  leftPendulumScale: number;
  rightPendulumScale: number;
  linkArrows: LinkArrows;
  linkMaterials: string;
  atk: string,
  def: string,
  rarity: Rarities
}

export interface CardState extends Model<CardFields> {
}

const id = v4();
export const initialCard: CardFields = {
  id: id,
  name: 'Blue-Eyes White Dragon',
  image: blueEyes,
  stars: 8,
  attribute: Attribute.LIGHT,
  actionTypes: [],
  monsterType: MonsterTypes.BASIC,
  monsterHybridType: MonsterTypes.PURE,
  monsterClass: MonsterClasses.NON_TUNER,
  monsterAbilities: [],
  fusionMaterials: ['"Blue-Eyes White Dragon"'],
  synchroMaterials: ['1 Tuner monster', '1 or more non-Tuner monsters'],
  darkSynchroMaterials: ['1 Dark Tuner monster', '1 or more non-Dark Tuner monsters'],
  xyzMaterials: '3 Normal Dragon-Type monsters',
  lore: 'This legendary dragon is a powerful engine of destruction. Virtually invincible, very few have faced this awesome creature and lived to tell the tale.',
  tribes: ['Dragon'],
  effect: '',
  pendulumEffect: '',
  leftPendulumScale: 0,
  rightPendulumScale: 13,
  linkArrows: [false, false, false, false, false, false, false, false],
  linkMaterials: '3+ LIGHT Normal Dragon-Type monsters',
  atk: '3000',
  def: '2500',
  rarity: Rarities.ULTRA_RARE
};

export const initialState: CardState = {
  byId: {
    [id]: initialCard
  },
  allIds: [id]
};