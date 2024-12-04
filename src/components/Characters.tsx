import React from 'react';
import styles from './Characters.module.css';

interface Character {
  id: number;
  name: string;
  image_url: string;
}

interface CharactersProps {
  characters: Character[];
  cellId: string; // Identificador único de celda
}

const Characters: React.FC<CharactersProps> = ({ characters, cellId }) => {
  if (!characters || characters.length === 0) {
    return null; // No mostrar nada si no hay personajes
  }

  // Mostrar un máximo de 4 personajes
  const maxVisible = 4;
  const visibleCharacters = characters.slice(0, maxVisible);
  const extraCount = characters.length - maxVisible;

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