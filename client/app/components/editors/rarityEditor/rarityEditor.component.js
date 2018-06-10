import React from 'react';
import {Rarities} from 'client/app/constants';
import 'client/app/components/editors/rarityEditor/rarityEditor.scss';

export class RarityEditor extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="rarity-editor--container">
                Rarity: 
                <select value={this.props.rarity} onChange={(event) => this.props.updateRarity(event.target.value)}>
                    {_.map(Rarities, (rarity) => {
                        return (
                            <option key={rarity} value={rarity}>{rarity}</option>
                        )
                    })}
                </select>
            </div>
        );
    }
}