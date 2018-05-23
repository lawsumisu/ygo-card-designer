import React from 'react';
import _ from 'lodash';
import level from 'client/app/assets/Level2.png';
import style from 'client/app/components/common/formattableTextarea/FormattableTextarea.scss';

const delimiter = '!_!'
class FormattableTextarea extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            text: ''
        };
    }

    getDelimitedText(text){
        return `${delimiter}${text}${delimiter}`;
    }

    handleOnClick(event){
        event.preventDefault();
        this.textarea.click()
    }

    renderFormattedText(){
        const processedText = this.state.text.replace(/{level}/g, this.getDelimitedText('level')).replace(/\n/g, this.getDelimitedText('\n'));

        return (
            _.chain(processedText)
            .split(delimiter)
            .filter((text) => {return !_.isEmpty(text)})
            .map((text) => {
                if (text === 'level'){
                    return <img src={level}/>
                }
                else if (text === '\n'){
                    return <br/>
                }
                else{
                    return <span>{text}</span>
                }
            })
            .value()
        );
    }

    render(){
        return (
            <div className="formattable-textarea--container">
                <textarea 
                    ref={(element) => this.textarea = element}
                    value={this.state.text} onChange={(event) => this.setState({text: event.target.value})}
                    onClick={(event) => console.log('hello')}
                />
                <div onClick={(event) => this.textarea.click()}>
                    {this.renderFormattedText()}
                </div>
            </div>
        );
    }
}

export {FormattableTextarea};