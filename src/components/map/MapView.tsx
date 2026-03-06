import { Map } from 'pigeon-maps';
import Marker from 'pigeon-maps/marker';
import { useCallback, useMemo, useState } from 'react';
import { MOSCOW_CENTER } from '../../constants/mapConstants';
import { places } from '../../data/places';
import type { Place } from '../../data/places';
import { getMarkerTheme } from '../../utils/helpers';

function osmProvider(x: number, y: number, z: number) {
  const s = String.fromCharCode(97 + ((x + y) % 3)); // a|b|c
  return `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`;
}

interface MapViewProps {
  visitedPlaces: number[];
  onMarkerClick: (place: Place) => void;
}

export function MapView({ visitedPlaces, onMarkerClick }: MapViewProps) {
  const [center, setCenter] = useState<[number, number]>(MOSCOW_CENTER);
  const [zoom, setZoom] = useState(11);

  const clampZoom = useCallback((z: number) => Math.min(18, Math.max(3, z)), []);

  const handleBoundsChanged = useCallback(
    ({ center: nextCenter, zoom: nextZoom }: { center: [number, number]; zoom: number }) => {
      setCenter(nextCenter);
      setZoom(nextZoom);
    },
    [],
  );

  const markerSvg = useCallback((color: string, emoji: string) => {
    return (
      <svg width="15%" height="15%" viewBox="0 0 61 71" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g style={{ pointerEvents: 'auto' }}>
          <path
            d="M52 31.5C52 36.8395 49.18 42.314 45.0107 47.6094C40.8672 52.872 35.619 57.678 31.1763 61.6922C30.7916 62.0398 30.2084 62.0398 29.8237 61.6922C25.381 57.678 20.1328 52.872 15.9893 47.6094C11.82 42.314 9 36.8395 9 31.5C9 18.5709 18.6801 9 30.5 9C42.3199 9 52 18.5709 52 31.5Z"
            fill={color}
            stroke="white"
            strokeWidth="4"
          />
          <circle cx="30.5" cy="30.5" r="9.5" fill="white" opacity="0.92" />
          <text
            x="30.5"
            y="31"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="16"
          >
            {emoji}
          </text>
        </g>
      </svg>
    );
  }, []);

  const zoomIn = useCallback(() => setZoom((z) => clampZoom(z + 1)), [clampZoom]);
  const zoomOut = useCallback(() => setZoom((z) => clampZoom(z - 1)), [clampZoom]);

  const visitedSet = useMemo(() => new Set(visitedPlaces), [visitedPlaces]);

  return (
    <div className="map-wrapper soft-card">
      <Map
        center={center}
        zoom={zoom}
        provider={osmProvider}
        attribution={false}
        mouseEvents
        touchEvents
        metaWheelZoom={false}
        boxClassname="pigeon-map"
        animate
        onBoundsChanged={handleBoundsChanged}
      >
        {places.map((place) => {
          const visited = visitedSet.has(place.id);
          const theme = getMarkerTheme(visited);
          return (
            <Marker
              key={place.id}
              anchor={place.coordinates}
              payload={place}
              color={theme.color}
              width={44}
              hover
              onClick={() => onMarkerClick(place)}
            >
              {markerSvg(theme.color, theme.emoji)}
            </Marker>
          );
        })}
      </Map>

      <div className="map-zoom-controls" aria-label="Управление масштабом">
        <button type="button" className="map-zoom-button" onClick={zoomIn} aria-label="Приблизить">
          +
        </button>
        <button type="button" className="map-zoom-button" onClick={zoomOut} aria-label="Отдалить">
          −
        </button>
      </div>
    </div>
  );
}

