import React from 'react';
import Container from '@material-ui/core/Container';
import './App.css';
import Navbar from './components/navbar/navbar.component'
import ElementContainer from './components/element-container/element-container.component'
class App extends React.Component {
  constructor(props) {
    super(props);


    this.state = {

    };
  }

  

  
  
  render(){
    console.log('render app')
    return (
      <div className="App">
        <Navbar onSort={this.handleSort} onGenerateNewArray={this.generateNewArray} onSliderChange={this.handleSliderChange} onSpeedChange={this.handleSpeedChange}/>
        <Container maxWidth={false}>
          <ElementContainer multicolor={false}/>
        </Container>
      </div>
    );
  }
  
}

export default App;
