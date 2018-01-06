import React from 'react';
import $ from 'jquery';
import _ from 'lodash';

/**
 * A <input/> like component that grows as text is added.
 */
class ResizableInput extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.resizeInput();
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

    updateInput(event){
        this.props.onChange(event);  
    }

    resizeInput(){
        var hiddenContentElement =  $(this.refs.hiddenContent);
        var resizingContentElement = $(this.refs.content);

        hiddenContentElement.show();
        hiddenContentElement.text(resizingContentElement.val());
        resizingContentElement.width(hiddenContentElement.width()); 
        hiddenContentElement.hide();
    }

    render(){
        return (
            <div 
                className={this.props.containerClassName}
                style={this.props.containerStyle}
                >
                <span className="resizable-input-hidden-content" ref="hiddenContent"></span>
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