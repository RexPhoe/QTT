import { useMemo } from 'react';

interface Character {
  id: number;
  name: string;
  image_url: string;
}

interface UseCharactersProps {
  characters: Character[];
  cellId: string;
}

export const useCharacters = ({ characters }: UseCharactersProps) => {
  const maxVisible = 4;

  // Memorizar los personajes visibles y extras
  const { visibleCharacters, extraCount } = useMemo(() => {
    const visible = characters.slice(0, maxVisible);
    const extra = characters.length - maxVisible;
    return {
      visibleCharacters: visible,
      extraCount: extra,
    };
  }, [characters]);

  return {
    visibleCharacters,
    extraCount,
  };
};