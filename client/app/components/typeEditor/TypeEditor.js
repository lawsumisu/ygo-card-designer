import React from 'react';
import _ from 'lodash';
import {sprintf} from 'sprintf-js';
import $ from 'jquery';
import {ResizableInput} from '../common/ResizableInput';
import {MonsterTypeEditor} from './MonsterTypeEditor';
import styles from '../../style/ResizableInput.scss';

var tribeCount = 0;
class TypeEditor extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            input: '',
            scale: 1,
            inputIsFocused: false,
            inputIsHovered: false
        }
    }

    componentDidUpdate(){
        this.updateScale();
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
        });
        this.props.updateTribes(_.concat(this.props.tribes, _.map(tribes.slice(0, tribes.length-1), this.createTribe)));
    }

    updateTribe(event, index){
        var input = event.target.value;
        var tribeNames = _.split(input, '-');

        var tribesToAdd = _.map(tribeNames.slice(1), this.createTribe);
        if (tribesToAdd.length > 0){
            //The tribes were actually split up, so create a new tribe object for the first element.
            this.props.tribes[index] = this.createTribe(tribeNames[0]);
        }
        else{
            //Else, this element hasn't been split, so update the name only.
            this.props.tribes[index].name = tribeNames[0];
        }
        
        this.props.updateTribes(this.props.tribes.slice(0, index+1).concat(tribesToAdd, this.props.tribes.slice(index+1)));

        setTimeout(() => this.updateScale(), 100);
    }

    handleKeyDown(event, index){
        // If pressing backspace when there is no content in this input, delete it.
        if (_.isEmpty(this.props.tribes[index].name) && event.keyCode === 8){
            this.props.tribes.splice(index, 1);
            this.props.updateTribes(this.props.tribes);

            //Autofocus previous tribe
            var tribeInputElements = $('.ygo-card-type-tribe .resizable-input-content');
            if (tribeInputElements.length > 1){
                var i = Math.max(index-1, 0);
                tribeInputElements[i].focus();
            }
            else if (tribeInputElements.length == 1){
                //Else if there was only one element left, focus the original input
                $('.ygo-card-type-input').focus();
            }
            
            event.preventDefault();
        } 
    }

    handleKeyPress(event){
        //If pressing enter when there is content in this input, add it.
        if (event.key === 'Enter'){
            var input = event.target.value;
            this.setState({
                input: '',
            });
            this.props.updateTribes(_.concat(this.props.tribes, this.createTribe(input)));
        }
    }

    handleOnBlur(){
        // Append current input to tribe list and then clear it.
        if (!_.isEmpty(this.state.input)){
            this.props.updateTribes(_.concat(this.props.tribes, this.createTribe(this.state.input)));
            this.setState({
                input: '',
                inputIsFocused: false
            });
        }
        else{
            this.setState({
                inputIsFocused: false
            });
        }
    }

    handleOnMouseEnter(){
        this.setState({
            inputIsHovered: true
        });
    }

    handleOnMouseLeave(){
        this.setState({
            inputIsHovered: false
        });
    }

    handleOnFocus(){
        this.setState({
            inputIsFocused: true
        });
    }

    getTribesAsDisplay(){
        return _.map(this.props.tribes, (tribe, index) => {
            
            return (
                <div
                    className="ygo-card-type-tribe"
                    key={tribe.id}>
                    <ResizableInput
                        value={tribe.name} 
                        onChange={(event) => this.updateTribe(event, index)}
                        onKeyDown={(event) => this.handleKeyDown(event, index)}/>
                    {index < this.props.tribes.length-1 ? <div>-</div> : this.getTypeSpacer()}

                </div>
                
            )
        });
    }

    getEffectTypeAsDisplay(){
        if (this.props.isEffect && this.props.isEffect()){
            return (
                <div>
                    <span>/</span>
                    <span>Effect</span>
                </div>
            )
        }
        else{
            return (
                <div>
                    <span>/</span>
                    <span>Normal</span>
                </div>
            )
        }
    }

    updateScale(){
        var scaleFactor = Math.min($(this.refs.hiddenContent).width()/($(this.refs.actualContent).width()), 1)
        if (scaleFactor !== this.state.scale){
            this.setState({
                scale: Math.min(scaleFactor, 1)
            });
        }   
    }

    // Getter for spacer that precedes the input box. It has special properties depending on whether or not the main input box is being interacted with.
    getTypeSpacer(){
        if (this.state.inputIsFocused || this.state.inputIsHovered){
            return (
                <div>-</div>
            )
        }
    }

    render(){
        var style = {
            transform: sprintf('scale(%s, 1)', this.state.scale)
        }
        return (
            <div>
                <div className="ygo-card-type-hidden-content"  ref="hiddenContent"></div>
                <div 
                    className="ygo-card-type"
                    ref="actualContent"
                    onMouseEnter={(event) => this.handleOnMouseEnter()}
                    onMouseLeave={(event) => this.handleOnMouseLeave()}
                    style={style}>
                    <span>[</span>
                    {this.getTribesAsDisplay()}
                    <input 
                        className="ygo-card-type-input"
                        type="text" 
                        value={this.state.input}
                        placeholder='Add tribe...' 
                        onChange={(event) => this.updateInput(event)}
                        onKeyPress={(event) => this.handleKeyPress(event)}
                        onFocus={(event) => this.handleOnFocus()}
                        onBlur={(event) => this.handleOnBlur()}/>
                    <MonsterTypeEditor updateMonsterType={this.props.updateMonsterType} monsterType={this.props.monsterType}/>
                    {this.getEffectTypeAsDisplay()}
                    <span>]</span>
                </div>
            </div>
            
        )
    }
}

export {TypeEditor};