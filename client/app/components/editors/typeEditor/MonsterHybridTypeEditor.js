import React from 'react';
import {MonsterTypes, OrderedMonsterHybridTypeKeyList} from 'client/app/constants';

class MonsterHybridTypeEditor extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            selectIsFocused: false
        }
    }

    getSelectedMonsterHybridTypeAsDisplay(){
        if (this.props.monsterHybridType !== MonsterTypes.PURE && !this.state.selectIsFocused && !this.props.showEditor){
            return (
                <span className='ygo-card-monster-type-selected'>{this.props.monsterHybridType}</span>
            );
        }
    }

    getDividerAsDisplay(){
        if(this.props.monsterHybridType !== MonsterTypes.PURE || this.state.selectIsFocused || this.props.showEditor){
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
                {this.getSelectedMonsterHybridTypeAsDisplay()}
                <select 
                    className={this.getSelectClassNames()}
                    onChange={(event) => this.props.updateMonsterHybridType(event.target.value)}
                    onFocus={(event) => this.handleOnFocus(event)}
                    onBlur={(event) => this.handleOnBlur(event)}
                    value={this.props.monsterHybridType}>
                    {_.map(OrderedMonsterHybridTypeKeyList, (monsterType) => {
                        return (
                             <option key={monsterType} value={MonsterTypes[monsterType]}>{MonsterTypes[monsterType]}</option>
                        );
                    })}
                </select>
            </div>
        )
    }
}

export {MonsterHybridTypeEditor};