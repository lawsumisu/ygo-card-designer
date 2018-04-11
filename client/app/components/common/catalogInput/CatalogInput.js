import React from 'react';
import $ from 'jquery';
import {ResizableInput} from 'client/app/components/common/resizableInput/ResizableInput';
import style from 'client/app/components/common/catalogInput/CatalogInput.scss';


/**
 * An <input/> like component that can be used to display a list of independently modified values.
 */
class CatalogInput extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            inputIsFocused: false,
            input: ''
        }
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
                    <ResizableInput
                        value={item} 
                        onChange={(event) => this.updateItem(event, index)}
                        onKeyDown={(event) => this.handleKeyDown(event, index)}
                        onFocus={(event) => this.handleOnFocus(event)}
                        onBlur={(event) => this.handleOnBlur(event, false)}/>
                    {index < this.props.items.length-1 ? <div className="catalog-delimiter">{this.props.delimiter}</div> : null}
                </div>
            )
        });
    }

    // Getter for delimiter that precedes the input box.
    getInputPrecedingDelimiterAsDisplay(){
        if (this.props.items.length >= 1 && !_.isEmpty(this.props.delimiter)){
            return (
                <div className="catalog-delimiter">{this.props.delimiter}</div>
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
        if (this.state.inputIsFocused || this.props.showInput || (this.props.items.length === 0 && this.showWhenEmpty)){
            inputContainerClassNames.push('catalog-input-container-visible');
        }
        return inputContainerClassNames.join(' ');
    }

    getItemInputElements(){
        return $(this.catalogInputElement).find('.catalog-item .resizable-input-content');
    }

    focusItemInputElement(index, cursorPosition){
        var itemElements = this.getItemInputElements();
            if (itemElements.length > 0){
                var elementToFocus = itemElements[index];
                elementToFocus.focus();
                elementToFocus.setSelectionRange(cursorPosition, cursorPosition);
            }
            else if (itemElements.length === 0){
                //Else if there was only one element left, focus the original input
                $(this.catalogInputElement).find('.catalog-input').focus();
            }
    }

    focusMainInputElement(){
        $(this.catalogInputElement).find('.catalog-input').focus();
    }

    /* -------------- +
     | Event Handlers |
     + -------------- */

    handleKeyDown(event, index){
        // If removing character when there is no content in this input, delete it.
        if (_.isEmpty(this.props.items[index]) && (event.key === 'Backspace' || event.key === 'Delete')){
            let clonedItems = _.clone(this.props.items);
            clonedItems.splice(index, 1);
            this.props.updateItems(clonedItems);

            //Autofocus new item after re-rerender
            let itemElementToFocusIndex = event.key === 'Backspace' ? Math.max(index-1, 0): index;
            let cursorPosition = event.key === 'Backspace' ? _.size(clonedItems[itemElementToFocusIndex]) : 0

            //TODO make this a utility function?
            this.setState({}, () => {
                var itemElements = this.getItemInputElements();
                if (itemElements.length > 0){
                    this.focusItemInputElement(itemElementToFocusIndex, cursorPosition);       
                }
                else if (itemElements.length === 0){
                    //Else if there was only one element left, focus the original input
                    this.focusMainInputElement();
                }
            });

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

    /**
     * Event handler for when an input element loses focus.
     * @param {*} event 
     * @param {*} isMainInput 
     */
    handleOnBlur(event, isMainInput){
        // If main input element is blurred, Append current input to tribe list and then clear it.
        if (!_.isEmpty(this.state.input) && isMainInput){
            this.props.updateItems(_.concat(this.props.items, this.state.input));
            this.setState({
                input: '',
                inputIsFocused: false
            }, () =>{
                if (this.props.onBlur){
                    this.props.onBlur(event);
                }
            });
        }
        else{
            this.setState({
                inputIsFocused: false
            }, () =>{
                if (this.props.onBlur){
                    this.props.onBlur(event);
                }  
            });
        }
    }

    /**
     * Event handler for when an input element gains focus.
     * @param {*} event 
     */
    handleOnFocus(event){
        this.setState({
            inputIsFocused: true
        }, () => {
            if (this.props.onFocus){
                this.props.onFocus(event);
            }  
        }) ;
    }

    render(){
        return(
            <div 
                className={this.getClassNames()}
                style={this.props.style}
                onMouseEnter={this.props.onMouseEnter}
                onMouseLeave={this.props.onMouseLeave}
                ref={(input) => this.catalogInputElement = input}>
                {this.getItemsAsDisplay()}
                <div className={this.getInputContainerClassNames()}>
                    {this.getInputPrecedingDelimiterAsDisplay()}
                    <input 
                        className={this.getInputClassNames()}
                        type="text" 
                        value={this.state.input}
                        placeholder={this.props.placeholder}
                        onChange={(event) => this.updateInput(event)}
                        onKeyPress={(event) => this.handleKeyPress(event)}
                        onFocus={(event) => this.handleOnFocus(event)}
                        onBlur={(event) => this.handleOnBlur(event, true)}/>
                </div>
                
            </div>
        )
    }
}

CatalogInput.defaultProps = {
    showWhenEmpty: true
};

export {CatalogInput};