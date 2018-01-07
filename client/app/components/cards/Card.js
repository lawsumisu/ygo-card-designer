import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {MonsterTypes} from 'client/app/constants';
import {ActionCreators} from 'client/app/redux/actions';
import {selectCardType} from 'client/app/redux/selectors';

import {LevelSelector} from 'client/app/components/editors/LevelSelector';
import {AttributeEditor} from 'client/app/components/editors/AttributeEditor';
import {ActionTypeEditor} from 'client/app/components/editors/actionTypeEditor/ActionTypeEditor';
import {ImageSelector} from 'client/app/components/editors/ImageSelector';
import {TypeEditor} from 'client/app/components/editors/typeEditor/TypeEditor';
import {DescriptionEditor} from 'client/app/components/editors/DescriptionEditor';
import {AutoscalingInput} from 'client/app/components/common/autoscalingInput/AutoscalingInput';

import 'client/app/components/cards/Card.scss';
import image from 'client/app/assets/BlueEyesWhiteDragon.png';


class Card extends React.Component{
    constructor(props){
        super(props);
    }

    getCardCenterEditor(){
        if (this.props.cardState.attribute === 'SPELL' || this.props.cardState.attribute === 'TRAP'){
            return(
                <ActionTypeEditor
                    cardType={this.props.cardState.cardType}
                    actionTypes={this.props.cardState.actionTypes}
                    updateActionTypes={this.props.updateActionTypes}
                />
           );

        }  
        else{
            return (
                <LevelSelector 
                    level={this.props.cardState.level} 
                    updateLevel={this.props.updateLevel}
                    monsterType={this.props.cardState.monsterType}
                />
            );
        }
    }

    getCardBottom(){
        if (this.props.cardState.attribute === 'SPELL' || this.props.cardState.attribute === 'TRAP'){
            return (
                <div className="ygo-card-bottom">
                    <DescriptionEditor
                        monsterType={this.props.cardState.monsterType}
                        fusionMaterials={this.props.cardState.fusionMaterials}
                        updateFusionMaterials={this.props.updateFusionMaterials} 
                        synchroMaterials={this.props.cardState.synchroMaterials}
                        updateSynchroMaterials={this.props.updateSynchroMaterials}
                        xyzMaterials={this.props.cardState.xyzMaterials}
                        updateXyzMaterials={this.props.updateXyzMaterials}
                        effect={this.props.cardState.effect} 
                        updateEffect={this.props.updateEffect} 
                        lore={this.props.cardState.lore} 
                        updateLore={this.props.updateLore}/>
                </div>
            );
        }
        else{
            return (
                <div className="ygo-card-bottom">
                    <TypeEditor 
                        tribes={this.props.cardState.tribes} 
                        updateTribes={this.props.updateTribes}
                        monsterType={this.props.cardState.monsterType}
                        updateMonsterType={this.props.updateMonsterType} 
                        isEffect={() => !_.isEmpty(this.props.cardState.effect)}/>
                    
                    <DescriptionEditor
                        monsterType={this.props.cardState.monsterType}
                        fusionMaterials={this.props.cardState.fusionMaterials}
                        updateFusionMaterials={this.props.updateFusionMaterials} 
                        synchroMaterials={this.props.cardState.synchroMaterials}
                        updateSynchroMaterials={this.props.updateSynchroMaterials}
                        xyzMaterials={this.props.cardState.xyzMaterials}
                        updateXyzMaterials={this.props.updateXyzMaterials}
                        effect={this.props.cardState.effect} 
                        updateEffect={this.props.updateEffect} 
                        lore={this.props.cardState.lore} 
                        updateLore={this.props.updateLore}/>
                    <div className="ygo-card-battle-points">
                        <div>
                            <span>ATK</span><span className="battle-point-slash">/</span>
                            <input type="text" value={this.props.cardState.atk} onChange={(event) => this.props.updateAtk(event.target.value)}/>
                        </div>
                        <div className="ygo-card-battle-point-spacer">

                        </div>
                        <div>
                            <span>DEF</span><span className="battle-point-slash">/</span>
                            <input type="text" value={this.props.cardState.def} onChange={(event) => this.props.updateDef(event.target.value)}/>
                        </div>                                       
                    </div>
                </div>
            );
        }
    }

    getClassNames(){
        var classNames = ['ygo-card-content'];
        if (this.props.cardState.attribute === 'SPELL'){
            classNames.push('spell-card');
        }
        else if (this.props.cardState.attribute === 'TRAP'){
            classNames.push('trap-card');
        }
        else{
            if (this.props.cardState.monsterType === MonsterTypes.FUSION){
                classNames.push('fusion-monster');
            }
            else if (this.props.cardState.monsterType === MonsterTypes.SYNCHRO){
                classNames.push('synchro-monster');
            }
            else if (this.props.cardState.monsterType === MonsterTypes.RITUAL){
                classNames.push('ritual-monster');
            }
            else if (this.props.cardState.monsterType === MonsterTypes.XYZ){
                classNames.push('xyz-monster');
            }
            else if (this.props.cardState.effect.length > 0){
                classNames.push('effect-monster');
            }
            else{
                classNames.push('normal-monster');
            }
        }
        return classNames.join(' ');
    }

    render(){
        return (
            <div className={this.getClassNames()}>
                <div className="ygo-card-top">
                    <AutoscalingInput
                        className="ygo-card-name"
                        placeholder="Enter a name here..."
                        value={this.props.cardState.name} 
                        onChange={(event) => this.props.updateName(event.target.value)}
                    />
                    <AttributeEditor 
                        updateAttribute={this.props.updateAttribute}
                        attribute={this.props.cardState.attribute}/> 
                </div>
                <div className="ygo-card-center">
                    {this.getCardCenterEditor()}
                    <ImageSelector/>
                    <div className="ygo-card-set-id"></div>
                </div>
                {this.getCardBottom()}
            </div>
        )
    }
}

// Hook up Redux store state to props of this Component.
const mapStateToProps = function(state){
    return {
        cardState: Object.assign({cardType: selectCardType(state)}, state.cardReducer)
    }
}

const mapDispatchToProps = function(dispatch){
    return {
        updateName: (name) => dispatch(ActionCreators.monster.updateName(name)),
        updateLevel: (level) => dispatch(ActionCreators.monster.updateLevel(level)),
        updateAttribute: (attribute) => dispatch(ActionCreators.general.updateAttribute(attribute)),
        updateActionTypes: (actionTypes) => dispatch(ActionCreators.action.updateActionTypes(actionTypes)),
        updateAtk: (atk) => dispatch(ActionCreators.monster.updateAtk(atk)),
        updateDef: (def) => dispatch(ActionCreators.monster.updateDef(def)),
        updateEffect: (effect) => dispatch(ActionCreators.general.updateEffect(effect)),
        updateLore: (lore) => dispatch(ActionCreators.general.updateLore(lore)),
        updateTribes: (tribes) => dispatch(ActionCreators.monster.updateTribes(tribes)),
        updateMonsterType: (type) => dispatch(ActionCreators.monster.updateMonsterType(type)),
        updateFusionMaterials: (fusionMaterials) => dispatch(ActionCreators.monster.updateFusionMaterials(fusionMaterials)),
        updateSynchroMaterials: (synchroMaterials) => dispatch(ActionCreators.monster.updateSynchroMaterials(synchroMaterials)),
        updateXyzMaterials: (xyzMaterials) => dispatch(ActionCreators.monster.updateXyzMaterials(xyzMaterials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);