import React from 'react';
import $ from 'jquery';
import _ from 'lodash';

class ResizableInput extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
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
        this.resizeInput();   
    }

    resizeInput(){
        $(this.refs.hiddenContent).text($(this.refs.content).val());
        $(this.refs.content).width($(this.refs.hiddenContent).width()); 
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
                    ref="content" type="text" 
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    style={this.props.style} 
                    onChange={(event) => this.updateInput(event)}
                    onKeyDown={this.props.onKeyDown ? (event) => this.props.onKeyDown(event) : (event) => {}}/>
            </div>     
        )
        
    }
}

export {ResizableInput};