import React from 'react';
import {AutoscalingTextareaV2} from 'client/app/components/common/autoscalingTextarea/autoscalingTextareaV2.component';

class PendulumInfoEditor extends React.Component{
    constructor(props){
        super(props);
    }

    getPendulumScaleValue(newPendulumValue, oldPendulumValue){
        if (newPendulumValue === ''){
            return newPendulumValue;
        }
        const pendulumValueAsInt = parseInt(newPendulumValue);
        if (isNaN(pendulumValueAsInt) || pendulumValueAsInt < 0 || pendulumValueAsInt > 13){
            return oldPendulumValue;
        }
        else return pendulumValueAsInt;
    }

    render(){
        return(
            <div className="ygo-card-pendulum-container">
                <div className="ygo-card-pendulum-scale">
                    <input 
                        type="text" 
                        value={this.props.leftPendulumScale} 
                        onChange={(event) => this.props.updatePendulumLeftScale(this.getPendulumScaleValue(event.target.value, this.props.leftPendulumScale))}
                    />
                </div>    
                <AutoscalingTextareaV2
                    maxFontSize={15}
                    minFontSize={12}
                    className="ygo-card-pendulum-effect"
                    placeholder="Enter Pendulum effect here..."
                    value={this.props.pendulumEffect} 
                    onChange={(event) => this.props.updatePendulumEffect(event.target.value)}
                    />
                <div className="ygo-card-pendulum-scale">
                    <input 
                        type="text" 
                        value={this.props.rightPendulumScale} 
                        onChange={(event) => this.props.updatePendulumRightScale(this.getPendulumScaleValue(event.target.value, this.props.rightPendulumScale))}
                    />
                </div>
            </div>
        );
    }
}

export {PendulumInfoEditor};