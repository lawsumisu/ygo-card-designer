import React from 'react';

import {getValidActionTypes} from 'client/app/utilities';

import equip from 'client/app/assets/Equip.png';
import quickPlay from 'client/app/assets/Quick-Play.png';
import ritual from 'client/app/assets/Ritual.png';
import continuous from 'client/app/assets/Continuous.png';
import field from 'client/app/assets/Field.png';
import counter from 'client/app/assets/Counter.png';

const actionTypeMap = {
    EQUIP: equip,
    QUICKPLAY: quickPlay,
    CONTINUOUS: continuous,
    RITUAL: ritual,
    FIELD: field,
    COUNTER: counter
};

export class ActionTypeEditor extends React.Component{
    constructor(props){
        super(props);
    }

    getActionIconsAsDisplay(){
        return (
             <div className="action-type-container">
                {
                    _.map(getValidActionTypes(this.props.cardType), (actionType) => {
                        return (
                            <img
                                key={actionType}
                                className="action-type"
                                src={actionTypeMap[actionType]}
                            />
                        );
                    })
                }
            </div>
        );
    }

    render(){
        return (
            <div className="ygo-card-action-text-container">
                <div>
                    <span className="action-text-container-left-brace">[</span>
                    <span>Spell Card</span>
                   {this.getActionIconsAsDisplay()}
                    <span className="action-text-container-right-brace">]</span>
                </div>
            </div>
        );
    }
}

