import React from 'react';
import styles from './Event.module.css';

interface EventProps {
  date: string;
  title: string;
  description: string;
  imageUrl: string;
}

const Event: React.FC<EventProps> = ({ date, title, description, imageUrl }) => {
  return (
    <div className={styles.event}>
      <header><h2>{title}</h2></header>
      <img src={imageUrl} alt={title} className={styles.image} />
      <div className={styles.details}>        
        <p><strong>Date:</strong> {date}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Event;