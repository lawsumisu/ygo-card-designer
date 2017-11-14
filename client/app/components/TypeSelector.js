import React from 'react';
import _ from 'lodash';
import {sprintf} from 'sprintf-js';
import $ from 'jquery';
import {ResizableInput} from './common/ResizableInput';
import styles from '../style/ResizableInput.scss';

var tribeCount = 0;
class TypeSelector extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            input: '',
            tribes: [],
            fontWidthScale: 1,
        }
    }

    createTribe(tribeString){
        return {
            name: tribeString,
            id: ++tribeCount
        };
    }

    updateInput(event){
        var input = event.target.value;
        var tribes = _.split(input, '-');
        this.setState({
            input: tribes[tribes.length-1],
            tribes: _.concat(this.state.tribes, _.map(tribes.slice(0, tribes.length-1), this.createTribe))
        });
    }

    updateTribe(event, index){
        var input = event.target.value;
        var tribeNames = _.split(input, '-');

        var tribesToAdd = _.map(tribeNames.slice(1), this.createTribe);
        if (tribesToAdd.length > 0){
            //The tribes were actually split up, so create a new tribe object for the first element.
            this.state.tribes[index] = this.createTribe(tribeNames[0]);
        }
        else{
            //Else, this element hasn't been split, so update the name only.
            this.state.tribes[index].name = tribeNames[0];
        }
        
        this.setState({
            tribes: this.state.tribes.slice(0, index+1).concat(tribesToAdd, this.state.tribes.slice(index+1))
        });
        setTimeout(() => this.updateFontScale(), 100);
    }

    handleKeyDown(event, index){
        // If pressing backspace when there is no content in this input, delete it.
        if (_.isEmpty(this.state.tribes[index].name) && event.keyCode === 8){
            this.state.tribes.splice(index, 1);
            this.setState({
                tribes: this.state.tribes
            });
            
            event.preventDefault();
        } 
    }

    handleOnBlur(){
        // Append current input to tribe list and then clear it.
        if (!_.isEmpty(this.state.input)){
            this.setState({
                input: '',
                tribes: _.concat(this.state.tribes, this.createTribe(this.state.input))
            });
        }
    }

    getTribesAsDisplay(){
        return _.map(this.state.tribes, (tribe, index) => {
            
            return (
                <div
                    className="ygo-card-type-tribe"
                    key={tribe.id}>
                    <ResizableInput 
                        value={tribe.name} 
                        onChange={(event) => this.updateTribe(event, index)}
                        onKeyDown={(event) => this.handleKeyDown(event, index)}/>
                    <div>-</div>
                </div>
                
            )
        });
    }

    getEffectAsDisplay(){
        if (this.props.isEffect && this.props.isEffect()){
            return (
                <div>
                    /Effect
                </div>
            )
        }
    }

    updateFontScale(){
        console.log($('.ygo-card-type').width());
    }

    render(){
        var style = {
            transform: sprintf('scale(%s, 1)', this.state.fontWidthScale)
        }
        return (
            <div 
                className="ygo-card-type"
                style={style}>
                <span>[</span>
                {this.getTribesAsDisplay()}
                <input 
                    className="ygo-card-type-input"
                    type="text" 
                    value={this.state.input} 
                    onChange={(event) => this.updateInput(event)}
                    onBlur={(event) => this.handleOnBlur()}/>
                {this.getEffectAsDisplay()}
                <span>]</span>
            </div>
        )
    }
}

export {TypeSelector};