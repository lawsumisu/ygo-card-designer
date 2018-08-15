import React from 'react';
import image from 'client/app/assets/BlueEyesWhiteDragon.png';
import {MonsterTypes, CardTypes} from 'client/app/constants';

class ImageSelector extends React.Component{
    constructor(props){
        super(props);
    }

    updateImage(event){
        var file = event.target.files[0];
        var imageType = /^image\//;

        if (imageType.test(file.type)) {
            var reader = new FileReader();
            reader.onload = (event) => {
                this.props.onChange(event);
            };
            reader.readAsDataURL(file);
        }
    }

    loadImageFromFile(){
        if (this.fileLoaderButton){
            this.fileLoaderButton.click();
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
            >
                <input
                  ref={(element) => this.fileLoaderButton = element}
                  type="file"
                  id="ygo-card-image-file-loader"
                  accept="image/*"
                  onChange={(event) => this.updateImage(event)}/>
              {this.props.imageSrc ? <img src={this.props.imageSrc} onClick={() => this.loadImageFromFile()}/> : null}
            </div>
        )
    }
}

export {ImageSelector};