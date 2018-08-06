import * as React from 'react';
import * as classNames from 'classnames';
import * as _ from 'lodash';
import 'client/app/components/common/autoscalingTextDisplay/autoscalingTextDisplay.scss';

interface AutoscalingTextDisplayProps {
  className?: string;
  text: string;
}

export class AutoscalingTextDisplay extends React.Component<AutoscalingTextDisplayProps> {
  public fullContent: HTMLDivElement | null;
  public actualContent: HTMLDivElement | null;

  public componentDidMount(): void {
    // Do a manual refresh now that the refs should be initialized
    this.setState({});
  }
  public render(): React.ReactNode {
    const style = {
      transform: `scale(${this.getScale()}, 1)`
    };

    return (
      <div
        className={classNames('autoscaling-text-display--container', this.props.className)}
      >
        <div ref={(element) => this.fullContent = element}/>
        <div
          className='autoscaling-text-display--text'
          ref={(element) => this.actualContent = element}
          style={style}
        >{this.props.text}</div>
      </div>
    )
  }

  private getScale(): number {
    if (_.isNil(this.fullContent) || _.isNil(this.actualContent)){
      return 1;
    }
    else{
      return Math.min(this.fullContent.clientWidth / this.actualContent.clientWidth, 1);
    }
  }
}