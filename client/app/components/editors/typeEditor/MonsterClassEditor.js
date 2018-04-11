import React from 'react';
import {MonsterClasses} from 'client/app/constants';

class MonsterClassEditor extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            selectIsFocused: false
        }
    }

    getSelectedMonsterClassAsDisplay(){
        if (this.props.monsterClass !== MonsterClasses.NON_TUNER && !this.state.selectIsFocused && !this.props.showEditor){
            return (
                <span className='ygo-card-monster-type-selected'>{this.props.monsterClass}</span>
            );
        }
    }

    getDividerAsDisplay(){
        if(this.props.monsterClass !== MonsterClasses.NON_TUNER || this.state.selectIsFocused || this.props.showEditor){
            return (
                <span>/</span>
            );
        }
    }

    /* ------------------- +
     | DOM-related methods |
     + ------------------- */
    
    getSelectClassNames(){
        let classNames = ['ygo-card-monster-type-selector'];
        if (this.state.selectIsFocused || this.props.showEditor){
            classNames.push('ygo-card-monster-type-selector-visible');
        }
        return classNames.join(' ');
    }

    handleOnFocus(event){
        if (this.props.onFocus){
            this.props.onFocus(event);
        }
        this.setState({
           selectIsFocused: true 
        });
    }

    handleOnBlur(event){
        if (this.props.onBlur){
            this.props.onBlur(event);
        }
        this.setState({
            selectIsFocused: false
        });
    }



    render(){
        return (
            <div className="ygo-card-monster-type">
                {this.getDividerAsDisplay()}
                {this.getSelectedMonsterClassAsDisplay()}
                <select 
                    className={this.getSelectClassNames()}
                    onChange={(event) => this.props.updateMonsterClass(event.target.value)}
                    onFocus={(event) => this.handleOnFocus(event)}
                    onBlur={(event) => this.handleOnBlur(event)}
                    value={this.props.monsterClass}>
                    {_.map([MonsterClasses.NON_TUNER, MonsterClasses.TUNER], (monsterClass) => {
                        return (
                             <option key={monsterClass} value={monsterClass}>{monsterClass}</option>
                        );
                    })}
                </select>
            </div>
        )
    }
}

export {MonsterClassEditor};