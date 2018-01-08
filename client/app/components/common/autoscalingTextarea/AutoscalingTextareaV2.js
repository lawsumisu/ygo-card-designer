import React from 'react';
import $ from 'jquery';
import _ from 'lodash';
import {sprintf} from 'sprintf-js';
import 'client/app/components/common/autoscalingTextarea/AutoscalingTextarea.scss';


/**
 * A <textarea/> like component that can be used to auto-resize font when inputted text would cause it to overflow/scrolll.
 */
class AutoscalingTextareaV2 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            horizontalScale: 1
        };
    }

    componentDidMount(){
        // this.autoscale();
    }

    componentDidUpdate(){
        this.autoscale();
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

    autoscale(){
        let autoscalingContentElement = $(this.refs.autoscalingContent);
        let fullContentElement = $(this.refs.fullContent);
        if(_.isEmpty(autoscalingContentElement) || _.isEmpty(fullContentElement)){
            return;
        }

        fullContentElement.show();
        let initialWidth = fullContentElement.width()
        const actualWidth = autoscalingContentElement.width() * this.state.horizontalScale;
        let totalSizeChange = 0;
        // console.log(initialWidth, actualWidth, Math.abs(initialWidth - actualWidth));
        // if (Math.abs(initialWidth - actualWidth) < .004){
        //     fullContentElement.width(autoscalingContentElement.width());
        //     initialWidth = autoscalingContentElement.width();
        //     totalSizeChange = initialWidth - actualWidth;
        //     console.log('Starting from cached values:', initialWidth, totalSizeChange);
        // }
        let currentWidth = initialWidth;
        let currentHeight = fullContentElement.height();
        const maxHeight = autoscalingContentElement.height();
        const lineHeight = parseFloat(fullContentElement.css('lineHeight'));
        let c = 0
        let minWidth = initialWidth;
        let maxWidth = currentWidth * 5;
        console.log(totalSizeChange);

        if (currentHeight < maxHeight){
            fullContentElement.hide();
            return;
        }

        while (currentHeight !== maxHeight){
            if (currentHeight < maxHeight){
                //Overshot the width, so need to shrink it.
                maxWidth = currentWidth;
                currentWidth = (currentWidth + minWidth)/2;
                totalSizeChange += (currentWidth - maxWidth);
                if (Math.abs((currentWidth - maxWidth)/totalSizeChange) < .01){
                    //This shrink will only decrease the current width by less than 1%, so we can stop.
                    currentWidth = maxWidth;
                    break;
                }
                console.log('Shrinking:', currentWidth - maxWidth, 'Total Size Change: ', totalSizeChange,(currentWidth - maxWidth)/totalSizeChange);
            }
            else if (currentHeight > maxHeight){
                //Undershot the width, so need to grow it.      
                minWidth = currentWidth;
                currentWidth = (currentWidth + maxWidth)/2;
                totalSizeChange += (currentWidth - minWidth);
                console.log('Growing:', currentWidth - minWidth, 'Total Size Change: ', totalSizeChange,(currentWidth - minWidth)/totalSizeChange);
            }
            
            fullContentElement.width(currentWidth);
            currentHeight = fullContentElement.height();
            // console.log(currentHeight - oldHeight, currentHeight, oldHeight);
            // if (oldHeight < maxHeight && currentHeight > maxHeight && currentHeight - oldHeight < lineHeight){
            //     console.log(oldHeight, currentHeight, minWidth, maxWidth, currentWidth);
            //     // currentWidth = minWidth;
            //     break;
            // }
            c += 1;
        }
        console.log('# Iterations:', c);
        const updatedScale = Math.min(initialWidth/currentWidth,1);
        fullContentElement.css('width', '');
        autoscalingContentElement.width(currentWidth);
        fullContentElement.hide();
        if (updatedScale !== this.state.horizontalScale){
            this.setState({
                horizontalScale: updatedScale
            });
        }

    }

    getStyle(){
        return {
            transform: sprintf('scale(%s, 1)', this.state.horizontalScale)
        };
    }

    render(){
        return (
            <div
                className={this.props.className}
                style={this.props.style}>
                <div className="full-content" ref="fullContent">{this.props.value}</div>
                <textarea
                    style={this.getStyle()}
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

export {AutoscalingTextareaV2};