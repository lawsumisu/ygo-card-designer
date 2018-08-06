import React from 'react';
import _ from 'lodash';
import $ from 'jquery';

import {MonsterTypes, CardTypes} from 'client/app/constants';

import {AutoscalingTextarea} from 'client/app/components/common/autoscalingTextarea/autoscalingTextarea.component';
import {AutoscalingTextareaV2} from 'client/app/components/common/autoscalingTextarea/autoscalingTextareaV2.component';
import {CatalogInput} from 'client/app/components/common/catalogInput/CatalogInput';
import {AutoscalingInput} from 'client/app/components/common/autoscalingInput/autoscalingInput.component';

import 'client/app/components/editors/descriptionEditor/DescriptionEditor.scss';

class DescriptionEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mainIsHovered: false,
      effectIsFocused: false,
      loreIsFocused: false,
      monsterMaterialIsFocused: false,
      materialHorizontalScale: 1,
      showLore: props.lore.length > 0,
      showEffect: props.effect.length > 0,
      effectEditButtonText: '-',
      loreEditButtonText: '-'
    };
  }

  componentDidUpdate() {
    this.updateMaterialHorizontalScale();
  }

  renderMaterialEditor() {
    if (this.props.cardType === CardTypes.MONSTER) {
      const monsterMaterialProperties = this.getMonsterMaterialProperties();
      if (this.props.monsterType === MonsterTypes.FUSION || this.props.monsterType === MonsterTypes.SYNCHRO || this.props.monsterType === MonsterTypes.DARK_SYNCHRO) {
        const style = {
          transform: `scale(${this.state.materialHorizontalScale}, 1)`
        }
        return (
          <div
            className="ygo-card-monster-materials-container"
            onMouseEnter={(event) => this.handleMonsterMaterialContainerOnMouseEnter()}
            onMouseLeave={(event) => this.handleMonsterMaterialContainerOnMouseLeave()}
          >
            <CatalogInput
              style={style}
              className={monsterMaterialProperties.className}
              placeholder={monsterMaterialProperties.placeholder}
              delimiter="+"
              items={monsterMaterialProperties.monsterMaterials}
              updateItems={monsterMaterialProperties.updateFunction}
              onMouseEnter={(event) => this.updateMaterialHorizontalScale()}
              onMouseLeave={(event) => this.updateMaterialHorizontalScale()}
              onBlur={(event) => {
                this.updateMaterialHorizontalScale();
                this.updateFocus('monsterMaterial', false);
              }}
              onFocus={(event) => this.updateFocus('monsterMaterial', true)}
              showInput={this.state.monsterMaterialIsHovered}
            />
          </div>
        );
      }
      else if (this.props.monsterType === MonsterTypes.XYZ || this.props.monsterType === MonsterTypes.LINK) {
        return (
          <AutoscalingInput
            value={monsterMaterialProperties.monsterMaterials}
            onChange={(event) => monsterMaterialProperties.updateFunction(event.target.value)}
            placeholder={monsterMaterialProperties.placeholder}
            className={monsterMaterialProperties.className}
            onBlur={(event) => this.updateFocus('monsterMaterial', false)}
            onFocus={(event) => this.updateFocus('monsterMaterial', true)}
          />
        );
      }
    }
  }

  getMonsterMaterialProperties() {
    if (this.props.cardType === CardTypes.MONSTER) {
      if (this.props.monsterType === MonsterTypes.FUSION) {
        return {
          monsterMaterials: this.props.fusionMaterials,
          updateFunction: this.props.updateFusionMaterials,
          placeholder: 'Add Fusion Material...',
          className: 'ygo-card-fusion-materials'
        };
      }
      else if (this.props.monsterType === MonsterTypes.SYNCHRO) {
        return {
          monsterMaterials: this.props.synchroMaterials,
          updateFunction: this.props.updateSynchroMaterials,
          placeholder: 'Add Synchro Material...',
          className: 'ygo-card-synchro-materials'
        };
      }
      else if (this.props.monsterType === MonsterTypes.DARK_SYNCHRO) {
        return {
          monsterMaterials: this.props.darkSynchroMaterials,
          updateFunction: this.props.updateDarkSynchroMaterials,
          placeholder: 'Add Dark Synchro Material...',
          className: 'ygo-card-dark-synchro-materials'
        };
      }
      else if (this.props.monsterType === MonsterTypes.XYZ) {
        return {
          monsterMaterials: this.props.xyzMaterials,
          updateFunction: this.props.updateXyzMaterials,
          placeholder: 'Add Xyz Material...',
          className: 'ygo-card-xyz-materials'
        };
      }
      else if (this.props.monsterType === MonsterTypes.LINK) {
        return {
          monsterMaterials: this.props.linkMaterials,
          updateFunction: this.props.updateLinkMaterials,
          placeholder: 'Add Link Material...',
          className: 'ygo-card-link-materials'
        };
      }
      else {
        return {};
      }
    }
    else {
      return {};
    }

  }

  includesMonsterMaterials() {
    return this.props.cardType === CardTypes.MONSTER &&
      (this.props.monsterType === MonsterTypes.FUSION || this.props.monsterType === MonsterTypes.SYNCHRO ||
        this.props.monsterType === MonsterTypes.XYZ || this.props.monsterType === MonsterType.DARK_SYNCRHO);
  }


  /* -------------- *
   | Event Handlers |
   + -------------- */

  handleBottomTextContainerOnMouseEnter() {
    this.setState({
      mainIsHovered: true
    });
  }

  handleBottomTextContainerOnMouseLeave() {
    this.setState({
      mainIsHovered: false
    });
  }

  handleMonsterMaterialContainerOnMouseEnter() {
    this.setState({
      monsterMaterialIsHovered: true
    });
  };

  handleMonsterMaterialContainerOnMouseLeave() {
    this.setState({
      monsterMaterialIsHovered: false
    });
  };

  handleEditButtonOnClick(buttonType) {
    if (buttonType === 'effect') {
      this.setState({
        showEffect: !this.state.showEffect
      });
    }
    else if (buttonType === 'lore') {
      this.setState({
        showLore: !this.state.showLore
      });
    }
  }

  getDescriptionEditorClassNames() {
    const classNamePrefix = 'description--editor';
    let classNames = [classNamePrefix];
    // const showLore = !_.isEmpty(this.props.lore) || this.state.loreIsFocused || this.state.mainIsHovered || this.state.effectIsFocused;
    // const showEffect = !_.isEmpty(this.props.effect) || this.state.effectIsFocused || this.state.mainIsHovered || this.state.loreIsFocused;
    if (this.state.showLore && this.state.showEffect) {
      classNames.push(`${classNamePrefix}--full`);
    }
    return classNames.join(' ');

  }

  getDescriptionTextContainerClassNames() {
    const classNamePrefix = 'description--text--container';
    let classNames = [classNamePrefix];
    if (this.state.inEditMode) {
      classNames.push(`${classNamePrefix}--edit`);
    }
    else {
      classNames.push(`${classNamePrefix}--display`);
    }
    return classNames.join(' ');
  }

  getDescriptionTextInputClassNames(inputType) {
    const showState = inputType === 'effect' ? this.state.showEffect : this.state.showLore;
    let classNames = [`description--text--input-${inputType}`];
    if (!showState) {
      classNames.push(`description--text--input--invisible`);
    }
    return classNames.join(' ');
  }

  getEditButtonClassNames(descriptionType) {
    const classNames = [`description--text--edit-btn-${descriptionType}`];
    const showState = descriptionType === 'effect' ? this.state.showEffect : this.state.showLore;
    if (!showState) {
      classNames.push('description--text--edit-btn--no-show');
    }
    return classNames.join(' ');
  }

  updateFocus(inputType, isFocused) {
    if (inputType === 'effect') {
      this.setState({
        effectIsFocused: isFocused
      });
    }
    else if (inputType === 'lore') {
      this.setState({
        loreIsFocused: isFocused
      });
    }
    else if (inputType === 'monsterMaterial') {
      this.setState({
        monsterMaterialIsFocused: isFocused
      });
    }
  }

  updateEffect(event) {
    this.props.updateEffect(event.target.value);
  }

  updateMaterialHorizontalScale() {
    if (this.props.cardType === CardTypes.MONSTER && (this.props.monsterType === MonsterTypes.FUSION || this.props.monsterType === MonsterTypes.SYNCHRO ||
      this.props.monsterType === MonsterTypes.DARK_SYNCHRO)) {
      const monsterMaterialProperties = this.getMonsterMaterialProperties();
      const maxWidth = $('.ygo-card-monster-materials-container').width();
      const actualWidth = $('.' + monsterMaterialProperties.className).width();
      if (!actualWidth || actualWidth === 0) return;
      const materialHorizontalScaleFactor = Math.min(maxWidth / actualWidth, 1);
      if (materialHorizontalScaleFactor !== this.state.materialHorizontalScale) {
        this.setState({
          materialHorizontalScale: materialHorizontalScaleFactor
        });
      }
    }
  }

  render() {
    return (
      <div className={this.getDescriptionEditorClassNames()}
           onMouseEnter={(event) => this.handleBottomTextContainerOnMouseEnter()}
           onMouseLeave={(event) => this.handleBottomTextContainerOnMouseLeave()}
      >
        {this.renderMaterialEditor()}
        <div className={this.getDescriptionTextContainerClassNames()}>
          <div className="description--text--edit-btn-anchor">
            <input type="button" className={this.getEditButtonClassNames('effect')} value="E"
                   onClick={(event) => this.handleEditButtonOnClick('effect')}/>
            <input type="button" className={this.getEditButtonClassNames('lore')} value="L"
                   onClick={(event) => this.handleEditButtonOnClick('lore')}/>
          </div>
          <AutoscalingTextareaV2
            maxFontSize={1}
            minFontSize={.8}
            className={this.getDescriptionTextInputClassNames('effect')}
            placeholder="Enter effect here..."
            value={this.props.effect}
            onChange={(event) => this.props.updateEffect(event.target.value)}
            onFocus={(event) => this.updateFocus('effect', true)}
            onBlur={(event) => this.updateFocus('effect', false)}
          />
          <AutoscalingTextareaV2
            maxFontSize={1}
            minFontSize={.8}
            className={this.getDescriptionTextInputClassNames('lore')}
            placeholder="Enter lore here..."
            value={this.props.lore}
            onChange={(event) => this.props.updateLore(event.target.value)}
            onFocus={(event) => this.updateFocus('lore', true)}
            onBlur={(event) => this.updateFocus('lore', false)}
          />
        </div>
      </div>
    )

  }
}

export {DescriptionEditor};