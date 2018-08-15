import * as React from 'react';
import { AutoscalingTextareaDisplay } from 'client/app/components/cards/cardDisplay/components/autoscalingTextareaDisplay/autoscalingTextareaDisplay.component';
import 'client/app/components/cards/cardDisplay/components/pendulumInfoDisplay/pendulumInfoDisplay.scss';

interface PendulumInfoDisplayProps {
  leftPendulumScale: number;
  rightPendulumScale: number;
  pendulumEffect: string;
}

export class PendulumInfoDisplay extends React.Component<PendulumInfoDisplayProps> {
  public render(): React.ReactNode {
    return (
      <div className='ygo-card-pendulum-container'>
        <div className='ygo-card-pendulum-scale'>
          <div className='pendulum-info-display--scale'>{this.props.leftPendulumScale}</div>
        </div>
        <AutoscalingTextareaDisplay
          className='ygo-card-pendulum-effect'
          minEmFontSize={.8} 
          maxEmFontSize={1} 
          value={this.props.pendulumEffect}
        />
        <div className='ygo-card-pendulum-scale'>
          <div className='pendulum-info-display--scale'>{this.props.rightPendulumScale}</div>
        </div>
      </div>
    )
  }
}