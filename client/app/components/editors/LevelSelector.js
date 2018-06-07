import React from 'react';
import level from 'client/app/assets/Level2.png';
import ultimateRareLevel from 'client/app/assets/Level-UtR.png';
import rank from 'client/app/assets/Series 9/Rank.png';
import negativeLevel from 'client/app/assets/NegativeLevel.png';
import {MonsterTypes, Rarities} from 'client/app/constants';

/**
 * Component for setting the level of a card.
 * 
 * Props:
 * level: Level of this card (int)
 * updateLevel: callback for updating the level of a card (function(int))
 */
class LevelSelector extends React.Component {
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
        var classNames = [];
        if (isSelected) classNames.push('ygo-card-level-selected');
        else classNames.push('ygo-card-level-unselected');

        if (isHovered) classNames.push('ygo-card-level-hovered');
        let starImg = level;
        if (this.props.monsterType === MonsterTypes.DARK_SYNCHRO) starImg = negativeLevel;
        else if (this.props.monsterType === MonsterTypes.XYZ) starImg = rank;

        if (this.props.rarity === Rarities.ULTIMATE_RARE){
            starImg = ultimateRareLevel;
        }

        return (
            <img 
                src={starImg} 
                className={classNames.join(' ')}                
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
        let classNames = ['ygo-card-level'];
        if (this.props.monsterType === MonsterTypes.XYZ){
            classNames.push('ygo-card-stars-rank');
        }
        else if (this.props.monsterType === MonsterTypes.DARK_SYNCHRO){
            classNames.push('level--stars--negative');
        }
        else if (this.props.monsterType === MonsterTypes.LINK){
            classNames.push('level--editor--invisible');
        }
        return classNames.join(' ');
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

export {LevelSelector};