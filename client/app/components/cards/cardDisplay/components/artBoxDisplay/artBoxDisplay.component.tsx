import * as React from 'react';
import { CardTypes, MonsterTypes } from 'client/app/constants';
import normalArtBox from 'client/app/assets/Series 10/ArtBox.png';
import pendulumBaseSmall from 'client/app/assets/Series 10/Pendulum/PendulumBaseSmall.png';
import pendulumEffectSmall from 'client/app/assets/Series 10/Pendulum/PendulumEffectSmall.png';
import { LinkArrowDisplay } from "client/app/components/cards/cardDisplay/components/linkArrowDisplay/linkArrowDisplay.component";

interface ArtBoxDisplayProps {
  cardType: CardTypes;
  monsterHybridType: MonsterTypes.PENDULUM | MonsterTypes.PURE;
  monsterType: MonsterTypes;
  linkArrows: [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean];
}

export class ArtBoxDisplay extends React.PureComponent<ArtBoxDisplayProps> {
  public render(){
    if (this.props.monsterHybridType === MonsterTypes.PENDULUM && this.props.cardType === CardTypes.MONSTER
      && this.props.monsterType !== MonsterTypes.LINK) {
      return (
        <div className="ygo-card-pendulum">
          <img src={pendulumEffectSmall}/>
          <img src={pendulumBaseSmall}/>
        </div>
      );
    }
    else if (this.props.monsterType === MonsterTypes.LINK && this.props.cardType === CardTypes.MONSTER) {
      return (
        <div className="card--link-art--container">
          <img className="card--normal-art-box" src={normalArtBox}/>
          <LinkArrowDisplay linkArrows={this.props.linkArrows}/>
        </div>
      );
    }
    else {
      return (
        <div className="card--normal-art--container">
          <img className="card--normal-art-box" src={normalArtBox}/>
        </div>
      );
    }
  }
}