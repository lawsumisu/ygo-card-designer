import * as React from 'react';
import * as _ from 'lodash';
import classNames from 'classnames';
import { ActionType, CardTypes } from "client/app/constants";
import { getValidActionTypes } from "client/app/utilities";
import equip from 'client/app/assets/Equip.png';
import quickPlay from 'client/app/assets/Quick-Play.png';
import ritual from 'client/app/assets/Ritual.png';
import continuous from 'client/app/assets/Continuous.png';
import field from 'client/app/assets/Field.png';
import counter from 'client/app/assets/Counter.png';

const actionTypeIconMap = {
  EQUIP: equip,
  QUICKPLAY: quickPlay,
  CONTINUOUS: continuous,
  RITUAL: ritual,
  FIELD: field,
  COUNTER: counter
};

interface ActionTypeDisplayProps {
  actionTypes: ActionType[];
  cardType: CardTypes;
}

export class ActionTypeDisplay extends React.PureComponent<ActionTypeDisplayProps> {
  public render(): React.ReactNode {
    return (
      <div className="ygo-card-action-text-container">
        <div>
          <span className="action-text-container-left-brace">[</span>
          <span>{`${this.props.cardType} Card`}</span>
          {this.renderActions()}
          <span className="action-text-container-right-brace">]</span>
        </div>
      </div>
    )
  }

  private renderActions() {
    const visibleActions = _.intersection(getValidActionTypes(this.props.cardType), this.props.actionTypes);
    if (visibleActions.length > 0) {
      return (
        <div className="action-type-container">
          {
            _.map(visibleActions, (actionType: ActionType) => {
              return (
                <img
                  key={actionType}
                  className={classNames('action-type', 'action-type-selected')}
                  src={actionTypeIconMap[actionType]}
                />
              );
            })
          }
        </div>
      );
    }
  }
}