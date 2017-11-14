import React from 'react';
import $ from 'jquery';

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
            <div>
                <span className="resizable-input-hidden-content" ref="hiddenContent"></span>
                <input 
                    className={this.getClassName()}
                    ref="content" type="text" 
                    value={this.props.value} 
                    onChange={(event) => this.updateInput(event)}
                    onKeyDown={this.props.onKeyDown ? (event) => this.props.onKeyDown(event) : (event) => {}}/>
            </div>     
        )
        
    }
}

export {ResizableInput};