import React from 'react';
import $ from 'jquery';
import domtoimage from 'client/app/utilities/domToImage';
import FileSaver from 'file-saver';
import {browserIsFirefox} from 'client/app/utilities';

export class CardDownloader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      isReady: true
    }
  }

  getLabel() {
    return this.state.loading ? 'Loading' : 'Download';
  }

  getCardFileName() {
    return this.props.cardName.replace(/\s+/g, '') + '.png';
  }

  handleOnClick(event) {
    if (!this.state.loading) {
      this.setState({
        loading: true
      });

      const performDownload = () => this.download().then(() => {
        if (this.props.postprocessor) {
          this.props.postprocessor();
        }
        this.setState({
          loading: false
        });
      });

      if (this.props.preprocessor) {
        setTimeout(() => this.props.preprocessor(performDownload));
      } else {
        setTimeout(performDownload);
      }
    }

  }

  performDownload(){
    this.download().then(() => {
      if (this.props.postprocessor) {
        this.props.postprocessor();
      }
      this.setState({
        loading: false
      });
    });
  }

  download(){
    const element = this.props.getElement();
    //There is a regression in Firefox that affects persisting the embedded imgs as part of the file: https://bugzilla.mozilla.org/show_bug.cgi?id=1409992
    //It's apparently fixed in FF 58, which is currently in development. In the meantime, workaround is to transfer img src as background-image.
    if (browserIsFirefox()) {
      $(element).find('img').each(function () {
        const src = $(this).attr('src');
        $(this).css('background-image', 'url("' + src + '")');
        $(this).css('background-size', 'contain');
        $(this).css('image-rendering', 'auto');
      });
    }

    return domtoimage.toBlob(element, {style: this.props.style || {}}).then((blob) => {
      FileSaver.saveAs(blob, this.getCardFileName());
      //Need to restore css if it were modified
      if (browserIsFirefox()) {
        $(element).find('img').each(function () {
          $(this).css('background-image', '');
          $(this).css('background-size', '');
          $(this).css('image-rendering', '');
        });
      }

      this.setState({
        loading: false
      })
    });
  }

  render() {
    return (
      <input className="card-downloader--button" type="button" value={this.getLabel()}
             onClick={(event) => this.handleOnClick(event)}/>
    )
  }
}