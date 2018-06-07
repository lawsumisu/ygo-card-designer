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
                {/*<img src={this.state.imageSrc}/>*/}
                <svg>
                    <defs>
                        <filter id="f1">
                            <feColorMatrix in="SourceGraphic"
                                type="luminanceToAlpha" />
                            <feDiffuseLighting surfaceScale="3" diffuseConstant=".5" lightingColor="white" result="diffuse1">
                                <feDistantLight azimuth="225" elevation="10"/>
                            </feDiffuseLighting>
                            <feComposite in="diffuse1" in2="SourceGraphic" result="composite1" operator="arithmetic" k1="3" k2=".5" k3="0" k4="0"/>
                            <feComposite in="composite1" in2="SourceGraphic" result="composite2" operator="arithmetic" k1="1" k2=".5" k3=".2"/>
                            <feOffset in="composite2" dx="1" dy="1"/>
                        </filter>
                        <filter id="f2">
                            <feColorMatrix in="SourceGraphic" result="color1"
                                type="luminanceToAlpha" />
                            <feDiffuseLighting surfaceScale="-5" diffuseConstant=".5" lightingColor="white" result="diffuse1">
                                <feDistantLight azimuth="225" elevation="20"/>
                            </feDiffuseLighting>
                            <feComposite in="diffuse1" in2="SourceGraphic" operator="arithmetic" k1="1" k2="1" k3="1" result="composite1"/>
                            <feBlend in="color1" in2="composite1" mode="multiply" result="blend1"/>
                            <feComposite in="blend1" in2="blend1" result="composite2" operator="arithmetic" k2="1.2"/>
                            <feComposite in="composite2" in2="SourceGraphic" result="composite3" operator="in" />
                        </filter>
                        <filter id="f3">
                            <feColorMatrix in="SourceGraphic" type="luminanceToAlpha" />
                            <feDiffuseLighting surfaceScale="-5" diffuseConstant=".5" lightingColor="white" result="diffuse1">
                                <feDistantLight azimuth="225" elevation="20"/>
                            </feDiffuseLighting>
                            <feComposite in="diffuse1" in2="SourceGraphic" operator="arithmetic" k1="1" k2="1" k3="1" result="composite1"/>
                            <feBlend in="color1" in2="composite1" mode="multiply" result="blend1"/>
                            <feComposite in="blend1" in2="blend1" result="composite2" operator="arithmetic" k2="1.2"/>
                            <feComposite in="composite2" in2="SourceGraphic" result="composite3" operator="in" />
                            <feColorMatrix in="composite3" type="luminanceToAlpha" result="color2" />
                            <feDiffuseLighting in="color2" surfaceScale="3" diffuseConstant=".5" lightingColor="white" result="diffuse2">
                                <feDistantLight azimuth="225" elevation="10"/>
                            </feDiffuseLighting>
                            <feComposite in="diffuse2" in2="SourceGraphic" result="composite4" operator="arithmetic" k1="3" k2=".5" k3="0" k4="0"/>
                            <feComposite in="composite4" in2="SourceGraphic" result="composite5" operator="arithmetic" k1="1" k2=".5" k3=".2"/>
                            <feOffset in="composite5" dx="1" dy="1"/>
                        </filter>
                    </defs>
                    <image x="0" y="0" width="100%" height="100%" filter="url(#f1)" xlinkHref={this.state.imageSrc}/>
                </svg>
            </div>
        )
    }
}

export {ImageSelector};