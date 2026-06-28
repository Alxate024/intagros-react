import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import MapboxOrchard3D from '../components/MapboxOrchard3D';
import 'mapbox-gl/dist/mapbox-gl.css';
import './PredioZapote.css';

// Importar datos
import { zapoteTrees } from '../data/zapoteTrees';

// --- CACHÉ Y UTILIDADES ---
const wikipediaCache = new globalThis.Map();

const normalizeText = (value) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

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
  } catch (e) {
    return null;
  }
}

// --- PERFILES VISUALES DE ÁRBOLES CON IMÁGENES PERSONALIZABLES ---
function getTreeVisualProfile(tree) {
  const species = normalizeText(tree.species);

  // Mango
  if (species.includes('mango')) {
    return {
      canopy: '#23451f',
      border: '#d7a23b',
      customImage: tree.customImage || '/media/trees/mango.png' // ← Imagen personalizable
    };
  }

  // Aguacate
  if (species.includes('aguacate')) {
    return {
      canopy: '#1f3b22',
      border: '#253719',
      customImage: tree.customImage || '/media/trees/aguacate.png'
    };
  }

  // Cítricos
  if (tree.group === 'Citricos') {
    const isLemon = species.includes('limon');
    return {
      canopy: '#2e5523',
      border: isLemon ? '#cbd84a' : '#e48b24',
      customImage: tree.customImage || (isLemon ? '/media/trees/limon.png' : '/media/trees/naranja.png')
    };
  }

  // Guayaba
  if (species.includes('guayaba') || species.includes('guayana')) {
    return {
      canopy: '#4c7438',
      border: '#b9d878',
      customImage: tree.customImage || '/media/trees/guayaba.png'
    };
  }

  // Guanábano
  if (species.includes('guanabano') || species.includes('anon')) {
    return {
      canopy: '#315229',
      border: '#8cae66',
      customImage: tree.customImage || '/media/trees/guanabano.png'
    };
  }

  // Jaboticaba
  if (species.includes('jaboticaba')) {
    return {
      canopy: '#1d3322',
      border: '#2b1d38',
      customImage: tree.customImage || '/media/trees/jaboticaba.png'
    };
  }

  // Mamey / Zapote
  if (species.includes('mamey') || species.includes('zapote')) {
    return {
      canopy: '#2d4722',
      border: '#a65f35',
      customImage: tree.customImage || '/media/trees/zapote.png'
    };
  }

  // Carambola
  if (species.includes('carambola')) {
    return {
      canopy: '#3f6731',
      border: '#d7c93e',
      customImage: tree.customImage || '/media/trees/carambola.png'
    };
  }

  // Marañón
  if (species.includes('maranon')) {
    return {
      canopy: '#344f23',
      border: '#c6532a',
      customImage: tree.customImage || '/media/trees/maranon.png'
    };
  }

  // Default
  return {
    canopy: '#314f28',
    border: '#9b7d35',
    customImage: tree.customImage || '/media/trees/default.png'
  };
}

// --- CONSTANTES DE POSICIÓN BASE ---
const ZAPOTE_BASE_LNG = -76.429972;
const ZAPOTE_BASE_LAT = 3.645361;
const ZAPOTE_BASE_SCALE = 0.000004;

export default function PredioZapote() {
  const [selectedTree, setSelectedTree] = useState(null);
  const [wikiInfo, setWikiInfo] = useState(null);
  const [loadingWiki, setLoadingWiki] = useState(false);
  const [trees, setTrees] = useState(() => {
    const overrides = typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('zapote_point_overrides') || '{}')
      : {};
    return zapoteTrees.map((tree) => {
      const saved = overrides[tree.id];
      return { ...tree, x: saved?.x ?? tree.x, y: saved?.y ?? tree.y };
    });
  });
  const [editingPoints, setEditingPoints] = useState(false);

  const selectedTreeProfile = useMemo(() => {
    return selectedTree ? getTreeVisualProfile(selectedTree) : null;
  }, [selectedTree]);

  const selectedTreeId = selectedTree ? selectedTree.id : null;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.sessionStorage.getItem('zapoteControlAlertShown')) {
      window.alert('Control oculto: estos son los patrones de los puntos.');
      window.sessionStorage.setItem('zapoteControlAlertShown', '1');
    }
  }, []);

  const [puntoLng, setPuntoLng] = useState(() => {
    const saved = localStorage.getItem('zapote_puntoLng');
    return saved ? parseFloat(saved) : ZAPOTE_BASE_LNG;
  });
  const [puntoLat, setPuntoLat] = useState(() => {
    const saved = localStorage.getItem('zapote_puntoLat');
    return saved ? parseFloat(saved) : ZAPOTE_BASE_LAT;
  });
  const [puntoEscala, setPuntoEscala] = useState(() => {
    const saved = localStorage.getItem('zapote_puntoEscala');
    return saved ? parseFloat(saved) : ZAPOTE_BASE_SCALE;
  });
  const [rotation, setRotation] = useState(() => {
    const saved = localStorage.getItem('zapote_rotation');
    return saved ? parseFloat(saved) : 0;
  });
  const [isAnclado, setIsAnclado] = useState(() => {
    const saved = localStorage.getItem('zapote_isAnclado');
    return saved === null ? true : saved === 'true';
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !isAnclado) return;
    localStorage.setItem('zapote_puntoLng', puntoLng.toString());
    localStorage.setItem('zapote_puntoLat', puntoLat.toString());
    localStorage.setItem('zapote_puntoEscala', puntoEscala.toString());
    localStorage.setItem('zapote_rotation', rotation.toString());
    localStorage.setItem('zapote_isAnclado', 'true');
  }, [puntoLng, puntoLat, puntoEscala, rotation, isAnclado]);

  function lonLatToXY(lng, lat) {
    const dx = lng - puntoLng;
    const dy = puntoLat - lat;
    const rx = dx / puntoEscala;
    const ry = dy / puntoEscala;
    const rad = (rotation * Math.PI) / 180;
    const x = rx * Math.cos(rad) + ry * Math.sin(rad) + 551;
    const y = -rx * Math.sin(rad) + ry * Math.cos(rad) + 393;
    return [x, y];
  }

  function handleMapClick(e) {
    if (!editingPoints || !selectedTree || !e?.lngLat) return;
    const lng = e.lngLat.lng ?? e.lngLat[0];
    const lat = e.lngLat.lat ?? e.lngLat[1];
    const [x, y] = lonLatToXY(lng, lat);

    setTrees((prev) => prev.map((t) => (t.id === selectedTree.id ? { ...t, x, y } : t)));
    setSelectedTree((prev) => (prev && prev.id === selectedTree.id ? { ...prev, x, y } : prev));

    if (typeof window !== 'undefined') {
      const saved = JSON.parse(localStorage.getItem('zapote_point_overrides') || '{}');
      saved[selectedTree.id] = { x, y };
      localStorage.setItem('zapote_point_overrides', JSON.stringify(saved));
    }
  }

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

  function getLngLat(x, y) {
    const dx = x - 551;
    const dy = y - 393;
    const rad = (rotation * Math.PI) / 180;
    const rx = dx * Math.cos(rad) - dy * Math.sin(rad);
    const ry = dx * Math.sin(rad) + dy * Math.cos(rad);
    return {
      longitude: puntoLng + rx * puntoEscala,
      latitude: puntoLat - ry * puntoEscala,
    };
  }

  useEffect(() => {
    if (!selectedTree) {
      setWikiInfo(null);
      return;
    }
    setLoadingWiki(true);
    fetchWikipediaSummary(selectedTree.species).then(info => {
      setWikiInfo(info);
      setLoadingWiki(false);
    });
  }, [selectedTree]);

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

  return (
    <div className="zapote-page">
      <header className="zapote-hero-section">
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
          <div className="zapote-map-container">
            <aside className={`zapote-info-panel ${selectedTree ? '' : 'zapote-empty-panel'}`}>
              <div className="zapote-info-header">
                <div>
                  <p className="zapote-panel-label">Detalle activo</p>
                  <h2>{selectedTree ? `Árbol #${selectedTree.id}` : 'Vista general del predio'}</h2>
                </div>
                {selectedTree && (
                  <button className="zapote-close-btn" onClick={() => setSelectedTree(null)} aria-label="Cerrar">
                    ✕
                  </button>
                )}
              </div>
              {selectedTree && (
                <div className="zapote-edit-action">
                  <button
                    type="button"
                    className={`zapote-edit-toggle ${editingPoints ? 'active' : ''}`}
                    onClick={() => setEditingPoints((value) => !value)}
                  >
                    {editingPoints ? '✅ Mover árbol activo' : '✍️ Mover árbol'}
                  </button>
                  {editingPoints && (
                    <p className="zapote-edit-hint">Haz clic en el mapa para mover el árbol seleccionado.</p>
                  )}
                </div>
              )}

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
                  <p>Selecciona cualquier marcador para activar el panel de árbol y consultar datos clave.</p>
                  <p>Este panel también será la puerta de entrada para la futura página informativa del predio.</p>
                </div>
              )}
            </aside>

            <div className="zapote-map-wrapper">
              <MapboxOrchard3D
                trees={trees}
                selectedTreeId={selectedTreeId}
                onSelectTree={(id) => setSelectedTree(trees.find((tree) => tree.id === id) ?? null)}
                onMapClick={handleMapClick}
                initialViewState={{
                  latitude: puntoLat,
                  longitude: puntoLng,
                  zoom: 17.5,
                  pitch: 0,
                }}
                mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
                getLngLat={getLngLat}
              />

              <div className="zapote-controls-panel zapote-controls-hidden">
                <button
                  className={`zapote-anchor-btn ${isAnclado ? 'anclado' : ''}`}
                  onClick={toggleAnclar}
                >
                  {isAnclado ? '🔒 Anclado' : '🔓 Anclar Posición'}
                </button>

                <div className="zapote-control-group">
                  <label>Rotación ({rotation.toFixed(0)}°)</label>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    step="1"
                    value={rotation}
                    onChange={(e) => setRotation(Number(e.target.value))}
                    disabled={!isAnclado}
                  />
                </div>

                <div className="zapote-control-group">
                  <label>Escala</label>
                  <input
                    type="range"
                    min="0.000002"
                    max="0.000010"
                    step="0.0000001"
                    value={puntoEscala}
                    onChange={(e) => setPuntoEscala(Number(e.target.value))}
                    disabled={!isAnclado}
                  />
                </div>

                <div className="zapote-control-group">
                  <label>Mover Este-Oeste</label>
                  <input
                    type="range"
                    min="-0.01"
                    max="0.01"
                    step="0.00001"
                    value={puntoLng - ZAPOTE_BASE_LNG}
                    onChange={(e) => setPuntoLng(ZAPOTE_BASE_LNG + Number(e.target.value))}
                    disabled={!isAnclado}
                  />
                </div>

                <div className="zapote-control-group">
                  <label>Mover Norte-Sur</label>
                  <input
                    type="range"
                    min="-0.01"
                    max="0.01"
                    step="0.00001"
                    value={puntoLat - ZAPOTE_BASE_LAT}
                    onChange={(e) => setPuntoLat(ZAPOTE_BASE_LAT + Number(e.target.value))}
                    disabled={!isAnclado}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="zapote-details-section">
          <div className="zapote-details-grid">
            <article className="zapote-card zapote-card-highlight">
              <p className="zapote-panel-label">Resumen profesional</p>
              <h3>Predio El Zapote</h3>
              <p>
                Plataforma de visualización y seguimiento para el predio. Presenta datos de campo, inventarios botánicos y una base para la próxima página informativa.
              </p>
              <ul>
                <li><strong>{stats.total}</strong> árboles monitoreados</li>
                <li><strong>{stats.species}</strong> variedades identificadas</li>
                <li><strong>{stats.groups}</strong> grupos botánicos catalogados</li>
              </ul>
            </article>

            <article className="zapote-card">
              <p className="zapote-panel-label">Perfil del proyecto</p>
              <h3>Dashboard estructurado</h3>
              <p>
                Esta vista está pensada como un panel de control profesional, con análisis por árbol y navegación clara para futuras páginas de detalle.
              </p>
              <ul>
                <li>Información priorizada en un panel lateral</li>
                <li>Mapa satelital con superposición de croquis</li>
                <li>Futuro módulo de reporte técnico e informes</li>
              </ul>
            </article>
          </div>
        </section>
      </main>

      <section className="zapote-instructions-section">
        <div className="zapote-instructions-container">
          <h2>Cómo usar el mapa</h2>
          <div className="zapote-instructions-grid">
            <article>
              <span className="zapote-instruction-icon">🗺️</span>
              <h3>Navega el mapa</h3>
              <p>Usa los controles de navegación o arrastra para moverte por el predio.</p>
            </article>
            <article>
              <span className="zapote-instruction-icon">🌳</span>
              <h3>Selecciona árboles</h3>
              <p>Haz clic en cualquier marcador numerado para ver información del árbol.</p>
            </article>
            <article>
              <span className="zapote-instruction-icon">⚙️</span>
              <h3>Ajusta la vista</h3>
              <p>Calibra la opacidad, rotación y posición del croquis con los controles.</p>
            </article>
            <article>
              <span className="zapote-instruction-icon">🔒</span>
              <h3>Ancla la posición</h3>
              <p>Guarda tu calibración preferida para futuras visitas.</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
