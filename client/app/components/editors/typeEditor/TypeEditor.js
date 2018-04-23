import React from 'react';
import _ from 'lodash';
import {sprintf} from 'sprintf-js';
import $ from 'jquery';
import {ResizableInput} from 'client/app/components/common/resizableInput/ResizableInput';
import {SelectInput} from 'client/app/components/common/selectInput/SelectInput';
import {CatalogInput} from 'client/app/components/common/catalogInput/CatalogInput';
import {MonsterTypes, MonsterClasses} from 'client/app/constants';


class TypeEditor extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            scale: 1,
            inputIsFocused: false,
            editorIsHovered: false,
            editorIsFocused: false
        }
    }

    componentDidUpdate(){
        this.updateScale();
    }

    /* ------------------- +
     | DOM-related methods |
     + ------------------- */

    handleOnMouseEnter(){
        this.setState({
            editorIsHovered: true
        });
    }

    handleOnMouseLeave(){
        this.setState({
            editorIsHovered: false
        });
    }

    handleOnFocus(){
        this.setState({
            editorIsFocused: true
        });
    }

    handleOnBlur(){
        this.setState({
            editorIsFocused: false
        });
    }

    updateScale(){
        var scaleFactor = Math.min($(this.refs.hiddenContent).width()/($(this.refs.actualContent).width()), 1)
        if (scaleFactor !== this.state.scale){
            this.setState({
                scale: Math.min(scaleFactor, 1)
            });
        }   
    }

    getMonsterHybridTypeContainerClassNames(){
        let classNames = ['ygo-card-monster-type'];
        if (this.props.monsterType === MonsterTypes.LINK){
            classNames.push('type--hybrid-select--link-selected');
        }
        return classNames.join(' ');
    }

    /* -------------- +
     | Render Methods |
     +--------------- */

    renderMonsterTypeDivider(){
        if(this.props.monsterType !== MonsterTypes.BASIC || this.state.editorIsFocused || this.state.editorIsHovered){
            return (
                <span>/</span>
            );
        }
    }

    renderMonsterHybridTypeDivider(){
        if((this.props.monsterHybridType !== MonsterTypes.PURE && this.props.monsterType !== MonsterTypes.LINK) || this.state.editorIsFocused || this.state.editorIsHovered){
            return (
                <span>/</span>
            );
        }
    }

    renderMonsterAbilitiesDivider(){
        if(this.props.monsterAbilities.length > 0 || this.state.editorIsFocused || this.state.editorIsHovered){
            return (
                <span>/</span>
            );
        }
    }

    renderMonsterClassDivider(){
        if(this.props.monsterClass !== MonsterClasses.NON_TUNER || this.state.editorIsFocused || this.state.editorIsHovered){
            return (
                <span>/</span>
            );
        }
    }

    renderEffectType(){
        if (this.props.isEffect && this.props.isEffect()){
            return (
                <div>
                    <span>/</span>
                    <span>Effect</span>
                </div>
            )
        }
        else{
            return (
                <div>
                    <span>/</span>
                    <span>Normal</span>
                </div>
            )
        }
    }

    render(){
        var style = {
            transform: sprintf('scale(%s, 1)', this.state.scale)
        }
        return (
            <div
                className="type--container"
                onMouseEnter={(event) => this.handleOnMouseEnter()}
                onMouseLeave={(event) => this.handleOnMouseLeave()}>
                <div className="ygo-card-type-hidden-content"  ref="hiddenContent"></div>
                <div 
                    className="ygo-card-type"
                    ref="actualContent"       
                    style={style}>
                    <span className="type--brace">[</span>
                    <CatalogInput
                        placeholder='Add tribe...'
                        delimiter="-"
                        items={this.props.tribes}
                        updateItems={this.props.updateTribes}
                        onMouseEnter={(event) => this.updateScale()}
                        onMouseLeave={(event) => this.updateScale()}
                        onFocus={(event) => this.handleOnFocus()}
                        onBlur={(event) => this.handleOnBlur()}
                        showInput={this.state.editorIsFocused || this.state.editorIsHovered}
                        />
                    {this.renderMonsterTypeDivider()}
                    <SelectInput 
                        onChange={this.props.updateMonsterType} 
                        selectedItem={this.props.monsterType}
                        selectOptions={[MonsterTypes.BASIC, MonsterTypes.FUSION, MonsterTypes.SYNCHRO, MonsterTypes.RITUAL, MonsterTypes.XYZ, MonsterTypes.LINK]}
                        shouldHideSelectedItem={() => this.props.monsterType === MonsterTypes.BASIC}
                        onFocus={(event) => this.handleOnFocus()}
                        onBlur={(event) => this.handleOnBlur()}
                        showEditor={this.state.editorIsFocused || this.state.editorIsHovered}/>
                    {this.renderMonsterHybridTypeDivider()}
                    <SelectInput 
                        containerClassName={this.getMonsterHybridTypeContainerClassNames()}
                        onChange={this.props.updateMonsterHybridType} 
                        selectedItem={this.props.monsterHybridType}
                        selectOptions={[MonsterTypes.PURE, MonsterTypes.PENDULUM]}
                        shouldHideSelectedItem={() => this.props.monsterHybridType === MonsterTypes.PURE || this.props.monsterType === MonsterTypes.LINK}
                        onFocus={(event) => this.handleOnFocus()}
                        onBlur={(event) => this.handleOnBlur()}
                        showEditor={this.state.editorIsFocused || this.state.editorIsHovered}/>
                    {this.renderMonsterAbilitiesDivider()}
                    <CatalogInput
                        placeholder='Add ability...'
                        delimiter="/"
                        items={this.props.monsterAbilities}
                        updateItems={this.props.updateMonsterAbilities}
                        onMouseEnter={(event) => this.updateScale()}
                        onMouseLeave={(event) => this.updateScale()}
                        onFocus={(event) => this.handleOnFocus()}
                        onBlur={(event) => this.handleOnBlur()}
                        showInput={this.state.editorIsFocused || this.state.editorIsHovered}
                        showWhenEmpty={false}
                        />
                    {this.renderMonsterClassDivider()}
                    <SelectInput
                        onChange={this.props.updateMonsterClass}
                        selectedItem={this.props.monsterClass}
                        selectOptions={[MonsterClasses.NON_TUNER, MonsterClasses.TUNER]}
                        shouldHideSelectedItem={() => this.props.monsterClass === MonsterClasses.NON_TUNER}
                        onFocus={(event) => this.handleOnFocus()}
                        onBlur={(event) => this.handleOnBlur()}
                        showEditor={this.state.editorIsFocused || this.state.editorIsHovered}
                    /> 
                    {this.renderEffectType()}
                    <span className="type--brace">]</span>
                </div>
            </div>
            
        )
    }
}

export {TypeEditor};