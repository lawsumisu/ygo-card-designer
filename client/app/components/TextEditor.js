import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import 'jquery-textfill';
import {AutoscalingTextarea} from './common/AutoscalingTextarea';

class TextEditor extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            mainIsHovered: false,
            effectIsFocused: false,
            loreIsFocused: false

        };
    }

    componentDidMount(){
        
    }

    handleOnMouseEnter(){
        this.setState({
            mainIsHovered: true
        });
    }

    handleOnMouseLeave(){
        this.setState({
            mainIsHovered: false
        });
    }

    updateFocus(inputType, isFocused){
        if (inputType === 'effect'){
            this.setState({
                effectIsFocused: isFocused
            });
        }
        else if (inputType === 'lore'){
            this.setState({
                loreIsFocused: isFocused
            });
        }
    }

    updateEffect(event){
        this.props.updateEffect(event.target.value);
        // $('.ygo-card-effect').textfill({
        //     debug: true,
        //     innerTag: 'textarea'
        // });
    }

    getStyle(text){
        if (_.isEmpty(text) && !this.state.effectIsFocused && !this.state.loreIsFocused && !this.state.mainIsHovered){
            return {
                display: 'none'
            };
        }
        else return {}
    }

    render(){
        return (
            <div className="ygo-card-bottom-text"
                onMouseEnter={(event) => this.handleOnMouseEnter()}
                onMouseLeave={(event) => this.handleOnMouseLeave()}>
                <AutoscalingTextarea
                    style={this.getStyle(this.props.effect)}
                    maxFontSize={15}
                    className="ygo-card-effect"
                    placeholder="Enter effect here..."
                    value={this.props.effect} 
                    onChange={(event) => this.props.updateEffect(event.target.value)}
                    onFocus={(event) => this.updateFocus('effect', true)}
                    onBlur={(event) => this.updateFocus('effect', false)}/>
                
                <AutoscalingTextarea
                    style={this.getStyle(this.props.lore)}
                    maxFontSize={15}
                    className="ygo-card-lore"
                    placeholder="Enter lore here..."
                    value={this.props.lore} 
                    onChange={(event) => this.props.updateLore(event.target.value)}
                    onFocus={(event) => this.updateFocus('lore', true)}
                    onBlur={(event) => this.updateFocus('lore', false)}
                    />
            </div>
        )
        
    }
}

export {TextEditor};