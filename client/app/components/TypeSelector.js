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
            fontWidthScale: 1,
            inputIsFocused: false,
            inputIsHovered: false
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

        setTimeout(() => this.updateFontScale(), 100);
    }

    handleKeyDown(event, index){
        // If pressing backspace when there is no content in this input, delete it.
        if (_.isEmpty(this.props.tribes[index].name) && event.keyCode === 8){
            this.props.tribes.splice(index, 1);
            this.props.updateTribes(this.props.tribes)
            
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
            transform: sprintf('scale(%s, 1)', this.state.fontWidthScale)
        }
        return (
            <div 
                className="ygo-card-type"
                onMouseEnter={(event) => this.handleOnMouseEnter()}
                onMouseLeave={(event) => this.handleOnMouseLeave()}
                style={style}>
                <span>[</span>
                {this.getTribesAsDisplay()}
                <input 
                    className="ygo-card-type-input"
                    type="text" 
                    value={this.state.input}
                    placeholder='Enter type here...' 
                    onChange={(event) => this.updateInput(event)}
                    onKeyPress={(event) => this.handleKeyPress(event)}
                    onFocus={(event) => this.handleOnFocus()}
                    onBlur={(event) => this.handleOnBlur()}/>
                {this.getEffectAsDisplay()}
                <span>]</span>
            </div>
        )
    }
}

export {TypeSelector};