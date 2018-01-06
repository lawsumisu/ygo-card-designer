import React from 'react';
import _ from 'lodash';
import {sprintf} from 'sprintf-js';
import $ from 'jquery';
import {ResizableInput} from '../common/ResizableInput';
import {MonsterTypeEditor} from './MonsterTypeEditor';
import {CatalogInput} from 'client/app/components/common/catalogInput/CatalogInput';
import styles from '../../style/ResizableInput.scss';

var tribeCount = 0;
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

    getEffectTypeAsDisplay(){
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

    updateScale(){
        var scaleFactor = Math.min($(this.refs.hiddenContent).width()/($(this.refs.actualContent).width()), 1)
        if (scaleFactor !== this.state.scale){
            this.setState({
                scale: Math.min(scaleFactor, 1)
            });
        }   
    }

    render(){
        var style = {
            transform: sprintf('scale(%s, 1)', this.state.scale)
        }
        return (
            <div
                onMouseEnter={(event) => this.handleOnMouseEnter()}
                onMouseLeave={(event) => this.handleOnMouseLeave()}>
                <div className="ygo-card-type-hidden-content"  ref="hiddenContent"></div>
                <div 
                    className="ygo-card-type"
                    ref="actualContent"       
                    style={style}>
                    <span>[</span>
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
                    <MonsterTypeEditor 
                        updateMonsterType={this.props.updateMonsterType} 
                        monsterType={this.props.monsterType}
                        onFocus={(event) => this.handleOnFocus()}
                        onBlur={(event) => this.handleOnBlur()}
                        showEditor={this.state.editorIsFocused || this.state.editorIsHovered}/>
                    {this.getEffectTypeAsDisplay()}
                    <span>]</span>
                </div>
            </div>
            
        )
    }
}

export {TypeEditor};