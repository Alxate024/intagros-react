import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import MapboxOrchard3D from '../components/MapboxOrchard3D';
import PredioDashboard from '../components/dashboard/PredioDashboard';
import MDTypography from '../components/md/MDTypography';
import useTreeStatus from '../hooks/useTreeStatus';
import TreeStatusEditor from '../components/tree/TreeStatusEditor';
import TreeMarkerIcon from '../components/tree/TreeMarkerIcon';
import 'mapbox-gl/dist/mapbox-gl.css';
import './PredioZapote.css';

import { zapoteTrees, zapoteGroups, zapoteSpecies, zapoteSpeciesCounts } from '../data/zapoteTrees';

const wikipediaCache = new Map();
const envData = {
  temp: 28.4, feelsLike: 30.1, humidity: 74, rainfall: 12.4,
  uv: 6, wind: 8.2, pressure: 1013, condition: 'Parcialmente nublado', icon: '⛅',
};

function downloadCSV(trees) {
  const headers = ['ID', 'Código', 'Especie', 'Grupo', 'Salud', 'Puntaje', 'Produccion', 'Coordenada X', 'Coordenada Y'];
  const rows = trees.map(t => {
    return [t.id, t.code, t.species, t.group, t._healthLabel, '', t._produccion, t.sourceX, t.sourceY];
  });
  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'predio-zapote-export.csv';
  a.click(); URL.revokeObjectURL(url);
}

const normalizeText = (value) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const speciesToFilename = (species) => normalizeText(species).replace(/\s+/g, '-');

const speciesImageFile = {
  'Aguacate Lorena': 'agucate_lorena.png',
  'Aguacate Trinidad': 'agucate-trinidad.png',
  'Anon': 'Anon.png',
  'Grosello': 'grosella.webp',
  'Guanabano': 'guanabano.png',
  'Guayaba Comun': 'guayaba-comun.png',
  'Guayaba Coronilla': 'guayaba-comun.png',
  'Guayaba Pera': 'guyaba-pera.png',
  'Guayaba Peruana': 'guayaba-peruana.png',
  'Guayana Coronilla': 'guayaba-comun.png',
  'Guayana Peruana': 'guayaba-peruana.png',
  'Jaboticaba': 'jaboticaba.png',
  'Kumquat Marumi': 'Kumquat.png',
  'Limon Nativo': 'limon-nativo.png',
  'Limon Tahiti': 'limon_tahiti.png',
  'Madrono': 'madroño.png',
  'Mamey': 'mamey.png',
  'Mandarica Arrayana': 'mandarina_arraya.png',
  'Mandarina Arrayana': 'mandarina_arraya.png',
  'Mandarina Oneco': 'mandarina_oneco.png',
  'Mango Haden': 'mango-haden.png',
  'Mango Tommy': 'mango-tommy.png',
  'Naranja Ombligona': 'naranja_ombligona.webp',
  'Naranja Salerma': 'naranja_salerma.png',
  'Naranja Sanguina': 'naranja_sanguina.png',
  'Naranja Sweety': 'naranja_sweety.png',
  'Nispero': 'nispero.png',
  'Tangelo Orlando': 'tangelo-orlando.png',
  'Zapote': 'zapote.png',
};

async function fetchWikipediaSummary(query) {
  if (wikipediaCache.has(query)) return wikipediaCache.get(query);
  const params = new URLSearchParams({
    action: 'query', format: 'json', origin: '*', generator: 'search',
    gsrsearch: query, gsrlimit: '1', prop: 'extracts|info|pageimages',
    exintro: '1', explaintext: '1', inprop: 'url', piprop: 'thumbnail', pithumbsize: '420',
  });
  try {
    const response = await fetch(`https://es.wikipedia.org/w/api.php?${params.toString()}`);
    const payload = await response.json();
    const page = Object.values(payload.query?.pages ?? {})[0];
    const summary = page ? { title: page.title, extract: page.extract, url: page.fullurl, image: page.thumbnail?.source } : null;
    wikipediaCache.set(query, summary);
    return summary;
  } catch {
    return null;
  }
}

function getTreeVisualProfile(tree) {
  const species = normalizeText(tree.species);
  const imageFile = speciesImageFile[tree.species] || `${speciesToFilename(tree.species)}.png`;
  const treeImage = `/media/${imageFile}`;
  if (species.includes('mango')) return { canopy: '#23451f', border: '#d7a23b', customImage: treeImage, shape: 'oval' };
  if (species.includes('aguacate')) return { canopy: '#1f3b22', border: '#253719', customImage: treeImage, shape: 'tall' };
  if (tree.group === 'Citricos') {
    const isLemon = species.includes('limon');
    return { canopy: '#2e5523', border: isLemon ? '#cbd84a' : '#e48b24', customImage: treeImage, shape: 'round' };
  }
  if (species.includes('guayaba') || species.includes('guayana')) return { canopy: '#4c7438', border: '#b9d878', customImage: treeImage, shape: 'round' };
  if (species.includes('guanabano') || species.includes('anon')) return { canopy: '#315229', border: '#8cae66', customImage: treeImage, shape: 'oval' };
  if (species.includes('jaboticaba')) return { canopy: '#1d3322', border: '#2b1d38', customImage: treeImage, shape: 'round' };
  if (species.includes('mamey') || species.includes('zapote')) return { canopy: '#2d4722', border: '#a65f35', customImage: treeImage, shape: 'broad' };
  if (species.includes('carambola')) return { canopy: '#3f6731', border: '#d7c93e', customImage: treeImage, shape: 'round' };
  if (species.includes('maranon')) return { canopy: '#344f23', border: '#c6532a', customImage: treeImage, shape: 'broad' };
  return { canopy: '#314f28', border: '#9b7d35', customImage: treeImage, shape: 'round' };
}

function FilterChip({ active, onClick, children }) {
  return (
    <button onClick={onClick} className={`zp-filter-chip ${active ? 'zp-filter-chip--active' : ''}`}>
      {children}
    </button>
  );
}

function CompassRose({ rotation }) {
  return (
    <div className="zp-compass" title={`Rotación: ${rotation.toFixed(0)}°`}>
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="30" stroke="rgba(230,165,59,0.35)" strokeWidth="1"/>
        <circle cx="32" cy="32" r="26" stroke="rgba(230,165,59,0.15)" strokeWidth="0.5" strokeDasharray="2 4"/>
        <g transform={`rotate(${-rotation}, 32, 32)`}>
          <path d="M32 32 L29 14 L32 9 L35 14 Z" fill="#d95e32"/>
          <path d="M32 32 L29 50 L32 55 L35 50 Z" fill="rgba(245,237,220,0.5)"/>
          <path d="M32 32 L50 29 L55 32 L50 35 Z" fill="rgba(245,237,220,0.25)"/>
          <path d="M32 32 L14 29 L9 32 L14 35 Z" fill="rgba(245,237,220,0.25)"/>
          <path d="M32 32 L38 18 L40 20 Z" fill="rgba(230,165,59,0.3)"/>
          <path d="M32 32 L44 38 L42 40 Z" fill="rgba(230,165,59,0.2)"/>
          <path d="M32 32 L26 46 L24 44 Z" fill="rgba(230,165,59,0.2)"/>
          <path d="M32 32 L20 26 L22 24 Z" fill="rgba(230,165,59,0.3)"/>
        </g>
        <circle cx="32" cy="32" r="5" fill="#1a2410" stroke="rgba(230,165,59,0.7)" strokeWidth="1"/>
        <circle cx="32" cy="32" r="2.5" fill="#e6a53b"/>
        <text x="32" y="6" textAnchor="middle" fill="#d95e32" fontSize="7" fontWeight="900" fontFamily="'Courier New',monospace">N</text>
      </svg>
    </div>
  );
}

function ScaleBar() {
  return (
    <div className="zp-scalebar">
      <div className="zp-scalebar__track"><div className="zp-scalebar__fill" /></div>
      <span className="zp-scalebar__label">50 m</span>
    </div>
  );
}

function CoordDisplay({ lat, lng }) {
  const fmt = (n, d = 6) => n.toFixed(d);
  return (
    <div className="zp-coords">
      <span className="zp-coords__chip"><span className="zp-coords__axis">LAT</span><span className="zp-coords__val">{fmt(lat)}</span></span>
      <span className="zp-coords__sep">·</span>
      <span className="zp-coords__chip"><span className="zp-coords__axis">LNG</span><span className="zp-coords__val">{fmt(lng)}</span></span>
    </div>
  );
}

function MapCrosshair() {
  return (
    <div className="zp-crosshair" aria-hidden="true">
      <div className="zp-crosshair__h" /><div className="zp-crosshair__v" /><div className="zp-crosshair__dot" />
    </div>
  );
}

function MapStatusBar({ selectedTree, treeCount, totalCount, lat, lng }) {
  return (
    <div className="zp-map-statusbar">
      <div className="zp-map-statusbar__left">
        <span className="zp-map-statusbar__badge">
          <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" fill="#6b8f4e"/></svg>
          SATÉLITE
        </span>
        <span className="zp-map-statusbar__sep" />
        <span className="zp-map-statusbar__info">
          {selectedTree ? `Árbol #${selectedTree.id} — ${selectedTree.species}` : `${treeCount} de ${totalCount} marcadores`}
        </span>
      </div>
      <CoordDisplay lat={lat} lng={lng} />
    </div>
  );
}

function MapFooterBar({ rotation }) {
  return (
    <div className="zp-map-footerbar">
      <ScaleBar />
      <div className="zp-map-footerbar__center">
        <span className="zp-map-footerbar__label">MAPBOX · SATELLITE-STREETS · v12</span>
      </div>
      <span className="zp-map-footerbar__rot">
        <svg width="10" height="10" viewBox="0 0 10 10">
          <path d="M5 1 A4 4 0 0 1 9 5" stroke="rgba(230,165,59,0.7)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          <path d="M9 5 L7.5 3.5 M9 5 L10.5 3.8" stroke="rgba(230,165,59,0.7)" strokeWidth="1" fill="none" strokeLinecap="round"/>
        </svg>
        {rotation.toFixed(1)}°
      </span>
    </div>
  );
}

function CalibratorPanel({ rotation, setRotation, puntoEscala, setPuntoEscala, puntoLng, setPuntoLng, puntoLat, setPuntoLat, isAnclado, toggleAnclar, isCollapsed, onToggleCollapse }) {
  return (
    <div className={`zp-calibrator ${isAnclado ? 'zp-calibrator--locked' : ''} ${isCollapsed ? 'zp-calibrator--collapsed' : ''}`}>
      <div className="zp-calibrator__header">
        <button className="zp-calibrator__collapse-btn" onClick={onToggleCollapse} aria-label={isCollapsed ? 'Expandir' : 'Colapsar'}>
          {isCollapsed ? '▶' : '▼'}
        </button>
        <div className="zp-calibrator__header-left">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="5.5" stroke="rgba(230,165,59,0.7)" strokeWidth="1"/>
            <circle cx="7" cy="7" r="2" fill="rgba(230,165,59,0.5)"/>
            <path d="M7 1v2M7 11v2M1 7h2M11 7h2" stroke="rgba(230,165,59,0.5)" strokeWidth="1" strokeLinecap="round"/>
          </svg>
          <span>CALIBRACIÓN</span>
        </div>
        <button className={`zp-calibrator__anchor ${isAnclado ? 'zp-calibrator__anchor--locked' : ''}`} onClick={toggleAnclar}>
          {isAnclado ? '🔒 Anclado' : '🔓 Anclar'}
        </button>
        <button type="button" className="zp-calibrator__export" onClick={() => {
          const cal = { puntoLng, puntoLat, puntoEscala, rotation };
          const blob = new Blob([JSON.stringify(cal, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a'); a.href = url; a.download = 'zapote_calibracion.json';
          a.click(); URL.revokeObjectURL(url);
        }}>📥</button>
      </div>
      {!isCollapsed && (
        <div className="zp-calibrator__body">
          <div className="zp-cal-group">
            <div className="zp-cal-group__label"><span>Rotación</span><code>{rotation.toFixed(0)}°</code></div>
            <input type="range" className="zp-cal-slider" min="-180" max="180" step="1" value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))} disabled={isAnclado} />
            <div className="zp-cal-ticks"><span>-180°</span><span>0°</span><span>+180°</span></div>
          </div>
          <div className="zp-cal-group">
            <div className="zp-cal-group__label"><span>Escala</span><code>{(puntoEscala * 1e6).toFixed(2)} µ</code></div>
            <input type="range" className="zp-cal-slider" min="0.000001" max="0.000020" step="0.0000001" value={puntoEscala}
              onChange={(e) => setPuntoEscala(Number(e.target.value))} disabled={isAnclado} />
          </div>
          <div className="zp-cal-group">
            <div className="zp-cal-group__label"><span>Este — Oeste</span><code>{(puntoLng - (-76.429972)).toFixed(5)}</code></div>
            <input type="range" className="zp-cal-slider" min="-0.001" max="0.001" step="0.00001"
              value={puntoLng - (-76.429972)} onChange={(e) => setPuntoLng(-76.429972 + Number(e.target.value))} disabled={isAnclado} />
          </div>
          <div className="zp-cal-group">
            <div className="zp-cal-group__label"><span>Norte — Sur</span><code>{(puntoLat - 3.645361).toFixed(5)}</code></div>
            <input type="range" className="zp-cal-slider" min="-0.001" max="0.001" step="0.00001"
              value={puntoLat - 3.645361} onChange={(e) => setPuntoLat(3.645361 + Number(e.target.value))} disabled={isAnclado} />
          </div>
        </div>
      )}
    </div>
  );
}

const IMAGE_WIDTH = 1102;
const IMAGE_HEIGHT = 787;

export default function PredioZapote() {
  const [selectedTreeId, setSelectedTreeId] = useState(null);
  const [wikiInfo, setWikiInfo] = useState(null);
  const [loadingWiki, setLoadingWiki] = useState(false);
  const [calCollapsed, setCalCollapsed] = useState(() => localStorage.getItem('zapote_cal_collapsed') === 'true');

  const [puntoLng, setPuntoLng] = useState(() => {
    const saved = localStorage.getItem('zapote_puntoLng');
    return saved ? parseFloat(saved) : -76.429972;
  });
  const [puntoLat, setPuntoLat] = useState(() => {
    const saved = localStorage.getItem('zapote_puntoLat');
    return saved ? parseFloat(saved) : 3.645361;
  });
  const [puntoEscala, setPuntoEscala] = useState(() => {
    const saved = localStorage.getItem('zapote_puntoEscala');
    return saved ? parseFloat(saved) : 0.000008;
  });
  const [rotation, setRotation] = useState(() => {
    const saved = localStorage.getItem('zapote_rotation');
    return saved ? parseFloat(saved) : 0;
  });
  const [isAnclado, setIsAnclado] = useState(() => {
    const saved = localStorage.getItem('zapote_isAnclado');
    return saved === 'true';
  });

  const { getTree, updateTree, resetTree, exportData, stats: statusStats } = useTreeStatus('zapote', zapoteTrees);

  const toggleAnclar = () => {
    if (!isAnclado) {
      localStorage.setItem('zapote_puntoLng', puntoLng.toString());
      localStorage.setItem('zapote_puntoLat', puntoLat.toString());
      localStorage.setItem('zapote_puntoEscala', puntoEscala.toString());
      localStorage.setItem('zapote_rotation', rotation.toString());
      localStorage.setItem('zapote_isAnclado', 'true');
    } else {
      localStorage.setItem('zapote_isAnclado', 'false');
    }
    setIsAnclado(!isAnclado);
  };

  const selectedTree = useMemo(
    () => (selectedTreeId ? getTree(zapoteTrees.find((t) => t.id === selectedTreeId)) : null),
    [selectedTreeId, zapoteTrees, getTree],
  );

  const selectedTreeProfile = useMemo(() => {
    return selectedTree ? getTreeVisualProfile(selectedTree) : null;
  }, [selectedTree]);

  const [query, setQuery] = useState('');
  const [groupFilter, setGroupFilter] = useState('all');

  const groups = useMemo(() => [...new Set(zapoteTrees.map(t => t.group))], []);

  const filteredTrees = useMemo(() => {
    const q = query.trim().toLowerCase();
    return zapoteTrees.filter(t => {
      const matchesQuery = !q || t.species.toLowerCase().includes(q) || String(t.id) === q || `#${t.id}` === q;
      const matchesGroup = groupFilter === 'all' || t.group === groupFilter;
      return matchesQuery && matchesGroup;
    }).map(t => getTree(t));
  }, [query, groupFilter, getTree]);

  const groupLegend = useMemo(() => {
    return zapoteGroups.map(group => {
      const sample = zapoteTrees.find(t => t.group === group);
      const profile = sample ? getTreeVisualProfile(sample) : null;
      const count = zapoteTrees.filter(t => t.group === group).length;
      return { group, color: profile?.border || '#7d8b57', count };
    });
  }, []);

  const dashboardStats = useMemo(() => {
    const total = zapoteTrees.length;
    const speciesCount = zapoteSpecies.length;
    const groupCount = zapoteGroups.length;
    const mostCommonSpecies = Object.entries(zapoteSpeciesCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const groupBreakdown = groupLegend.map(({ group, color }) => {
      const count = zapoteTrees.filter(t => t.group === group).length;
      return { group, color, count, pct: Math.round((count / total) * 100) };
    });
    return { total, speciesCount, groupCount, mostCommonSpecies, groupBreakdown };
  }, []);

  function getLngLat(x, _y, tree, currentZoom) {
    if (tree?.lng != null && tree?.lat != null) return { longitude: tree.lng, latitude: tree.lat };
    const dx = x - (IMAGE_WIDTH / 2);
    const dy = _y - (IMAGE_HEIGHT / 2);
    const rad = (rotation * Math.PI) / 180;
    const rx = dx * Math.cos(rad) - dy * Math.sin(rad);
    const ry = dx * Math.sin(rad) + dy * Math.cos(rad);
    const refZoom = 17.5;
    const zoomAdj = currentZoom ? Math.pow(2, refZoom - currentZoom) : 1;
    const effectiveScale = puntoEscala * zoomAdj;
    return {
      longitude: puntoLng + (rx * effectiveScale),
      latitude: puntoLat - (ry * effectiveScale),
    };
  }

  useEffect(() => {
    if (!selectedTree) return;
    setLoadingWiki(true);
    fetchWikipediaSummary(selectedTree.wikipediaQuery || selectedTree.species).then(info => {
      setWikiInfo(info);
      setLoadingWiki(false);
    });
  }, [selectedTree]);

  const stats = useMemo(() => ({
    total: zapoteTrees.length,
    groups: groups.length,
    species: zapoteSpecies.length
  }), [groups.length]);

  useEffect(() => {
    document.title = 'Predio El Zapote · Inventario Digital de Frutales';
    return () => { document.title = 'INTAGROS | Inteligencia Agropecuaria Sostenible'; };
  }, []);

  const handleCollapseCal = () => {
    const next = !calCollapsed;
    setCalCollapsed(next);
    localStorage.setItem('zapote_cal_collapsed', String(next));
  };

  return (
    <div className="zapote-page">
      <header className="zapote-hero-section">
        <img className="zp-hero-bg" src="/media/god_vision.gif" alt="" />
        <div className="zp-hero-canopy" aria-hidden="true">
          <div className="zp-hero-canopy-leaf zp-hero-canopy-leaf--left">
            <img src="/media/leaf-corner.png" alt="" />
          </div>
          <div className="zp-hero-canopy-leaf zp-hero-canopy-leaf--right">
            <img src="/media/leaf-corner.png" alt="" />
          </div>
        </div>
        <div className="zapote-hero-container">
          <nav className="zapote-breadcrumb">
            <Link to="/predioshub/finca-garces-eder">Fincas</Link>
            <span>/</span>
            <strong>Predio El Zapote</strong>
          </nav>

          <div className="zapote-hero-grid">
            <div className="zapote-hero-copy">
              <span className="zapote-kicker">Inventario Digital de Frutales</span>
              <h1>Predio<br />El Zapote</h1>
              <p>
                Monitoreo profesional de frutales con estado de salud editable, croquis calibrado y datos satelitales.
              </p>
            </div>

            <Box className="zapote-hero-cards" sx={{ display: 'flex', gap: 2 }}>
              {[
                { label: 'Árboles', value: stats.total, color: 'success' },
                { label: 'Variedades', value: stats.species, color: 'info' },
                { label: 'Grupos', value: stats.groups, color: 'warning' },
              ].map((item) => (
                <Card key={item.label} sx={{ p: 2, minWidth: 140, textAlign: 'center' }}>
                  <MDTypography variant="h3" fontWeight="bold" color={item.color}>{item.value}</MDTypography>
                  <MDTypography variant="button" color="text" fontWeight="light">{item.label}</MDTypography>
                </Card>
              ))}
            </Box>
          </div>
        </div>
      </header>

      <main className="zapote-main-content">
        <section className="zapote-map-section">
          <div className="zapote-map-bg">
            <img src="/media/hero-canopy.png" alt="" />
          </div>
          <div className="zapote-map-container">
            <aside className={`zapote-info-panel ${selectedTree ? '' : 'zapote-empty-panel'}`}>
              <div className="zapote-info-header">
                <div>
                  <p className="zapote-panel-label">{selectedTree ? 'Detalle activo' : 'Vista general del predio'}</p>
                  <h2>{selectedTree ? `Árbol #${selectedTree.id}` : 'Explorar árboles'}</h2>
                </div>
                {selectedTree ? (
                  <button className="zapote-close-btn" onClick={() => setSelectedTreeId(null)} aria-label="Cerrar">✕</button>
                ) : null}
              </div>

              {selectedTree ? (
                <div className="zapote-tree-info">
                  <h3>{selectedTree.species}</h3>
                  <p className="zapote-tree-group">{selectedTree.group}</p>

                  <div className="zapote-tree-status-badges">
                    <span className={`zt-badge zt-badge--${selectedTree._healthStatus}`}>
                      {selectedTree._healthLabel}
                    </span>
                    <span className={`zt-badge zt-badge--prod`}>
                      {selectedTree._produccion === 'alta' ? '🔥' : selectedTree._produccion === 'media' ? '💧' : selectedTree._produccion === 'baja' ? '🌱' : '⛔'} {selectedTree._produccion}
                    </span>
                  </div>

                  {selectedTreeProfile?.customImage && (
                    <div className="zapote-tree-image">
                      <img src={selectedTreeProfile.customImage} alt={selectedTree.species}
                        onError={(e) => { e.target.style.display = 'none'; }} />
                    </div>
                  )}

                  <TreeStatusEditor
                    treeId={selectedTree.id}
                    currentHealth={selectedTree._healthStatus}
                    currentProduccion={selectedTree._produccion}
                    currentNotas={selectedTree._notas}
                    onUpdate={updateTree}
                    onReset={resetTree}
                  />

                  <div className="zapote-tree-coords">
                    <span>Croquis: {Math.round(selectedTree.x)}, {Math.round(selectedTree.y)}</span>
                  </div>

                  {loadingWiki ? (
                    <p className="zapote-loading">Buscando en Wikipedia...</p>
                  ) : wikiInfo ? (
                    <div className="zapote-wiki-content">
                      {wikiInfo.image && <img src={wikiInfo.image} alt={wikiInfo.title} className="zapote-wiki-image" />}
                      <p>{wikiInfo.extract?.substring(0, 320)}...</p>
                      <a href={wikiInfo.url} target="_blank" rel="noreferrer" className="zapote-wiki-link">Leer más en Wikipedia →</a>
                    </div>
                  ) : (
                    <p className="zapote-no-info">Sin información disponible.</p>
                  )}
                </div>
              ) : (
                <div className="zapote-empty-state">
                  <div className="zapote-empty-tree">
                    <img src="/media/compass-rose.png" alt="Árbol" className="zapote-empty-tree-img" />
                  </div>
                  <p className="zapote-empty-hint">Selecciona un árbol en el mapa</p>

                  <div className="zp-monitor-bar">
                    <div className="zp-monitor-item">
                      <span className="zp-monitor-dot" style={{ background: '#4CAF50' }} />
                      <span className="zp-monitor-label">Óptimas</span>
                      <span className="zp-monitor-count">{statusStats.counts.optima}</span>
                    </div>
                    <div className="zp-monitor-item">
                      <span className="zp-monitor-dot" style={{ background: '#66BB6A' }} />
                      <span className="zp-monitor-label">Buenas</span>
                      <span className="zp-monitor-count">{statusStats.counts.buena}</span>
                    </div>
                    <div className="zp-monitor-item">
                      <span className="zp-monitor-dot" style={{ background: '#fb8c00' }} />
                      <span className="zp-monitor-label">Regulares</span>
                      <span className="zp-monitor-count">{statusStats.counts.regular}</span>
                    </div>
                    <div className="zp-monitor-item">
                      <span className="zp-monitor-dot" style={{ background: '#F44335' }} />
                      <span className="zp-monitor-label">Críticas</span>
                      <span className="zp-monitor-count">{statusStats.counts.critica}</span>
                    </div>
                  </div>

                  <div className="zp-filter-bar">
                    <div className="zp-search-wrap">
                      <span className="zp-search-icon">🔍</span>
                      <input type="text" className="zp-filter-input" placeholder="Buscar especie o #ID…"
                        value={query} onChange={(e) => setQuery(e.target.value)} />
                      {query && <button className="zp-search-clear" onClick={() => setQuery('')} aria-label="Limpiar búsqueda">✕</button>}
                    </div>
                    <div className="zp-filter-chips">
                      <FilterChip active={groupFilter === 'all'} onClick={() => setGroupFilter('all')}>Todos</FilterChip>
                      {groups.map(g => (
                        <FilterChip key={g} active={groupFilter === g} onClick={() => setGroupFilter(g)}>{g}</FilterChip>
                      ))}
                    </div>
                  </div>

                  <div className="zp-tree-list-header">
                    <span>Inventario</span>
                    <span className="zp-tree-list-header__count">{filteredTrees.length} resultados</span>
                    <div className="zp-tree-list-actions">
                      <button className="zp-tool-btn" onClick={() => {
                        const blob = new Blob([exportData()], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a'); a.href = url; a.download = 'zapote_estado_arboles.json';
                        a.click(); URL.revokeObjectURL(url);
                      }} title="Exportar estado">📤</button>
                      <button className="zp-tool-btn" onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file'; input.accept = '.json';
                        input.onchange = (e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            try {
                              const data = JSON.parse(ev.target.result);
                              Object.entries(data).forEach(([id, val]) => updateTree(Number(id), val));
                              alert('Estado restaurado exitosamente');
                            } catch { alert('Error: archivo inválido'); }
                          };
                          reader.readAsText(file);
                        };
                        input.click();
                      }} title="Importar estado">📂</button>
                    </div>
                  </div>

                  <div className="zp-tree-list">
                    {filteredTrees.length === 0 ? (
                      <p className="zp-tree-list__empty">Sin resultados</p>
                    ) : (
                      filteredTrees.map(tree => {
                        const profile = getTreeVisualProfile(tree);
                        return (
                          <button key={tree.id}
                            className={`zp-tree-list__item ${selectedTreeId === tree.id ? 'zp-tree-list__item--active' : ''}`}
                            onClick={() => setSelectedTreeId(tree.id)}>
                            <span className="zp-tree-list__id-box" style={{ background: profile.canopy, borderColor: profile.border }}>
                              <img src={profile.customImage} alt={`#${tree.id}`} className="zp-tree-list__thumb"
                                onError={(e) => { e.target.style.display = 'none'; }} />
                              <span className="zp-tree-list__id-num">{tree.id}</span>
                            </span>
                            <span className="zp-tree-list__info">
                              <span className="zp-tree-list__health" data-status={tree._healthStatus} title={tree._healthLabel} />
                              {tree._healthOverride && <span className="zp-tree-list__edited" title="Estado editado">✎</span>}
                              <span className="zp-tree-list__species" style={{ color: profile.border }}>{tree.species}</span>
                              <span className="zp-tree-list__group">{tree.group}</span>
                              {tree._produccion && <span className="zp-tree-list__prod">· {tree._produccion}</span>}
                            </span>
                          </button>
                        );
                      })
                    )}
                  </div>

                  <div className="zp-group-legend">
                    {groupLegend.map(({ group, color, count }) => (
                      <button key={group}
                        className={`zp-group-legend__item ${groupFilter === group ? 'zp-group-legend__item--active' : ''}`}
                        onClick={() => setGroupFilter(groupFilter === group ? 'all' : group)}>
                        <span className="zp-group-legend__dot" style={{ background: color }} />
                        <span className="zp-group-legend__label">{group}</span>
                        <span className="zp-group-legend__count">{count}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </aside>

            <div className="zp-map-frame">
              <MapStatusBar
                selectedTree={selectedTree}
                treeCount={filteredTrees.length}
                totalCount={zapoteTrees.length}
                lat={puntoLat}
                lng={puntoLng}
              />
              <div className="zp-map-viewport">
                <MapboxOrchard3D
                  trees={filteredTrees}
                  selectedTreeId={selectedTreeId}
                  onSelectTree={setSelectedTreeId}
                  initialViewState={{ latitude: puntoLat, longitude: puntoLng, zoom: 17.5, pitch: 0 }}
                  mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
                  getLngLat={getLngLat}
                  renderMarker={(tree, isSelected) => <TreeMarkerIcon tree={tree} isSelected={isSelected} />}
                />
                <MapCrosshair />
                <CompassRose rotation={rotation} />
                {selectedTree && (
                  <div className="zp-map-selected-badge">
                    <svg width="8" height="8" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="3" fill={selectedTreeProfile?.border || '#e6a53b'} />
                    </svg>
                    #{selectedTree.id} · {selectedTree.species}
                  </div>
                )}
                <div className="zp-map-corner zp-map-corner--tl" aria-hidden="true" />
                <div className="zp-map-corner zp-map-corner--tr" aria-hidden="true" />
                <div className="zp-map-corner zp-map-corner--bl" aria-hidden="true" />
                <div className="zp-map-corner zp-map-corner--br" aria-hidden="true" />
              </div>
              <MapFooterBar rotation={rotation} />
              <CalibratorPanel
                rotation={rotation} setRotation={setRotation}
                puntoEscala={puntoEscala} setPuntoEscala={setPuntoEscala}
                puntoLng={puntoLng} setPuntoLng={setPuntoLng}
                puntoLat={puntoLat} setPuntoLat={setPuntoLat}
                isAnclado={isAnclado} toggleAnclar={toggleAnclar}
                isCollapsed={calCollapsed} onToggleCollapse={handleCollapseCal}
              />
            </div>
          </div>
        </section>

        <PredioDashboard
          predioName="El Zapote"
          predioKey="zapote"
          trees={filteredTrees}
          envData={envData}
          getTreeHealth={(t) => ({ score: '', label: t._healthLabel, status: t._healthStatus })}
          downloadCSV={() => downloadCSV(filteredTrees)}
        />
      </main>
    </div>
  );
}
