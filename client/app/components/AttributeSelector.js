import React from 'react';
import _ from 'lodash';
import {sprintf} from 'sprintf-js'
import light from '../assets/LIGHT.png';
import dark from '../assets/DARK.png';
import fire from '../assets/FIRE.png';
import water from '../assets/WATER.png';
import wind from '../assets/WIND.png';
import earth from '../assets/EARTH.png';


var attributeMap = {
    LIGHT: light,
    DARK: dark,
    WIND: wind,
    WATER: water,
    FIRE: fire,
    EARTH: earth
}

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
        var radius = 65;
        return _.map(_.keys(attributeMap), (attribute, index) => {
            var theta = (2*Math.PI/(_.size(attributeMap)) * index) - Math.PI/2;
            var style = {
                transform: sprintf('rotate(%srad) translate(%spx) rotate(%srad)', theta, radius, -theta),
            }
            return (
                <img
                    src={attributeMap[attribute]}
                    style={style}
                    onClick={(event) => this.updateAttribute(event, attribute)}
                    className="ygo-card-attribute-suggestion"
                    key={attribute}/>
            )
        });

    }

    render(){
        return (
            <div 
                className="ygo-card-attribute"
                onClick={(event) => this.toggleEditState()}>
                <img 
                    src={attributeMap[this.props.attribute]}
                    className="ygo-card-attribute-selection"/>
                {this.state.isEditing ? this.getAttributeWheel() : null}
            </div> 
        )
    }
}

export {AttributeSelector};