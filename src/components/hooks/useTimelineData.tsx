import { useState, useEffect } from 'react';

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

interface TimelineData {
  events: EventData[];
  years: string[];
  groupedLocations: LocationGroup[];
  isLoading: boolean;
  error: string | null;
}

export const useTimelineData = (): TimelineData => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [groupedLocations, setGroupedLocations] = useState<LocationGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/mockupdata.json');
        if (!response.ok) {
          throw new Error('Failed to fetch mockup data');
        }
        const data = (await response.json()) as EventData[];

        // Procesar eventos
        setEvents(data);

        // Extraer años únicos y ordenarlos
        const uniqueYears = Array.from(
          new Set(data.map((event) => new Date(event.date).getFullYear().toString()))
        ).sort();
        setYears(uniqueYears);

        // Agrupar lugares por grupo
        const grouped = data.reduce((acc: Record<string, LocationGroup>, event) => {
          const { group_name, group_id, id, name } = event.location;
          if (!acc[group_id]) {
            acc[group_id] = { group_name, locations: [] };
          }
          if (!acc[group_id].locations.some((loc) => loc.id === id)) {
            acc[group_id].locations.push({ id, name });
          }
          return acc;
        }, {});

        setGroupedLocations(Object.values(grouped));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { events, years, groupedLocations, isLoading, error };
};