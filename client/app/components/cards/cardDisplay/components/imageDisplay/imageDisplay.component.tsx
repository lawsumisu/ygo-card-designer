import * as React from 'react';
import classNames from 'classnames';
import { CardTypes, MonsterTypes } from 'client/app/constants';
import 'client/app/components/cards/cardDisplay/components/imageDisplay/imageDisplay.scss';

interface ImageDisplayProps {
  imageSrc: string;
  cardType: CardTypes
  monsterType: MonsterTypes;
  monsterHybridType: MonsterTypes.PENDULUM | MonsterTypes.PURE;
}

export class ImageDisplay extends React.PureComponent<ImageDisplayProps> {
  getClassNames(){
    let classes = ['image-display--container'];
    if (this.props.monsterHybridType === MonsterTypes.PENDULUM && this.props.cardType === CardTypes.MONSTER && this.props.monsterType !== MonsterTypes.LINK){
      classes.push('image-display--pendulum');
    }
    return classNames(classes);
  }

  render(){
    return (
      <div
        className={this.getClassNames()}
      >
        <img src={this.props.imageSrc}/>
      </div>
    )
  }
}