import { createSelector } from 'reselect';
import {CardTypes, SpellActionTypes, TrapActionTypes} from 'client/app/constants';
import {getValidActionTypes} from 'client/app/utilities';

const selectCardAttribute = (state) => state.cardReducer.attribute;

export const selectCardType = createSelector(
  [selectCardAttribute],
  (cardAttribute) => {
      if (cardAttribute === 'SPELL'){
          return CardTypes.SPELL;
      }
      else if (cardAttribute === 'TRAP'){
          return CardTypes.TRAP;
      }
      else{
          return CardTypes.MONSTER;
      }
  }
)

export const selectValidActionTypes = createSelector([selectCardType], getValidActionTypes);