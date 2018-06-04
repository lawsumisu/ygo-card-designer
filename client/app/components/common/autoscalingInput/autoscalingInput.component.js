import React from 'react';
import $ from 'jquery';
import {ResizableInput} from 'client/app/components/common/resizableInput/ResizableInput';
import styles from 'client/app/components/common/autoscalingInput/autoscalingInput.scss';
import classNames from 'classnames'


/**
 * An <input/> like component that horizontally scales text so that it does not overflow the input.
 */
class AutoscalingInput extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isFocused: false,
            isHovered: false,
            scaleX: 1
        }

        // setTimeout(() =>this.updateScale());
    }

    componentDidMount(){
        setTimeout(() => this.updateScale(),0);
    }

    updateScale(newText){
         // Update the full size content DOM element here rather in render() so that we can get the new size of that element immediately
        // without having to wait for a full rerender.
        $(this.fullSizeContent).text(this.props.value);
        const scale =  Math.min($(this.refs.maxSizeContainer).width()/$(this.fullSizeContent).width(), 1) || 1;
        this.setState({
            scaleX: scale
        });
    }
    
    updateInput(event){
        this.props.onChange(event);
        this.setState({}, this.updateScale); 
    }

    handleOnMouseEnter(){
        this.setState({
            isHovered:true
        });
    }

    handleOnMouseLeave(){
        this.setState({
            isHovered: false
        });
    }

    handleInputOnFocus(event){
        this.setState({
            isFocused: true
        });
        if (this.props.onFocus){
            this.props.onFocus(event);
        }
    }

    handleInputOnBlur(event){
        this.setState({
            isFocused: false
        });
        if (this.props.onBlur){
            this.props.onBlur(event);
        }
    }

    getScaleTransform(){
        return `scale(${this.state.scaleX}, 1)`;
    }
    
    getInputContainerClassNames(){
        let containerClassNames = ['autoscaling-content'];
        if (this.state.isFocused || this.state.isHovered){
            containerClassNames.push('autoscaling-content--visible');
        }
        return classNames(containerClassNames);
    }

    renderDisplayText(){
        return null;
    }
    
    render(){
        const style = {
            transform: this.getScaleTransform()
        };
        return(
            <div
                ref="maxSizeContainer"
                className={classNames(this.props.className, 'autoscaling-input--container')}
                onMouseEnter={(event) => this.handleOnMouseEnter()}
                onMouseLeave={(event) => this.handleOnMouseLeave()}>
                <span className="full-size-content" ref={(element) => this.fullSizeContent = element}></span>
                {!this.state.isFocused && !this.state.isHovered ? this.renderDisplayText() : null}
                <ResizableInput
                    containerClassName={this.getInputContainerClassNames()}
                    containerStyle={style}
                    type="text" 
                    placeholder={this.props.placeholder}
                    value={this.props.value} 
                    onChange={(event) => this.updateInput(event)}
                    onFocus={(event) => this.handleInputOnFocus(event)}
                    onBlur={(event) => this.handleInputOnBlur(event)}
                />
            </div>
        )    
    }
}

export {AutoscalingInput};