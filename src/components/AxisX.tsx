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
        gridTemplateColumns: `200px repeat(${places.length}, 200px)` // La primera columna es del mismo ancho que las celdas del eje Y
      }}
    >
      <div className={styles.emptyCell}></div> {/* Celda vacía inicial */}
      {places.map((place) => (
        <div key={place} className={styles.place}>
          {place}
        </div>
      ))}
    </div>
  );
};

export default AxisX;