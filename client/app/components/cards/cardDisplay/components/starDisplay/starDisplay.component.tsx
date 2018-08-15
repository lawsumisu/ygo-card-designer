import * as React from 'react';
import * as _ from 'lodash';
import classNames from 'classnames';
import { MonsterTypes } from "client/app/constants";
import level from 'client/app/assets/Level2.png';
import rank from 'client/app/assets/Series 9/Rank.png';
import negativeLevel from 'client/app/assets/NegativeLevel.png';
import 'client/app/components/editors/starEditor/starEditor.scss';
import 'client/app/components/cards/cardDisplay/components/starDisplay/starDisplay.scss';

interface StarDisplayProps {
  monsterType: MonsterTypes;
  stars: number;
}

export class StarDisplay extends React.PureComponent<StarDisplayProps> {
  getClassNames(){
    let containerClassNames = ['star-display--container'];
    if (this.props.monsterType === MonsterTypes.XYZ){
      containerClassNames.push('star-display--rank');
    }
    else if (this.props.monsterType === MonsterTypes.DARK_SYNCHRO){
      containerClassNames.push('star-display--negative');
    }
    else if (this.props.monsterType === MonsterTypes.LINK){
      containerClassNames.push('star-display--invisible');
    }
    return classNames(containerClassNames);
  }


  render() {
    const stars: JSX.Element[] = [];
    _.times(this.props.stars, (i: number) => {
      let starImg = level;
      if (this.props.monsterType === MonsterTypes.DARK_SYNCHRO) starImg = negativeLevel;
      else if (this.props.monsterType === MonsterTypes.XYZ) starImg = rank;
      stars.push(
        <img
          src={starImg}
          className='star'
          key={i}
        />
      )
    });
    return (
      <div className={this.getClassNames()}>
        { stars }
      </div>
    )
  }
}