import React from 'react';
import _ from 'lodash';
import {sprintf} from 'sprintf-js'
import $ from 'jquery';
import light from 'client/app/assets/LIGHT.png';
import dark from 'client/app/assets/DARK.png';
import fire from 'client/app/assets/FIRE.png';
import water from 'client/app/assets/WATER.png';
import wind from 'client/app/assets/WIND.png';
import earth from 'client/app/assets/EARTH.png';


var attributeMap = {
    LIGHT: light,
    DARK: dark,
    WIND: wind,
    WATER: water,
    FIRE: fire,
    EARTH: earth
}

let attributeList = ['LIGHT', 'WIND', 'WATER', 'DARK', 'EARTH', 'FIRE']

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

    getAttributeWheel(){
        const radius = 65;
        const attributeSelectionWidth = $(this.attributeSelection).width();
        const attributeSelectionContainerWidth = $(this.attributeSelectionContainer).outerWidth();
        const wheelDimension = radius * 2 + attributeSelectionWidth;
        const attributeWheelStyle = {
            position: 'absolute',
            height: wheelDimension + 'px',
            width: wheelDimension + 'px',
            left: -(wheelDimension-attributeSelectionContainerWidth)/2 + 'px'
        };
        return (
            <div style={attributeWheelStyle}>
                {
                    _.map(attributeList, (attribute, index) => {
                        var theta = (2*Math.PI/(_.size(attributeMap)) * index) - Math.PI/2;
                        var style = {
                            transform: sprintf('rotate(%srad) translate(%spx) rotate(%srad)', theta, radius, -theta),
                            top: radius + 'px',
                            left: radius + 'px'
                        }
                        return (
                            <img
                                src={attributeMap[attribute]}
                                style={style}
                                onClick={(event) => this.updateAttribute(event, attribute)}
                                className="ygo-card-attribute-suggestion"
                                key={attribute}/>
                        )})
                }
            </div>
        )
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
                    src={attributeMap[this.props.attribute]}
                    className="ygo-card-attribute-selection"/>
                {this.state.mainContainerIsHovered ? this.getAttributeWheel() : null}
            </div> 
        )
    }
}

export {AttributeEditor};