import React from 'react';
import { useHttp } from '../../hooks/http';
import './CharPicker.css';

interface People {
  results: {name: string}[]
}

interface Props {
  onCharSelect: (charId: string) => void;
  selectedChar: string;
  side: string
}


const CharPicker: React.FunctionComponent<Props> = (props: Props) => {
  // is a function that is called after the first render is complete similar to compoenent did mount
  // if you want to execute a function before first render just call it above the render since it 
  // goes from top to bottom
  const {isLoading, data} = useHttp<People>('https://swapi.dev/api/people/', [])

  const selectedCharacters = data ? data.results.slice(0, 5).map((char, index) => ({
    name: char.name,
    id: index + 1
  })) : []


  let content = <p>Loading characters...</p>;

  const selectChar = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const charId = event.target.value;
    props.onCharSelect(charId)
}

  if (
    !isLoading &&
    selectedCharacters &&
    selectedCharacters.length > 0
  ) {
    content = (
      <select
        onChange={ e => selectChar(e) }
        value={props.selectedChar}
        className={props.side}
      >
        {selectedCharacters.map(char => (
          <option key={char.id} value={char.id}>
            {char.name}
          </option>
        ))}
      </select>
    );
  } else if (
    !isLoading &&
    (!selectedCharacters || selectedCharacters.length === 0)
  ) {
    content = <p>Could not fetch any data.</p>;
  }
  return content;
}

export default CharPicker;
