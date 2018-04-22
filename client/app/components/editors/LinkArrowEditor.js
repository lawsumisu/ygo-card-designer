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

    getArrowImg(index, arrowType){
        const key = `arrow${index}IsHovered`;
        if (arrowType === 'corner'){
            if (this.state[key]) return cornerLinkArrowHovered;
            else return cornerLinkArrow;
        }
        else if (arrowType === 'middle'){
            if (this.state[key]) return middleLinkArrowHovered;
            else return middleLinkArrow;
        }
    }

    handleOnMouseEnterArrow(index){
        const key = `arrow${index}IsHovered`;
        this.setState({
            [key]: true
        });
    }

    handleOnMouseLeaveArrow(index){
        const key = `arrow${index}IsHovered`;
        this.setState({
            [key]: false
        });
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
        console.log(offsetX, offsetY);
        return (
            <div className="card--link-arrow--container">
                {_.map([0,2,4,8], (arrowIndex, i) => {
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
                        <img 
                            style={style} 
                            key={`${i}-corner`} 
                            onMouseEnter={(event) => this.handleOnMouseEnterArrow(arrowIndex)}
                            onMouseLeave={(event) => this.handleOnMouseLeaveArrow(arrowIndex)}
                            className="card--link-arrow-corner" 
                            src={this.getArrowImg(arrowIndex, 'corner')}
                        />
                    );
                })}
                {_.map([1,3,5,7], (arrowIndex, i) => {
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
                        <img 
                            style={middleStyle} 
                            key={`${i}-middle`} 
                            onMouseEnter={(event) => this.handleOnMouseEnterArrow(arrowIndex)}
                            onMouseLeave={(event) => this.handleOnMouseLeaveArrow(arrowIndex)}
                            src={this.getArrowImg(arrowIndex, 'middle')}
                            className="card--link-arrow-middle" 
                            src={middleLinkArrow}/>
                    );
                })}              
            </div>
        )
    }
}

export {LinkArrowEditor};