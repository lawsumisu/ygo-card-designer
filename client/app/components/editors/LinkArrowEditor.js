import React from 'react';
import _ from 'lodash';
import $ from 'jquery';

import cornerLinkArrow from 'client/app/assets/Series 10/Link/CornerLinkArrow2.png';
import cornerLinkArrowHovered from 'client/app/assets/Series 10/Link/CornerLinkArrowHovered.png';
import middleLinkArrow from 'client/app/assets/Series 10/Link/MiddleLinkArrow.png';
import middleLinkArrowHovered from 'client/app/assets/Series 10/Link/MiddleLinkArrowHovered.png';

class LinkArrowEditor extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {};
        for (let i=0; i<8; ++i){
            this.state[`arrow${i}IsHovered`] = false;
        }
    }

    getLinkArrowClassNames(arrowType, linkIndex){
        const classNamePrefix = `card--link-arrow-${arrowType}`;
        let classNames = [classNamePrefix];
        if (this.props.linkArrows[linkIndex]){
            classNames.push(`${classNamePrefix}--selected`);
        }
        return classNames.join(' ');
    }

    handleOnClickLinkArrow(linkIndex){
        this.props.updateLinkArrow(!this.props.linkArrows[linkIndex], linkIndex);
    }

    render(){
        const cardWidth = 590;
        const cardHeight = 860;
        const offsetX = 4.0/59 * cardWidth;
        const offsetY = 56.9/86 * cardHeight;
        const imgLength = 44.2/59 * cardWidth;
        const middleImgLength = 48.2/59 * cardWidth;
        const middleOffsetX = 5.3/59 * cardWidth;
        const middleOffsetY = 62.2/86 * cardHeight; 
        return (
            <div className="card--link-arrow--container">
                {_.map([0,2,4,6], (linkIndex, i) => {
                    const x = i % 2;
                    const y = Math.floor(i/2);
                    const sx = -2*x + 1;
                    const sy = -2*y + 1
                    const style = {
                        left: `${x*imgLength + offsetX}px`,
                        top: `${(y*-imgLength) + offsetY}px`,
                        transform: `scale(${sx}, ${sy})`
                    }
                    return (
                        <div 
                            style={style} 
                            key={`${i}-corner`} 
                            onClick={(event) => this.handleOnClickLinkArrow(linkIndex)}
                            className={this.getLinkArrowClassNames('corner', linkIndex)} 
                        ></div>
                    );
                })}
                {_.map([1,3,5,7], (linkIndex, i) => {
                    const x = i % 2;
                    const y = Math.floor(i/2);
                    const inset = (2*y-1)*.5;
                    const insetX = x === 1 ? inset+.5 : .5;
                    const insetY = x === 0 ? inset+.5 : .5;
                    const centerOffset = -65;
                    const middleStyle = {
                        left: `${insetX*middleImgLength + middleOffsetX + centerOffset}px`,
                        top: `${(insetY*-middleImgLength) + middleOffsetY + centerOffset}px`,
                        transform: `rotate(${90*i}deg)`
                    }
                    return (
                        <div 
                            style={middleStyle} 
                            key={`${i}-middle`} 
                            onClick={(event) => this.handleOnClickLinkArrow(linkIndex)}
                            className={this.getLinkArrowClassNames('middle', linkIndex)} 
                        ></div>
                    );
                })}              
            </div>
        )
    }
}

export {LinkArrowEditor};