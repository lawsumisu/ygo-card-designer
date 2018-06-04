import React from 'react';
import {AutoscalingInput} from 'client/app/components/common/autoscalingInput/autoscalingInput.component';

export class NameEditor extends AutoscalingInput{
    renderDisplayText(){
        return(
            <svg
                xmlns="http://www.w3.org/2000/svg"
                >
                <defs>
                    <linearGradient
                        id="gold" x1="0" x2=".2" y1="0" y2="1">
                        <stop  offset="0%" stopColor="gold" stopOpacity="1" />
                        <stop  offset="100%" stopColor="#604400" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient
                        id="silver" x1="0" x2="1" y1="0" y2="1">
                        <stop  offset="0%" stopColor="#dddddd" stopOpacity="1" />
                        <stop  offset="100%" stopColor="#444444" stopOpacity="1" />
                    </linearGradient>
                    <filter id="rarity" x="0" y="0" width="100%" height="100%">
                        // Convolution matrix to get the edges of the text
                        <feConvolveMatrix
                            in="SourceGraphic"
                            kernelMatrix="0 -1 0 -1 4 -1 0 -1 0"
                            result="convolution1"/>
                        <feGaussianBlur in="convolution1" result="blur1" stdDeviation="1"/>
                        // Specular Lighting to create the shiny foil effect
                        <feSpecularLighting in="blur1" surfaceScale="3" specularConstant="4.2" specularExponent="20" result="specOut" lightingColor="white">
                            <feDistantLight azimuth="336" elevation="1" />
                        </feSpecularLighting>
                        <feOffset in="specOut" dx="0" dy="0" result="offset1"/>
                        <feGaussianBlur in="offset1" result="blur2" stdDeviation="1"/>
                        <feComposite in="blur2" in2="SourceGraphic" result="composite1" operator="arithmetic" k1="3" k2=".5" k3="1"/>
                    </filter>
                </defs>    
                <text
                    y="3"
                    transform={this.getScaleTransform()}
                    filter="url(#rarity)" 
                    fill="url(#gold)" 
                    >{this.props.value}</text>
            </svg>
        )
    }
}