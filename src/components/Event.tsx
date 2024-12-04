import React from 'react';
import Characters from './Characters';
import styles from './Event.module.css';

interface Character {
  id: number;
  name: string;
  image_url: string;
}

interface EventProps {
  date: string;
  title: string;
  description: string;
  imageUrl: string;
  characters: Character[];
  cellId: string;
  zIndex: number; // Control del apilamiento
  horizontalOffset: number; // Desplazamiento horizontal
  verticalOffset: number; // Desplazamiento vertical
}

const Event: React.FC<EventProps> = ({
  date,
  title,
  description,
  imageUrl,
  characters,
  cellId,
  zIndex,
  horizontalOffset,
  verticalOffset,
}) => {
  return (
    <div
      className={styles.event}
      style={{
        zIndex,
        position: 'absolute', // Para superponer eventos dentro de la celda
        left: `${horizontalOffset}px`, // Desplazamiento horizontal dentro de la celda
        top: `${verticalOffset}px`, // Desplazamiento vertical dentro de la celda
      }}
    >
      <header><h2>{title}</h2></header>
      <img src={imageUrl} alt={title} className={styles.image} />
      <Characters characters={characters} cellId={cellId} />
      <div className={styles.details}>
        <p><strong>Date:</strong> {date}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Event;