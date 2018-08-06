import * as React from 'react';
import { MonsterClasses, MonsterTypes } from 'client/app/constants';
import 'client/app/components/cards/cardDisplay/components/typeDisplay/typeDisplay.scss';
import * as _ from 'lodash';

interface TypeDisplayProps {
  tribes: string[];
  effect: string;
  monsterType: MonsterTypes;
  monsterHybridType: MonsterTypes.PURE | MonsterTypes.PENDULUM;
  monsterAbilities: string[];
  monsterClass: MonsterClasses;
}

interface TypeDisplayState {
  scale: number;
}

export class TypeDisplay extends React.Component<TypeDisplayProps, TypeDisplayState> {
  public state: TypeDisplayState = {
    scale: 1,
  };

  private fullContent: HTMLDivElement | null;
  private actualContent: HTMLDivElement | null;

  public componentWillMount(){
    this.setState({});
  }

  public componentDidUpdate(){
    const scale = this.getScale();
    if (this.state.scale !== scale){
      this.setState({
        scale
      });
    }
  }

  public render(): React.ReactNode {
    const style = {
      transform: `scale(${this.state.scale}, 1)`
    };

    return (
      <div className="type-display--container">
        <div ref={(element) => this.fullContent = element}/>
        <div className='type-display--text' ref={(element) => this.actualContent = element} style={style}>
          {this.getTypeString()}
        </div>
      </div>
    );
  }

  private getTypeString(): string {
    const tribeString = this.props.tribes.join('-');
    const monsterTypeString = this.props.monsterType === MonsterTypes.BASIC ? '' : this.props.monsterType;
    const monsterHybridTypeString = this.props.monsterHybridType === MonsterTypes.PURE ? '' : this.props.monsterHybridType;
    const abilityString = this.props.monsterAbilities.join('/');
    const classString = this.props.monsterClass === MonsterClasses.NON_TUNER ? '' : this.props.monsterClass;
    const effectString = this.props.effect.length > 0 ? 'Effect' : 'Normal';
    const typeString = [tribeString, monsterTypeString, monsterHybridTypeString, abilityString, classString, effectString]
      .filter((str) => str.length > 0)
      .join('/');
    return `[${typeString}]`;
  }

  private getScale(): number {
    if (_.isNil(this.fullContent) || _.isNil(this.actualContent)){
      return 1;
    }
    else{
      return Math.min(this.fullContent.clientWidth / this.actualContent.clientWidth, 1);
    }
  }
}