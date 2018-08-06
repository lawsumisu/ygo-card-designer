import * as _ from 'lodash';
import * as React from 'react';

interface LinkArrowDisplayProps {
  linkArrows: [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean];
}

export class LinkArrowDisplay extends React.PureComponent<LinkArrowDisplayProps> {
  constructor(props) {
    super(props);

    this.state = {};
    for (let i = 0; i < 8; ++i) {
      this.state[`arrow${i}IsHovered`] = false;
    }
  }

  getLinkArrowClassNames(arrowType, linkIndex) {
    const classNamePrefix = `card--link-arrow-${arrowType}`;
    let classNames = [classNamePrefix];
    if (this.props.linkArrows[linkIndex]) {
      classNames.push(`${classNamePrefix}--selected`);
    }
    //Special classes for middle arrows
    if (linkIndex === 3 || linkIndex === 7) {
      classNames.push('card--link-arrow-middle--vertical');
    }
    else {
      classNames.push('card--link-arrow-middle--horizontal')
    }
    return classNames.join(' ');
  }

  render() {
    const cornerArrowPosition = [['bottom', 'left'], ['bottom', 'right'], ['top', 'left'], ['top', 'right']];
    const middleArrowPosition = ['bottom', 'left', 'top', 'right'];
    return (
      <div className='card--link-arrow--container'>
        {_.map([0, 2, 4, 6], (linkIndex, i) => {
          const x = i % 2;
          const y = Math.floor(i / 2);
          const sx = -2 * x + 1;
          const sy = -2 * y + 1;
          const style = {
            [cornerArrowPosition[i][0]]: 0,
            [cornerArrowPosition[i][1]]: 0,
            transform: `scale(${sx}, ${sy})`
          };
          return (
            <div
              style={style}
              key={`${i}-corner`}
              className={this.getLinkArrowClassNames('corner', linkIndex)}
            />
          );
        })}
        {_.map([1, 3, 5, 7], (linkIndex, i) => {
          const theta = Math.floor(i / 2);
          const middleStyle = {
            [middleArrowPosition[i]]: 0,
            transform: `rotate(${theta * 180}deg)`
          };
          return (
            <div
              style={middleStyle}
              key={`${i}-middle`}
              className={this.getLinkArrowClassNames('middle', linkIndex)}
            />
          );
        })}
      </div>
    );
  }
}