import React, { useState, useEffect } from 'react';
import { useHttp } from '../../hooks/http';

import Summary from './Summary';

interface Props {
  selectedChar: string;
}

interface Person {
  name: string;
  height: string;
  hair_color: string;
  skin_color: string;
  gender: string;
  films: string[]
}

const Character: React.FunctionComponent<Props> = (props: Props) => {

  const {isLoading, data} = useHttp<Person>('https://swapi.dev/api/people/' + props.selectedChar, [props.selectedChar]);

  let loadedCharacter = null;
  if (data) {
    loadedCharacter = {
      id: props.selectedChar,
      name: data.name,
      height: data.height,
      colors: {
        hair: data.hair_color,
        skin: data.skin_color
      },
      gender: data.gender,
      movieCount: data.films.length
    };
  }

  useEffect(() => {
    return () => {
      console.log('component did unmount');
    }
  }, [])

  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedCharacter) {
    content = (
      <Summary
        name={loadedCharacter.name}
        gender={loadedCharacter.gender}
        height={loadedCharacter.height}
        hairColor={loadedCharacter.colors.hair}
        skinColor={loadedCharacter.colors.skin}
        movieCount={loadedCharacter.movieCount}
      />
    );
  } else if (!isLoading && !loadedCharacter) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
}

export default Character;
