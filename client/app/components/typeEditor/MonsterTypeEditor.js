import React from 'react';
import {MonsterTypes} from '../../constants';


class MonsterTypeEditor extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            selectIsFocused: false
        }
    }

    handleOnFocus(event){
        this.setState({
           selectIsFocused: true 
        });
    }

    handleOnBlur(event){
        this.setState({
            selectIsFocused: false
        });
    }

    render(){
        return (
            <div className="ygo-card-monster-type">
                {this.props.monsterType !== MonsterTypes.NORMAL || this.state.selectIsFocused ? <span>/</span> : null}
                {this.props.monsterType !== MonsterTypes.NORMAL && !this.state.selectIsFocused ? <span className='ygo-card-monster-type-selected'>{this.props.monsterType}</span> : null}
                <select 
                    className='ygo-card-monster-type-selector'
                    onChange={(event) => this.props.updateMonsterType(event.target.value)}
                    onFocus={(event) => this.handleOnFocus(event)}
                    onBlur={(event) => this.handleOnBlur(event)}
                    value={this.props.monsterType}>
                    <option value={MonsterTypes.NORMAL}>Regular
                        
                    </option>
                    <option value={MonsterTypes.FUSION}>{MonsterTypes.FUSION}</option>
                    <option value={MonsterTypes.RITUAL}>{MonsterTypes.RITUAL}</option>
                    <option value={MonsterTypes.SYNCHRO}>{MonsterTypes.SYNCHRO}</option>
                </select>
            </div>
        )
    }
}

export {MonsterTypeEditor};