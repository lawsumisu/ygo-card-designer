import React from 'react';
import Card from './Card';
import CardDownloader from './CardDownloader';
import styles from './App.scss';

class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="app">
        <CardDownloader/>
        <Card/>
      </div>
    )
  }
}

export default App;
