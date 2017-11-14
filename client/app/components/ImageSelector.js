import React from 'react';
import image from '../assets/BlueEyesWhiteDragon.png';

class ImageSelector extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            imageSrc: image
        }
    }

    updateImage(event){
        console.log(event.target.files)
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

    render(){
        return (
            <div 
                className="ygo-card-image"
                onClick={(event) => this.loadImageFromFile()}>
                <input type="file" id="ygo-card-image-file-loader" accept="image/*" onChange={(event) => this.updateImage(event)}/>
                <img src={this.state.imageSrc}/>
            </div>
        )
    }
}

export {ImageSelector};