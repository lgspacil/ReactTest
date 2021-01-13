import React, { useState } from 'react';

import CharPicker from './components/CharPicker';
import Character from './components/Character';

const StarWars: React.FunctionComponent = () => {

  const [destroyed, setDestroyed] = useState(false)
  const [selectedCharacter, setSelectedCharacter] = useState('1')
  const [choseSide, setChosenSide] = useState('light');

  const sideHandler = (side: string) => {
    setChosenSide(side);
  };

  const charSelectHandler = (id: string) => {
    setSelectedCharacter(id)
  };

  const destructionHandler = () => {
    setDestroyed(true);
  };


  let content = (
    <React.Fragment>
      <CharPicker
        side={choseSide}
        selectedChar={selectedCharacter}
        onCharSelect={charSelectHandler}
      />
      <Character selectedChar={selectedCharacter} />
      <button onClick={sideHandler.bind(this, 'light')}>
        Light Side
        </button>
      <button onClick={sideHandler.bind(this, 'dark')}>Dark Side</button>
      {choseSide === 'dark' && (
        <button onClick={destructionHandler}>DESTROY!</button>
      )}
    </React.Fragment>
  );

  if (destroyed) {
    content = <h1>Total destruction!</h1>;
  }
  return content;
}

export default StarWars;
