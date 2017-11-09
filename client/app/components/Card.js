import React from 'react';
import {connect} from 'react-redux';
import {updateName, updateAttribute, updateLevel, updateAtk, updateDef, updateEffect, updateType} from '../redux/actions';

class Card extends React.Component{
    constructor(props){
        super(props);

    }

    getLevelAsDisplay(){
        return '\u272a'.repeat(this.props.cardState.level);
    }

    render(){
        return (
            <div>
                <div>
                    <input type="text" value={this.props.cardState.name} onChange={(event) => this.props.updateName(event.target.value)}/> {'\u5149'}

                </div>
                <div>
                    {this.getLevelAsDisplay()}
                </div>
                <div>
                    <img/>
                </div>
                <div>
                    <div>
                        <input type="text" value={this.props.cardState.type}/>
                    </div>
                    <div>
                        <input type="text" value={this.props.cardState.effect} onChange={(event) => this.props.updateEffect(event.target.value)}/>
                    </div>
                    <div>
                        ATK/
                        <input type="number" value={this.props.cardState.atk} onChange={(event) => this.props.updateAtk(event.target.value)}/>
                        DEF/
                        <input type="number" value={this.props.cardState.def} onChange={(event) => this.props.updateDef(event.target.value)}/>
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