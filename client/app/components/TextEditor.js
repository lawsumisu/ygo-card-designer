import React from 'react';
import _ from 'lodash';

class TextEditor extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            mainIsHovered: false,
            effectIsFocused: false,
            loreIsFocused: false

        };
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
                <textarea
                    style={this.getStyle(this.props.effect)}
                    className="ygo-card-effect" 
                    placeholder="Enter effect here..."
                    value={this.props.effect} 
                    onChange={(event) => this.props.updateEffect(event.target.value)}
                    onFocus={(event) => this.updateFocus('effect', true)}
                    onBlur={(event) => this.updateFocus('effect', false)}/>
                <textarea 
                    style={this.getStyle(this.props.lore)}
                    className="ygo-card-lore"
                    placeholder="Enter lore here..."
                    value={this.props.lore} 
                    onChange={(event) => this.props.updateLore(event.target.value)}
                    onFocus={(event) => this.updateFocus('lore', true)}
                    onBlur={(event) => this.updateFocus('lore', false)}/>
            </div>
        )
        
    }
}

export {TextEditor};