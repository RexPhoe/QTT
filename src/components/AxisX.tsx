import React from 'react';
import styles from './AxisX.module.css';

interface AxisXProps {
  places: string[];
}

const AxisX: React.FC<AxisXProps> = ({ places }) => {
  if (!places) return null;

  return (
    <div
      className={styles.axisX}
      style={{
        gridTemplateColumns: `repeat(${places.length}, 1fr)` // Usar la longitud de los lugares para alinear las columnas
      }}
    >
      {places.map((place) => (
        <div key={place} className={styles.place}>
          {place}
        </div>
      ))}
    </div>
  );
};

export default AxisX;