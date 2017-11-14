import React from 'react';
import {ResizableInput} from './common/ResizableInput';

class NameEditor extends React.Component{
    constructor(props){
        super(props)
    }

    updateInput(event){
        
    }

    render(){
        <ResizableInput 
            className="ygo-card-name"
            type="text" 
            value={this.props.cardState.name} 
            onChange={(event) => this.props.updateName(event.target.value)}/>
    }


}