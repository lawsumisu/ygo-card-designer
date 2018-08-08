import React from 'react';
import _ from 'lodash';

import {getValidActionTypes, getIncompatibleActionTypes} from 'client/app/utilities';
import {CardTypes} from 'client/app/constants';

import 'client/app/components/editors/ActionTypeEditor/ActionTypeEditor.scss';
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

export class ActionTypeEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditor: false
    };
  }

  getActionTypesAsDisplay() {
    if (_.intersection(this.props.actionTypes, getValidActionTypes(this.props.cardType)).length > 0 || this.state.showEditor) {
      return (
        <div className="action-type-container">
          {
            _.map(getValidActionTypes(this.props.cardType), (actionType) => {
              return (
                <img
                  key={actionType}
                  onClick={(event) => this.actionTypeHandleOnClick(actionType)}
                  className={this.getActionTypeClassNames(actionType)}
                  src={actionTypeIconMap[actionType]}
                />
              );
            })
          }
        </div>
      );
    }
  }

  getActionTextAsDisplay() {
    if (this.props.cardType === CardTypes.SPELL) {
      return 'Spell';
    }
    else if (this.props.cardType === CardTypes.TRAP) {
      return 'Trap';
    }
  }

  getActionTypeClassNames(actionType) {
    const nonSimultaneousActionTypes = getIncompatibleActionTypes(this.props.cardType, this.props.actionTypes);
    let classNames = ['action-type'];
    if (_.includes(this.props.actionTypes, actionType)) {
      classNames.push('action-type-selected');
    }
    if (this.state.showEditor) {
      classNames.push('action-type-visible');
    }
    if (nonSimultaneousActionTypes.has(actionType)) {
      classNames.push('action-type-disabled');
    }

    return classNames.join(' ');
  }

  /* -------------- +
   | Event Handlers |
   + -------------- */

  actionTypeHandleOnClick(actionType) {
    if (_.includes(this.props.actionTypes, actionType)) {
      //This Action Type is selected, so deselect it.
      this.props.updateActionTypes(_.filter(this.props.actionTypes, (selectedActionType) => {
        return selectedActionType !== actionType;
      }));
    }
    else if (!getIncompatibleActionTypes(this.props.cardType, this.props.actionTypes).has(actionType)) {
      // This Action Type has been newly selected, so add it to the list as long as it's not disabled.
      this.props.updateActionTypes(_.concat(this.props.actionTypes, actionType));
    }
  }

  actionTextContainerHandleOnMouseEnter() {
    this.setState({
      showEditor: true
    });
  }

  actionTextContainerHandleOnMouseLeave() {

    this.setState({
      showEditor: false
    });
  }

  render() {
    return (
      <div
        className="ygo-card-action-text-container"
        onMouseEnter={(event) => this.actionTextContainerHandleOnMouseEnter()}
        onMouseLeave={(event) => this.actionTextContainerHandleOnMouseLeave()}>
        <div>
          <span className="action-text-container-left-brace">[</span>
          <span>{this.getActionTextAsDisplay()} Card</span>
          {this.getActionTypesAsDisplay()}
          <span className="action-text-container-right-brace">]</span>
        </div>
      </div>
    );
  }
}

