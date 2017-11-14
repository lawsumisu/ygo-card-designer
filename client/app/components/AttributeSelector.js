import React from 'react';
import _ from 'lodash';
import {sprintf} from 'sprintf-js'

const LIGHT = '光';
const WATER = '水';
const EARTH = '土';
const DARK = '闇';
const FIRE = '炎';
const WIND = '風';

class AttributeSelector extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isEditing: false
        };
    }

    toggleEditState(){
        this.setState({
            isEditing: !this.state.isEditing
        });
    }

    updateAttribute(event, attribute){
        event.stopPropagation();
        this.props.updateAttribute(attribute);
    }

    getAttributeWheel(){
        var radius = 30;
        var attributes = [LIGHT, WATER, EARTH, DARK, FIRE, WIND];
        return _.map(attributes, (attribute, index) => {
            var theta = (2*Math.PI/attributes.length * index) - Math.PI/2;
            var style = {
                transform: sprintf('rotate(%srad) translate(%spx) rotate(%srad)', theta, radius, -theta),
                position: 'absolute',
                top: 0
            }
            return (
                <div 
                    style={style}
                    onClick={(event) => this.updateAttribute(event, attribute)}
                    className="ygo-card-attribute-selection"
                    key={index}>
                    {attribute}
                </div>
            )
        });

    }

    render(){
        return (
            <div 
                className="ygo-card-attribute"
                onClick={(event) => this.toggleEditState()}>
                {this.props.attribute}
                {this.state.isEditing ? this.getAttributeWheel() : null}
            </div> 
        )
    }
}

export {AttributeSelector};