
import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import {sprintf} from 'sprintf-js';

import {MonsterTypes, CardTypes} from 'client/app/constants';

import {AutoscalingTextarea} from 'client/app/components/common/autoscalingTextarea/AutoscalingTextarea';
import {CatalogInput} from 'client/app/components/common/catalogInput/CatalogInput';
import {AutoscalingInput} from 'client/app/components/common/autoscalingInput/AutoscalingInput';

class DescriptionEditor extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            mainIsHovered: false,
            effectIsFocused: false,
            loreIsFocused: false,
            monsterMaterialIsFocused: false,
            materialHorizontalScale: 1
        };
    }

    componentDidUpdate(){
        this.updateMaterialHorizontalScale();
    }

    getMaterialEditor(){
        if (this.props.cardType === CardTypes.MONSTER){
            const monsterMaterialProperties = this.getMonsterMaterialProperties();
            if (this.props.monsterType === MonsterTypes.FUSION || this.props.monsterType === MonsterTypes.SYNCHRO){ 
                const style = {
                    transform: sprintf('scale(%s, 1)', this.state.materialHorizontalScale)
                }
                return (
                    <div 
                        className="ygo-card-monster-materials-container"
                        onMouseEnter={(event) => this.handleMonsterMaterialContainerOnMouseEnter()}
                        onMouseLeave={(event) => this.handleMonsterMaterialContainerOnMouseLeave()}
                        >
                        <CatalogInput
                            style={style}
                            className={monsterMaterialProperties.className}
                            placeholder={monsterMaterialProperties.placeholder}
                            delimiter="+"
                            items={monsterMaterialProperties.monsterMaterials}
                            updateItems={monsterMaterialProperties.updateFunction}
                            onMouseEnter={(event) => this.updateMaterialHorizontalScale()}
                            onMouseLeave={(event) => this.updateMaterialHorizontalScale()}
                            onBlur={(event) => {
                                this.updateMaterialHorizontalScale();
                                this.updateFocus('monsterMaterial', false);
                                }}
                            onFocus={(event) => this.updateFocus('monsterMaterial', true)}
                            showInput={this.state.monsterMaterialIsHovered}
                        />
                    </div>
                    
                )
            }
            else if (this.props.monsterType === MonsterTypes.XYZ){
                return (
                    <AutoscalingInput
                        value={monsterMaterialProperties.monsterMaterials}
                        onChange={(event) => this.props.updateXyzMaterials(event.target.value)}
                        placeholder={monsterMaterialProperties.placeholder}
                        className={monsterMaterialProperties.className}
                        onBlur={(event) => this.updateFocus('monsterMaterial', false)}
                        onFocus={(event) => this.updateFocus('monsterMaterial', true)}
                    />
                );
            }
        }
    }

    getMonsterMaterialProperties(){
        if (this.props.cardType === CardTypes.MONSTER){
            if (this.props.monsterType === MonsterTypes.FUSION){
                return {
                    monsterMaterials: this.props.fusionMaterials,
                    updateFunction: this.props.updateFusionMaterials,
                    placeholder: 'Add Fusion Material...',
                    className: 'ygo-card-fusion-materials'
                };
            }
            else if (this.props.monsterType === MonsterTypes.SYNCHRO){
                return {
                    monsterMaterials: this.props.synchroMaterials,
                    updateFunction: this.props.updateSynchroMaterials,
                    placeholder: 'Add Synchro Material...',
                    className: 'ygo-card-synchro-materials'
                };
            }
            else if (this.props.monsterType === MonsterTypes.XYZ){
                return {
                    monsterMaterials: this.props.xyzMaterials,
                    updateFunction: this.props.updateXyzMaterials,
                    placeholder: 'Add Xyz Material...',
                    className: 'ygo-card-xyz-materials'
                };
            }
            else{
                return {};
            }
        }
        else{
            return {};
        }
        
    }

    includesMonsterMaterials(){
        return this.props.cardType === CardTypes.MONSTER && 
        (this.props.monsterType === MonsterTypes.FUSION || this.props.monsterType === MonsterTypes.SYNCHRO || this.props.monsterType === MonsterTypes.XYZ);
    }

    /* -------------- *
     | Event Handlers |
     + -------------- */

    handleBottomTextContainerOnMouseLeave(){
        this.setState({
            mainIsHovered: true
        });
    }

    handleBottomTextContainerOnMouseLeave(){
        this.setState({
            mainIsHovered: false
        });
    }

    handleMonsterMaterialContainerOnMouseEnter() {
        this.setState({
            monsterMaterialIsHovered: true
        });
    };

    handleMonsterMaterialContainerOnMouseLeave(){
        this.setState({
            monsterMaterialIsHovered: false
        });
    };

    getEffectContainerClassNames(effectText){
        var effectClassNames = ['ygo-card-effect-container'];
        if (_.isEmpty(effectText) && !this.state.effectIsFocused && !this.state.loreIsFocused && !this.state.monsterMaterialIsFocused && !this.state.mainIsHovered && (
            _.isEmpty(this.props.fusionMaterials) || !this.includesMonsterMaterials())){
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
        else if (inputType === 'monsterMaterial'){
            this.setState({
                monsterMaterialIsFocused: isFocused
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
        if (this.props.cardType === CardTypes.MONSTER && (this.props.monsterType === MonsterTypes.FUSION || this.props.monsterType === MonsterTypes.SYNCHRO)){
            const monsterMaterialProperties = this.getMonsterMaterialProperties();
            const maxWidth = $('.ygo-card-effect-container').width();
            const actualWidth = $(monsterMaterialProperties.className).width();
            if (!actualWidth || actualWidth === 0) return;
            const materialHorizontalScaleFactor = Math.min(maxWidth/actualWidth, 1);
            if (materialHorizontalScaleFactor !== this.state.materialHorizontalScale){
                this.setState({
                    materialHorizontalScale: materialHorizontalScaleFactor
                });
            }
        }
         
    }

    render(){
        return (
            <div className="ygo-card-bottom-text"
                onMouseEnter={(event) => this.handleBottomTextContainerOnMouseLeave()}
                onMouseLeave={(event) => this.handleBottomTextContainerOnMouseLeave()}>
                <div 
                    className={this.getEffectContainerClassNames(this.props.effect)}>
                    {this.getMaterialEditor()}
                    <AutoscalingTextarea
                        maxFontSize={15}
                        className={this.getEffectClassNames(this.props.effect)}
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