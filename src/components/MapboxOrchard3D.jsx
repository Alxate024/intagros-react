import Map, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

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
  initialViewState = {
    longitude: -76.429972,
    latitude: 3.645361,
    zoom: 17.6,
    pitch: 50,
    bearing: 0,
  },
  mapStyle = 'mapbox://styles/mapbox/satellite-streets-v12',
  getLngLat,
  renderMarker,
  pendingMarker,
}) {
  const token = import.meta.env.VITE_MAPBOX_TOKEN || PUBLIC_MAPBOX_TOKEN;
  const resolvedMapStyle = typeof mapStyle === 'string' && mapStyle.startsWith('mapbox://')
    ? PUBLIC_SATELLITE_STYLE
    : mapStyle;
  
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
  
  const computeLngLat = (tree) => (typeof getLngLat === 'function' ? getLngLat(tree.x, tree.y, tree) : defaultGetLngLat(tree.x, tree.y));

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
        <NavigationControl position="top-right" />

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
              {renderMarker ? (
                renderMarker(tree, isSelected)
              ) : (
                <div
                  className={`mapbox-tree-objective ${isSelected ? 'is-selected' : ''}`}
                  style={{
                    backgroundColor: tree.color || '#4CAF50',
                    borderColor: tree.color || '#4CAF50',
                  }}
                >
                  <span>{tree.id}</span>
                </div>
              )}
            </Marker>
          );
        })}
        {pendingMarker && (
          <Marker longitude={pendingMarker.lng} latitude={pendingMarker.lat} anchor="center">
            <div className="zp-pending-marker">
              <span className="zp-pending-marker__icon">+</span>
            </div>
          </Marker>
        )}
      </Map>
    </div>
  );
}
