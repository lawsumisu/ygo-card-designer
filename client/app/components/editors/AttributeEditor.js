import React from 'react';
import _ from 'lodash';
import {sprintf} from 'sprintf-js'
import $ from 'jquery';
import light from 'client/app/assets/LIGHT.png';
import dark from 'client/app/assets/DARK.png';
import fire from 'client/app/assets/FIRE.png';
import water from 'client/app/assets/WATER.png';
import wind from 'client/app/assets/WIND.png';
import divine from 'client/app/assets/DIVINE.png';
import earth from 'client/app/assets/EARTH.png';
import spell from 'client/app/assets/SPELL.png';
import trap from 'client/app/assets/TRAP.png';

import 'client/app/components/editors/attributeEditor/AttributeEditor.scss';


var monsterAttributeMap = {
    LIGHT: light,
    DARK: dark,
    WIND: wind,
    WATER: water,
    FIRE: fire,
    EARTH: earth,
    DIVINE: divine
}

const spellTrapAttributeMap = {
    SPELL: spell,
    TRAP: trap
}

let orderedMonsterAttributeList = ['LIGHT', 'WIND', 'WATER', 'DIVINE', 'FIRE', 'EARTH', 'DARK'];
let orderedSpellTrapAttributeList = ['TRAP', 'SPELL'];

class AttributeEditor extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            mainContainerIsHovered: false
        };
        
    }

    updateAttribute(event, attribute){
        event.stopPropagation();
        this.props.updateAttribute(attribute);
    }

    getInterpolatedAngle(start, stop, t){
        return start*(1-t) + stop*(t);
    }

    getAttributeWheel(){
        const radius = 75;
        const attributeSelectionWidth = $(this.attributeSelection).width();
        const attributeSelectionContainerWidth = $(this.attributeSelectionContainer).outerWidth();
        const wheelDimension = radius * 2 + attributeSelectionWidth;
        const attributeWheelStyle = {
            position: 'absolute',
            height: wheelDimension + 'px',
            width: wheelDimension + 'px',
            left: -(wheelDimension-attributeSelectionContainerWidth)/2 + 'px',
        };
        return (
            <div style={attributeWheelStyle}>
                {this.getAttributeSelectionElements(monsterAttributeMap, orderedMonsterAttributeList, radius, -9/10*Math.PI, -1/10*Math.PI)}
                {this.getAttributeSelectionElements(spellTrapAttributeMap, orderedSpellTrapAttributeList, radius, Math.PI/2.8, 1.8/2.8*Math.PI)}              
            </div>
        )
    }

    getAttributeSelectionElements(attributeMap, orderedAttributeList, radius, angleStart, angleStop){
        return _.map(orderedAttributeList, (attribute, index) => {
            const t = index/(_.size(attributeMap)-1);
            const theta = this.getInterpolatedAngle(angleStart, angleStop, t);
            const style = {
                transform: sprintf('rotate(%srad) translate(%spx) rotate(%srad)', theta, radius, -theta),
                top: radius + 'px',
                left: radius + 'px',
            }
            return (
                <div
                    className="ygo-card-attribute-suggestion-anchor"
                    key={attribute}
                    style={style}>
                        <img
                        src={attributeMap[attribute]}
                        onClick={(event) => this.updateAttribute(event, attribute)}
                        className="ygo-card-attribute-suggestion"
                        />
                </div>            
            )});
    }

    getAttributeImage(attributeName){
        if (_.has(monsterAttributeMap, attributeName)){
            return monsterAttributeMap[attributeName];
        }
        else if (_.has(spellTrapAttributeMap, attributeName)){
            return spellTrapAttributeMap[attributeName];
        }
    }

    /* -------------- +
     | Event Handlers |
     + -------------- */

     mainContainerHandleOnMouseEnter(){
         this.setState({
             mainContainerIsHovered: true
         });
     }

     mainContainerHandleOnMouseLeave(){
         this.setState({
             mainContainerIsHovered: false
         });
     }

    render(){
        return (
            <div 
                ref={(input) => this.attributeSelectionContainer = input} 
                className="ygo-card-attribute"
                onMouseEnter={(event) =>this.mainContainerHandleOnMouseEnter()}
                onMouseLeave={(event) => this.mainContainerHandleOnMouseLeave()}>
                <img
                    ref={(input) => this.attributeSelection = input} 
                    src={this.getAttributeImage(this.props.attribute)}
                    className="ygo-card-attribute-selection"/>
                {this.state.mainContainerIsHovered ? this.getAttributeWheel() : null}
            </div> 
        )
    }
}

export {AttributeEditor};