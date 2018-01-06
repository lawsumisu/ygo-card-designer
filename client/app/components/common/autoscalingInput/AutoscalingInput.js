import React from 'react';
import $ from 'jquery';
import {sprintf} from 'sprintf-js';
import {ResizableInput} from 'client/app/components/common/resizableInput/ResizableInput';
import styles from 'client/app/components/common/autoscalingInput/AutoscalingInput.scss';


/**
 * An <input/> like component that horizontally scales text so that it does not overflow the input.
 */
class AutoscalingInput extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            scale: 1
        }
    }

    componentDidMount(){
        this.scaleInput();
    }

    componentDidUpdate(){
        this.scaleInput();
    }

    updateInput(event){
        this.props.onChange(event);  
    }

    scaleInput(){
        $(this.refs.fullSizeContent).text($(this.autoscalingInputRef.refs.content).val()); 
        var newScale = Math.min($(this.refs.maxSizeContainer).width()/$(this.refs.fullSizeContent).width(), 1);
        if (newScale !== this.state.scale){
            this.setState({
            scale: newScale 
            });
        }
        
    }

    getStyle(){
        return {
            transform: sprintf('scale(%s, 1)', this.state.scale)
        };
    }

    render(){
        return(
            <div 
                ref="maxSizeContainer"
                className={this.props.className}>
                <span className="full-size-content" ref="fullSizeContent"></span>
                <ResizableInput
                    containerClassName='autoscaling-content'
                    ref={(input) => this.autoscalingInputRef = input} 
                    type="text" 
                    placeholder={this.props.placeholder}
                    value={this.props.value} 
                    containerStyle={this.getStyle()}
                    onChange={(event) => this.updateInput(event)}
                    onFocus={this.props.onFocus ? (event) => this.props.onFocus(event) : (event) => {}}
                    onBlur={this.props.onBlur ? (event) => this.props.onBlur(event) : (event) => {}}
                />
            </div>
        )    
    }
}

export {AutoscalingInput};