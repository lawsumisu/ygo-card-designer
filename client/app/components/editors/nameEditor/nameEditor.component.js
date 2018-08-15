import React from 'react';
import _ from 'lodash';
import {Rarities} from 'client/app/constants';
import {AutoscalingInput} from 'client/app/components/common/autoscalingInput/autoscalingInput.component';
import 'client/app/components/editors/nameEditor/nameEditor.scss';

export class NameEditor extends AutoscalingInput {
  getTextFill() {
    if (this.props.rarity === Rarities.RARE) {
      return "url(#silver)";
    }
    else if (_.includes([Rarities.ULTRA_RARE], this.props.rarity)) {
      return "url(#gold)";
    }
    else {
      return "black";
    }
  }

  getFilter() {
    if (_.includes([Rarities.RARE, Rarities.ULTRA_RARE], this.props.rarity)) {
      return "url(#rarity)";
    }
    else {
      return null;
    }
  }

  renderDisplayText() {
    if (this.props.rarity === Rarities.COMMON || this.props.value.length === 0) {
      return null;
    }
    else {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className='card-name--display'
        >
          <defs>
            <linearGradient
              id="gold" x1="0" x2=".2" y1="0" y2="1">
              <stop offset="0%" stopColor="#daa520" stopOpacity="1"/>
              <stop offset="100%" stopColor="#402400" stopOpacity="1"/>
            </linearGradient>
            <linearGradient
              id="silver" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#999999" stopOpacity="1"/>
              <stop offset="100%" stopColor="#222222" stopOpacity="1"/>
            </linearGradient>
            <filter id="rarity" x="0" y="0" width="100%" height="100%">
              // Convolution matrix to get the edges of the text
              <feConvolveMatrix
                in="SourceGraphic"
                kernelMatrix="0 -1 0 -1 4 -1 0 -1 0"
                result="convolution1"/>
              <feGaussianBlur in="convolution1" result="blur1" stdDeviation="1"/>
              // Specular Lighting to create the shiny foil effect
              <feSpecularLighting in="blur1" surfaceScale="5" specularConstant="5.2" specularExponent="55"
                                  result="specOut1" lightingColor="white">
                <feDistantLight azimuth="90" elevation="1"/>
              </feSpecularLighting>
              <feOffset in="specOut1" dx="0" dy="-1" result="offset1"/>
              <feSpecularLighting in="blur1" surfaceScale="3" specularConstant="2.2" specularExponent="30"
                                  result="specOut2" lightingColor="white">
                <feDistantLight azimuth="235" elevation="1"/>
              </feSpecularLighting>
              <feMerge result="merge1">
                <feMergeNode in="offset1"/>
                <feMergeNode in="specOut2"/>
              </feMerge>
              <feGaussianBlur in="merge1" result="blur2" stdDeviation="1"/>
              <feComposite in="blur2" in2="SourceGraphic" result="composite1" operator="arithmetic" k1="3" k2=".5"
                           k3="1"/>
            </filter>
          </defs>
          <text
            y="1"
            x="-1"
            transform={this.getScaleTransform()}
            filter={this.getFilter()}
            fill={this.getTextFill()}
          >{this.props.value}</text>
        </svg>
      );
    }
  }
}