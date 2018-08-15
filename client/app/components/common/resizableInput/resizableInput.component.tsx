import React from 'react';
import $ from 'jquery';
import _ from 'lodash';
import 'client/app/components/common/resizableInput/resizableInput.scss';

interface ResizableInputProps {
  className?: string;
  containerClassName?: string;
  containerStyle?: any;
  style?: any;
  placeholder?: string;
  onChange: (event: any) => void;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
  onKeyDown?: (event: any) => void;
  value: string;
}

/**
 * An <input/> like component that grows as text is added.
 */
export class ResizableInput extends React.Component<ResizableInputProps> {
  private hiddenContent: HTMLSpanElement | null;
  private actualContent: HTMLInputElement | null;

  public componentDidMount() {
    // On initial load in chrome, this element's width can still be in flux. Do the rescaling after a delay to guarantee all DOM elements have the correct width.
    setTimeout(() => this.resizeInput(), 1);
  }

  public componentDidUpdate() {
    this.resizeInput();
  }

  private getClassName(): string {
    var className = "resizable-input-content"
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return className;
  }

  private getMainContainerClassNames(): string {
    let classNames = ['resizable-input-container'];
    if (this.props.containerClassName) {
      classNames.push(this.props.containerClassName);
    }
    return classNames.join(' ');
  }

  private updateInput(event) {
    this.props.onChange(event);
  }

  private resizeInput() {
    if (this.hiddenContent && this.actualContent){
      const hiddenContentElement = $(this.hiddenContent);
      const resizingContentElement = $(this.actualContent);
      if (resizingContentElement.is(':visible')) {
        // Only want to resize the text box if it is visible, otherwise the width can be erroneously set to 0.
        hiddenContentElement.show();
        resizingContentElement.width(this.hiddenContent.offsetWidth);
        hiddenContentElement.hide();
      }
    }
  }

  public render(): React.ReactNode {
    return (
      <div
        className={this.getMainContainerClassNames()}
        style={this.props.containerStyle}
      >
        <span
          className="resizable-input-hidden-content"
          ref={(element) => this.hiddenContent = element}
        >
          {this.props.value}
        </span>
        <input
          className={this.getClassName()}
          ref={(element) => this.actualContent = element}
          type="text"
          placeholder={this.props.placeholder}
          value={this.props.value}
          style={this.props.style}
          onChange={(event) => this.updateInput(event)}
          onKeyDown={this.props.onKeyDown ? (event) => this.props.onKeyDown!(event) : () => {}}
          onFocus={this.props.onFocus ? (event) => this.props.onFocus!(event) : () => {}}
          onBlur={this.props.onBlur ? (event) => this.props.onBlur!(event) : () => {}}/>
      </div>
    )
  }
}