import React from 'react';
import Map, { Marker, NavigationControl, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

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
  const token = import.meta.env.VITE_MAPBOX_TOKEN;
  
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
  
  const computeLngLat = (tree) => (typeof getLngLat === 'function' ? getLngLat(tree.x, tree.y) : defaultGetLngLat(tree.x, tree.y));

  return (
    <div className="mapbox-orchard-shell" style={{ width: '100%', height: '100%', minHeight: '360px' }}>
      <Map
        initialViewState={initialViewState}
        mapStyle={mapStyle}
        mapboxAccessToken={token}
        style={{ width: '100%', height: '100%' }}
        onClick={(e) => {
          if (typeof onMapClick === 'function') onMapClick(e)
        }}
      >
        <NavigationControl position="top-right" />

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

          return (
            <Marker
              key={tree.id}
              longitude={longitude}
              latitude={latitude}
              anchor="bottom"
              onClick={(event) => {
                event.originalEvent.stopPropagation();
                onSelectTree(tree.id);
              }}
            >
              <div
                className={`mapbox-tree-objective ${isSelected ? 'is-selected' : ''}`}
                style={{
                  backgroundColor: tree.color || '#4CAF50',
                  borderColor: tree.color || '#4CAF50',
                }}
              >
                <span>{tree.id}</span>
              </div>
            </Marker>
          );
        })}
      </Map>
    </div>
  );
}
