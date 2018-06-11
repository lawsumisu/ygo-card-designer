import React from 'react';
import classNames from 'classnames';
import level from 'client/app/assets/Level2.png';
import rank from 'client/app/assets/Series 9/Rank.png';
import negativeLevel from 'client/app/assets/NegativeLevel.png';
import {MonsterTypes} from 'client/app/constants';

import 'client/app/components/editors/starEditor/starEditor.scss';

/**
 * Component for setting the level of a card.
 * 
 * Props:
 * level: Level of this card (int)
 * updateLevel: callback for updating the level of a card (function(int))
 */
export class StarEditor extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isEditing: false,
            currentHoveredLevel: 0  
        }
    }

    getLevel(){
        return Math.min(this.props.level, 12)
    }

    updateHover(index){
        this.setState({
            currentHoveredLevel: index
        });
    }

    updateEditState(editState){
        this.setState({
            isEditing: editState
        });
    }

    getStarAsDisplay(isSelected, isHovered, index){
        var starClassNames = [];
        if (isSelected) starClassNames.push('star--selected');
        else starClassNames.push('star--unselected');

        if (isHovered) starClassNames.push('star--hovered');
        let starImg = level;
        if (this.props.monsterType === MonsterTypes.DARK_SYNCHRO) starImg = negativeLevel;
        else if (this.props.monsterType === MonsterTypes.XYZ) starImg = rank;

        return (
            <img 
                src={starImg} 
                className={classNames(starClassNames)}                
                onMouseEnter={(event) => this.updateHover(index)}
                onClick={(event) => this.props.updateLevel(index)}
                key={index}/>
        )
    }

    getStarsAsDisplay(){
        var display = [];
        var currentLevel = this.getLevel();
        for (let i = 1; i <= 12; ++i){
            let isSelected = i <= currentLevel;
            let isHovered = this.state.isEditing && i <= this.state.currentHoveredLevel;
            display.push(this.getStarAsDisplay(isSelected, isHovered, i));
            
        }
        return display;
    }

    getClassNames(){
        let containerClassNames = ['star-editor--container'];
        if (this.props.monsterType === MonsterTypes.XYZ){
            containerClassNames.push('star-editor--rank');
        }
        else if (this.props.monsterType === MonsterTypes.DARK_SYNCHRO){
            containerClassNames.push('star-editor--negative');
        }
        else if (this.props.monsterType === MonsterTypes.LINK){
            containerClassNames.push('star-editor--invisible');
        }
        return classNames(containerClassNames);
    }


    render(){
        return (
            <div 
                className={this.getClassNames()}
                onMouseEnter={(event) => this.updateEditState(true)}
                onMouseLeave={(event) => this.updateEditState(false)}>
                {
                   this.getStarsAsDisplay()
                }
            </div>
        )
    }
}