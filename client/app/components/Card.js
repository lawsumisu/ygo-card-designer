import React from 'react';
import {connect} from 'react-redux';
import {updateName, updateAttribute, updateLevel, updateAtk, updateDef, updateEffect, updateLore, updateTribes} from '../redux/actions';
import {LevelSelector} from './LevelSelector';
import {AttributeSelector} from './AttributeSelector';
import {ImageSelector} from './ImageSelector';
import {TypeSelector} from './TypeSelector';
import {TextEditor} from './TextEditor';
import _ from 'lodash';
import styles from './App.scss';
import image from '../assets/BlueEyesWhiteDragon.png';
import {AutoscalingInput} from './common/AutoscalingInput';


class Card extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="ygo-card-content">
                <div className="ygo-card-top">
                    <AutoscalingInput
                        className="ygo-card-name"
                        type="text" 
                        placeholder="Enter a name here..."
                        value={this.props.cardState.name} 
                        onChange={(event) => this.props.updateName(event.target.value)}
                    />
                    <AttributeSelector 
                        updateAttribute={this.props.updateAttribute}
                        attribute={this.props.cardState.attribute}/> 
                </div>
                <div className="ygo-card-center">
                    <LevelSelector level={this.props.cardState.level} updateLevel={this.props.updateLevel}/>
                    <ImageSelector/>
                    
                </div>
                
                <div className="ygo-card-bottom">
                    <TypeSelector tribes={this.props.cardState.tribes} updateTribes={this.props.updateTribes} isEffect={() => !_.isEmpty(this.props.cardState.effect)}/>
                    
                    <TextEditor effect={this.props.cardState.effect} updateEffect={this.props.updateEffect} lore={this.props.cardState.lore} updateLore={this.props.updateLore}/>
                    <div>
                        
                    </div>
                    <div className="ygo-card-battle-points">
                        <div>
                            <span>ATK/</span>
                            <input type="text" value={this.props.cardState.atk} onChange={(event) => this.props.updateAtk(event.target.value)}/>
                        </div>
                        <div className="ygo-card-battle-point-spacer">

                        </div>
                        <div>
                            <span>DEF/</span>
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
        updateName: (name) => dispatch(updateName(name)),
        updateLevel: (level) => dispatch(updateLevel(level)),
        updateAttribute: (attribute) => dispatch(updateAttribute(attribute)),
        updateAtk: (atk) => dispatch(updateAtk(atk)),
        updateDef: (def) => dispatch(updateDef(def)),
        updateEffect: (effect) => dispatch(updateEffect(effect)),
        updateLore: (lore) => dispatch(updateLore(lore)),
        updateTribes: (tribes) => dispatch(updateTribes(tribes))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);