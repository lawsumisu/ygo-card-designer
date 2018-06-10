import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import {Rarities} from 'client/app/constants';

import light from 'client/app/assets/LIGHT.png';
import dark from 'client/app/assets/DARK.png';
import fire from 'client/app/assets/FIRE.png';
import water from 'client/app/assets/WATER.png';
import wind from 'client/app/assets/WIND.png';
import divine from 'client/app/assets/DIVINE.png';
import earth from 'client/app/assets/EARTH.png';
import spell from 'client/app/assets/SPELL.png';
import trap from 'client/app/assets/TRAP.png';

import 'client/app/components/editors/attributeEditor/attributeEditor.scss';


const attributeMap = {
    LIGHT: light,
    DARK: dark,
    WIND: wind,
    WATER: water,
    FIRE: fire,
    EARTH: earth,
    DIVINE: divine,
    SPELL: spell,
    TRAP: trap
}

const orderedAttributeList = ['LIGHT', 'WIND', 'WATER', 'DIVINE', 'FIRE', 'EARTH', 'DARK', 'TRAP', 'SPELL'];

export class AttributeEditor extends React.Component{
    constructor(props){
        super(props);
        
    }

    updateAttribute(event, attribute){
        event.stopPropagation();
        this.props.updateAttribute(attribute);
    }

    getInterpolatedValue(start, stop, t){
        return start*(1-t) + stop*(t);
    }

    renderAttributeWheel(){
        const attributeSelectionWidth = $(this.attributeSelection).width();
        const radius = attributeSelectionWidth;
        const attributeSelectionContainerWidth = $(this.attributeSelectionContainer).outerWidth();
        const wheelDimension = radius * 2 + attributeSelectionWidth;
        const attributeWheelStyle = {
            position: 'absolute',
            height: wheelDimension + 'px',
            width: wheelDimension + 'px',
            left: -(wheelDimension-attributeSelectionContainerWidth)/2 + 'px',
        };
        return (
            <div style={attributeWheelStyle} className="attribute-wheel--container">
                {
                    _.map(orderedAttributeList, (attribute, index) => {
                        const t = index/(_.size(attributeMap));
                        const angleStart = 5/6*Math.PI;
                        const theta = this.getInterpolatedValue(angleStart, angleStart+Math.PI*2, t);
                        const style = {
                            transform: `rotate(${theta}rad) translate(${radius}px) rotate(${-theta}rad)`,
                            top: radius + 'px',
                            left: radius + 'px',
                        }
                        return (
                            <div
                                className="ygo-card-attribute-suggestion-anchor"
                                key={attribute}
                                style={style}>
                                    <img
                                        src={attributeMap[orderedAttributeList[index]]}
                                        onClick={(event) => this.updateAttribute(event, attribute)}
                                        className="ygo-card-attribute-suggestion"
                                    />
                            </div>            
                        )})
                }         
            </div>
        )
    }

    render(){
        return (
            <div 
                ref={(input) => this.attributeSelectionContainer = input} 
                className="ygo-card-attribute"
             >
                <img
                    ref={(input) => this.attributeSelection = input} 
                    src={attributeMap[this.props.attribute]}
                    className="ygo-card-attribute-selection"/>
                {this.renderAttributeWheel()}
            </div> 
        )
    }
}