import React from 'react';
import {connect} from 'react-redux';
import * as _ from 'lodash';
import * as $ from 'jquery';

import { MonsterTypes, CardTypes, SpellActionTypes, Attribute, MonsterClasses, Rarities } from 'client/app/constants';
import {ActionCreators} from 'client/app/redux/actions';
import {selectCardType} from 'client/app/redux/selectors';

import {CardDownloader} from 'client/app/components/cards/CardDownloader';
import {StarEditor} from 'client/app/components/editors/starEditor/starEditor.component';
import {AttributeEditor} from 'client/app/components/editors/attributeEditor/attributeEditor.component';
import {ActionTypeEditor} from 'client/app/components/editors/actionTypeEditor/ActionTypeEditor';
import {ImageSelector} from 'client/app/components/editors/ImageSelector';
import {TypeEditor} from 'client/app/components/editors/typeEditor/TypeEditor';
import {DescriptionEditor} from 'client/app/components/editors/descriptionEditor/descriptionEditor.component';
import {PendulumInfoEditor} from 'client/app/components/editors/PendulumInfoEditor';
import {LinkArrowEditor} from 'client/app/components/editors/LinkArrowEditor';
import {NameEditor} from 'client/app/components/editors/nameEditor/nameEditor.component';
import {RarityEditor} from 'client/app/components/editors/rarityEditor/rarityEditor.component';

import 'client/app/components/cards/CardEditor.scss';
import pendulumBaseSmall from 'client/app/assets/Series 10/Pendulum/PendulumBaseSmall.png';
import pendulumEffectSmall from 'client/app/assets/Series 10/Pendulum/PendulumEffectSmall.png';
import normalArtBox from 'client/app/assets/Series 10/ArtBox.png';
import { CardFields } from "client/app/redux/card/state";
import { Dispatch } from "redux";
import { AppState } from "client/app/redux/store";
import { updateCard } from "client/app/redux/card/actions";
import CardDisplay from 'client/app/components/cards/cardDisplay/cardDisplay.component';


interface CardEditorProps {
  id: string;
}

interface CardEditorStateMappedProps {
  fields: CardFields;
}

interface CardEditorDispatchMappedProps {
  updateName: (name: string) => any;
  updateRarity: (rarity: Rarities) => any;
  updateLevel: (level: number) => any;
  updateAttribute: (attribute: Attribute) => any;
  updateActionTypes: (actionTypes: SpellActionTypes[]) => any;
  updateAtk: (atk: string) => any;
  updateDef: (def: string) => any;
  updateEffect: (effect: string) => any;
  updateLore: (lore: string) => any;
  updatePendulumEffect: (pendulumEffect: string) => any;
  updatePendulumScale: (pendulumScale: number, isLeftNotRightScale: boolean) => any;
  updateLinkArrow: (linkArrowValue: boolean, linkIndex: number) => any;
  updateTribes: (tribes: string[]) => any;
  updateMonsterType: (type: MonsterTypes) => any;
  updateMonsterHybridType: (type: MonsterTypes.PURE | MonsterTypes.PENDULUM) => any;
  updateMonsterClass: (monsterClass: MonsterClasses) => any;
  updateMonsterAbilities: (monsterAbilities: string[]) => any;
  updateFusionMaterials: (fusionMaterials: string[]) => any;
  updateSynchroMaterials: (synchroMaterials: string[]) => any;
  updateDarkSynchroMaterials: (darkSynchroMaterials: string[]) => any;
  updateXyzMaterials: (xyzMaterials: string) => any;
  updateLinkMaterials: (linkMaterials: string) => any;
}

interface CardEditorState {
  isDownloading: boolean;
}

type CardEditorAllProps = CardEditorProps & CardEditorStateMappedProps & CardEditorDispatchMappedProps;

class CardEditor extends React.Component<CardEditorAllProps, CardEditorState> {

  public static mapStateToProps(state: AppState, props: CardEditorProps): CardEditorStateMappedProps{
    return {
      fields: {
        ...state.entities.cards.byId[props.id]
      }
    };
  }
  
  public static mapDispatchToProps(dispatch: Dispatch<any>, props: CardEditorProps & CardEditorStateMappedProps): CardEditorDispatchMappedProps {
    const { id } = props;
    return {
      updateName: (name) => dispatch(updateCard({name, id})),
      updateRarity: (rarity) => dispatch(updateCard({rarity, id})),
      updateLevel: (stars) => dispatch(updateCard({stars, id})),
      updateAttribute: (attribute) => dispatch(updateCard({attribute, id})),
      updateActionTypes: (actionTypes) => dispatch(updateCard({actionTypes, id})),
      updateAtk: (atk) => dispatch(updateCard({atk, id})),
      updateDef: (def) => dispatch(updateCard({def, id})),
      updateEffect: (effect) => dispatch(updateCard({effect, id})),
      updateLore: (lore) => dispatch(updateCard({lore, id})),
      updatePendulumEffect: (pendulumEffect) => dispatch(updateCard({pendulumEffect, id})),
      updatePendulumScale: (pendulumScale, isLeftNotRightScale) => {
        if (isLeftNotRightScale){
          updateCard({id, leftPendulumScale: pendulumScale});
        } else {
          updateCard({id, rightPendulumScale: pendulumScale});
        }
      },
      updateLinkArrow: (linkArrowValue, linkIndex) => {
        const linkArrows = _.clone(props.fields.linkArrows);
        linkArrows[linkIndex] = linkArrowValue;
        updateCard({id, linkArrows})
      },
      updateTribes: (tribes) => dispatch(updateCard({tribes, id})),
      updateMonsterType: (monsterType) => dispatch(updateCard({monsterType, id})),
      updateMonsterHybridType: (monsterHybridType) => dispatch(updateCard({monsterHybridType, id})),
      updateMonsterClass: (monsterClass) => dispatch(updateCard({monsterClass, id})),
      updateMonsterAbilities: (monsterAbilities) => dispatch(updateCard({monsterAbilities, id})),
      updateFusionMaterials: (fusionMaterials) => dispatch(updateCard({fusionMaterials, id})),
      updateSynchroMaterials: (synchroMaterials) => dispatch(updateCard({synchroMaterials, id})),
      updateDarkSynchroMaterials: (darkSynchroMaterials) => dispatch(updateCard({darkSynchroMaterials, id})),
      updateXyzMaterials: (xyzMaterials) => dispatch(updateCard({xyzMaterials, id})),
      updateLinkMaterials: (linkMaterials) => dispatch(updateCard({linkMaterials, id}))
    }
  }
  
  public state: CardEditorState = {
    isDownloading: false,
  };
  
  private element: HTMLDivElement | null;

  renderCardCenterEditor() {
    const type = this.getCardType();
    if (type === CardTypes.SPELL || type === CardTypes.TRAP) {
      return (
        <ActionTypeEditor
          cardType={type}
          actionTypes={this.props.fields.actionTypes}
          updateActionTypes={this.props.updateActionTypes}
        />
      );

    }
    else if (type === CardTypes.MONSTER) {
      return (
        <StarEditor
          level={this.props.fields.stars}
          updateLevel={this.props.updateLevel}
          monsterType={this.props.fields.monsterType}
          rarity={this.props.fields.rarity}
        />
      );
    }
  }

  getSecondaryBattleStat() {
    if (this.props.fields.monsterType === MonsterTypes.LINK) {
      return (
        <div className="card--battle-points--link-rating">
          <span>LINK-</span>
          <span
            className="card--battle-points--link-rating-value">{_.filter(this.props.fields.linkArrows, (linkArrow) => linkArrow).length}</span>
        </div>
      );
    }
    else {
      return (
        <div>
          <span>DEF</span><span className="battle-point-slash">/</span>
          <input type="text" value={this.props.fields.def}
                 onChange={(event) => this.props.updateDef(event.target.value)}/>
        </div>
      );
    }
  }

  getCardBottom() {
    if (this.props.fields.attribute === 'SPELL' || this.props.fields.attribute === 'TRAP') {
      return (
        <div className="ygo-card-bottom">
          <DescriptionEditor
            cardType={this.getCardType()}
            monsterType={this.props.fields.monsterType}
            fusionMaterials={this.props.fields.fusionMaterials}
            updateFusionMaterials={this.props.updateFusionMaterials}
            synchroMaterials={this.props.fields.synchroMaterials}
            updateSynchroMaterials={this.props.updateSynchroMaterials}
            xyzMaterials={this.props.fields.xyzMaterials}
            updateXyzMaterials={this.props.updateXyzMaterials}
            effect={this.props.fields.effect}
            updateEffect={this.props.updateEffect}
            lore={this.props.fields.lore}
            updateLore={this.props.updateLore}/>
        </div>
      );
    }
    else {
      return (
        <div className="ygo-card-bottom">
          <TypeEditor
            tribes={this.props.fields.tribes}
            updateTribes={this.props.updateTribes}
            monsterType={this.props.fields.monsterType}
            updateMonsterType={this.props.updateMonsterType}
            monsterHybridType={this.props.fields.monsterHybridType}
            updateMonsterHybridType={this.props.updateMonsterHybridType}
            monsterClass={this.props.fields.monsterClass}
            updateMonsterClass={this.props.updateMonsterClass}
            monsterAbilities={this.props.fields.monsterAbilities}
            updateMonsterAbilities={this.props.updateMonsterAbilities}
            isEffect={() => !_.isEmpty(this.props.fields.effect)}/>

          <DescriptionEditor
            cardType={this.getCardType()}
            monsterType={this.props.fields.monsterType}
            fusionMaterials={this.props.fields.fusionMaterials}
            updateFusionMaterials={this.props.updateFusionMaterials}
            synchroMaterials={this.props.fields.synchroMaterials}
            updateSynchroMaterials={this.props.updateSynchroMaterials}
            darkSynchroMaterials={this.props.fields.darkSynchroMaterials}
            updateDarkSynchroMaterials={this.props.updateDarkSynchroMaterials}
            xyzMaterials={this.props.fields.xyzMaterials}
            updateXyzMaterials={this.props.updateXyzMaterials}
            linkMaterials={this.props.fields.linkMaterials}
            updateLinkMaterials={this.props.updateLinkMaterials}
            effect={this.props.fields.effect}
            updateEffect={this.props.updateEffect}
            lore={this.props.fields.lore}
            updateLore={this.props.updateLore}/>
          <div className="ygo-card-battle-points">
            <div>
              <span>ATK</span><span className="battle-point-slash">/</span>
              <input type="text" value={this.props.fields.atk}
                     onChange={(event) => this.props.updateAtk(event.target.value)}/>
            </div>
            <div className="ygo-card-battle-point-spacer">
            </div>
            {this.getSecondaryBattleStat()}
          </div>
        </div>
      );
    }
  }

  renderPendulumCard() {
    if (this.props.fields.monsterHybridType === MonsterTypes.PENDULUM && this.getCardType() === CardTypes.MONSTER
      && this.props.fields.monsterType !== MonsterTypes.LINK) {
      return (
        <div className="ygo-card-pendulum">
          <img src={pendulumEffectSmall}/>
          <img src={pendulumBaseSmall}/>
        </div>
      );
    }
    else if (this.props.fields.monsterType === MonsterTypes.LINK && this.getCardType() === CardTypes.MONSTER) {
      return (
        <div className="card--link-art--container">
          <img className="card--normal-art-box" src={normalArtBox}/>
          <LinkArrowEditor
            updateLinkArrow={this.props.updateLinkArrow}
            linkArrows={this.props.fields.linkArrows}
          />
        </div>
      );

    }
    else {
      return (
        <div className="card--normal-art--container">
          <img className="card--normal-art-box" src={normalArtBox}/>
        </div>
      );
    }
  }

  renderPendulumContainer() {
    if (this.props.fields.monsterHybridType == MonsterTypes.PENDULUM && this.getCardType() == CardTypes.MONSTER
      && this.props.fields.monsterType !== MonsterTypes.LINK) {
      return (
        <PendulumInfoEditor
          updatePendulumEffect={this.props.updatePendulumEffect}
          updatePendulumLeftScale={(scale) => this.props.updatePendulumScale(scale, true)}
          updatePendulumRightScale={(scale) => this.props.updatePendulumScale(scale, false)}
          pendulumEffect={this.props.fields.pendulumEffect}
          leftPendulumScale={this.props.fields.leftPendulumScale}
          rightPendulumScale={this.props.fields.rightPendulumScale}
        />
      );
    }
  }

  getClassNames() {
    const type = this.getCardType();
    const classNames = ['ygo-card-content'];
    if (type === CardTypes.SPELL) {
      classNames.push('spell-card');
    }
    else if (type === CardTypes.TRAP) {
      classNames.push('trap-card');
    }
    else {
      if (this.props.fields.monsterType === MonsterTypes.FUSION) {
        classNames.push('fusion-monster');
      }
      else if (this.props.fields.monsterType === MonsterTypes.SYNCHRO) {
        classNames.push('synchro-monster');
      }
      else if (this.props.fields.monsterType === MonsterTypes.DARK_SYNCHRO) {
        classNames.push('dark-synchro-monster');
      }
      else if (this.props.fields.monsterType === MonsterTypes.RITUAL) {
        classNames.push('ritual-monster');
      }
      else if (this.props.fields.monsterType === MonsterTypes.XYZ) {
        classNames.push('xyz-monster');
      }
      else if (this.props.fields.monsterType === MonsterTypes.LINK) {
        classNames.push('link-monster');
      }
      else if (this.props.fields.effect.length > 0) {
        classNames.push('effect-monster');
      }
      else {
        classNames.push('normal-monster');
      }
    }
    return classNames.join(' ');
  }

  render() {
    return (
      <div className="card--container" ref={(element) => this.element = element}>
        <div className="card--settings--container">
          <RarityEditor rarity={this.props.fields.rarity} updateRarity={this.props.updateRarity}/>
          <CardDownloader
            cardName={this.props.fields.name}
            getElement={this.getCardElement}
            preprocessor={(done) => {
              this.setState({isDownloading: true}, done)
            }}
            postprocessor={() => {
              this.setState({isDownloading: false})
            }}
            style={{
              position: 'relative',
              right: '0',
              left: '0',
              top: '0',
              bottom: '0',
              opacity: '1'
            }}
          />
        </div>
        <div className={this.getClassNames()}>
          {this.renderPendulumCard()}
          <div className="ygo-card-top">
            <NameEditor
              className="ygo-card-name"
              placeholder="Enter a name here..."
              value={this.props.fields.name}
              onChange={(event) => this.props.updateName(event.target.value)}
              rarity={this.props.fields.rarity}
            />
            <AttributeEditor
              updateAttribute={this.props.updateAttribute}
              attribute={this.props.fields.attribute}
              rarity={this.props.fields.rarity}
            />
          </div>
          <div className="ygo-card-center">
            {this.renderCardCenterEditor()}
            <ImageSelector
              monsterHybridType={this.props.fields.monsterHybridType}
              monsterType={this.props.fields.monsterType}
              cardType={this.getCardType()}
            />
            <div className="ygo-card-set-id"/>
            {this.renderPendulumContainer()}
          </div>
          {this.getCardBottom()}
        </div>
        <CardDisplay id={this.props.id}/>
        {this.state.isDownloading ? <CardDisplay id={this.props.id} className={'card--full-size'}/> : null }
      </div>
    )
  }

  private getCardType = (): CardTypes => {
    if (this.props.fields.attribute === Attribute.SPELL){
      return CardTypes.SPELL;
    }
    else if (this.props.fields.attribute === Attribute.TRAP){
      return CardTypes.TRAP;
    }
    else{
      return CardTypes.MONSTER;
    }
  }

  private getCardElement = (): Element | null => {
    if (!_.isNil(this.element)){
      return this.element.querySelector('.card--full-size');
    }
    return null;
  }
}

// Hook up Redux store state to props of this Component.
export default connect(CardEditor.mapStateToProps, CardEditor.mapDispatchToProps)(CardEditor);