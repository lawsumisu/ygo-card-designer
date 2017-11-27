import React from 'react';
import $ from 'jquery';
import {sprintf} from 'sprintf-js';
import {ResizableInput} from './ResizableInput';
import styles from '../../style/AutoscalingInput.scss';


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

    updateInput(event){
        this.props.onChange(event);
        this.scaleInput();
    }

    scaleInput(){
        $(this.refs.fullSizeContent).text($(this.autoscalingInputRef.refs.content).val()); 
        this.setState({
            scale: Math.min($(this.refs.maxSizeContainer).width()/$(this.refs.fullSizeContent).width(), 1)
        });
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
                />
            </div>
        )    
    }
}

export {AutoscalingInput};