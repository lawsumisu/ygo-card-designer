import React from 'react';
import $ from 'jquery';
import _ from 'lodash';
import 'client/app/components/common/resizableInput/resizableInput.scss';

/**
 * An <input/> like component that grows as text is added.
 */
class ResizableInput extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        // On initial load in chrome, this element's width can still be in flux. Do the rescaling after a delay to guarantee all DOM elements have the correct width.
        setTimeout(() => this.resizeInput(), 1);
    }

    componentDidUpdate(){
        this.resizeInput();
    }

    getClassName(){
        var className = "resizable-input-content"
        if (this.props.className){
            className += ' ' + this.props.className;
        }
        return className;
    }
    
    getMainContainerClassNames(){
        let classNames = ['resizable-input-container'];
        if (this.props.containerClassName){
            classNames.push(this.props.containerClassName);
        }
        return classNames.join(' ');
    }

    updateInput(event){
        this.props.onChange(event);  
    }

    resizeInput(){
        var hiddenContentElement =  $(this.refs.hiddenContent);
        var resizingContentElement = $(this.refs.content);
        if (resizingContentElement.is(':visible')){
            // Only want to resize the text box if it is visible, otherwise the width can be erroneously set to 0.
            hiddenContentElement.show();
            resizingContentElement.width(hiddenContentElement.width()); 
            hiddenContentElement.hide();
        }        
    }

    render(){
        return (
            <div
                className={this.getMainContainerClassNames()}
                style={this.props.containerStyle}
                >
                <span className="resizable-input-hidden-content" ref="hiddenContent">{this.props.value}</span>
                <input 
                    className={this.getClassName()}
                    ref="content" 
                    type="text" 
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    style={this.props.style} 
                    onChange={(event) => this.updateInput(event)}
                    onKeyDown={this.props.onKeyDown ? (event) => this.props.onKeyDown(event) : (event) => {}}
                    onFocus={this.props.onFocus ? (event) => this.props.onFocus(event) : (event) => {}}
                    onBlur={this.props.onBlur ? (event) => this.props.onBlur(event) : (event) => {}}/>                 
            </div>     
        )
        
    }
}

export {ResizableInput};