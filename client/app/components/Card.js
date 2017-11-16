import React from 'react';
import {connect} from 'react-redux';
import {updateName, updateAttribute, updateLevel, updateAtk, updateDef, updateEffect, updateDescription, updateType} from '../redux/actions';
import {LevelSelector} from './LevelSelector';
import {AttributeSelector} from './AttributeSelector';
import {ImageSelector} from './ImageSelector';
import {TypeSelector} from './TypeSelector';
import _ from 'lodash';
import styles from './App.scss';
import image from '../assets/BlueEyesWhiteDragon.png';


class Card extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="ygo-card-content">
                <div className="ygo-card-top">
                    <input 
                        className="ygo-card-name"
                        type="text" 
                        value={this.props.cardState.name} 
                        onChange={(event) => this.props.updateName(event.target.value)}/>
                    <AttributeSelector 
                        updateAttribute={this.props.updateAttribute}
                        attribute={this.props.cardState.attribute}/> 
                </div>
                <div className="ygo-card-center">
                    <LevelSelector level={this.props.cardState.level} updateLevel={this.props.updateLevel}/>
                    <ImageSelector/>
                    
                </div>
                
                <div className="ygo-card-bottom">
                    <TypeSelector isEffect={() => !_.isEmpty(this.props.cardState.effect)}/>
                    <div>
                        <input className="ygo-card-effect" type="text" value={this.props.cardState.effect} onChange={(event) => this.props.updateEffect(event.target.value)}/>
                    </div>
                    <div>
                        <textarea 
                            className="ygo-card-description"
                            value={this.props.cardState.description} 
                            onChange={(event) => this.props.updateDescription(event.target.value)}/>
                    </div>
                    <div className="ygo-card-battle-points">
                        ATK/
                        <input type="text" value={this.props.cardState.atk} onChange={(event) => this.props.updateAtk(event.target.value)}/>
                        DEF/
                        <input type="text" value={this.props.cardState.def} onChange={(event) => this.props.updateDef(event.target.value)}/>
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
        updateDescription: (description) => dispatch(updateDescription(description)),
        updateType: (type) => dispatch(updateType(type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);