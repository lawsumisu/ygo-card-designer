import * as React from 'react';
import * as _ from 'lodash';
import * as $ from 'jquery';
import {
  AutoscalingLineElement,
  AutoscalingLineElementState
} from 'client/app/components/cards/cardDisplay/components/AutoscalingLineElement';
import { Rarities } from 'client/app/constants';
import * as classNames from 'classnames';
import 'client/app/components/cards/cardDisplay/components/nameDisplay/nameDisplay.scss';

interface RareNameDisplayProps {
  name: string;
  rarity: Rarities;
  scaleX: number;
}

class RareNameDisplay extends React.PureComponent<RareNameDisplayProps>{
  public render(): React.ReactNode {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='name-display--text--rare'
      >
        <defs>
          <linearGradient
            id='gold' x1='0' x2='.2' y1='0' y2='1'>
            <stop  offset='0%' stopColor='#daa520' stopOpacity='1' />
            <stop  offset='100%' stopColor='#402400' stopOpacity='1' />
          </linearGradient>
          <linearGradient
            id='silver' x1='0' x2='1' y1='0' y2='1'>
            <stop  offset='0%' stopColor='#999999' stopOpacity='1' />
            <stop  offset='100%' stopColor='#222222' stopOpacity='1' />
          </linearGradient>
          <filter id='rarity' x='0' y='0' width='100%' height='100%'>
            // Convolution matrix to get the edges of the text
            <feConvolveMatrix
              in='SourceGraphic'
              kernelMatrix='0 -1 0 -1 4 -1 0 -1 0'
              result='convolution1'/>
            <feGaussianBlur in='convolution1' result='blur1' stdDeviation='1'/>
            // Specular Lighting to create the shiny foil effect
            <feSpecularLighting in='blur1' surfaceScale='5' specularConstant='5.2' specularExponent='55' result='specOut1' lightingColor='white'>
              <feDistantLight azimuth='90' elevation='1' />
            </feSpecularLighting>
            <feOffset in='specOut1' dx='0' dy='-1' result='offset1'/>
            <feSpecularLighting in='blur1' surfaceScale='3' specularConstant='2.2' specularExponent='30' result='specOut2' lightingColor='white'>
              <feDistantLight azimuth='235' elevation='1' />
            </feSpecularLighting>
            <feMerge result='merge1'>
              <feMergeNode in='offset1'/>
              <feMergeNode in='specOut2'/>
            </feMerge>

            <feGaussianBlur in='merge1' result='blur2' stdDeviation='1'/>
            <feComposite in='blur2' in2='SourceGraphic' result='composite1' operator='arithmetic' k1='3' k2='.5' k3='1'/>
          </filter>
        </defs>
        <text
          y='1'
          x='-1'
          transform={`scale(${this.props.scaleX}, 1)`}
          filter={this.getFilter()}
          fill={this.getTextFill()}
        >{this.props.name}</text>
      </svg>
    )
  }

  private getTextFill() {
    if (this.props.rarity === Rarities.RARE) {
      return 'url(#silver)';
    }
    else if (_.includes([Rarities.ULTRA_RARE], this.props.rarity)) {
      return 'url(#gold)';
    }
    else {
      return 'black';
    }
  }

  private getFilter(): string | undefined {
    if (_.includes([Rarities.RARE, Rarities.ULTRA_RARE], this.props.rarity)) {
      return 'url(#rarity)';
    }
  }
}

interface NameDisplayProps {
  name: string;
  rarity: Rarities;
}

interface NameDisplayState extends AutoscalingLineElementState {
  scale: number;
}

export class NameDisplay extends AutoscalingLineElement<NameDisplayProps, NameDisplayState> {
  public state: NameDisplayState = {
    scale: 1,
  };
  
  public render(): React.ReactNode {
    const style = {
      transform: `scale(${this.state.scale}, 1)`
    };
    return (
      <div
        className={classNames('name-display--container', 'ygo-card-name')}
      >
        <div ref={(element) => this.fullContent = element}/>
        {this.showRareNameDisplay() ?
          <RareNameDisplay name={this.props.name} rarity={this.props.rarity} scaleX={this.state.scale}/> : null
        }
        <div
          className={classNames('name-display--text', this.showRareNameDisplay() ? 'name-display--text--hidden' : null)}
          ref={(element) => this.actualContent = element}
          style={style}
        >{this.props.name}</div>
      </div>
    )
  }

  private showRareNameDisplay(): boolean {
    return this.props.rarity !== Rarities.COMMON;
  }
}