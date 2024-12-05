import { useMemo } from 'react';

interface EventData {
  id: number;
  date: string;
  title: string;
  description: string;
  image_url: string;
  location: {
    id: string;
    name: string;
    group_id: string;
    group_name: string;
  };
  characters: [];
}

interface LocationGroup {
  group_name: string;
  locations: { id: string; name: string }[];
}

interface EventMatrixCell {
  year: string;
  locationId: string;
  events: EventData[];
  extraEventCount: number;
}

export const useEventMatrix = (
  events: EventData[],
  years: string[],
  groupedLocations: LocationGroup[]
): EventMatrixCell[][] => {
  return useMemo(() => {
    // Generar matriz
    return years.map((year) =>
      groupedLocations.flatMap((group) =>
        group.locations.map((location) => {
          // Filtrar eventos para este año y ubicación
          const filteredEvents = events.filter(
            (event) =>
              new Date(event.date).getFullYear().toString() === year &&
              event.location.id === location.id
          );

          // Crear celda de matriz
          return {
            year,
            locationId: location.id,
            events: filteredEvents.slice(0, 3), // Mostrar hasta 3 eventos
            extraEventCount: Math.max(0, filteredEvents.length - 3), // Contar eventos extra
          };
        })
      )
    );
  }, [events, years, groupedLocations]);
};