import React from 'react';
import {connect} from 'react-redux';
import {updateName, updateAttribute, updateLevel, updateAtk, updateDef, updateEffect, updateType} from '../redux/actions';
import styles from './App.scss';
import image from '../assets/BlueEyesWhiteDragon.png'

class StarBar extends React.Component {
    constructor(props){
        super(props);
    }

    getStars(){
        return Math.min(this.props.stars, 12)
    }

    getStarsAsDisplay(){
        var display = [];
        for (var i = 0; i < this.getStars(); ++i){
            display.push(
                <span 
                    className="ygo_card_level"
                    key={i}>
                     {'\u272a'}
                </span>
            )
        }
        return display;
    }


    render(){
        return (
            <div>
                {
                   this.getStarsAsDisplay()
                }
            </div>
        )
    }
}
class Card extends React.Component{
    constructor(props){
        super(props);

    }

    getLevelAsDisplay(){
        return '\u272a'.repeat(this.props.cardState.level);
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
                        <span className="ygo-card-attribute">
                            {'\u5149'}
                        </span> 
                </div>
                <div className="ygo-card-center">
                    <StarBar stars={this.props.cardState.level}/>
                    <div className="ygo-card-image">
                        <img src={image}/>
                    </div>
                </div>
                
                <div className="ygo-card-bottom">
                    <div>
                        <input className="ygo-card-type" type="text" value={this.props.cardState.type}/>
                    </div>
                    <div>
                        <input className="ygo-card-effect" type="text" value={this.props.cardState.effect} onChange={(event) => this.props.updateEffect(event.target.value)}/>
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
        updateType: (type) => dispatch(updateType(type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);