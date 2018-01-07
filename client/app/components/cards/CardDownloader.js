import React from 'react';
import $ from 'jquery';
import domtoimage from 'dom-to-image';
import FileSaver from 'file-saver';
import {connect} from 'react-redux';

class CardDownloader extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            loading: false
        }
    }

    getLabel(){
        return this.state.loading ? 'Loading' : 'Download';
    }

    getCardFileName(){
        return this.props.cardName.replace(/\s+/g, '') + '.png';
    }

    handleOnClick(event){
        if (!this.state.loading){
            this.setState({
                loading: true
            }, () => {
                domtoimage.toBlob($('.ygo-card-content')[0]).then((blob) =>{
                    FileSaver.saveAs(blob, this.getCardFileName());
                    this.setState({
                        loading: false
                    })
                });
            });
        }
    }

    render(){
        return (
            <input type="button" value={this.getLabel()} onClick={(event) => this.handleOnClick(event)}/>
        )
    }
}

// Hook up Redux store state to props of this Component.
const mapStateToProps = function(state){
    return {
        cardName: state.cardReducer.name
    }
}

export default connect(mapStateToProps)(CardDownloader);