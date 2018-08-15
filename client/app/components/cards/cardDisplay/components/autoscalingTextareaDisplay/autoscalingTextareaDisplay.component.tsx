import * as React from 'react';
import * as _ from 'lodash';
import classNames from 'classnames';
import $ from "jquery";
import 'client/app/components/cards/cardDisplay/components/autoscalingTextareaDisplay/autoscalingTextareaDisplay.scss';

interface AutoscalingTextareaDisplayProps {
  className?: string;
  minEmFontSize: number;
  maxEmFontSize: number;
  value: string;
}

export class AutoscalingTextareaDisplay extends React.Component<AutoscalingTextareaDisplayProps> {
  private fontSizeFullContent: HTMLDivElement | null;
  private fullContent: HTMLDivElement | null;
  private actualContent: HTMLDivElement | null;
  private mainContainer: HTMLDivElement | null;

  public componentDidUpdate(){
    this.updateFontSize();
    this.updateFontSpacing();
  }

  public componentDidMount(){
    this.setState({});
  }

  public render(): React.ReactNode {
    return (
      <div
        className={classNames(this.props.className)}
        ref={(element) => this.mainContainer = element}
      >
        <div
          className='textarea-display--hidden-content'
          ref={(element) => this.fullContent = element}
        >
          {this.props.value}
        </div>
        <div
          className='textarea-display--hidden-content'
          ref={(element) => this.fontSizeFullContent = element}
        >
          {this.props.value}
        </div>
        <div
          className={'textarea-display--content'}
          ref={(element) => this.actualContent = element}
        >
          {this.props.value}
        </div>
      </div>
    )
  }

  /**
   * Updates the font size of the textarea and full-content divs such that the text fits within these elements without overflowing.
   */
  private updateFontSize(): void{
    if (!_.isNil(this.actualContent) && !_.isNil(this.fullContent)
      && !_.isNil(this.fontSizeFullContent) && !_.isNil(this.mainContainer)){
      // Initialize DOM element references
      const autoscalingContentElement = $(this.actualContent);
      const fontSizeFullContentElement = $(this.fontSizeFullContent);
      const fontScalingFullContentElement = $(this.fullContent);
      const mainContainerElement = $(this.mainContainer);

      // Initialize fontSize-related variables
      let currentFontSize = parseFloat(autoscalingContentElement.css('font-size'));
      const lineHeight = parseFloat(mainContainerElement.css('line-height'));
      const originalFontSize = parseFloat(mainContainerElement.css('font-size'));
      let minFontSize = (this.props.minEmFontSize || 0) * originalFontSize;
      let maxFontSize = this.props.maxEmFontSize * originalFontSize;

      // Initialize DOM size-related variables
      const maxHeight = this.actualContent.clientHeight;
      fontSizeFullContentElement.show();
      let contentHeight = this.fontSizeFullContent.clientHeight;

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
          contentHeight = this.fontSizeFullContent.clientHeight;
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
          contentHeight = this.fontSizeFullContent.clientHeight;
          currentFontSize = newFontSizeBS;

          // Now try the linear search.
          this.updateElementFont(fontSizeFullContentElement, lineHeightScaleLS, lineHeightScaleLS*lineHeight/originalFontSize);
          if (this.fontSizeFullContent.clientHeight > maxHeight){
            // If the linear search resulted in overflow, then use this new font size, as it is closer to the goal font size.
            contentHeight = this.fontSizeFullContent.clientHeight;
            currentFontSize = newFontSizeLS;
          }
        }
      }
      fontSizeFullContentElement.hide();
      const finalLineHeightScale = lastFittingFontSize / originalFontSize;
      _.forEach([fontScalingFullContentElement, fontSizeFullContentElement, autoscalingContentElement],
        (element) => {
        this.updateElementFont(element, lastFittingFontSize/originalFontSize, finalLineHeightScale*lineHeight/originalFontSize);
      });
    }
  }

  private updateFontSpacing(){
    if (!_.isNil(this.actualContent) && !_.isNil(this.fullContent)
      && !_.isNil(this.mainContainer) && !_.isNil(this.fontSizeFullContent)){
      let autoscalingContentElement = $(this.actualContent);
      let fullContentElement = $(this.fullContent);
      const originalFontSize = parseFloat($(this.mainContainer).css('font-size'));
      const minFontSize = (this.props.minEmFontSize || 0) * originalFontSize;
      const currentFontSize = parseFloat($(this.fontSizeFullContent).css('font-size'));
      if(Math.abs(currentFontSize / minFontSize) > 1.01){
        autoscalingContentElement.css('width', '');
        autoscalingContentElement.css('transform', '');
        return;
      }

      const maxHeight = this.actualContent.clientHeight;
      fullContentElement.show();
      const initialWidth = this.fullContent.clientWidth;
      let currentWidth = initialWidth;
      let currentHeight = this.fullContent.clientHeight;
      const lineHeight = parseFloat(fullContentElement.css('lineHeight'));
      let c = 0;
      let minWidth = initialWidth;
      let maxWidth = initialWidth * Math.floor(maxHeight/lineHeight);

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
        currentHeight = this.fullContent.clientHeight;
        c += 1;
      }
      // Reset fullContentElement css properties
      fullContentElement.css('width', '');
      fullContentElement.css('display', '');

      const updatedScale = Math.min(initialWidth/currentWidth,1);
      autoscalingContentElement.width(currentWidth);
      autoscalingContentElement.css('transform', `scale(${updatedScale},1)`);
    }
  }

  private updateElementFont(element, fontSize, lineHeight): void{
    element.css('font-size', `${fontSize}em`).css('line-height', `${lineHeight}em`);
  }
}