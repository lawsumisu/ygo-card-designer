import React from 'react';
import $ from 'jquery';
import {ResizableInput} from '../ResizableInput';
import style from './CatalogInput.scss';


/**
 * A <input/> like component that can be used to display a list of independently modified values.
 */
class CatalogInput extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            inputIsFocused: false,
            itemIds: []
        }
    }


    createItem(item){
        return {
            name: item,
            id: ++tribeCount
        };
    }

     updateInput(event){
        var input = event.target.value;
        var items = this.getDelimitedItems(input);
        this.setState({
            input: items[items.length-1],
        });
        this.props.updateItems(_.concat(this.props.items, items.slice(0, items.length-1)));
    }

    updateItem(event, index){
        var input = event.target.value;
        var items = this.getDelimitedItems(input);

        var itemsToAdd = items.slice(1);
        this.props.items[index] = items[0];
        
        this.props.updateItems(this.props.items.slice(0, index+1).concat(itemsToAdd, this.props.items.slice(index+1)));
    }

    getDelimitedItems(input){
        if (this.props.delimiter){
            return _.split(input, this.props.delimiter);
        }
        else{
            return [input];
        }
    }

    /* ------------------- +
     | DOM-Related Methods |
     + ------------------- */

    getItemsAsDisplay(){
        return _.map(this.props.items, (item, index) => {
            return (
                <div
                    className={this.getItemClassNames()}
                    key={index}>
                    {
                        this.getTransformedInput(
                            <ResizableInput
                                value={item} 
                                onChange={(event) => this.updateItem(event, index)}
                                onKeyDown={(event) => this.handleKeyDown(event, index)}/>
                        )
                    }
                    
                    {index < this.props.items.length-1 ? <div>{this.props.delimiter}</div> : null}
                </div>
            )
        });
    }

    // Getter for delimiter that precedes the input box. It has special properties depending on whether or not the main input box is being interacted with.
    getInputPrecedingDelimiterAsDisplay(){
        if (this.state.inputIsFocused || this.props.inputIsHovered){
            return (
                <div>{this.props.delimiter}</div>
            )
        }
    }

    getClassNames(){
        var classNames = ['catalog-content'];
        if (this.props.className){
            classNames.push(this.props.className);
        }
        return classNames.join(' ');
    }

    getItemClassNames(){
        var itemClassNames = ['catalog-item'];
        if (this.props.itemClassName){
            itemClassNames.push(this.props.itemClassName)
        }
        return itemClassNames.join(' ');
    }

    getInputClassNames(){
        var inputClassNames = ['catalog-input'];
        if (this.props.inputClassName){
            inputClassNames.push(this.props.inputClassName)
        }
        return inputClassNames.join(' ');
    }

    getInputContainerClassNames(){
        var inputContainerClassNames = ['catalog-input-container'];
        if (this.state.inputIsFocused){
            inputContainerClassNames.push('catalog-input-container-visible');
        }
        return inputContainerClassNames.join(' ');
    }

    getTransformedInput(inputElement){
        if (this.props.inputTransform){
            return this.props.inputTransform(inputElement);
        }
        else return inputElement;
    }

    /* -------------- +
     | Event Handlers |
     + -------------- */

    handleKeyDown(event, index){
        // If pressing backspace when there is no content in this input, delete it.
        if (_.isEmpty(this.props.items[index]) && event.keyCode === 8){
            this.props.items.splice(index, 1);
            this.props.updateItems(this.props.items);

            //Autofocus previous item
            // var tribeInputElements = $('.ygo-card-type-tribe .resizable-input-content');
            // if (tribeInputElements.length > 1){
            //     var i = Math.max(index-1, 0);
            //     tribeInputElements[i].focus();
            // }
            // else if (tribeInputElements.length == 1){
            //     //Else if there was only one element left, focus the original input
            //     $('.ygo-card-type-input').focus();
            // }
            
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
            this.props.updateItems(_.concat(this.props.items, input));
        }
    }

     handleOnBlur(){
        // Append current input to tribe list and then clear it.
        if (!_.isEmpty(this.state.input)){
            this.props.updateItems(_.concat(this.props.items, this.state.input));
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

    handleOnFocus(){
        this.setState({
            inputIsFocused: true
        });
    }

    render(){
        return(
            <div 
                className={this.getClassNames()}
                style={this.props.style}
                onMouseEnter={this.props.onMouseEnter}
                onMouseLeave={this.props.onMouseLeave}>
                {this.getItemsAsDisplay()}
                <div className={this.getInputContainerClassNames()}>
                    {this.props.items.length > 1 ? <div>{this.props.delimiter}</div> : null}
                    {this.getTransformedInput(
                        <input 
                            className={this.getInputClassNames()}
                            type="text" 
                            value={this.state.input}
                            placeholder={this.props.placeholder}
                            onChange={(event) => this.updateInput(event)}
                            onKeyPress={(event) => this.handleKeyPress(event)}
                            onFocus={(event) => this.handleOnFocus()}
                            onBlur={(event) => this.handleOnBlur()}/>
                    )}
                </div>
                
            </div>
        )
    }
}

export {CatalogInput};