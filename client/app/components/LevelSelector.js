import React from 'react';
import level from '../assets/Level.png';

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
        var className = [];
        if (isSelected) className.push('ygo-card-level-selected');
        else className.push('ygo-card-level-unselected');

        if (isHovered) className.push('ygo-card-level-hovered');

        return (
            /*<span 
                className={className.join(' ')}
                onMouseEnter={(event) => this.updateHover(index)}
                onClick={(event) => this.props.updateLevel(index)}
                key={index}>
                    {'\u272a'}
            </span>*/
            <img 
                src={level} 
                className={className.join(' ')}                
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


    render(){
        return (
            <div 
                className="ygo-card-level"
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