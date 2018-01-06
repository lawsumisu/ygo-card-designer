import React from 'react';
import $ from 'jquery';
import _ from 'lodash';
import styles from 'client/app/components/common/autoscalingTextarea/AutoscalingTextarea.scss';


/**
 * A <textarea/> like component that can be used to auto-resize font when inputted text would cause it to overflow/scrolll.
 */
class AutoscalingTextarea extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.updateScale();
    }

    componentDidUpdate(){
        this.updateScale();
    }

    handleOnFocus(event){
        if (this.props.onFocus) this.props.onFocus(event);
    }

    handleOnBlur(event){
        if (this.props.onBlur) this.props.onBlur(event);
    }

    handleOnChange(event){
        this.props.onChange(event);
    }

    /**
     * Updates the font size of the textarea and full-content divs such that the text fits within these elements without overflowing.
     */
    updateScale(){
        var autoscalingContentElement = $(this.refs.autoscalingContent);
        var fullContentElement = $(this.refs.fullContent);
        if(_.isEmpty(autoscalingContentElement) || _.isEmpty(fullContentElement)){
            return;
        }
        var minFontSize = this.props.minFontSize || 1;
        var maxFontSize = this.props.maxFontSize || 40;
        var currentFontSizeStr = autoscalingContentElement.css('font-size');
        var initialFontSize = parseFloat(currentFontSizeStr);
        var currentFontSize = initialFontSize;
        var unit = currentFontSizeStr.replace(currentFontSize, '');
        var lineHeightStr = autoscalingContentElement.css('line-height');
        var lineHeight = parseFloat(lineHeightStr);
        var lineHeightUnit = lineHeightStr.replace(lineHeight, '');

        var maxHeight = autoscalingContentElement.height();
        fullContentElement.show();
        var contentHeight = fullContentElement.height();

        var lastFittingFontSize;      
        while(true){
            if (contentHeight > maxHeight){
                if (currentFontSize == minFontSize || lastFittingFontSize == currentFontSize -1){
                    if (!lastFittingFontSize){
                        lastFittingFontSize = currentFontSize;
                    }
                    break;
                }
                maxFontSize = currentFontSize;
                // Text is too big to fit in textarea, so need to shrink it.
                var newFontSize = Math.floor((minFontSize + currentFontSize) / 2);
                var lineHeightScale = newFontSize / initialFontSize;
                currentFontSize = newFontSize;
                fullContentElement.css('font-size', currentFontSize + unit);
                fullContentElement.css('line-height', (lineHeight*lineHeightScale) + lineHeightUnit);
                contentHeight = fullContentElement.height();
            }
            else if (contentHeight <= maxHeight){
                if (currentFontSize == maxFontSize){
                    break;
                }
                lastFittingFontSize = currentFontSize;
                minFontSize = currentFontSize;
                // Text is too small to fit in textarea, so need to grow it.
                var newFontSizeBS = Math.ceil((maxFontSize + currentFontSize) / 2); //new potential font size from binary search
                var newFontSizeLS = Math.min(maxFontSize, currentFontSize + 1); // New potential font size from linear search (useful when increment of 1 causes overflow)
                var lineHeightScaleBS = newFontSizeBS / initialFontSize;
                var lineHeightScaleLS = newFontSizeLS / initialFontSize;
                // Try the default binary search.
                fullContentElement.css('font-size', newFontSizeBS + unit);
                fullContentElement.css('line-height', (lineHeight*lineHeightScaleBS) + lineHeightUnit);
                contentHeight = fullContentElement.height();
                currentFontSize = newFontSizeBS;
                
                // Now try the linear search.
                fullContentElement.css('font-size', newFontSizeLS + unit); 
                fullContentElement.css('line-height', (lineHeight*lineHeightScaleLS) + lineHeightUnit);
                if (fullContentElement.height() > maxHeight){
                    // If the linear search resulted in overflow, then use this new font size, as it is closer to the goal font size.
                    contentHeight = fullContentElement.height();
                    currentFontSize = newFontSizeLS;
                }
            }
        }
        fullContentElement.hide();
        var lineHeightScale = lastFittingFontSize / initialFontSize;
        fullContentElement.css('font-size', lastFittingFontSize + unit);
        fullContentElement.css('line-height', (lineHeight*(lineHeightScale)) + lineHeightUnit);
        autoscalingContentElement.css('font-size', lastFittingFontSize + unit);
        autoscalingContentElement.css('line-height', (lineHeight*lineHeightScale) + lineHeightUnit);
    }

    render(){
        return (
            <div
                className={this.props.className}
                style={this.props.style}>
                <div className="full-content" ref="fullContent">{this.props.value}</div>
                <textarea
                    ref='autoscalingContent'
                    className="autoscaling-textarea-content"
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={(event) => this.handleOnChange(event)}
                    onFocus={(event) => this.handleOnFocus(event)}
                    onBlur={(event) => this.handleOnBlur(event)}/>
            </div>
        )
    }
}

export {AutoscalingTextarea};