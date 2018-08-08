import * as React from 'react';
import * as _ from "lodash";

export interface AutoscalingLineElementState {
  scale: number;
}

/**
 * Helper Component that maintains the ratio of widths for two elements as part of its state.
 * The two elements are as follows:
 *  fullContent: an Element whose width is the desired max length of this component
 *  actualContent: an Element that represents the currently rendered content
 * The intended use of this component is to calculate a horizontal scaling factor that allows the "actualContent"
 * to shrink as its length becomes longer than the "fullContent."
 */
export abstract class AutoscalingLineElement<TProps, TState extends AutoscalingLineElementState>
  extends React.Component<TProps, TState> {

  protected fullContent: HTMLDivElement | null;
  protected actualContent: HTMLDivElement | null;

  public componentDidMount(){
    this.setState({});
  }

  public componentDidUpdate(){
    const scale = this.getScale();
    if (this.state.scale !== scale){
      this.setState({
        scale
      });
    }
  }

  protected getScale(): number {
    if (_.isNil(this.fullContent) || _.isNil(this.actualContent)){
      return 1;
    }
    else{
      return Math.min(this.fullContent.clientWidth / this.actualContent.clientWidth, 1);
    }
  }
}