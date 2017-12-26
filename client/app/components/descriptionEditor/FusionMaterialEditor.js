import React from 'react';

class FusionMaterialEditor extends React.Component{
    constructor(props){
        super(props);
    }

    handleOnChange(event){

    }

    getFusionMaterialsAsDisplay(){
        
    }

    render(){
        return (
            <div>
                <div></div>
                <input
                    className="ygo-card-fusion-material-input"
                    onChange={(event) => this.handleOnChange(event)}/>
            </div>
        )
    }
}