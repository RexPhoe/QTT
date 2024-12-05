// AxisX.tsx
import React from 'react';
import styles from './AxisX.module.css';

interface Location {
    id: string;
    name: string;
}

interface LocationGroup {
    group_name: string;
    locations: Location[];
}

interface AxisXProps {
    groupedLocations: LocationGroup[];
}

const AxisX: React.FC<AxisXProps> = ({ groupedLocations }) => {
    return (
        <div className={styles.axisXContainer}>
            {/* First row: Group names */}
            <div className={styles.groupRow}>
                {groupedLocations.map((group) => (
                    <div
                        key={`group-${group.group_name}`}
                        className={styles.groupCell}
                        style={{ gridColumn: `span ${group.locations.length}` }}
                    >
                        {group.group_name}
                    </div>
                ))}
            </div>
            {/* Second row: Place names */}
            <div className={styles.placeRow}>
                {groupedLocations.flatMap((group) =>
                    group.locations.map((location) => (
                        <div
                            key={`place-${location.id}`}
                            className={styles.placeCell}
                        >
                            {location.name}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AxisX;