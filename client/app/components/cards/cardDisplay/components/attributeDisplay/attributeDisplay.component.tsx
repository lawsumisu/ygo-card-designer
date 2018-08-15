import * as React from 'react';
import light from 'client/app/assets/LIGHT.png';
import dark from 'client/app/assets/DARK.png';
import fire from 'client/app/assets/FIRE.png';
import water from 'client/app/assets/WATER.png';
import wind from 'client/app/assets/WIND.png';
import divine from 'client/app/assets/DIVINE.png';
import earth from 'client/app/assets/EARTH.png';
import spell from 'client/app/assets/SPELL.png';
import trap from 'client/app/assets/TRAP.png';

import 'client/app/components/editors/attributeEditor/attributeEditor.scss';
import { Attribute } from "client/app/constants";


const attributeMap = {
  [Attribute.LIGHT]: light,
  [Attribute.DARK]: dark,
  [Attribute.WIND]: wind,
  [Attribute.WATER]: water,
  [Attribute.FIRE]: fire,
  [Attribute.EARTH]: earth,
  [Attribute.DIVINE]: divine,
  [Attribute.SPELL]: spell,
  [Attribute.TRAP]: trap
};

interface AttributeDisplayProps {
  attribute: Attribute;
}

export class AttributeDisplay extends React.PureComponent<AttributeDisplayProps> {
  public render(): React.ReactNode {
    return (
      <div
        className="ygo-card-attribute"
      >
        <img
          src={attributeMap[this.props.attribute]}
          className="ygo-card-attribute-selection"/>
      </div>
    )
  }
}