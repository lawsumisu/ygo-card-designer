import React from 'react';
import {getBrowser} from 'client/app/utilities';
import {BrowserTypes} from 'client/app/constants';
import 'client/app/App.scss';
import classNames from 'classnames';
import CardGallery from "client/app/components/cards/CardGallery";

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
        <div className="navigation-bar--container">
          Navigation Bar
          <div className="account-management--container">
            Account Management
            <div>Username</div>
            <input type="button" value="Login"/>
          </div>
        </div>
        <div className="app-content--container">
          <div>Menu location</div>
          <div className='canvas--container'>
            <CardGallery/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
