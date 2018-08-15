import * as React from 'react';
import { CardFields } from "client/app/redux/card/state";
import { AppState } from "client/app/redux/store";
import { Attribute, CardTypes, MonsterTypes } from "client/app/constants";
import * as classNames from 'classnames';
import 'client/app/components/cards/CardEditor.scss';
import { AutoscalingTextDisplay } from "client/app/components/common/autoscalingTextDisplay/autoscalingTextDisplay.component";
import { connect } from "react-redux";
import 'client/app/components/cards/cardDisplay/cardDisplay.scss';
import { AttributeDisplay } from "client/app/components/cards/cardDisplay/components/attributeDisplay/attributeDisplay.component";
import { StarDisplay } from "client/app/components/cards/cardDisplay/components/starDisplay/starDisplay.component";
import { ImageDisplay } from "client/app/components/cards/cardDisplay/components/imageDisplay/imageDisplay.component";
import { ArtBoxDisplay } from "client/app/components/cards/cardDisplay/components/artBoxDisplay/artBoxDisplay.component";
import { TypeDisplay } from "client/app/components/cards/cardDisplay/components/typeDisplay/typeDisplay.component";
import { StatDisplay } from "client/app/components/cards/cardDisplay/components/statPointDisplay/statDisplay.component";
import { DescriptionDisplay } from "client/app/components/cards/cardDisplay/components/descriptionDisplay/descriptionDisplay.component";
import { ActionTypeDisplay } from "client/app/components/cards/cardDisplay/components/actionTypeDisplay/actionTypeDisplay.component";
import { PendulumInfoDisplay } from "client/app/components/cards/cardDisplay/components/pendulumInfoDisplay/pendulumInfoDisplay.component";
import { NameDisplay } from "client/app/components/cards/cardDisplay/components/nameDisplay/nameDisplay.component";


/**
 * Component for rendering a display-only view of a card's fields.
 */

interface CardDisplayProps {
  className?: string;
  id: string;
}

interface CardDisplayStateMappedProps {
  fields: CardFields;
}

class CardDisplay extends React.Component<CardDisplayProps & CardDisplayStateMappedProps> {
  public static mapStateToProps(state: AppState, props: CardDisplayProps): CardDisplayStateMappedProps{
    return {
      fields: {
        ...state.entities.cards.byId[props.id]
      }
    };
  }

  public render(): React.ReactNode {
    const cardType = this.getCardType();
    return (
      <div className={this.getClassName()}>
        <ArtBoxDisplay
          cardType={cardType}
          linkArrows={this.props.fields.linkArrows}
          monsterHybridType={this.props.fields.monsterHybridType}
          monsterType={this.props.fields.monsterType}
        />
        <div className={'ygo-card-top'}>
          <NameDisplay
            name={this.props.fields.name}
            rarity={this.props.fields.rarity}
          />
          <AttributeDisplay attribute={this.props.fields.attribute}/>
        </div>
        <div className='ygo-card-center'>
          {cardType === CardTypes.MONSTER ?
            <StarDisplay monsterType={this.props.fields.monsterType} stars={this.props.fields.stars}/> :
            <ActionTypeDisplay actionTypes={this.props.fields.actionTypes} cardType={cardType}/>
          }
          <ImageDisplay
            imageSrc={this.props.fields.image}
            cardType={cardType}
            monsterType={this.props.fields.monsterType}
            monsterHybridType={this.props.fields.monsterHybridType}
          />
          {this.isPendulumMonster() ?
            <PendulumInfoDisplay
              leftPendulumScale={this.props.fields.leftPendulumScale}
              rightPendulumScale={this.props.fields.rightPendulumScale}
              pendulumEffect={this.props.fields.pendulumEffect}
            /> : null
          }
        </div>
        <div className='ygo-card-bottom'>
          {cardType === CardTypes.MONSTER ?
            <TypeDisplay
              tribes={this.props.fields.tribes}
              effect={this.props.fields.effect}
              monsterType={this.props.fields.monsterType}
              monsterHybridType={this.props.fields.monsterHybridType}
              monsterAbilities={this.props.fields.monsterAbilities}
              monsterClass={this.props.fields.monsterClass}
            /> : null
          }
          <DescriptionDisplay
            cardType={cardType}
            effect={this.props.fields.effect}
            lore={this.props.fields.lore}
            monsterType={this.props.fields.monsterType}
            fusionMaterials={this.props.fields.fusionMaterials}
            synchroMaterials={this.props.fields.synchroMaterials}
            darkSynchroMaterials={this.props.fields.darkSynchroMaterials}
            xyzMaterials={this.props.fields.xyzMaterials}
            linkMaterials={this.props.fields.linkMaterials}/>
          {cardType === CardTypes.MONSTER ?
            <StatDisplay
              atk={this.props.fields.atk}
              def={this.props.fields.def}
              monsterType={this.props.fields.monsterType}
              linkArrows={this.props.fields.linkArrows}
            /> : null
          }
        </div>
      </div>
    )
  }

  private getClassName(): string {
    const type = this.getCardType();
    const classes = ['ygo-card-content', 'ygo-card-display', this.props.className];
    if (type === CardTypes.SPELL) {
      classes.push('spell-card');
    }
    else if (type === CardTypes.TRAP) {
      classes.push('trap-card');
    }
    else {
      if (this.props.fields.monsterType === MonsterTypes.FUSION) {
        classes.push('fusion-monster');
      }
      else if (this.props.fields.monsterType === MonsterTypes.SYNCHRO) {
        classes.push('synchro-monster');
      }
      else if (this.props.fields.monsterType === MonsterTypes.DARK_SYNCHRO) {
        classes.push('dark-synchro-monster');
      }
      else if (this.props.fields.monsterType === MonsterTypes.RITUAL) {
        classes.push('ritual-monster');
      }
      else if (this.props.fields.monsterType === MonsterTypes.XYZ) {
        classes.push('xyz-monster');
      }
      else if (this.props.fields.monsterType === MonsterTypes.LINK) {
        classes.push('link-monster');
      }
      else if (this.props.fields.effect.length > 0) {
        classes.push('effect-monster');
      }
      else {
        classes.push('normal-monster');
      }
    }
    return classNames(classes);
  }

  private isPendulumMonster(): boolean {
    return this.props.fields.monsterHybridType === MonsterTypes.PENDULUM && this.getCardType() === CardTypes.MONSTER
      && this.props.fields.monsterType !== MonsterTypes.LINK;
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
  };
}

// Hook up Redux store state to props of this Component.
export default connect(CardDisplay.mapStateToProps, null)(CardDisplay);