import React from 'react';
import MonsterCard from 'client/app/components/cards/MonsterCard';
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
        <MonsterCard/>
      </div>
    )
  }
}

export default App;
