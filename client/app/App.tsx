import React from 'react';
import {getBrowser} from 'client/app/utilities';
import {BrowserTypes} from 'client/app/constants';
import 'client/app/App.scss';
import classNames from 'classnames';
import CardGallery from 'client/app/components/cards/CardGallery';
import { TopBar } from 'client/app/components/topBar/topBar.component';
import SetGallery from 'client/app/components/setGallery/setGallery.component';

class App extends React.Component{
  constructor(props){
    super(props);
  }

  getClassNames(): string[]{
    let output: string[] = ['app'];
    const browserType = getBrowser();
    if (browserType === BrowserTypes.CHROME){
      output.push('browser-type-chrome');
    }
    else if (browserType === BrowserTypes.FIREFOX){
      output.push('browser-type-firefox');
    }
    return output;
  }

  render(){
    const browserType = getBrowser();
    return (
      <div className={classNames(this.getClassNames())}>
        <TopBar/>
        <div className='app-content--container'>
          <div>
            <SetGallery/>
          </div>
          <div className='canvas--container'>
            <CardGallery/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
