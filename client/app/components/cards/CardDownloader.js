import React from 'react';
import $ from 'jquery';
import domtoimage from 'dom-to-image';
import FileSaver from 'file-saver';
import {connect} from 'react-redux';
import {browserIsFirefox}  from 'client/app/utilities';

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
            });

            //There is a regression in Firefox that affects persisting the embedded imgs as part of the file: https://bugzilla.mozilla.org/show_bug.cgi?id=1409992
            //It's apparently fixed in FF 58, which is currently in development. In the meantime, workaround is to transfer img src as background-image. 
            if (browserIsFirefox()){
                $('.ygo-card-content').find('img').each(function() {
                const src=$(this).attr('src');
                $(this).css('background-image','url("'+src+'")');
                $(this).css('background-size','contain');
                $(this).css('image-rendering', 'auto');
                });
            }
            
            domtoimage.toBlob($('.ygo-card-content')[0], {type: "image/png"}).then((blob) =>{
                FileSaver.saveAs(blob, this.getCardFileName());
                //Need to restore css if it was modified
                if (browserIsFirefox()){
                    $('.ygo-card-content').find('img').each(function() {
                    $(this).css('background-image', '');
                    $(this).css('background-size','');
                    $(this).css('image-rendering', '');
                    });
                }
                this.setState({
                    loading: false
                })
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