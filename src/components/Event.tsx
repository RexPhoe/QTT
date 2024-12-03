import React from 'react';
import styles from './Event.module.css';

interface EventProps {
  date: string;
  title: string;
  description: string;
  imageUrl: string;
  location: string;
}

const Event: React.FC<EventProps> = ({ date, title, description, imageUrl, location }) => {
  return (
    <div className={styles.event}>
      <img src={imageUrl} alt={title} className={styles.image} />
      <div className={styles.details}>
        <h2>{title}</h2>
        <p>{location}</p>
        <p><strong>Date:</strong> {date}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Event;