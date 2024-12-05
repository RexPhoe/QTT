import React from 'react';
import { useCharacters } from './hooks/useCharacters';
import styles from './Characters.module.css';
import { Character } from '../types';

interface CharactersProps {
  characters: Character[];
  cellId: string;
}

const Characters: React.FC<CharactersProps> = ({ characters, cellId }) => {
  const { visibleCharacters, extraCount } = useCharacters({ characters, cellId });

  if (!visibleCharacters || visibleCharacters.length === 0) {
    return null; // No mostrar nada si no hay personajes
  }

  return (
    <div className={styles.charactersContainer}>
      {visibleCharacters.map((character) => (
        <div
          key={`character-${character.id}-${cellId}`}
          className={styles.character}
        >
          <img
            src={character.image_url}
            alt={character.name}
            className={styles.characterImage}
          />
        </div>
      ))}
      {extraCount > 0 && (
        <div className={styles.extraCharacters}>
          +{extraCount}
        </div>
      )}
    </div>
  );
};

export default Characters;