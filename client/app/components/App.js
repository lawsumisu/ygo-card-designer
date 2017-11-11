import React from 'react';
import Card from './Card';
import styles from './App.scss';

class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="app">
        <Card/>
      </div>
    )
  }
}

export default App;
