import React from 'react';
import Metronome from './Metronome';
import CircleOfFifths from './CircleOfFifths';

function App() {
  return (
    <div className="App" style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f5f5f5' }}>
      <h1>Music Practice App</h1>
      <Metronome />
      <CircleOfFifths />
    </div>
  );
}

export default App;
