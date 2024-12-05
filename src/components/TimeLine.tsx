import React from 'react';
import Event from './Event';
import AxisY from './AxisY';
import AxisX from './AxisX';
import { useTimelineData } from './hooks/useTimelineData';
import { useEventMatrix } from './hooks/useEventMatrix';
import styles from './Timeline.module.css';

const Timeline: React.FC = () => {
  const { events, years, groupedLocations, isLoading, error } = useTimelineData();
  const eventMatrix = useEventMatrix(events, years, groupedLocations);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.timelineContainer}>
      {/* Eje X: Groups and Places */}
      <AxisX groupedLocations={groupedLocations} />

      {/* Events grid */}
      <div className={styles.gridContainer}>
        <AxisY years={years} />
        <div
          className={styles.grid}
          style={{
            gridTemplateColumns: `repeat(${groupedLocations.flatMap((group) => group.locations).length}, 200px)`,
            gridTemplateRows: `repeat(${years.length}, 350px)`,
          }}
        >
          {eventMatrix.flatMap((row) =>
            row.map((cell) => (
              <div
                key={`cell-${cell.year}-${cell.locationId}`}
                className={styles.gridCell}
              >
                {cell.events.map((event, eventIndex) => (
                  <Event
                    key={`event-${event.id}`}
                    cellId={`cell-${cell.year}-${cell.locationId}`}
                    date={event.date}
                    title={event.title}
                    description={event.description}
                    imageUrl={event.image_url}
                    characters={event.characters}
                    zIndex={eventIndex + 1}
                    horizontalOffset={eventIndex * 10}
                    verticalOffset={eventIndex * 20}
                  />
                ))}
                {cell.extraEventCount > 0 && (
                  <div className={styles.extraEvents}>+{cell.extraEventCount}</div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Timeline;