import * as React from 'react';
import * as _ from "lodash";
import { MonsterTypes } from "client/app/constants";
import { LinkArrows } from "client/app/redux/card/state";

interface BattlePointDisplayProps {
  label: string
  value: string;
}

class BattlePointDisplay extends React.PureComponent<BattlePointDisplayProps> {
  public render(): React.ReactNode {
    return (
      <div>
        <span>{this.props.label}</span>
        <span className="battle-point-slash">/</span>
        <span className='battle-point--value'>{this.props.value}</span>
      </div>
    )
  }
}

interface LinkRatingProps {
  rating: number;
}

class LinkRatingDisplay extends React.PureComponent<LinkRatingProps> {
  public render(): React.ReactNode {
    return (
      <div className="card--battle-points--link-rating">
        <span>LINK-</span>
        <span className="card--battle-points--link-rating-value">{this.props.rating}</span>
      </div>
    )
  }
}

interface StatDisplayProps {
  atk: string;
  def: string;
  monsterType: MonsterTypes;
  linkArrows: LinkArrows;
}

export class StatDisplay extends React.PureComponent<StatDisplayProps> {
  public render(): React.ReactNode {
    return (
      <div className="ygo-card-battle-points">
        <BattlePointDisplay label={'ATK'} value={this.props.atk}/>
        <div className="ygo-card-battle-point-spacer">
        </div>
        {this.props.monsterType === MonsterTypes.LINK ?
          <LinkRatingDisplay rating={_.filter(this.props.linkArrows, (arrow) => arrow).length}/> :
          <BattlePointDisplay label={'DEF'} value={this.props.def}/>
        }
      </div>
    )
  }
}