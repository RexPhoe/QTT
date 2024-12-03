import React from 'react';
import styles from './AxisY.module.css';

interface AxisYProps {
  years: string[];
}

const AxisY: React.FC<AxisYProps> = ({ years }) => {
  if (!years) return null;

  return (
    <div className={styles.axisY}>
      {years.map((year, index) => (
        <div key={index} className={styles.year}>
          {year}
        </div>
      ))}
    </div>
  );
};

export default AxisY;