import * as React from 'react';
import { CardFields } from "client/app/redux/card/state";
import { AppState } from "client/app/redux/store";
import { Attribute, CardTypes, MonsterTypes } from "client/app/constants";
import * as classNames from 'classnames';
import 'client/app/components/cards/CardEditor.scss';
import { AutoscalingTextDisplay } from "client/app/components/common/autoscalingTextDisplay/autoscalingTextDisplay.component";
import { connect } from "react-redux";
import 'client/app/components/cards/cardDisplay/cardDisplay.scss';
import { AttributeDisplay } from "client/app/components/cards/cardDisplay/components/attributeDisplay.component";
import { StarDisplay } from "client/app/components/cards/cardDisplay/components/starDisplay/starDisplay.component";
import { ImageDisplay } from "client/app/components/cards/cardDisplay/components/imageDisplay/imageDisplay.component";
import { ArtBoxDisplay } from "client/app/components/cards/cardDisplay/components/artBoxDisplay/artBoxDisplay.component";
import { TypeDisplay } from "client/app/components/cards/cardDisplay/components/typeDisplay/typeDisplay.component";


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
          <AutoscalingTextDisplay
            text={this.props.fields.name}
            className='ygo-card-name'
          />
          <AttributeDisplay attribute={this.props.fields.attribute}/>
        </div>
        <div className='ygo-card-center'>
          <StarDisplay monsterType={this.props.fields.monsterType} stars={this.props.fields.stars}/>
          <ImageDisplay
            imageSrc={this.props.fields.image}
            cardType={cardType}
            monsterType={this.props.fields.monsterType}
            monsterHybridType={this.props.fields.monsterHybridType}
          />
        </div>
        <div className='ygo-card-bottom'>
          <TypeDisplay
            tribes={this.props.fields.tribes}
            effect={this.props.fields.effect}
            monsterType={this.props.fields.monsterType}
            monsterHybridType={this.props.fields.monsterHybridType}
            monsterAbilities={this.props.fields.monsterAbilities}
            monsterClass={this.props.fields.monsterClass}
          />
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

  private renderPendulumCard() {

  }
}

// Hook up Redux store state to props of this Component.
export default connect(CardDisplay.mapStateToProps, null)(CardDisplay);