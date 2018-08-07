import * as React from 'react';
import { MonsterClasses, MonsterTypes } from 'client/app/constants';
import 'client/app/components/cards/cardDisplay/components/typeDisplay/typeDisplay.scss';
import {
  AutoscalingLineElement,
  AutoscalingLineElementState
} from "client/app/components/cards/cardDisplay/components/AutoscalingLineElement";

interface TypeDisplayProps {
  tribes: string[];
  effect: string;
  monsterType: MonsterTypes;
  monsterHybridType: MonsterTypes.PURE | MonsterTypes.PENDULUM;
  monsterAbilities: string[];
  monsterClass: MonsterClasses;
}

interface TypeDisplayState extends AutoscalingLineElementState {
  scale: number;
}

export class TypeDisplay extends AutoscalingLineElement<TypeDisplayProps, TypeDisplayState> {
  public state: TypeDisplayState = {
    scale: 1,
  };

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
}