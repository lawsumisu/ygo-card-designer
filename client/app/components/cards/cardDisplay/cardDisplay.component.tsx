import * as React from 'react';
import { CardFields } from "client/app/redux/card/state";
import { AppState } from "client/app/redux/store";
import { Attribute, CardTypes, MonsterTypes } from "client/app/constants";
import * as classNames from 'classnames';
import 'client/app/components/cards/CardEditor.scss';
import { AutoscalingTextDisplay } from "client/app/components/common/autoscalingTextDisplay/autoscalingTextDisplay.component";
import { connect } from "react-redux";
import 'client/app/components/cards/cardDisplay/cardDisplay.scss';

/**
 * Component for rendering a display-only view of a card's fields.
 */

interface CardDisplayProps {
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
    return (
      <div className={this.getClassName()}>
        <div className={'ygo-card-top'}>
          <AutoscalingTextDisplay
            text={this.props.fields.name}
            className='ygo-card-name'
          />
        </div>

      </div>
    )
  }

  private getClassName(): string {
    const type = this.getCardType();
    const classes = ['ygo-card-content'];
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
}

// Hook up Redux store state to props of this Component.
export default connect(CardDisplay.mapStateToProps, null)(CardDisplay);