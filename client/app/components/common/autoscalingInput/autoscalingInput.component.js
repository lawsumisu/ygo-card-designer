import React from 'react';
import $ from 'jquery';
import * as _ from 'lodash';
import {ResizableInput} from 'client/app/components/common/resizableInput/resizableInput.component';
import 'client/app/components/common/autoscalingInput/autoscalingInput.scss';
import classNames from 'classnames'


/**
 * An <input/> like component that horizontally scales text so that it does not overflow the input.
 */
export class AutoscalingInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
      scaleX: 1
    }
  }

  componentDidMount() {
    setTimeout(() => this.updateScale(), 0);
  }

  updateScale() {
    const oldText = $(this.fullSizeContent).text();
    if (this.props.value.length > oldText.length || this.state.scaleX < 1) {
      // Update the full size content DOM element here rather in render() so that we can get the new size of that element immediately
      // without having to wait for a full rerender.
      $(this.fullSizeContent).text(this.props.value);
      const scale = Math.min($(this.refs.maxSizeContainer).width() / $(this.fullSizeContent).width(), 1) || 1;
      this.setState({
        scaleX: scale
      });
    }
  }

  updateInput(event) {
    this.props.onChange(event);
    this.setState({}, this.updateScale);
  }

  handleInputOnFocus(event) {
    this.setState({
      isFocused: true
    });
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

  handleInputOnBlur(event) {
    this.setState({
      isFocused: false
    });
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  }

  getScaleTransform() {
    return `scale(${this.state.scaleX}, 1)`;
  }

  getInputContainerClassNames() {
    const renderedDisplayText = this.renderDisplayText();
    let containerClassNames = ['autoscaling-content'];
    if (this.state.isFocused || _.isNil(renderedDisplayText)) {
      containerClassNames.push('autoscaling-content--visible');
    }
    return classNames(containerClassNames);
  }

  renderDisplayText() {
    return null;
  }

  render() {
    const style = {
      transform: this.getScaleTransform()
    };
    return (
      <div
        ref="maxSizeContainer"
        className={classNames(this.props.className, 'autoscaling-input--container')}
      >
        <span className="full-size-content" ref={(element) => this.fullSizeContent = element}></span>
        <div className="display-text--container">
          {!this.state.isFocused ? this.renderDisplayText() : null}
        </div>
        <ResizableInput
          containerClassName={this.getInputContainerClassNames()}
          containerStyle={style}
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