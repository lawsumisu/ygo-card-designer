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
            horizontalScale: 1,
            cachedMaxHeight: 0
        };
    }

    componentDidMount(){
        // this.autoscale();
    }

    componentDidUpdate(){
        this.updateFontSize();
        this.updateFontSpacing();
    }

    getMinFontSize(){
        return this.props.minFontSize || 1;
    }

    getFontSizeFullContentElementFontSize(){
        return parseFloat($(this.fontSizeFullContent).css('font-size'));
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
    updateFontSize(){
        // Initialize DOM element references
        const autoscalingContentElement = $(this.refs.autoscalingContent);
        const fontSizeFullContentElement = $(this.fontSizeFullContent);
        const fontScalingFullContentElement = $(this.refs.fullContent);
        const mainContainerElement = $(this.mainContainer);
        if(_.isEmpty(autoscalingContentElement) || _.isEmpty(fontSizeFullContentElement) || _.isEmpty(fontScalingFullContentElement) || _.isEmpty(mainContainerElement)){
            return;
        }

        // Initialize fontSize-related variables
        let minFontSize = this.getMinFontSize();
        let maxFontSize = this.props.maxFontSize || 40;
        const currentFontSizeStr = autoscalingContentElement.css('font-size');
        let currentFontSize = parseFloat(currentFontSizeStr);
        const unit = currentFontSizeStr.replace(currentFontSize, '');
        const lineHeightStr = $(this.mainContainer).css('line-height');
        const lineHeight = parseFloat(lineHeightStr);
        const lineHeightUnit = lineHeightStr.replace(lineHeight, '');
        const originalFontSize = parseFloat($(this.mainContainer).css('font-size'));

        // Initialize DOM size-related variables
        const maxHeight = autoscalingContentElement.height();
        fontSizeFullContentElement.show();      
        let contentHeight = fontSizeFullContentElement.height();
        // console.log('Max Height:', maxHeight, 'Current Height', contentHeight);

        let lastFittingFontSize;      
        while(true){
            if (contentHeight > maxHeight){
                if (currentFontSize === minFontSize || lastFittingFontSize === currentFontSize -1){
                    // End loop if reached minimum font size or if it is 1 away from the previous best fit. 
                    if (!lastFittingFontSize){
                        lastFittingFontSize = currentFontSize;
                    }
                    break;
                }
                maxFontSize = currentFontSize;
                // Text is too big to fit in textarea, so need to shrink it.
                const newFontSize = Math.floor((minFontSize + currentFontSize) / 2);
                var lineHeightScale = newFontSize / originalFontSize;
                currentFontSize = newFontSize;
                fontSizeFullContentElement.css('font-size', currentFontSize + unit);
                fontSizeFullContentElement.css('line-height', (lineHeight*lineHeightScale) + lineHeightUnit);
                contentHeight = fontSizeFullContentElement.height();
            }
            else if (contentHeight <= maxHeight){
                if (currentFontSize === maxFontSize){
                    lastFittingFontSize = currentFontSize;
                    break;
                }
                lastFittingFontSize = currentFontSize;
                minFontSize = currentFontSize;
                // Text is too small to fit in textarea, so need to grow it.
                const newFontSizeBS = Math.ceil((maxFontSize + currentFontSize) / 2); //new potential font size from binary search
                const newFontSizeLS = Math.min(maxFontSize, currentFontSize + 1); // New potential font size from linear search (useful when increment of 1 causes overflow)
                const lineHeightScaleBS = newFontSizeBS / originalFontSize;
                const lineHeightScaleLS = newFontSizeLS / originalFontSize;
                // Try the default binary search.
                fontSizeFullContentElement.css('font-size', newFontSizeBS + unit);
                fontSizeFullContentElement.css('line-height', (lineHeight*lineHeightScaleBS) + lineHeightUnit);
                contentHeight = fontSizeFullContentElement.height();
                currentFontSize = newFontSizeBS;
                
                // Now try the linear search.
                fontSizeFullContentElement.css('font-size', newFontSizeLS + unit); 
                fontSizeFullContentElement.css('line-height', (lineHeight*lineHeightScaleLS) + lineHeightUnit);
                if (fontSizeFullContentElement.height() > maxHeight){
                    // If the linear search resulted in overflow, then use this new font size, as it is closer to the goal font size.
                    contentHeight = fontSizeFullContentElement.height();
                    currentFontSize = newFontSizeLS;
                }
            }
        }
        fontSizeFullContentElement.hide();
        var lineHeightScale = lastFittingFontSize / originalFontSize;
        fontSizeFullContentElement.css('font-size', lastFittingFontSize + unit);
        fontSizeFullContentElement.css('line-height', (lineHeight*(lineHeightScale)) + lineHeightUnit);
        fontScalingFullContentElement.css('font-size', lastFittingFontSize + unit);
        fontScalingFullContentElement.css('line-height', (lineHeight*(lineHeightScale)) + lineHeightUnit);
        autoscalingContentElement.css('font-size', lastFittingFontSize + unit);
        autoscalingContentElement.css('line-height', (lineHeight*lineHeightScale) + lineHeightUnit);
    }


    updateFontSpacing(){
        let autoscalingContentElement = $(this.refs.autoscalingContent);
        let fullContentElement = $(this.refs.fullContent);
        if(_.isEmpty(autoscalingContentElement) || _.isEmpty(fullContentElement) || this.getFontSizeFullContentElementFontSize() !== this.getMinFontSize()){
            if (!_.isEmpty(autoscalingContentElement)){
                autoscalingContentElement.css('width', '');
                autoscalingContentElement.css('transform', '');
            }
            return;
        }

        const maxHeight = autoscalingContentElement.height();
        fullContentElement.show();
        const initialWidth = fullContentElement.width()
        let currentWidth = initialWidth;
        let currentHeight = fullContentElement.height();     
        const lineHeight = parseFloat(fullContentElement.css('lineHeight'));
        let c = 0
        let minWidth = initialWidth;
        let maxWidth = initialWidth * Math.floor(maxHeight/lineHeight);

        if (this.state.cachedMaxHeight === maxHeight && currentHeight < maxHeight){
            fullContentElement.hide();
            return;
        }

        while (currentHeight !== maxHeight && c < 30){
            if (currentHeight < maxHeight){
                //Overshot the width, so need to shrink it.
                maxWidth = currentWidth;
                currentWidth = (currentWidth + minWidth)/2;
                const totalSizeChange = currentWidth - initialWidth;
                if (Math.abs((currentWidth - maxWidth)/totalSizeChange) < .01 || totalSizeChange === 0){
                    //This shrink will only decrease the current width by less than 1%, so we can stop.
                    currentWidth = maxWidth;
                    break;
                }
                // console.log('Shrinking:', currentWidth - maxWidth, 'Total Size Change: ', totalSizeChange,(currentWidth - maxWidth)/totalSizeChange);
            }
            else if (currentHeight > maxHeight){
                //Undershot the width, so need to grow it.      
                minWidth = currentWidth;
                currentWidth = (currentWidth + maxWidth)/2;
                const totalSizeChange = currentWidth - initialWidth;
                if (Math.abs((currentWidth - minWidth)/totalSizeChange) < .01 || totalSizeChange === 0){
                    //This shrink will only increase the current width by less than 1%, so we can stop.
                    currentWidth = maxWidth;
                    break;
                }
                // console.log('Growing:', currentWidth - minWidth, 'Total Size Change: ', totalSizeChange,(currentWidth - minWidth)/totalSizeChange);
            }
            
            fullContentElement.width(currentWidth);
            currentHeight = fullContentElement.height();
            c += 1;
        }
        // console.log('# Iterations:', c);
        // Reset fullContentElement css properties
        fullContentElement.css('width', '');
        fullContentElement.css('display', '');

        const updatedScale = Math.min(initialWidth/currentWidth,1);
        autoscalingContentElement.width(currentWidth);
        autoscalingContentElement.css('transform', sprintf('scale(%s, 1)', updatedScale));

        // Cache max height to allow shortcutting this logic when small changes are made.
        if (maxHeight !== this.state.cachedMaxHeight){
            this.setState({
                cachedMaxHeight: maxHeight,
            });
        }

    }

    render(){
        return (
            <div
                className={this.props.className}
                style={this.props.style}
                ref={(element) => this.mainContainer = element}>
                <div className="full-content" ref="fullContent">{this.props.value}</div>
                <div className="full-content" ref={(element) => this.fontSizeFullContent = element}>{this.props.value}</div>
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

export {AutoscalingTextareaV2};