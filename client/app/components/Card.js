import React from 'react';
import {connect} from 'react-redux';
import {MonsterTypes} from '../constants';
import {ActionCreators} from 'client/app/redux/actions';
import {LevelSelector} from './LevelSelector';
import {AttributeSelector} from './AttributeSelector';
import {ImageSelector} from './ImageSelector';
import {TypeEditor} from './typeEditor/TypeEditor';
import {DescriptionEditor} from './DescriptionEditor';
import _ from 'lodash';
import styles from './App.scss';
import image from '../assets/BlueEyesWhiteDragon.png';
import {AutoscalingInput} from './common/AutoscalingInput';


class Card extends React.Component{
    constructor(props){
        super(props);
    }

    getClassNames(){
        var classNames = ['ygo-card-content'];
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
                    <AttributeSelector 
                        updateAttribute={this.props.updateAttribute}
                        attribute={this.props.cardState.attribute}/> 
                </div>
                <div className="ygo-card-center">
                    <LevelSelector 
                        level={this.props.cardState.level} 
                        updateLevel={this.props.updateLevel}
                        monsterType={this.props.cardState.monsterType}
                    />
                    <ImageSelector/>
                    <div className="ygo-card-set-id"></div>
                </div>
                
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
                    <div>
                        
                    </div>
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
            </div>
        )
    }
}

// Hook up Redux store state to props of this Component.
const mapStateToProps = function(state){
    return {
        cardState: state.cardReducer
    }
}

const mapDispatchToProps = function(dispatch){
    return {
        updateName: (name) => dispatch(ActionCreators.monster.updateName(name)),
        updateLevel: (level) => dispatch(ActionCreators.monster.updateLevel(level)),
        updateAttribute: (attribute) => dispatch(ActionCreators.general.updateAttribute(attribute)),
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