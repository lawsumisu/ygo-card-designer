import React from 'react';
import image from 'client/app/assets/BlueEyesWhiteDragon.png';
import {MonsterTypes, CardTypes} from 'client/app/constants';

class ImageSelector extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            imageSrc: image
        }
    }

    updateImage(event){
        var file = event.target.files[0];
        var imageType = /^image\//;

        if (imageType.test(file.type)) {
            var reader = new FileReader();
            reader.onload = (event) => {
                this.setState({
                    imageSrc: event.target.result
                });
            };
            reader.readAsDataURL(file);
    }
}

    loadImageFromFile(){
        var fileLoader = document.getElementById("ygo-card-image-file-loader");
        if (fileLoader){
            fileLoader.click();
        }
    }

    getClassNames(){
        let classNames = ['ygo-card-image'];
        if (this.props.monsterHybridType === MonsterTypes.PENDULUM && this.props.cardType === CardTypes.MONSTER && this.props.monsterType !== MonsterTypes.LINK){
            classNames.push('ygo-card-image-pendulum');
        }
        return classNames.join(' ');
    }

    render(){
        return (
            <div 
                className={this.getClassNames()}
                onClick={(event) => this.loadImageFromFile()}>
                <input type="file" id="ygo-card-image-file-loader" accept="image/*" onChange={(event) => this.updateImage(event)}/>
                <img src={this.state.imageSrc}/>
            </div>
        )
    }
}

export {ImageSelector};