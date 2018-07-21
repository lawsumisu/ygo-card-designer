import React from 'react';
import Card from 'client/app/components/cards/Card';
import {getBrowser} from 'client/app/utilities';
import {BrowserTypes} from 'client/app/constants';
import 'client/app/App.scss';
import classNames from 'classnames';

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
        <Card/>
      </div>
    )
  }
}

export default App;
