import React from 'react';
import Card from 'client/app/components/cards/Card';
import CardDownloader from 'client/app/components/cards/CardDownloader';
import styles from 'client/app/App.scss';

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
