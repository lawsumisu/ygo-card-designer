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

    setInlineTransformCss(element, transform){
        let css = {}
        _.forEach(['transform', 'msTransform', 'moz-transform', 'WebkitTransform'], (operator) => {
            element.style[operator] = transform;
            // css[operator] = transform;
        });
        // $(element).css(css);
    }

    scaleInput(){
        $(this.refs.fullSizeContent).text($(this.autoscalingInputRef.refs.content).val()); 
        const newScale = Math.min($(this.refs.maxSizeContainer).width()/$(this.refs.fullSizeContent).width(), 1);
        this.setInlineTransformCss(this.resizableInputDOMElement, sprintf('scale(%s, 1)', newScale));
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
                    DOMElementRef={(element) => this.resizableInputDOMElement = element}
                    type="text" 
                    placeholder={this.props.placeholder}
                    value={this.props.value} 
                    onChange={(event) => this.updateInput(event)}
                    onFocus={this.props.onFocus ? (event) => this.props.onFocus(event) : (event) => {}}
                    onBlur={this.props.onBlur ? (event) => this.props.onBlur(event) : (event) => {}}
                />
            </div>
        )    
    }
}

export {AutoscalingInput};