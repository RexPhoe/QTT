import React, { useEffect, useState } from 'react';
import Event from './Event';
import AxisX from './AxisX';
import AxisY from './AxisY';
import styles from './Timeline.module.css';

interface EventData {
    id: number;
    date: string;
    title: string;
    description: string;
    image_url: string;
    location: string;
}

const Timeline: React.FC = () => {
    const [events, setEvents] = useState<EventData[]>([]);
    const [years, setYears] = useState<string[]>([]);
    const [locations, setLocations] = useState<string[]>([]);

    useEffect(() => {
        fetch('/mockupdata.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch mockup data');
                }
                return response.json() as Promise<EventData[]>; // Tipado explícito
            })
            .then((data) => {
                setEvents(data);

                // Extraer años únicos y ordenarlos
                const uniqueYears = Array.from(
                    new Set(data.map((event) => new Date(event.date).getFullYear().toString()))
                ).sort();
                setYears(uniqueYears);

                // Extraer ubicaciones únicas
                const uniqueLocations = Array.from(new Set(data.map((event) => event.location)));
                setLocations(uniqueLocations);
            })
            .catch((error) => {
                console.error('Error loading mockup data:', error);
            });
    }, []);

    // Validación para evitar errores al renderizar
    if (years.length === 0 || locations.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.timelineContainer}>
            {/* Eje X: Lugares */}
            <AxisX places={locations} />
            <div className={styles.gridContainer}>
                {/* Eje Y: Fechas */}
                <AxisY years={years} />
                <div
                    className={styles.grid}
                    style={{
                        gridTemplateColumns: `repeat(${locations.length}, 200px)`, // Ancho fijo para columnas
                        gridTemplateRows: `repeat(${years.length}, 350px)` // Altura fija para filas
                    }}
                >
                    {years.map((year, yearIndex) =>
                        locations.map((location, locationIndex) => {
                            const filteredEvents = events.filter(
                                (event) =>
                                    new Date(event.date).getFullYear().toString() === year && event.location === location
                            );
                            return (
                                <div
                                    key={`cell-${yearIndex}-${locationIndex}`} // Clave única con fila y columna
                                    className={styles.gridCell}
                                >
                                    {filteredEvents.map((event) => (
                                        <Event
                                            key={`event-${event.id}-${yearIndex}-${locationIndex}`} // Clave única con ID, fila y columna
                                            date={event.date}
                                            title={event.title}
                                            description={event.description}
                                            imageUrl={event.image_url}
                                        />
                                    ))}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default Timeline;