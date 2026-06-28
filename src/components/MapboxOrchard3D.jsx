import React, { useEffect, useState } from 'react';
import Map, { Marker, NavigationControl, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const STORAGE_PREFIX = 'mapbox-orchard3d';

const readNumberFromStorage = (key, fallback) => {
  if (typeof window === 'undefined') return fallback;
  const stored = localStorage.getItem(`${STORAGE_PREFIX}_${key}`);
  const value = Number(stored);
  return Number.isFinite(value) ? value : fallback;
};

const PUBLIC_MAPBOX_TOKEN = [
  'pk.eyJ1IjoiYWx4YXRlIiwiYSI6ImNtcXF1YTl1',
  'dTBqNG0ycnB3cWdjbzR3ZG0ifQ',
  '8KbCtSa4jEVbdEgywT_pMA',
].join('.');

const PUBLIC_SATELLITE_STYLE = {
  version: 8,
  sources: {
    satellite: {
      type: 'raster',
      tiles: [
        'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      ],
      tileSize: 256,
      attribution: 'Tiles &copy; Esri',
    },
  },
  layers: [
    {
      id: 'satellite',
      type: 'raster',
      source: 'satellite',
      minzoom: 0,
      maxzoom: 22,
    },
  ],
};

const defaultGetLngLat = (x, y) => {
  const baseLng = -76.429972;
  const baseLat = 3.645361;
  return {
    longitude: baseLng + (x - 551) * 0.000004,
    latitude: baseLat - (y - 393) * 0.000004,
  };
};

export default function MapboxOrchard3D({
  trees,
  selectedTreeId,
  onSelectTree,
  onMapClick,
  onTreeDragEnd,
  initialViewState = {
    longitude: -76.429972,
    latitude: 3.645361,
    zoom: 17.6,
    pitch: 50,
    bearing: 0,
  },
  mapStyle = 'mapbox://styles/mapbox/satellite-streets-v12',
  overlayUrl,
  overlayCoordinates,
  overlayOpacity = 0.78,
  getLngLat,
}) {
  const token = import.meta.env.VITE_MAPBOX_TOKEN || PUBLIC_MAPBOX_TOKEN;
  const resolvedMapStyle = typeof mapStyle === 'string' && mapStyle.startsWith('mapbox://')
    ? PUBLIC_SATELLITE_STYLE
    : mapStyle;

  const [rotation, setRotation] = useState(() => readNumberFromStorage('rotation', 0));
  const [offset, setOffset] = useState(() => ({
    x: readNumberFromStorage('offset_x', 0),
    y: readNumberFromStorage('offset_y', 0),
  }));
  const [markerSize, setMarkerSize] = useState(() => readNumberFromStorage('marker_size', 28));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(`${STORAGE_PREFIX}_rotation`, String(rotation));
    localStorage.setItem(`${STORAGE_PREFIX}_offset_x`, String(offset.x));
    localStorage.setItem(`${STORAGE_PREFIX}_offset_y`, String(offset.y));
    localStorage.setItem(`${STORAGE_PREFIX}_marker_size`, String(markerSize));
  }, [rotation, offset.x, offset.y, markerSize]);

  if (!token) {
    return (
      <div className="mapbox-orchard-shell mapbox-orchard-shell--missing-token">
        <div>
          <strong>Mapa no disponible</strong>
          <span>Configura VITE_MAPBOX_TOKEN para cargar Mapbox.</span>
        </div>
      </div>
    );
  }

  const computeLngLat = (tree) => {
    const x = tree.x + offset.x;
    const y = tree.y + offset.y;

    const applyRotation = (xCoord, yCoord) => {
      if (rotation === 0) return [xCoord, yCoord];
      const rad = (rotation * Math.PI) / 180;
      const dx = xCoord - 551;
      const dy = yCoord - 393;
      return [
        551 + dx * Math.cos(rad) - dy * Math.sin(rad),
        393 + dx * Math.sin(rad) + dy * Math.cos(rad),
      ];
    };

    return typeof getLngLat === 'function'
      ? getLngLat(x, y)
      : defaultGetLngLat(...applyRotation(x, y));
  };

  return (
    <div className="mapbox-orchard-shell" style={{ width: '100%', height: '100%', minHeight: '360px' }}>
      <Map
        initialViewState={initialViewState}
        mapStyle={resolvedMapStyle}
        mapboxAccessToken={token}
        style={{ width: '100%', height: '100%' }}
        onClick={(e) => {
          if (typeof onMapClick === 'function') onMapClick(e)
        }}
      >
        <NavigationControl position="bottom-left" />


        {overlayUrl && overlayCoordinates && (
          <Source type="image" url={overlayUrl} coordinates={overlayCoordinates}>
            <Layer
              id="mapbox-overlay"
              type="raster"
              paint={{ 'raster-opacity': overlayOpacity, 'raster-fade-duration': 0 }}
            />
          </Source>
        )}

        {trees.map((tree) => {
          const { longitude, latitude } = computeLngLat(tree);
          const isSelected = tree.id === selectedTreeId;
          const markerColor = tree.color || '#2E7D32';

          return (
            <Marker
              key={tree.id}
              longitude={longitude}
              latitude={latitude}
              anchor="bottom"
              draggable={isSelected && typeof onTreeDragEnd === 'function'}
              onDragEnd={(event) => {
                event.originalEvent.stopPropagation();
                if (typeof onTreeDragEnd === 'function') {
                  const lng = event.lngLat?.lng ?? event.lngLat?.longitude ?? event.lngLat?.[0]
                  const lat = event.lngLat?.lat ?? event.lngLat?.latitude ?? event.lngLat?.[1]
                  onTreeDragEnd(tree.id, { longitude: lng, latitude: lat })
                }
              }}
              onClick={(event) => {
                event.originalEvent.stopPropagation();
                onSelectTree(tree.id);
              }}
            >
              <div
                className={`mapbox-tree-objective ${isSelected ? 'is-selected' : ''}`}
                style={{
                  width: markerSize,
                  height: markerSize,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  backgroundColor: markerColor,
                  backgroundImage: `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.95), rgba(255,255,255,0) 22%), radial-gradient(circle at 50% 55%, ${markerColor} 0%, ${markerColor} 72%, rgba(0,0,0,0.2) 100%)`,
                  border: `3px solid ${isSelected ? '#fff' : 'rgba(255,255,255,0.9)'}`,
                  color: '#fff',
                  fontSize: `${Math.max(1.4, markerSize / 24)}rem`,
                  fontWeight: 900,
                  cursor: 'pointer',
                  boxShadow: isSelected
                    ? '0 0 0 4px rgba(255,255,255,0.55), 0 5px 18px rgba(0,0,0,0.55)'
                    : '0 4px 14px rgba(0,0,0,0.35)',
                  transform: isSelected ? 'scale(1.35)' : 'scale(1)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  userSelect: 'none',
                }}
              >
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <span style={{ fontSize: `${Math.max(1.5, markerSize / 20)}rem`, lineHeight: 1 }}>{'🌳'}</span>
                  <span style={{
                    position: 'absolute',
                    color: '#000',
                    fontSize: `${Math.max(0.9, markerSize / 28)}rem`,
                    fontWeight: 900,
                    textShadow: '0 1px 1px rgba(255,255,255,0.8)',
                  }}>
                    {tree.id}
                  </span>
                </div>
              </div>
            </Marker>
          );
        })}
      </Map>
    </div>
  );
}
