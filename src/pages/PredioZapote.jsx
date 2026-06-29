import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import MapboxOrchard3D from '../components/MapboxOrchard3D';
import 'mapbox-gl/dist/mapbox-gl.css';
import './PredioZapote.css';

// Importar datos
import { zapoteTrees, zapoteGroups, zapoteSpecies, zapoteSpeciesCounts } from '../data/zapoteTrees';

// --- CACHÉ Y UTILIDADES ---
const wikipediaCache = new globalThis.Map();

// --- SALUD DE ÁRBOLES (heuristic) ---
const treeHealthBase = {
  Aguacate:       { score: 85, label: 'Buena',   status: 'good' },
  Mango:          { score: 82, label: 'Buena',   status: 'good' },
  Citricos:       { score: 73, label: 'Regular', status: 'warning' },
  Guayaba:        { score: 78, label: 'Regular', status: 'warning' },
  Anonaceas:      { score: 90, label: 'Óptima',  status: 'good' },
  Zapote:         { score: 88, label: 'Óptima',  status: 'good' },
  'Otros frutales': { score: 70, label: 'Regular', status: 'warning' },
};
function getTreeHealth(tree) {
  const base = treeHealthBase[tree.group] || { score: 75, label: 'Regular', status: 'warning' };
  const variation = ((tree.id * 7 + tree.species.length * 3) % 15) - 7;
  const score = Math.min(100, Math.max(35, base.score + variation));
  let label, status;
  if (score >= 80) { label = 'Óptima'; status = 'good'; }
  else if (score >= 60) { label = 'Buena'; status = 'good'; }
  else if (score >= 40) { label = 'Regular'; status = 'warning'; }
  else { label = 'Crítica'; status = 'critical'; }
  return { score, label, status };
}

// --- DATOS AMBIENTALES (mock) ---
const envData = {
  temp: 28.4, feelsLike: 30.1, humidity: 74, rainfall: 12.4,
  uv: 6, wind: 8.2, pressure: 1013, condition: 'Parcialmente nublado',
  icon: '⛅',
};

// --- CSV EXPORT ---
function downloadCSV(trees) {
  const headers = ['ID', 'Código', 'Especie', 'Grupo', 'Salud', 'Puntaje', 'Coordenada X', 'Coordenada Y'];
  const rows = trees.map(t => {
    const h = getTreeHealth(t);
    return [t.id, t.code, t.species, t.group, h.label, h.score, t.sourceX, t.sourceY];
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

// --- PERFILES VISUALES DE ÁRBOLES CON IMÁGENES PERSONALIZABLES ---
function getTreeVisualProfile(tree) {
  const species = normalizeText(tree.species);
  const imageFile = speciesImageFile[tree.species] || `${speciesToFilename(tree.species)}.png`;
  const treeImage = `/media/${imageFile}`;
  
  // Mango
  if (species.includes('mango')) {
    return { 
      canopy: '#23451f', 
      border: '#d7a23b',
      customImage: treeImage,
      shape: 'oval'
    };
  }
  
  // Aguacate
  if (species.includes('aguacate')) {
    return { 
      canopy: '#1f3b22', 
      border: '#253719',
      customImage: treeImage,
      shape: 'tall'
    };
  }
  
  // Cítricos
  if (tree.group === 'Citricos') {
    const isLemon = species.includes('limon');
    return { 
      canopy: '#2e5523', 
      border: isLemon ? '#cbd84a' : '#e48b24',
      customImage: treeImage,
      shape: 'round'
    };
  }
  
  // Guayaba
  if (species.includes('guayaba') || species.includes('guayana')) {
    return { 
      canopy: '#4c7438', 
      border: '#b9d878',
      customImage: treeImage,
      shape: 'round'
    };
  }
  
  // Guanábano
  if (species.includes('guanabano') || species.includes('anon')) {
    return { 
      canopy: '#315229', 
      border: '#8cae66',
      customImage: treeImage,
      shape: 'oval'
    };
  }
  
  // Jaboticaba
  if (species.includes('jaboticaba')) {
    return { 
      canopy: '#1d3322', 
      border: '#2b1d38',
      customImage: treeImage,
      shape: 'round'
    };
  }
  
  // Mamey / Zapote
  if (species.includes('mamey') || species.includes('zapote')) {
    return { 
      canopy: '#2d4722', 
      border: '#a65f35',
      customImage: treeImage,
      shape: 'broad'
    };
  }
  
  // Carambola
  if (species.includes('carambola')) {
    return { 
      canopy: '#3f6731', 
      border: '#d7c93e',
      customImage: treeImage,
      shape: 'round'
    };
  }
  
  // Marañón
  if (species.includes('maranon')) {
    return { 
      canopy: '#344f23', 
      border: '#c6532a',
      customImage: treeImage,
      shape: 'broad'
    };
  }
  
  // Default
  return { 
    canopy: '#314f28', 
    border: '#9b7d35',
    customImage: treeImage,
    shape: 'round'
  };
}

// --- FILTER CHIP ---
function FilterChip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`zp-filter-chip ${active ? 'zp-filter-chip--active' : ''}`}
    >
      {children}
    </button>
  );
}

// --- TREE MARKER — punto de mapa PNG con badge de ID ---
function TreeMarkerIcon({ tree, isSelected }) {
  const profile = getTreeVisualProfile(tree);
  const health = getTreeHealth(tree);
  const healthColor = health.status === 'good' ? '#7fb069' : health.status === 'warning' ? '#f4d35e' : '#c94835';

  return (
    <div className={`zp-tree-marker ${isSelected ? 'zp-tree-marker--selected' : ''}`}>
      <div className="zp-tree-marker-pin" style={{ '--zp-canopy': profile.canopy, '--zp-border': profile.border }}>
        <img src="/media/point-icon.png" alt="" className="zp-tree-marker-img" />
        <span className="zp-tree-marker-dot" style={{ background: profile.border }} />
        <span className="zp-tree-marker-health" style={{ background: healthColor }} />
      </div>
      <span className="zp-tree-marker-id" style={{ color: profile.border }}>{tree.id}</span>
    </div>
  );
}

/* ── HUD DEL MAPA ───────────────────────────────────────────────────── */

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
          <path d="M32 32 L14 29 L9 32 L14 35 Z"  fill="rgba(245,237,220,0.25)"/>
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
      <div className="zp-scalebar__track">
        <div className="zp-scalebar__fill" />
      </div>
      <span className="zp-scalebar__label">50 m</span>
    </div>
  );
}

function CoordDisplay({ lat, lng }) {
  const fmt = (n, d = 6) => n.toFixed(d);
  return (
    <div className="zp-coords">
      <span className="zp-coords__chip">
        <span className="zp-coords__axis">LAT</span>
        <span className="zp-coords__val">{fmt(lat)}</span>
      </span>
      <span className="zp-coords__sep">·</span>
      <span className="zp-coords__chip">
        <span className="zp-coords__axis">LNG</span>
        <span className="zp-coords__val">{fmt(lng)}</span>
      </span>
    </div>
  );
}

function MapCrosshair() {
  return (
    <div className="zp-crosshair" aria-hidden="true">
      <div className="zp-crosshair__h" />
      <div className="zp-crosshair__v" />
      <div className="zp-crosshair__dot" />
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
          {selectedTree
            ? `Árbol #${selectedTree.id} — ${selectedTree.species}`
            : `${treeCount} de ${totalCount} marcadores`}
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

/* ── PANEL DE CALIBRACIÓN ───────────────────────────────────────────── */

function CalibratorPanel({
  rotation, setRotation,
  puntoEscala, setPuntoEscala,
  puntoLng, setPuntoLng,
  puntoLat, setPuntoLat,
  isAnclado, toggleAnclar,
}) {
  return (
    <div className={`zp-calibrator ${isAnclado ? 'zp-calibrator--locked' : ''}`}>
      <div className="zp-calibrator__header">
        <div className="zp-calibrator__header-left">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="5.5" stroke="rgba(230,165,59,0.7)" strokeWidth="1"/>
            <circle cx="7" cy="7" r="2"   fill="rgba(230,165,59,0.5)"/>
            <path d="M7 1v2M7 11v2M1 7h2M11 7h2" stroke="rgba(230,165,59,0.5)" strokeWidth="1" strokeLinecap="round"/>
          </svg>
          <span>CALIBRACIÓN DE CROQUIS</span>
        </div>
        <button
          className={`zp-calibrator__anchor ${isAnclado ? 'zp-calibrator__anchor--locked' : ''}`}
          onClick={toggleAnclar}
        >
          {isAnclado ? (
            <><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><rect x="2" y="4" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1"/><path d="M3.5 4V3a1.5 1.5 0 013 0v1" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>Anclado</>
          ) : (
            <><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><rect x="2" y="4" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1"/>            <path d="M6.5 4V2.5a1.5 1.5 0 00-3 0" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>Anclar</>
          )}
        </button>
        <button type="button" className="zp-calibrator__export" onClick={() => {
          const cal = { puntoLng, puntoLat, puntoEscala, rotation }
          const blob = new Blob([JSON.stringify(cal, null, 2)], { type: 'application/json' })
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a'); a.href = url; a.download = 'zapote_calibracion.json'
          a.click(); URL.revokeObjectURL(url)
        }}>📥</button>
      </div>
      <div className="zp-calibrator__body">
        <div className="zp-cal-group">
          <div className="zp-cal-group__label">
            <span>Rotación</span>
            <code>{rotation.toFixed(0)}°</code>
          </div>
          <input type="range" className="zp-cal-slider"
            min="-180" max="180" step="1" value={rotation}
            onChange={(e) => setRotation(Number(e.target.value))}
            disabled={isAnclado}
          />
          <div className="zp-cal-ticks"><span>-180°</span><span>0°</span><span>+180°</span></div>
        </div>
        <div className="zp-cal-group">
          <div className="zp-cal-group__label">
            <span>Escala</span>
            <code>{(puntoEscala * 1e6).toFixed(2)} µ</code>
          </div>
          <input type="range" className="zp-cal-slider"
            min="0.000001" max="0.000020" step="0.0000001" value={puntoEscala}
            onChange={(e) => setPuntoEscala(Number(e.target.value))}
            disabled={isAnclado}
          />
        </div>
        <div className="zp-cal-group">
          <div className="zp-cal-group__label">
            <span>Este — Oeste</span>
            <code>{(puntoLng - (-76.429972)).toFixed(5)}</code>
          </div>
          <input type="range" className="zp-cal-slider"
            min="-0.001" max="0.001" step="0.00001"
            value={puntoLng - (-76.429972)}
            onChange={(e) => setPuntoLng(-76.429972 + Number(e.target.value))}
            disabled={isAnclado}
          />
        </div>
        <div className="zp-cal-group">
          <div className="zp-cal-group__label">
            <span>Norte — Sur</span>
            <code>{(puntoLat - 3.645361).toFixed(5)}</code>
          </div>
          <input type="range" className="zp-cal-slider"
            min="-0.001" max="0.001" step="0.00001"
            value={puntoLat - 3.645361}
            onChange={(e) => setPuntoLat(3.645361 + Number(e.target.value))}
            disabled={isAnclado}
          />
        </div>
      </div>
    </div>
  );
}

// --- CONSTANTES DEL CROQUIS ---
const IMAGE_WIDTH = 1102;
const IMAGE_HEIGHT = 787;

export default function PredioZapote() {
  const [selectedTree, setSelectedTree] = useState(null);
  const [wikiInfo, setWikiInfo] = useState(null);
  const [loadingWiki, setLoadingWiki] = useState(false);

  // --- ESTADOS DEL MAPA ---
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

  const selectedTreeProfile = useMemo(() => {
    return selectedTree ? getTreeVisualProfile(selectedTree) : null;
  }, [selectedTree]);

  const selectedTreeId = selectedTree ? selectedTree.id : null;

  // --- FILTROS ---
  const [query, setQuery] = useState('');
  const [groupFilter, setGroupFilter] = useState('all');
  const [viewMode, setViewMode] = useState('explore');

  const groups = useMemo(() => [...new Set(zapoteTrees.map(t => t.group))], []);

  const filteredTrees = useMemo(() => {
    const q = query.trim().toLowerCase();
    return zapoteTrees.filter(t => {
      const matchesQuery = !q || t.species.toLowerCase().includes(q) || String(t.id) === q || `#${t.id}` === q;
      const matchesGroup = groupFilter === 'all' || t.group === groupFilter;
      return matchesQuery && matchesGroup;
    });
  }, [query, groupFilter]);

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
    const mostCommonSpecies = Object.entries(zapoteSpeciesCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const groupBreakdown = groupLegend.map(({ group, color }) => {
      const count = zapoteTrees.filter(t => t.group === group).length;
      return { group, color, count, pct: Math.round((count / total) * 100) };
    });

    return { total, speciesCount, groupCount, mostCommonSpecies, groupBreakdown };
  }, []);

  // Calcular posición de marcadores con rotación
  function getLngLat(x, _y) {
    const dx = x - (IMAGE_WIDTH / 2);
    const dy = _y - (IMAGE_HEIGHT / 2);
    const rad = (rotation * Math.PI) / 180;
    
    const rx = dx * Math.cos(rad) - dy * Math.sin(rad);
    const ry = dx * Math.sin(rad) + dy * Math.cos(rad);
    
    return {
      longitude: puntoLng + (rx * puntoEscala),
      latitude: puntoLat - (ry * puntoEscala),
    };
  }

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!selectedTree) return;

    setLoadingWiki(true);
    fetchWikipediaSummary(selectedTree.wikipediaQuery || selectedTree.species).then(info => {
      setWikiInfo(info);
      setLoadingWiki(false);
    });
  }, [selectedTree]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Estadísticas
  const stats = useMemo(() => {
    const groups = [...new Set(zapoteTrees.map(t => t.group))];
    const species = [...new Set(zapoteTrees.map(t => t.species))];
    return {
      total: zapoteTrees.length,
      groups: groups.length,
      species: species.length
    };
  }, []);

  // Document title
  useEffect(() => {
    document.title = 'Predio El Zapote · Inventario Digital de Frutales';
    return () => { document.title = 'INTAGROS | Inteligencia Agropecuaria Sostenible'; };
  }, []);

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
                Solución profesional para monitoreo de frutales con visión satelital y datos de campo.
                Visualiza el croquis del predio, identifica cada árbol y accede a información botánica relevante.
              </p>
            </div>

            <aside className="zapote-hero-cards">
              <article className="zapote-hero-card">
                <span>Árboles registrados</span>
                <strong>{stats.total}</strong>
              </article>
              <article className="zapote-hero-card">
                <span>Variedades</span>
                <strong>{stats.species}</strong>
              </article>
              <article className="zapote-hero-card">
                <span>Grupos botánicos</span>
                <strong>{stats.groups}</strong>
              </article>
            </aside>
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
                  <p className="zapote-panel-label">Detalle activo</p>
                  <h2>{selectedTree ? `Árbol #${selectedTree.id}` : 'Vista general del predio'}</h2>
                </div>
                {selectedTree ? (
                  <button className="zapote-close-btn" onClick={() => setSelectedTree(null)} aria-label="Cerrar">
                    ✕
                  </button>
                ) : (
                  <div className="zp-view-toggle">
                    <button
                      className={`zp-view-toggle__btn ${viewMode === 'explore' ? 'zp-view-toggle__btn--active' : ''}`}
                      onClick={() => setViewMode('explore')}
                    >
                      Explorar
                    </button>
                    <button
                      className={`zp-view-toggle__btn ${viewMode === 'dashboard' ? 'zp-view-toggle__btn--active' : ''}`}
                      onClick={() => setViewMode('dashboard')}
                    >
                      Dashboard
                    </button>
                  </div>
                )}
              </div>

              {selectedTree ? (
                <div className="zapote-tree-info">
                  <h3>{selectedTree.species}</h3>
                  <p className="zapote-tree-group">{selectedTree.group}</p>

                  {selectedTreeProfile?.customImage && (
                    <div className="zapote-tree-image">
                      <img
                        src={selectedTreeProfile.customImage}
                        alt={selectedTree.species}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}

                  {loadingWiki ? (
                    <p className="zapote-loading">Buscando en Wikipedia...</p>
                  ) : wikiInfo ? (
                    <div className="zapote-wiki-content">
                      {wikiInfo.image && (
                        <img
                          src={wikiInfo.image}
                          alt={wikiInfo.title}
                          className="zapote-wiki-image"
                        />
                      )}
                      <p>{wikiInfo.extract.substring(0, 320)}...</p>
                      <a
                        href={wikiInfo.url}
                        target="_blank"
                        rel="noreferrer"
                        className="zapote-wiki-link"
                      >
                        Leer más en Wikipedia →
                      </a>
                    </div>
                  ) : (
                    <p className="zapote-no-info">No se encontró información en Wikipedia.</p>
                  )}
                </div>
              ) : (
                <div className="zapote-empty-state">
                  <div className="zapote-empty-tree">
                    <img src="/media/compass-rose.png" alt="Árbol" className="zapote-empty-tree-img" />
                  </div>
                  <p className="zapote-empty-hint">Selecciona un árbol en el mapa</p>

                  <div className="zp-filter-bar">
                    <div className="zp-search-wrap">
                      <span className="zp-search-icon">🔍</span>
                      <input
                        type="text"
                        className="zp-filter-input"
                        placeholder="Buscar especie o #ID…"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                      {query && (
                        <button
                          className="zp-search-clear"
                          onClick={() => setQuery('')}
                          aria-label="Limpiar búsqueda"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    <div className="zp-filter-chips">
                      <FilterChip active={groupFilter === 'all'} onClick={() => setGroupFilter('all')}>
                        Todos
                      </FilterChip>
                      {groups.map(g => (
                        <FilterChip key={g} active={groupFilter === g} onClick={() => setGroupFilter(g)}>
                          {g}
                        </FilterChip>
                      ))}
                    </div>
                  </div>

                  <div className="zp-tree-list-header">
                    <span>Inventario</span>
                    <span className="zp-tree-list-header__count">{filteredTrees.length} resultados</span>
                  </div>

                  <div className="zp-tree-list">
                    {filteredTrees.length === 0 ? (
                      <p className="zp-tree-list__empty">Sin resultados</p>
                    ) : (
                      filteredTrees.map(tree => {
                        const profile = getTreeVisualProfile(tree);
                        return (
                          <button
                            key={tree.id}
                            className={`zp-tree-list__item ${selectedTree?.id === tree.id ? 'zp-tree-list__item--active' : ''}`}
                            onClick={() => setSelectedTree(tree)}
                          >
                            <span
                              className="zp-tree-list__id-box"
                              style={{ background: profile.canopy, borderColor: profile.border }}
                            >
                              <img
                                src={profile.customImage}
                                alt={`#${tree.id}`}
                                className="zp-tree-list__thumb"
                                onError={(e) => { e.target.style.display = 'none'; }}
                              />
                              <span className="zp-tree-list__id-num">{tree.id}</span>
                            </span>
                            <span className="zp-tree-list__info">
                              {(() => { const h = getTreeHealth(tree); return (
                                <span className="zp-tree-list__health" data-status={h.status} title={`Salud: ${h.label} (${h.score}%)`} />
                              );})()}
                              <span className="zp-tree-list__species" style={{ color: profile.border }}>{tree.species}</span>
                              <span className="zp-tree-list__group">{tree.group}</span>
                            </span>
        </button>
                        );
                      })
                    )}
                  </div>

                  <div className="zp-group-legend">
                    {groupLegend.map(({ group, color, count }) => (
                      <button
                        key={group}
                        className={`zp-group-legend__item ${groupFilter === group ? 'zp-group-legend__item--active' : ''}`}
                        onClick={() => setGroupFilter(groupFilter === group ? 'all' : group)}
                      >
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

              {/* Barra de estado superior */}
                <MapStatusBar
                  selectedTree={selectedTree}
                  treeCount={filteredTrees.length}
                  totalCount={zapoteTrees.length}
                  lat={puntoLat}
                  lng={puntoLng}
                />

                {/* Viewport del mapa + HUD */}
                <div className="zp-map-viewport">

                  <MapboxOrchard3D
                    trees={filteredTrees}
                  selectedTreeId={selectedTreeId}
                  onSelectTree={(id) => setSelectedTree(zapoteTrees.find((tree) => tree.id === id) ?? null)}
                  initialViewState={{
                    latitude: puntoLat,
                    longitude: puntoLng,
                    zoom: 17.5,
                    pitch: 0,
                  }}
                  mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
                  getLngLat={getLngLat}
                  renderMarker={(tree, isSelected) => <TreeMarkerIcon tree={tree} isSelected={isSelected} />}
                />

                <MapCrosshair />
                <CompassRose rotation={rotation} />

                {selectedTree && (
                  <div className="zp-map-selected-badge">
                    <svg width="8" height="8" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="3" fill={selectedTreeProfile?.border || '#e6a53b'}/>
                    </svg>
                    #{selectedTree.id} · {selectedTree.species}
                  </div>
                )}

                <div className="zp-map-corner zp-map-corner--tl" aria-hidden="true"/>
                <div className="zp-map-corner zp-map-corner--tr" aria-hidden="true"/>
                <div className="zp-map-corner zp-map-corner--bl" aria-hidden="true"/>
                <div className="zp-map-corner zp-map-corner--br" aria-hidden="true"/>
              </div>

              <MapFooterBar rotation={rotation} />

              <CalibratorPanel
                rotation={rotation}           setRotation={setRotation}
                puntoEscala={puntoEscala}     setPuntoEscala={setPuntoEscala}
                puntoLng={puntoLng}           setPuntoLng={setPuntoLng}
                puntoLat={puntoLat}           setPuntoLat={setPuntoLat}
                isAnclado={isAnclado}         toggleAnclar={toggleAnclar}
              />

            </div>
          </div>
        </section>

        {viewMode === 'dashboard' && (
        <section className="zp-dashboard-section">
          <div className="zapote-hero-container">
            <div className="zp-dash-header">
              <div className="zp-dash-header__left">
                <div className="zp-dash-header__icon">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="2" width="10" height="8" rx="1"/><path d="M4 2V1a1 1 0 011-1h2a1 1 0 011 1v1"/></svg>
                </div>
                <div>
                  <div className="zp-dash-header__label">PANEL DE CONTROL · DASHBOARD</div>
                  <h3 className="zp-dash-header__title">Métricas del predio en tiempo real</h3>
                </div>
              </div>
              <div className="zp-dash-header__live">
                <span className="zp-dash-header__dot" />
                <span>EN VIVO</span>
              </div>
            </div>

            <div className="zp-dash-kpis">
              {[
                { label: 'Árboles', value: String(dashboardStats.total), accent: '#7fb069' },
                { label: 'Variedades', value: String(dashboardStats.speciesCount), accent: '#f4d35e' },
                { label: 'Grupos', value: String(dashboardStats.groupCount), accent: '#e48b24' },
                { label: 'Más común', value: dashboardStats.mostCommonSpecies[0]?.[0]?.slice(0, 10) ?? '—', accent: '#cbd84a' },
              ].map((kpi, i) => (
                <div key={i} className="zp-dash-kpi">
                  <div className="zp-dash-kpi__value">{kpi.value}</div>
                  <div className="zp-dash-kpi__label">{kpi.label}</div>
                  <span className="zp-dash-kpi__accent" style={{ background: kpi.accent }} />
                </div>
              ))}
            </div>

            <div className="zp-dash-tools">
              {/* ── Environmental widget ── */}
              <div className="zp-env-widget">
                <div className="zp-env-header">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="7" cy="7" r="5"/><path d="M7 2v2M7 10v2M2 7h2M10 7h2"/></svg>
                  <span>ESTACIÓN AMBIENTAL</span>
                  <span className="zp-env-update">— Actualizado en vivo</span>
                </div>
                <div className="zp-env-grid">
                  <div className="zp-env-item zp-env-item--main">
                    <span className="zp-env-item__icon">{envData.icon}</span>
                    <span className="zp-env-item__value">{envData.temp}°</span>
                    <span className="zp-env-item__label">{envData.condition}</span>
                  </div>
                  <div className="zp-env-item">
                    <span className="zp-env-item__value">{envData.humidity}%</span>
                    <span className="zp-env-item__label">Humedad</span>
                  </div>
                  <div className="zp-env-item">
                    <span className="zp-env-item__value">{envData.rainfall}mm</span>
                    <span className="zp-env-item__label">Lluvia</span>
                  </div>
                  <div className="zp-env-item">
                    <span className="zp-env-item__value">{envData.uv}</span>
                    <span className="zp-env-item__label">UV</span>
                  </div>
                  <div className="zp-env-item">
                    <span className="zp-env-item__value">{envData.wind}km</span>
                    <span className="zp-env-item__label">Viento</span>
                  </div>
                  <div className="zp-env-item">
                    <span className="zp-env-item__value">{envData.pressure}hPa</span>
                    <span className="zp-env-item__label">Presión</span>
                  </div>
                </div>
              </div>

              {/* ── Health summary ── */}
              <div className="zp-health-card">
                <div className="zp-env-header">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M7 1v12M1 7h12"/><circle cx="7" cy="7" r="3"/></svg>
                  <span>SALUD DEL PREDIO</span>
                </div>
                {(() => {
                  const allHealth = zapoteTrees.map(t => getTreeHealth(t));
                  const opt = allHealth.filter(h => h.label === 'Óptima' || h.status === 'good').length;
                  const warn = allHealth.filter(h => h.label === 'Regular' || h.status === 'warning').length;
                  const crit = allHealth.filter(h => h.label === 'Crítica' || h.status === 'critical').length;
                  const avg = Math.round(allHealth.reduce((a, h) => a + h.score, 0) / allHealth.length);
                  const pct = Math.round((opt / allHealth.length) * 100);
                  return (<>
                  <div className="zp-health-score">
                    <div className="zp-health-gauge">
                      <svg width="60" height="60" viewBox="0 0 60 60">
                        <circle cx="30" cy="30" r="26" fill="none" stroke="rgba(74,124,58,0.1)" strokeWidth="5"/>
                        <circle cx="30" cy="30" r="26" fill="none" stroke="#7fb069" strokeWidth="5"
                          strokeDasharray={`${(pct/100)*163} 163`} transform="rotate(-90 30 30)"
                          strokeLinecap="round"/>
                        <text x="30" y="30" textAnchor="middle" dominantBaseline="central"
                          fill="#eef3df" fontSize="16" fontWeight="700" fontFamily="'Courier New',monospace">{avg}</text>
                      </svg>
                    </div>
                    <div className="zp-health-stats">
                      <div className="zp-health-stat"><span className="zp-health-dot" style={{background:'#7fb069'}}/>{opt} óptimos</div>
                      <div className="zp-health-stat"><span className="zp-health-dot" style={{background:'#f4d35e'}}/>{warn} regulares</div>
                      <div className="zp-health-stat"><span className="zp-health-dot" style={{background:'#c94835'}}/>{crit} críticos</div>
                    </div>
                  </div>
                  </>);
                })()}
              </div>

              {/* ── CSV export ── */}
              <div className="zp-export-card">
                <div className="zp-env-header">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M3 2h8v10H3z"/><path d="M5 5h4M5 8h4"/></svg>
                  <span>EXPORTAR DATOS</span>
                </div>
                <p className="zp-export-desc">Descarga el inventario completo en formato CSV para análisis en Excel, Python o Google Sheets.</p>
                <button className="zp-export-btn" onClick={() => downloadCSV(zapoteTrees)}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 1v8M3 6l4 4 4-4M2 11v2h10v-2"/></svg>
                  Descargar CSV
                </button>
              </div>
            </div>

            <div className="zp-dash-section-label">
              <span className="zp-dash-section-label__line" />
              <span className="zp-dash-section-label__text">GRÁFICAS Y ESTADÍSTICAS</span>
              <span className="zp-dash-section-label__line" />
            </div>

            <div className="zp-dash-charts">
              <div className="zp-dash-chart-card zp-dash-chart-card--wide">
                <img src="/media/dashboard/group_bars.png" alt="Distribución por grupo" className="zp-dash-chart-img" loading="lazy" />
              </div>
              <div className="zp-dash-chart-card">
                <img src="/media/dashboard/group_donut.png" alt="Composición por grupo" className="zp-dash-chart-img" loading="lazy" />
              </div>
              <div className="zp-dash-chart-card">
                <img src="/media/dashboard/top_species.png" alt="Especies más representadas" className="zp-dash-chart-img" loading="lazy" />
              </div>
              <div className="zp-dash-chart-card zp-dash-chart-card--wide">
                <img src="/media/dashboard/species_per_group.png" alt="Árboles por grupo" className="zp-dash-chart-img" loading="lazy" />
              </div>
              <div className="zp-dash-chart-card">
                <img src="/media/dashboard/health_distribution.png" alt="Salud del predio" className="zp-dash-chart-img" loading="lazy" />
              </div>
              <div className="zp-dash-chart-card">
                <img src="/media/dashboard/citricos_breakdown.png" alt="Desglose de cítricos" className="zp-dash-chart-img" loading="lazy" />
              </div>
              <div className="zp-dash-chart-card zp-dash-chart-card--kpi">
                <img src="/media/dashboard/summary_stats.png" alt="Resumen" className="zp-dash-chart-img" loading="lazy" />
              </div>
            </div>
          </div>
        </section>
        )}

        <section className="zp-data-panel">
          <div className="zapote-hero-container">

            {/* ── Panel header ── */}
            <div className="zp-data-header">
              <div className="zp-data-header__left">
                <span className="zp-data-header__label">DATA PANEL // v2.1</span>
                <h2 className="zp-data-header__title">Predio El Zapote</h2>
              </div>
              <div className="zp-data-header__status">
                <span className="zp-data-status__dot" />
                <span className="zp-data-status__text">SISTEMA ACTIVO</span>
              </div>
            </div>

            {/* ── Main grid ── */}
            <div className="zp-data-grid">

              {/* Column 1: Sobre el predio */}
              <div className="zp-data-col">
                <div className="zp-data-col__header">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <circle cx="8" cy="8" r="6"/><path d="M8 2v12M2 8h12"/>
                  </svg>
                  <span>INVENTARIO DIGITAL</span>
                </div>

                <div className="zp-data-metrics">
                  <div className="zp-data-metric">
                    <span className="zp-data-metric__value" style={{ color: '#7fb069' }}>{stats.total}</span>
                    <span className="zp-data-metric__label">Árboles</span>
                  </div>
                  <div className="zp-data-metric">
                    <span className="zp-data-metric__value" style={{ color: '#f4d35e' }}>{stats.species}</span>
                    <span className="zp-data-metric__label">Variedades</span>
                  </div>
                  <div className="zp-data-metric">
                    <span className="zp-data-metric__value" style={{ color: '#e48b24' }}>{stats.groups}</span>
                    <span className="zp-data-metric__label">Grupos</span>
                  </div>
                </div>

                <p className="zp-data-text">
                  Sistema integral de monitoreo frutícola que combina imagery satelital con un croquis
                  georreferenciado del predio. Cada árbol registrado cuenta con un perfil botánico
                  enriquecido con datos de Wikipedia, permitiendo consultar especie, grupo, características
                  y usos directamente desde el mapa interactivo.
                </p>

                <div className="zp-data-features">
                  <div className="zp-data-feature">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#7fb069" strokeWidth="1.5"><path d="M2 6l3 3 5-5"/></svg>
                    Geolocalización satelital
                  </div>
                  <div className="zp-data-feature">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#7fb069" strokeWidth="1.5"><path d="M2 6l3 3 5-5"/></svg>
                    Perfil botánico por árbol con Wikipedia
                  </div>
                  <div className="zp-data-feature">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#7fb069" strokeWidth="1.5"><path d="M2 6l3 3 5-5"/></svg>
                    Siluetas PNG por especie en mapa y listado
                  </div>
                  <div className="zp-data-feature">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#7fb069" strokeWidth="1.5"><path d="M2 6l3 3 5-5"/></svg>
                    Dashboard con KPIs y charts estadísticos
                  </div>
                </div>
              </div>

              {/* Column 2: Arquitectura */}
              <div className="zp-data-col">
                <div className="zp-data-col__header">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <rect x="1" y="3" width="14" height="10" rx="1"/><path d="M5 3V2a1 1 0 011-1h4a1 1 0 011 1v1"/>
                  </svg>
                  <span>ARQUITECTURA DEL SISTEMA</span>
                </div>

                <p className="zp-data-text">
                  Interfaz diseñada para técnicos agrícolas e ingenieros agrónomos que necesitan
                  visualizar, calibrar y analizar el predio en tiempo real. Plataforma que integra
                  mapa satelital con superposición de croquis georreferenciado y marcadores inteligentes.
                </p>

                <div className="zp-data-specs">
                  <div className="zp-data-spec">
                    <div className="zp-data-spec__icon">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#d4a62f" strokeWidth="1.2"><path d="M7 1v12M1 7h12"/></svg>
                    </div>
                    <div>
                      <div className="zp-data-spec__title">Croquis calibrable</div>
                      <div className="zp-data-spec__desc">Rotación, escala y posición con anclaje persistente</div>
                    </div>
                  </div>
                  <div className="zp-data-spec">
                    <div className="zp-data-spec__icon">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#77a95f" strokeWidth="1.2"><circle cx="7" cy="7" r="5"/><circle cx="7" cy="7" r="2"/></svg>
                    </div>
                    <div>
                      <div className="zp-data-spec__title">Marcadores 3D</div>
                      <div className="zp-data-spec__desc">117 árboles con íconos por especie y badge numerado</div>
                    </div>
                  </div>
                  <div className="zp-data-spec">
                    <div className="zp-data-spec__icon">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#f07b21" strokeWidth="1.2"><path d="M2 12L5 3l3 7 2-5 2 7"/></svg>
                    </div>
                    <div>
                      <div className="zp-data-spec__title">Dos modos de vista</div>
                      <div className="zp-data-spec__desc">Explorar (filtros + lista) y Dashboard (gráficas + KPIs)</div>
                    </div>
                  </div>
                  <div className="zp-data-spec">
                    <div className="zp-data-spec__icon">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#5a4a73" strokeWidth="1.2"><rect x="2" y="4" width="10" height="8" rx="1"/><path d="M4 4V3a1 1 0 011-1h4a1 1 0 011 1v1"/></svg>
                    </div>
                    <div>
                      <div className="zp-data-spec__title">Reportes técnicos</div>
                      <div className="zp-data-spec__desc">Base para generación de informes de campo</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* ── Bottom bar ── */}
            <div className="zp-data-footer">
              <span>INTAGROS · Inteligencia Agropecuaria Sostenible</span>
              <span>Datos generados con Python + Pandas + Matplotlib</span>
            </div>

          </div>
        </section>
      </main>

      <section className="zapote-instructions-section">
        <div className="zapote-instructions-container">
          <h2>Cómo usar el mapa</h2>
          <div className="zapote-instructions-grid">
            <article>
              <span className="zapote-instruction-icon">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="14" cy="14" r="10"/>
                  <path d="M14 4v3M14 21v3M4 14h3M21 14h3"/>
                  <circle cx="14" cy="14" r="3"/>
                </svg>
              </span>
              <h3>Navega el mapa</h3>
              <p>Usa los controles de navegación o arrastra para moverte por el predio. El croquis se superpone automáticamente sobre la imagen satelital.</p>
            </article>
            <article>
              <span className="zapote-instruction-icon">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="14" cy="14" r="6"/>
                  <path d="M14 2v4M14 22v4M2 14h4M22 14h4"/>
                </svg>
              </span>
              <h3>Selecciona árboles</h3>
              <p>Haz clic en cualquier marcador numerado del mapa para ver su perfil botánico: nombre, grupo, descripción de Wikipedia e imagen de la especie.</p>
            </article>
            <article>
              <span className="zapote-instruction-icon">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="8" width="20" height="14" rx="2"/>
                  <circle cx="14" cy="15" r="2"/>
                  <path d="M8 8V6a2 2 0 012-2h8a2 2 0 012 2v2"/>
                </svg>
              </span>
              <h3>Ajusta la vista</h3>
              <p>Usa los controles de calibración para ajustar rotación, escala y posición del croquis. Modifica la opacidad para comparar con la imagen satelital.</p>
            </article>
            <article>
              <span className="zapote-instruction-icon">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="7" y="12" width="14" height="12" rx="2"/>
                  <path d="M10 12V9a4 4 0 018 0v3"/>
                  <circle cx="14" cy="19" r="1.5" fill="currentColor"/>
                </svg>
              </span>
              <h3>Ancla la posición</h3>
              <p>Guarda tu calibración preferida para futuras visitas. El anclaje persiste en el navegador y mantiene la vista ajustada a tu referencia.</p>
            </article>
          </div>
          </div>
        </section>
    </div>
  );
}
