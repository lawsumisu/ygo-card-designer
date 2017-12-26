import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import {sprintf} from 'sprintf-js';
import {AutoscalingTextarea} from './common/AutoscalingTextarea';
import {MonsterTypes} from '../constants';
import {CatalogInput} from './common/catalogInput/CatalogInput';

class DescriptionEditor extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            mainIsHovered: false,
            effectIsFocused: false,
            loreIsFocused: false,
            materialHorizontalScale: 1
        };
    }

    componentDidUpdate(){
        this.updateMaterialHorizontalScale();
    }

    getMaterialEditor(){
        if (this.props.monsterType === MonsterTypes.FUSION){
            var style = {
                transform: sprintf('scale(%s, 1)', this.state.materialHorizontalScale)
            }
            var inputTransform = (input) =>{
                return (
                    <div className="ygo-card-fusion-material">
                        <span>"</span>
                        {input}
                        <span>"</span>
                    </div>
                )
            }
            return (
                <CatalogInput
                    style={style}
                    className="ygo-card-fusion-materials"
                    placeholder="Add Fusion Material..."
                    delimiter="+"
                    items={this.props.fusionMaterials}
                    updateItems={this.props.updateFusionMaterials}
                    inputTransform={inputTransform}
                    onMouseEnter={(event) => this.updateMaterialHorizontalScale()}
                    onMouseLeave={(event) => this.updateMaterialHorizontalScale()}
                />
            )
        }
    }

    /* -------------- *
     | Event Handlers |
     + -------------- */

    handleOnMouseEnter(){
        this.setState({
            mainIsHovered: true
        });
    }

    handleOnMouseLeave(){
        this.setState({
            mainIsHovered: false
        });
    }

    getEffectContainerClassNames(effectText){
        var effectClassNames = ['ygo-card-effect-container'];
        if (_.isEmpty(effectText) && !this.state.effectIsFocused && !this.state.loreIsFocused && !this.state.mainIsHovered && (
            _.isEmpty(this.props.fusionMaterials) || this.props.monsterType !== MonsterTypes.FUSION)){
            effectClassNames.push('ygo-card-effect-container-invisible');
        }
        return effectClassNames.join(' ');
    }

    getEffectClassNames(effectText){
        var effectClassNames = ['ygo-card-effect'];
        if (_.isEmpty(effectText) && !this.state.effectIsFocused && !this.state.loreIsFocused && !this.state.mainIsHovered){
            effectClassNames.push('ygo-card-effect-invisible');
        }
        return effectClassNames.join(' ');
    }

    updateFocus(inputType, isFocused){
        if (inputType === 'effect'){
            this.setState({
                effectIsFocused: isFocused
            });
        }
        else if (inputType === 'lore'){
            this.setState({
                loreIsFocused: isFocused
            });
        }
    }

    updateEffect(event){
        this.props.updateEffect(event.target.value);
    }

    getStyle(text){
        if (_.isEmpty(text) && !this.state.effectIsFocused && !this.state.loreIsFocused && !this.state.mainIsHovered){
            return {
                display: 'none'
            };
        }
        else return {}
    }

    updateMaterialHorizontalScale(){
        if (this.props.monsterType === MonsterTypes.FUSION){
            var maxWidth = $('.ygo-card-effect-container').width();
            var actualWidth = $('.ygo-card-fusion-materials').width();
            var materialHorizontalScaleFactor = Math.min(maxWidth/actualWidth, 1);
            if (materialHorizontalScaleFactor !== this.state.materialHorizontalScale){
                this.setState({
                    materialHorizontalScale: Math.min(materialHorizontalScaleFactor, 1)
                });
            }
        }
         
    }

    render(){
        return (
            <div className="ygo-card-bottom-text"
                onMouseEnter={(event) => this.handleOnMouseEnter()}
                onMouseLeave={(event) => this.handleOnMouseLeave()}>
                <div 
                    className={this.getEffectContainerClassNames(this.props.effect)}>
                    {this.getMaterialEditor()}
                    <AutoscalingTextarea
                        maxFontSize={15}
                        className={this.getEffectClassNames()}
                        placeholder="Enter effect here..."
                        value={this.props.effect} 
                        onChange={(event) => this.props.updateEffect(event.target.value)}
                        onFocus={(event) => this.updateFocus('effect', true)}
                        onBlur={(event) => this.updateFocus('effect', false)}/>
                </div>         
                <AutoscalingTextarea
                    style={this.getStyle(this.props.lore)}
                    maxFontSize={15}
                    className="ygo-card-lore"
                    placeholder="Enter lore here..."
                    value={this.props.lore} 
                    onChange={(event) => this.props.updateLore(event.target.value)}
                    onFocus={(event) => this.updateFocus('lore', true)}
                    onBlur={(event) => this.updateFocus('lore', false)}
                    />
            </div>
        )
        
    }
}

export {DescriptionEditor};