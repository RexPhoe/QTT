// hooks/useEvent.ts
import { CSSProperties , useMemo } from 'react';

interface Character {
  id: number;
  name: string;
  image_url: string;
}

interface UseEventProps {
  date: string;
  title: string;
  description: string;
  imageUrl: string;
  characters: Character[];
  cellId: string;
  zIndex: number;
  horizontalOffset: number;
  verticalOffset: number;
}

export const useEvent = ({
  date,
  title,
  description,
  imageUrl,
  characters,
  cellId,
  zIndex,
  horizontalOffset,
  verticalOffset,
}: UseEventProps) => {
  // Memorizar los estilos y datos relacionados con el evento
  const eventStyles : CSSProperties = useMemo(() => ({
    zIndex,
    position: 'absolute',
    left: `${horizontalOffset}px`,
    top: `${verticalOffset}px`,
  }), [zIndex, horizontalOffset, verticalOffset]);

  return {
    date,
    title,
    description,
    imageUrl,
    characters,
    cellId,
    eventStyles,
  };
};