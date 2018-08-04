import * as React from 'react';
import * as _ from 'lodash';
import { AppState } from "client/app/redux/store";
import { CardFields } from "client/app/redux/card/state";
import { Dispatch } from "redux";
import { addCard, updateCard } from "client/app/redux/card/actions";
import { Card } from 'client/app/components/cards/Card';
import { Attribute, CardTypes } from "client/app/constants";
import { connect } from "react-redux";
import 'client/app/components/cards/cardGallery.scss';

interface CardGalleryStateMappedProps {
  cards: CardFields[],
}

interface CardGalleryDispatchMappedProps {
  actions: {
    updateCard: (cardFields: Partial<CardFields>) => any;
    addCard: () => any;
  }
}

class CardGallery extends React.Component<CardGalleryStateMappedProps & CardGalleryDispatchMappedProps> {
  public static mapStateToProps(state: AppState): CardGalleryStateMappedProps {
    const cards = state.entities.cards;
    return {
      cards: _.map(cards.allIds, (id: string) => cards.byId[id])
    }
  }

  public static mapDispatchToProps(dispatch: Dispatch<any>): CardGalleryDispatchMappedProps {
    return {
      actions: {
        addCard: () => dispatch(addCard()),
        updateCard: (cardFields: Partial<CardFields>) => dispatch(updateCard(cardFields)),
      }
    }
  }

  public render(): React.ReactNode {
    return (
      <div className='card-gallery--container'>
        <input type="button" value='Click Me!' onClick={() => this.props.actions.addCard()}/>
        <div className={'cards--container'}>
          {_.map(this.props.cards, (card: CardFields, i: number) => (
            <Card
              key={i}
              cardState={{
                cardType: this.getCardType(card.attribute),
                ...card,
                level: card.stars
              }}
              updateName={(name) => this.props.actions.updateCard({id: card.id, name: name})}
              updateRarity={(rarity) => this.props.actions.updateCard({id: card.id, rarity: rarity})}
              updateLevel={(stars) => this.props.actions.updateCard({id: card.id, stars: stars})}
              updateAttribute={(attribute) => this.props.actions.updateCard({
                id: card.id,
                attribute: attribute
              })}
              updateActionTypes={(actionTypes) => this.props.actions.updateCard({
                id: card.id,
                actionTypes: actionTypes
              })}
              updateAtk={(atk) => this.props.actions.updateCard({id: card.id, atk: atk})}
              updateDef={(def) => this.props.actions.updateCard({id: card.id, def: def})}
              updateEffect={(effect) => this.props.actions.updateCard({id: card.id, effect: effect})}
              updateLore={(lore) => this.props.actions.updateCard({id: card.id, lore: lore})}
              updatePendulumEffect={(pendulumEffect) => this.props.actions.updateCard({
                id: card.id,
                pendulumEffect: pendulumEffect
              })}
              updateTribes={(tribes) => this.props.actions.updateCard({id: card.id, tribes: tribes})}
              updateMonsterType={(type) => this.props.actions.updateCard({id: card.id, monsterType: type})}
              updateMonsterHybridType={(type) => this.props.actions.updateCard({
                id: card.id,
                monsterHybridType: type
              })}
              updateMonsterClass={(monsterClass) => this.props.actions.updateCard({
                id: card.id,
                monsterClass: monsterClass
              })}
              updateMonsterAbilities={(monsterAbilities) => this.props.actions.updateCard({
                id: card.id,
                monsterAbilities: monsterAbilities
              })}
              updateFusionMaterials={(fusionMaterials) => this.props.actions.updateCard({
                id: card.id,
                fusionMaterials: fusionMaterials
              })}
              updateSynchroMaterials={(synchroMaterials) => this.props.actions.updateCard({
                id: card.id,
                synchroMaterials: synchroMaterials
              })}
              updateDarkSynchroMaterials={(darkSynchroMaterials) => this.props.actions.updateCard({
                id: card.id,
                darkSynchroMaterials: darkSynchroMaterials
              })}
              updateXyzMaterials={(xyzMaterials) => this.props.actions.updateCard({
                id: card.id,
                xyzMaterials: xyzMaterials
              })}
              updateLinkMaterials={(linkMaterials) => this.props.actions.updateCard({
                id: card.id,
                linkMaterials: linkMaterials
              })}
              updatePendulumScale={(pendulumScale, isLeftNotRightScale) => {
                if (isLeftNotRightScale){
                  this.props.actions.updateCard({id: card.id, leftPendulumScale: pendulumScale})
                } else {
                  this.props.actions.updateCard({id: card.id, rightPendulumScale: pendulumScale})
                }
              }}
              updateLinkArrow={(linkArrowValue, linkIndex) => {
                // const linkArrows = [...card.linkArrows];
                const linkArrows = _.clone(card.linkArrows);
                linkArrows[linkIndex] = linkArrowValue;
                console.log(linkArrows);
                this.props.actions.updateCard({id: card.id, linkArrows: linkArrows})
              }}
            />
          ))}
        </div>

      </div>
    )
  }
  public getCardType = (attribute: Attribute): CardTypes => {
    if (attribute === Attribute.SPELL){
      return CardTypes.SPELL;
    }
    else if (attribute === Attribute.TRAP){
      return CardTypes.TRAP;
    }
    else{
      return CardTypes.MONSTER;
    }
  }
}

export default connect(CardGallery.mapStateToProps, CardGallery.mapDispatchToProps)(CardGallery);