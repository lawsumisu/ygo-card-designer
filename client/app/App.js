import React from 'react';
import Card from 'client/app/components/cards/Card';
import CardDownloader from 'client/app/components/cards/CardDownloader';
import {getBrowser} from 'client/app/utilities';
import {BrowserTypes} from 'client/app/constants';
import styles from 'client/app/App.scss';

class App extends React.Component{
  constructor(props){
    super(props);
  }

  getClassNames(){
    let classNames = ['app'];
    const browserType = getBrowser();
    if (browserType === BrowserTypes.CHROME){
      classNames.push('browser-type-chrome');
    }
    else if (browserType === BrowserTypes.FIREFOX){
      classNames.push('browser-type-firefox');
    }
    return classNames.join(' ');
  }

  render(){
    return (
      <div className={this.getClassNames()}>
        <CardDownloader/>
        <Card/>
      </div>
    )
  }
}

export default App;
