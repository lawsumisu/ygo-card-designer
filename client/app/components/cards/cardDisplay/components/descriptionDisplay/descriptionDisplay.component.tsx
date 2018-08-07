import * as React from 'react';
import * as _ from 'lodash';
import { CardTypes, MonsterTypes } from 'client/app/constants';
import 'client/app/components/cards/cardDisplay/components/descriptionDisplay/descriptionDisplay.scss';
import {
  AutoscalingLineElement,
  AutoscalingLineElementState
} from "client/app/components/cards/cardDisplay/components/AutoscalingLineElement";

interface MaterialDisplayProps {
  delimiter?: string;
  monsterType: MonsterTypes;
  fusionMaterials: string[];
  synchroMaterials: string[];
  darkSynchroMaterials: string[];
  xyzMaterials: string;
  linkMaterials: string;
}

interface MaterialDisplayState extends AutoscalingLineElementState {}

class MaterialDisplay extends AutoscalingLineElement<MaterialDisplayProps, MaterialDisplayState> {
  public state: MaterialDisplayState = {
    scale: 1
  };

  public render(): React.ReactNode {
    const style = {
      transform: `scale(${this.state.scale}, 1)`
    };

    return (
      <div className='material-display--container'>
        <div ref={(element) => this.fullContent = element}/>
        <div
          className='material-display--materials--container'
          ref={(element) => this.actualContent = element}
          style={style}
        >
          {this.renderMaterials()}
        </div>
      </div>
    )
  }

  private renderMaterials(): JSX.Element[] {
    const materials = this.getMaterialString();
    const elements: JSX.Element[] = [];
    const delimiter = this.props.delimiter || '+';
    _.forEach(materials, (material: string, i: number) => {
      elements.push(<div key={`material${i}`} className={'materials--item'}>{material}</div>);
      if (i < materials.length - 1){
        elements.push(<div key={`delimiter${i}`} className='materials--delimiter'>{delimiter}</div>);
      }
    });
    return elements;
  }

  private getMaterialString(): string[] {
    switch(this.props.monsterType){
      case MonsterTypes.FUSION:
        return this.props.fusionMaterials;
      case MonsterTypes.SYNCHRO:
        return this.props.synchroMaterials;
      case MonsterTypes.DARK_SYNCHRO:
        return this.props.darkSynchroMaterials;
      case MonsterTypes.XYZ:
        return [this.props.xyzMaterials];
      case MonsterTypes.LINK:
        return [this.props.linkMaterials];
      default:
        return [''];
    }
  }
}

interface DescriptionDisplayProps {
  cardType: CardTypes;
  monsterType: MonsterTypes;
  fusionMaterials: string[];
  synchroMaterials: string[];
  darkSynchroMaterials: string[];
  xyzMaterials: string;
  linkMaterials: string;
}

export class DescriptionDisplay extends React.Component<DescriptionDisplayProps> {
  public render(): React.ReactNode {
    return (
      <div className='description--editor'>
        {this.props.cardType === CardTypes.MONSTER && this.props.monsterType !== MonsterTypes.BASIC ?
          <MaterialDisplay
            monsterType={this.props.monsterType}
            fusionMaterials={this.props.fusionMaterials}
            synchroMaterials={this.props.synchroMaterials}
            darkSynchroMaterials={this.props.darkSynchroMaterials}
            xyzMaterials={this.props.xyzMaterials}
            linkMaterials={this.props.linkMaterials}
          /> : null
        }
        <div className='description--text--container'/>
      </div>
    );
  }
}