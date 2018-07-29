import React from 'react';
import $ from 'jquery';
import _ from 'lodash';
import 'client/app/components/common/autoscalingTextarea/autoscalingTextarea.scss';


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
        return (this.props.minFontSize || 0) * parseFloat($(this.mainContainer).css('font-size'));
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
        let currentFontSize = parseFloat(autoscalingContentElement.css('font-size'));
        const lineHeight = parseFloat($(this.mainContainer).css('line-height'));
        const originalFontSize = parseFloat($(this.mainContainer).css('font-size'));
        let minFontSize = this.getMinFontSize();
        let maxFontSize = this.props.maxFontSize * originalFontSize;

        // Initialize DOM size-related variables
        const maxHeight = autoscalingContentElement.height();
        fontSizeFullContentElement.show();      
        let contentHeight = fontSizeFullContentElement.height();
        // console.log('Max Height:', maxHeight, 'Current Height', contentHeight, 'Font Size:', currentFontSize);

        let lastFittingFontSize = 0;   
        let c = 0;   
        while(true){
            // c++;
            if (contentHeight > maxHeight){
                if (currentFontSize / minFontSize <= 1.01 || currentFontSize - lastFittingFontSize <= 1){
                    // End loop if reached minimum font size or if it is at most 1px away from the previous best fit. 
                    if (lastFittingFontSize === 0){
                        lastFittingFontSize = minFontSize;
                    }
                    break;
                }
                maxFontSize = currentFontSize;
                // Text is too big to fit in textarea, so need to shrink it.
                const newFontSize = (minFontSize + currentFontSize) / 2;
                var lineHeightScale = newFontSize / originalFontSize;
                currentFontSize = newFontSize;
                this.updateElementFont(fontSizeFullContentElement, lineHeightScale, lineHeightScale*lineHeight/originalFontSize);
                contentHeight = fontSizeFullContentElement.height();
            }
            else if (contentHeight <= maxHeight){
                if (currentFontSize >= maxFontSize){
                    lastFittingFontSize = maxFontSize;
                    break;
                }
                lastFittingFontSize = currentFontSize;
                minFontSize = currentFontSize;
          
                // Text is too small to fit in textarea, so need to grow it.
                const newFontSizeBS = (maxFontSize + currentFontSize) / 2; //new potential font size from binary search
                const newFontSizeLS = Math.min(maxFontSize, currentFontSize + 1); // New potential font size from linear search (useful when increment of 1 causes overflow)
                const lineHeightScaleBS = newFontSizeBS / originalFontSize;
                const lineHeightScaleLS = newFontSizeLS / originalFontSize;
                // Try the default binary search.
                this.updateElementFont(fontSizeFullContentElement, lineHeightScaleBS, lineHeightScaleBS*lineHeight/originalFontSize);
                contentHeight = fontSizeFullContentElement.height();
                currentFontSize = newFontSizeBS;
                
                // Now try the linear search.
                this.updateElementFont(fontSizeFullContentElement, lineHeightScaleLS, lineHeightScaleLS*lineHeight/originalFontSize);
                if (fontSizeFullContentElement.height() > maxHeight){
                    // If the linear search resulted in overflow, then use this new font size, as it is closer to the goal font size.
                    contentHeight = fontSizeFullContentElement.height();
                    currentFontSize = newFontSizeLS;
                }
            }
        }
        fontSizeFullContentElement.hide();
        const finalLineHeightScale = lastFittingFontSize / originalFontSize;
        _.forEach([fontScalingFullContentElement, fontSizeFullContentElement, autoscalingContentElement], (element) => {
            this.updateElementFont(element, lastFittingFontSize/originalFontSize, finalLineHeightScale*lineHeight/originalFontSize);
        })
    }


    updateFontSpacing(){
        let autoscalingContentElement = $(this.refs.autoscalingContent);
        let fullContentElement = $(this.refs.fullContent);
        console.log(Math.abs(this.getFontSizeFullContentElementFontSize() / this.getMinFontSize()));
        if(_.isEmpty(autoscalingContentElement) || _.isEmpty(fullContentElement) || 
        Math.abs(this.getFontSizeFullContentElementFontSize() / this.getMinFontSize()) > 1.01){
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

        // if (this.state.cachedMaxHeight === maxHeight && currentHeight < maxHeight){
        //     console.log('cached', this.state.cachedMaxHeight, currentHeight);
        //     fullContentElement.hide();
        //     return;
        // }

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
        autoscalingContentElement.css('transform', `scale(${updatedScale},1)`);

        // Cache max height to allow shortcutting this logic when small changes are made.
        if (maxHeight !== this.state.cachedMaxHeight){
            this.setState({
                cachedMaxHeight: maxHeight,
            });
        }
    }

    updateElementFont(element, fontSize, lineHeight){
        element.css('font-size', `${fontSize}em`).css('line-height', `${lineHeight}em`);      
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