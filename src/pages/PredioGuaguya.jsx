import { useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import guaguyaTreesDefault, { guaguya_groups, guaguya_species } from '../data/guaguya-trees'
import MapboxOrchard3D from '../components/MapboxOrchard3D'
import './PredioGuadalito.css'
import './PredioZapote.css'

const guaguyaLayout = {
  1: [105, 88], 2: [210, 88], 3: [315, 88], 4: [415, 88], 5: [515, 88],
  6: [610, 88], 7: [705, 88], 8: [812, 88], 9: [762, 44], 10: [705, 190],
  11: [610, 190], 12: [515, 190], 13: [415, 190], 14: [210, 190], 15: [105, 190],
  16: [105, 300], 17: [210, 300], 18: [515, 300], 19: [610, 300], 20: [705, 300],
  21: [812, 300], 22: [915, 300], 23: [915, 390], 24: [812, 390], 25: [705, 390],
  26: [658, 350], 27: [610, 390], 28: [515, 390], 29: [210, 390], 30: [105, 390],
  31: [210, 485], 32: [315, 485], 33: [415, 485], 34: [515, 485], 35: [610, 485],
  36: [705, 485], 37: [812, 485], 38: [915, 485], 39: [1010, 485], 40: [915, 575],
  41: [812, 575], 42: [705, 575], 43: [610, 575], 44: [315, 575], 45: [210, 575],
  46: [105, 575], 47: [105, 670], 48: [210, 670], 49: [315, 670], 50: [610, 670],
  51: [705, 670], 52: [415, 760], 53: [315, 760], 54: [105, 760],
}

const normalizeText = (value) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
const speciesToFilename = (species) => normalizeText(species).replace(/\s+/g, '-')

const speciesImageFile = {
  'Aguacate Lorena': 'agucate_lorena.png',
  'Aguacate Lorena (Papelillo)': 'agucate-lorena.png',
  'Anon': 'Anon.png',
  'Carambola': 'agucate-lorena.png',
  'Chirimoyo': 'agucate-lorena.png',
  'Ciruelo': 'agucate-lorena.png',
  'Guayaba Araza': 'guayaba-comun.png',
  'Guayaba Coronilla': 'guayaba-comun.png',
  'Guayaba Pera': 'guyaba-pera.png',
  'Guayaba Peruana': 'guayaba-peruana.png',
  'Kumquat Meiwa': 'Kumquat.png',
  'Limón Nativo': 'limon-nativo.png',
  'Limón Tahití': 'limon_tahiti.png',
  'Madroño': 'madroño.png',
  'Mandarina Arrayana': 'mandarina_arraya.png',
  'Mandarina Oneco': 'mandarina_oneco.png',
  'Mandarina Tangerina': 'mandarina_arraya.png',
  'Mango Tommy': 'mango-tommy.png',
  'Naranja Ombligona': 'naranja_ombligona.webp',
  'Naranja Ombligona Roja': 'naranja_ombligona.webp',
  'Naranja Sweety': 'naranja_sweety.png',
  'Naranja Valencia': 'naranja_salerma.png',
  'Nispero': 'nispero.png',
  'Tangelo Minneola': 'tangelo-orlando.png',
  'Tangelo Orlando': 'tangelo-orlando.png',
  'Zapote': 'zapote.png',
}

function getTreeVisualProfile(tree) {
  const species = normalizeText(tree.species)
  const imageFile = speciesImageFile[tree.species] || `${speciesToFilename(tree.species)}.png`
  const treeImage = `/media/${imageFile}`
  if (species.includes('mango')) return { canopy: '#23451f', border: '#d7a23b', customImage: treeImage, shape: 'oval' }
  if (species.includes('aguacate')) return { canopy: '#1f3b22', border: '#253719', customImage: treeImage, shape: 'tall' }
  if (tree.group === 'Citricos' || species.includes('limon') || species.includes('naranja') || species.includes('mandarina') || species.includes('tangelo') || species.includes('kumquat'))
    return { canopy: '#2e5523', border: species.includes('limon') ? '#cbd84a' : '#e48b24', customImage: treeImage, shape: 'round' }
  if (species.includes('guayaba') || species.includes('guayana'))
    return { canopy: '#4c7438', border: '#b9d878', customImage: treeImage, shape: 'round' }
  if (species.includes('anon'))
    return { canopy: '#315229', border: '#8cae66', customImage: treeImage, shape: 'oval' }
  if (species.includes('zapote'))
    return { canopy: '#2d4722', border: '#a65f35', customImage: treeImage, shape: 'broad' }
  return { canopy: '#314f28', border: tree.color || '#9b7d35', customImage: treeImage, shape: 'round' }
}

function TreeMarkerIcon({ tree, isSelected }) {
  const profile = getTreeVisualProfile(tree)
  const health = getTreeHealth(tree)
  const healthColor = health.status === 'good' ? '#7fb069' : health.status === 'warning' ? '#f4d35e' : '#c94835'
  return (
    <div className={`zp-tree-marker ${isSelected ? 'zp-tree-marker--selected' : ''}`}>
      <div className="zp-tree-marker-pin" style={{ '--zp-canopy': profile.canopy, '--zp-border': profile.border }}>
        <img src="/media/point-icon.png" alt="" className="zp-tree-marker-img" />
        <span className="zp-tree-marker-dot" style={{ background: profile.border }} />
        <span className="zp-tree-marker-health" style={{ background: healthColor }} />
      </div>
      <span className="zp-tree-marker-id" style={{ color: profile.border }}>{tree.id}</span>
    </div>
  )
}

const IMAGE_WIDTH = 1102
const IMAGE_HEIGHT = 787

const GUAGUYA_BASE_LNG = -76.4311
const GUAGUYA_BASE_LAT = 3.6458

// ── Health system ─────────────────────────────────────────────────────
const treeHealthBase = {
  Citricos: { score: 73, label: 'Regular', status: 'warning' },
  Mangos: { score: 82, label: 'Buena', status: 'good' },
  Aguacates: { score: 85, label: 'Buena', status: 'good' },
  Guayabas: { score: 78, label: 'Regular', status: 'warning' },
  'Otros frutales': { score: 70, label: 'Regular', status: 'warning' },
  Anonáceas: { score: 90, label: 'Óptima', status: 'good' },
}
function getTreeHealth(tree) {
  const base = treeHealthBase[tree.group] || { score: 75, label: 'Regular', status: 'warning' }
  const variation = ((tree.id * 7 + tree.species.length * 3) % 15) - 7
  const score = Math.min(100, Math.max(35, base.score + variation))
  let label, status
  if (score >= 80) { label = 'Óptima'; status = 'good' }
  else if (score >= 60) { label = 'Buena'; status = 'good' }
  else if (score >= 40) { label = 'Regular'; status = 'warning' }
  else { label = 'Crítica'; status = 'critical' }
  return { score, label, status }
}

// ── Environmental data (mock) ─────────────────────────────────────────
const envData = {
  temp: 27.8, feelsLike: 29.5, humidity: 76, rainfall: 8.3,
  uv: 5, wind: 7.4, pressure: 1014, condition: 'Mayormente soleado', icon: '🌤',
}

// ── CSV export ─────────────────────────────────────────────────────────
function downloadCSV(trees) {
  const headers = ['ID', 'Especie', 'Grupo', 'Salud', 'Puntaje', 'X', 'Y']
  const rows = trees.map(t => {
    const h = getTreeHealth(t)
    return [t.id, t.species, t.group, h.label, h.score, Math.round(t.x), Math.round(t.y)]
  })
  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a'); a.href = url; a.download = 'predio-guaguya-export.csv'
  a.click(); URL.revokeObjectURL(url)
}

// ── Wikipedia cache ──────────────────────────────────────────────────────
const wikipediaCache = new Map()
async function fetchWikipediaSummary(query) {
  if (wikipediaCache.has(query)) return wikipediaCache.get(query)
  const params = new URLSearchParams({
    action: 'query', format: 'json', origin: '*', generator: 'search',
    gsrsearch: query, gsrlimit: '1', prop: 'extracts|info|pageimages',
    exintro: '1', explaintext: '1', inprop: 'url', piprop: 'thumbnail', pithumbsize: '420',
  })
  try {
    const response = await fetch(`https://es.wikipedia.org/w/api.php?${params.toString()}`)
    const payload = await response.json()
    const page = Object.values(payload.query?.pages ?? {})[0]
    const summary = page ? { title: page.title, extract: page.extract, url: page.fullurl, image: page.thumbnail?.source } : null
    wikipediaCache.set(query, summary)
    return summary
  } catch {
    return null
  }
}

export default function PredioGuaguya() {
  const [selectedTreeId, setSelectedTreeId] = useState(null)
  const [speciesFilter, setSpeciesFilter] = useState('Todas')
  const [groupFilter, setGroupFilter] = useState('Todos')
  const [search, setSearch] = useState('')

  const [puntoLng, setPuntoLng] = useState(() => {
    const saved = localStorage.getItem('guaguya_puntoLng')
    return saved ? parseFloat(saved) : GUAGUYA_BASE_LNG
  })
  const [puntoLat, setPuntoLat] = useState(() => {
    const saved = localStorage.getItem('guaguya_puntoLat')
    return saved ? parseFloat(saved) : GUAGUYA_BASE_LAT
  })
  const [puntoEscala, setPuntoEscala] = useState(() => {
    const saved = localStorage.getItem('guaguya_puntoEscala')
    return saved ? parseFloat(saved) : 0.000008
  })
  const [rotation, setRotation] = useState(() => {
    const saved = localStorage.getItem('guaguya_rotation')
    return saved ? parseFloat(saved) : 0
  })
  const [isAnclado, setIsAnclado] = useState(() => {
    const saved = localStorage.getItem('guaguya_isAnclado')
    return saved === 'true'
  })

  const toggleAnclar = () => {
    if (!isAnclado) {
      localStorage.setItem('guaguya_puntoLng', puntoLng.toString())
      localStorage.setItem('guaguya_puntoLat', puntoLat.toString())
      localStorage.setItem('guaguya_puntoEscala', puntoEscala.toString())
      localStorage.setItem('guaguya_rotation', rotation.toString())
      localStorage.setItem('guaguya_isAnclado', 'true')
    } else {
      localStorage.setItem('guaguya_isAnclado', 'false')
    }
    setIsAnclado(!isAnclado)
  }

  function getLngLat(x, y) {
    const dx = x - IMAGE_WIDTH / 2
    const dy = y - IMAGE_HEIGHT / 2
    const rad = (rotation * Math.PI) / 180
    return {
      longitude: puntoLng + (dx * Math.cos(rad) - dy * Math.sin(rad)) * puntoEscala,
      latitude: puntoLat - (dx * Math.sin(rad) + dy * Math.cos(rad)) * puntoEscala,
    }
  }

  const trees = useMemo(
    () => guaguyaTreesDefault.map((tree) => {
      const [x, y] = guaguyaLayout[tree.id] ?? [tree.x, tree.y]
      return { ...tree, x, y }
    }),
    [],
  )

  const selectedTree = useMemo(
    () => trees.find((tree) => tree.id === selectedTreeId) ?? null,
    [selectedTreeId, trees],
  )

  const filteredTrees = useMemo(() => {
    const normalizedSearch = normalizeText(search.trim())
    return trees.filter((tree) => {
      const matchesSpecies = speciesFilter === 'Todas' || tree.species === speciesFilter
      const matchesGroup = groupFilter === 'Todos' || tree.group === groupFilter
      const target = normalizeText(`${tree.id} ${tree.species} ${tree.group}`)
      const matchesSearch = normalizedSearch.length === 0 || target.includes(normalizedSearch)
      return matchesSpecies && matchesGroup && matchesSearch
    })
  }, [groupFilter, search, speciesFilter, trees])

  const speciesCounts = useMemo(
    () => trees.reduce((acc, tree) => { acc[tree.species] = (acc[tree.species] ?? 0) + 1; return acc }, {}),
    [trees],
  )

  const groupTotals = useMemo(
    () => guaguya_groups.map((group) => ({ group, total: trees.filter((t) => t.group === group).length })),
    [trees],
  )

  const dashboardStats = useMemo(() => ({
    total: trees.length,
    speciesCount: guaguya_species.length,
    groupCount: guaguya_groups.length,
  }), [])

  const [wikiInfo, setWikiInfo] = useState(null)
  const [loadingWiki, setLoadingWiki] = useState(false)
  useEffect(() => {
    if (!selectedTree) return
    setLoadingWiki(true)
    fetchWikipediaSummary(selectedTree.species).then(info => {
      setWikiInfo(info)
      setLoadingWiki(false)
    })
  }, [selectedTree])

  return (
    <div className="guadalito">
      <section className="zapote-hero-section">
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
            <Link to="/">Inicio</Link>
            <span>/</span>
            <strong>Predio Guaguya</strong>
          </nav>
          <div className="guadalito-hero__copy">
            <span className="zapote-kicker">Inventario digital de frutales</span>
            <h1>Predio Guaguya</h1>
            <p>
              Mapa interactivo basado en el croquis del predio Guaguya, con árboles
              numerados, filtros por especie y lectura rápida por grupo productivo.
            </p>
          </div>
          <div className="guadalito-hero__stats" aria-label="Resumen del inventario">
            <article className="zapote-hero-card"><span>Árboles registrados</span><strong>{trees.length}</strong></article>
            <article className="zapote-hero-card"><span>Variedades</span><strong>{guaguya_species.length}</strong></article>
            <article className="zapote-hero-card"><span>Grupos productivos</span><strong>{guaguya_groups.length}</strong></article>
          </div>
        </div>
      </section>

      <section className="guadalito-workbench" aria-label="Mapa de arboles">
        <aside className="guadalito-panel guadalito-panel--filters">
          <div className="guadalito-panel__head">
            <span>Busqueda</span>
            <strong>{filteredTrees.length} visibles</strong>
          </div>

          <label className="guadalito-field">
            <span>Numero, especie o grupo</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Ej: 12, Tangelo, Citricos"
            />
          </label>

          <label className="guadalito-field">
            <span>Grupo</span>
            <select value={groupFilter} onChange={(event) => setGroupFilter(event.target.value)}>
              <option>Todos</option>
              {guaguya_groups.map((group) => (
                <option key={group}>{group}</option>
              ))}
            </select>
          </label>

          <label className="guadalito-field">
            <span>Especie</span>
            <select value={speciesFilter} onChange={(event) => setSpeciesFilter(event.target.value)}>
              <option>Todas</option>
              {guaguya_species.map((species) => (
                <option key={species}>{species}</option>
              ))}
            </select>
          </label>

          <div className="guadalito-group-list">
            {groupTotals.map((item) => (
              <button
                key={item.group}
                type="button"
                className={groupFilter === item.group ? 'is-active' : ''}
                onClick={() => setGroupFilter(item.group)}
              >
                <span>{item.group}</span>
                <strong>{item.total}</strong>
              </button>
            ))}
            <button
              type="button"
              className={groupFilter === 'Todos' ? 'is-active' : ''}
              onClick={() => setGroupFilter('Todos')}
            >
              <span>Ver todos</span>
              <strong>{trees.length}</strong>
            </button>
          </div>
        </aside>

        <div className="guadalito-map-shell">
          <div className="guadalito-map-toolbar">
            <div>
              <span>Plano base</span>
              <strong>Croquis Predio Guaguya</strong>
            </div>
            <button
              type="button"
              onClick={() => { setSearch(''); setGroupFilter('Todos'); setSpeciesFilter('Todas') }}
            >
              Limpiar filtros
            </button>
          </div>

          <div className="guadalito-mapbox-panel">
            <MapboxOrchard3D
              trees={filteredTrees}
              selectedTreeId={selectedTree?.id ?? null}
              onSelectTree={setSelectedTreeId}
              initialViewState={{
                longitude: puntoLng, latitude: puntoLat,
                zoom: 17.5, pitch: 0, bearing: 0,
              }}
              mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
              getLngLat={getLngLat}
              renderMarker={(tree, isSelected) => <TreeMarkerIcon tree={tree} isSelected={isSelected} />}
            />

            <div className="guadalito-controls-panel">
              <button
                className={`zapote-anchor-btn ${isAnclado ? 'anclado' : ''}`}
                onClick={toggleAnclar}
              >
                {isAnclado ? '🔒 Anclado' : '🔓 Anclar Posición'}
              </button>
              <button type="button" onClick={() => {
                const cal = { puntoLng, puntoLat, puntoEscala, rotation }
                const blob = new Blob([JSON.stringify(cal, null, 2)], { type: 'application/json' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a'); a.href = url; a.download = 'guaguya_calibracion.json'
                a.click(); URL.revokeObjectURL(url)
              }}>📥 Fijar</button>

              <div className="zapote-control-group">
                <label>Pan rápido</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button type="button" onClick={() => { if (isAnclado) return; setPuntoLat(puntoLat + 0.0001) }} disabled={isAnclado}>↑</button>
                  <button type="button" onClick={() => { if (isAnclado) return; setPuntoLat(puntoLat - 0.0001) }} disabled={isAnclado}>↓</button>
                  <button type="button" onClick={() => { if (isAnclado) return; setPuntoLng(puntoLng - 0.0001) }} disabled={isAnclado}>←</button>
                  <button type="button" onClick={() => { if (isAnclado) return; setPuntoLng(puntoLng + 0.0001) }} disabled={isAnclado}>→</button>
                </div>
              </div>

              <div className="zapote-control-group">
                <label>Rotación ({rotation.toFixed(0)}°)</label>
                <input type="range" min="-180" max="180" step="1" value={rotation}
                  onChange={(e) => setRotation(Number(e.target.value))} disabled={isAnclado} />
              </div>

              <div className="zapote-control-group">
                <label>Escala</label>
                <input type="range" min="0.000001" max="0.000050" step="0.0000001" value={puntoEscala}
                  onChange={(e) => setPuntoEscala(Number(e.target.value))} disabled={isAnclado} />
              </div>

              <div className="zapote-control-group">
                <label>Mover Este-Oeste</label>
                <input type="range" min="-0.01" max="0.01" step="0.00001"
                  value={puntoLng - GUAGUYA_BASE_LNG}
                  onChange={(e) => setPuntoLng(GUAGUYA_BASE_LNG + Number(e.target.value))}
                  disabled={isAnclado} />
              </div>

              <div className="zapote-control-group">
                <label>Mover Norte-Sur</label>
                <input type="range" min="-0.01" max="0.01" step="0.00001"
                  value={puntoLat - GUAGUYA_BASE_LAT}
                  onChange={(e) => setPuntoLat(GUAGUYA_BASE_LAT + Number(e.target.value))}
                  disabled={isAnclado} />
              </div>
            </div>
          </div>
        </div>

        {selectedTree ? (
        <aside className="guadalito-panel guadalito-panel--detail">
          <div className="guadalito-detail-top">
            <span style={{ background: selectedTree.color }} />
            <div>
              <small>{selectedTree.group}</small>
              <h2>Arbol {selectedTree.id}</h2>
              <p>{selectedTree.species}</p>
            </div>
            <button className="zapote-close-btn" onClick={() => setSelectedTreeId(null)}>✕</button>
          </div>

          <dl className="guadalito-facts">
            <div>
              <dt>Grupo</dt>
              <dd>{selectedTree.group}</dd>
            </div>
            <div>
              <dt>Coordenada en croquis</dt>
              <dd>{Math.round(selectedTree.x)}, {Math.round(selectedTree.y)}</dd>
            </div>
            <div>
              <dt>Total de esta especie</dt>
              <dd>{speciesCounts[selectedTree.species] ?? 0}</dd>
            </div>
            <div>
              <dt>Salud estimada</dt>
              <dd>{(() => { const h = getTreeHealth(selectedTree); return `${h.label} (${h.score}%)` })()}</dd>
            </div>
          </dl>

          <div className="zapote-wiki-content" style={{ marginTop: '0.75rem' }}>
            {loadingWiki ? (
              <p className="zapote-loading">Buscando en Wikipedia...</p>
            ) : wikiInfo ? (
              <div className="zapote-wiki-content">
                {wikiInfo.image && <img src={wikiInfo.image} alt={wikiInfo.title} className="zapote-wiki-image" />}
                <p>{wikiInfo.extract.substring(0, 320)}...</p>
                <a href={wikiInfo.url} target="_blank" rel="noreferrer" className="zapote-wiki-link">Leer más en Wikipedia →</a>
              </div>
            ) : (
              <p className="zapote-no-info">No se encontró información en Wikipedia.</p>
            )}
          </div>

          <div className="guadalito-next">
            <button type="button"
              onClick={() => setSelectedTreeId(selectedTree.id === 1 ? trees.length : selectedTree.id - 1)}>
              Anterior
            </button>
            <button type="button"
              onClick={() => setSelectedTreeId(selectedTree.id === trees.length ? 1 : selectedTree.id + 1)}>
              Siguiente
            </button>
          </div>
        </aside>
        ) : (
          <aside className="guadalito-panel guadalito-panel--detail guadalito-panel--empty">
            <p className="zapote-empty-hint">Selecciona un árbol en el mapa</p>
          </aside>
        )}
      </section>

      {/* ── DASHBOARD SECTION ───────────────────────────────────────────── */}
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
              { label: 'Filtrados', value: String(filteredTrees.length), accent: '#cbd84a' },
            ].map((kpi, i) => (
              <div key={i} className="zp-dash-kpi">
                <div className="zp-dash-kpi__value">{kpi.value}</div>
                <div className="zp-dash-kpi__label">{kpi.label}</div>
                <span className="zp-dash-kpi__accent" style={{ background: kpi.accent }} />
              </div>
            ))}
          </div>

          <div className="zp-dash-tools">
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
                <div className="zp-env-item"><span className="zp-env-item__value">{envData.humidity}%</span><span className="zp-env-item__label">Humedad</span></div>
                <div className="zp-env-item"><span className="zp-env-item__value">{envData.rainfall}mm</span><span className="zp-env-item__label">Lluvia</span></div>
                <div className="zp-env-item"><span className="zp-env-item__value">{envData.uv}</span><span className="zp-env-item__label">UV</span></div>
                <div className="zp-env-item"><span className="zp-env-item__value">{envData.wind}km</span><span className="zp-env-item__label">Viento</span></div>
                <div className="zp-env-item"><span className="zp-env-item__value">{envData.pressure}hPa</span><span className="zp-env-item__label">Presión</span></div>
              </div>
            </div>

            <div className="zp-health-card">
              <div className="zp-env-header">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M7 1v12M1 7h12"/><circle cx="7" cy="7" r="3"/></svg>
                <span>SALUD DEL PREDIO</span>
              </div>
              {(() => {
                const allHealth = trees.map(t => getTreeHealth(t))
                const opt = allHealth.filter(h => h.status === 'good').length
                const warn = allHealth.filter(h => h.status === 'warning').length
                const crit = allHealth.filter(h => h.status === 'critical').length
                const avg = Math.round(allHealth.reduce((a, h) => a + h.score, 0) / allHealth.length)
                const pct = Math.round((opt / allHealth.length) * 100)
                return (<>
                  <div className="zp-health-score">
                    <div className="zp-health-gauge">
                      <svg width="60" height="60" viewBox="0 0 60 60">
                        <circle cx="30" cy="30" r="26" fill="none" stroke="rgba(74,124,58,0.1)" strokeWidth="5"/>
                        <circle cx="30" cy="30" r="26" fill="none" stroke="#7fb069" strokeWidth="5"
                          strokeDasharray={`${(pct/100)*163} 163`} transform="rotate(-90 30 30)" strokeLinecap="round"/>
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
                </>)
              })()}
            </div>

            <div className="zp-export-card">
              <div className="zp-env-header">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M3 2h8v10H3z"/><path d="M5 5h4M5 8h4"/></svg>
                <span>EXPORTAR DATOS</span>
              </div>
              <p className="zp-export-desc">Descarga el inventario completo en formato CSV para análisis en Excel, Python o Google Sheets.</p>
              <button className="zp-export-btn" onClick={() => downloadCSV(trees)}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 1v8M3 6l4 4 4-4M2 11v2h10v-2"/></svg>
                Descargar CSV
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── DATA PANEL ─────────────────────────────────────────────────── */}
      <section className="zp-data-panel">
        <div className="zapote-hero-container">
          <div className="zp-data-header">
            <div className="zp-data-header__left">
              <span className="zp-data-header__label">DATA PANEL // v2.1</span>
              <h2 className="zp-data-header__title">Predio Guaguya</h2>
            </div>
            <div className="zp-data-header__status">
              <span className="zp-data-status__dot" />
              <span className="zp-data-status__text">SISTEMA ACTIVO</span>
            </div>
          </div>

          <div className="zp-data-grid">
            <div className="zp-data-col">
              <div className="zp-data-col__header">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="8" cy="8" r="6"/><path d="M8 2v12M2 8h12"/></svg>
                <span>INVENTARIO DIGITAL</span>
              </div>
              <div className="zp-data-metrics">
                <div className="zp-data-metric">
                  <span className="zp-data-metric__value" style={{ color: '#7fb069' }}>{dashboardStats.total}</span>
                  <span className="zp-data-metric__label">Árboles</span>
                </div>
                <div className="zp-data-metric">
                  <span className="zp-data-metric__value" style={{ color: '#f4d35e' }}>{dashboardStats.speciesCount}</span>
                  <span className="zp-data-metric__label">Variedades</span>
                </div>
                <div className="zp-data-metric">
                  <span className="zp-data-metric__value" style={{ color: '#e48b24' }}>{dashboardStats.groupCount}</span>
                  <span className="zp-data-metric__label">Grupos</span>
                </div>
              </div>
              <p className="zp-data-text">
                Sistema de monitoreo frutícola que combina imagery satelital con el croquis
                georreferenciado del predio Guaguya. Cada árbol cuenta con identificación
                numérica, especie, grupo productivo y estimación de salud.
              </p>
              <div className="zp-data-features">
                <div className="zp-data-feature"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#7fb069" strokeWidth="1.5"><path d="M2 6l3 3 5-5"/></svg> Geolocalización satelital</div>
                <div className="zp-data-feature"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#7fb069" strokeWidth="1.5"><path d="M2 6l3 3 5-5"/></svg> Croquis calibrable con anclaje persistente</div>
                <div className="zp-data-feature"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#7fb069" strokeWidth="1.5"><path d="M2 6l3 3 5-5"/></svg> Dashboard con KPIs y métricas de salud</div>
                <div className="zp-data-feature"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#7fb069" strokeWidth="1.5"><path d="M2 6l3 3 5-5"/></svg> 54 árboles · 6 grupos · 25 especies</div>
              </div>
            </div>

            <div className="zp-data-col">
              <div className="zp-data-col__header">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="1" y="3" width="14" height="10" rx="1"/><path d="M5 3V2a1 1 0 011-1h4a1 1 0 011 1v1"/></svg>
                <span>ARQUITECTURA DEL SISTEMA</span>
              </div>
              <p className="zp-data-text">
                Interfaz diseñada para técnicos agrícolas que necesitan visualizar,
                calibrar y analizar el predio con mapa satelital y croquis georreferenciado.
              </p>
              <div className="zp-data-specs">
                <div className="zp-data-spec"><div className="zp-data-spec__icon"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#d4a62f" strokeWidth="1.2"><path d="M7 1v12M1 7h12"/></svg></div><div><div className="zp-data-spec__title">Croquis calibrable</div><div className="zp-data-spec__desc">Rotación, escala y posición con anclaje persistente</div></div></div>
                <div className="zp-data-spec"><div className="zp-data-spec__icon"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#77a95f" strokeWidth="1.2"><circle cx="7" cy="7" r="5"/><circle cx="7" cy="7" r="2"/></svg></div><div><div className="zp-data-spec__title">Marcadores 3D</div><div className="zp-data-spec__desc">54 árboles con marcadores numerados</div></div></div>
                <div className="zp-data-spec"><div className="zp-data-spec__icon"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#f07b21" strokeWidth="1.2"><path d="M2 12L5 3l3 7 2-5 2 7"/></svg></div><div><div className="zp-data-spec__title">Filtros inteligentes</div><div className="zp-data-spec__desc">Búsqueda por ID, especie y grupo productivo</div></div></div>
                <div className="zp-data-spec"><div className="zp-data-spec__icon"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#5a4a73" strokeWidth="1.2"><rect x="2" y="4" width="10" height="8" rx="1"/><path d="M4 4V3a1 1 0 011-1h4a1 1 0 011 1v1"/></svg></div><div><div className="zp-data-spec__title">Exportación de datos</div><div className="zp-data-spec__desc">CSV con inventario completo y métricas de salud</div></div></div>
              </div>
            </div>
          </div>

          <div className="zp-data-footer">
            <span>INTAGROS · Inteligencia Agropecuaria Sostenible</span>
            <span>Predio Guaguya · {trees.length} árboles monitoreados</span>
          </div>
        </div>
      </section>

      {/* ── INSTRUCTIONS ───────────────────────────────────────────────── */}
      <section className="zapote-instructions-section">
        <div className="zapote-instructions-container">
          <h2>Cómo usar el mapa</h2>
          <div className="zapote-instructions-grid">
            <article>
              <span className="zapote-instruction-icon"><svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="14" cy="14" r="10"/><path d="M14 4v3M14 21v3M4 14h3M21 14h3"/><circle cx="14" cy="14" r="3"/></svg></span>
              <h3>Navega el mapa</h3>
              <p>Arrastra para moverte por el predio. El croquis se superpone automáticamente sobre la imagen satelital.</p>
            </article>
            <article>
              <span className="zapote-instruction-icon"><svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="14" cy="14" r="6"/><path d="M14 2v4M14 22v4M2 14h4M22 14h4"/></svg></span>
              <h3>Selecciona árboles</h3>
              <p>Haz clic en cualquier marcador numerado para ver su perfil: especie, grupo, coordenadas y salud.</p>
            </article>
            <article>
              <span className="zapote-instruction-icon"><svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="8" width="20" height="14" rx="2"/><circle cx="14" cy="15" r="2"/><path d="M8 8V6a2 2 0 012-2h8a2 2 0 012 2v2"/></svg></span>
              <h3>Ajusta la vista</h3>
              <p>Usa los controles de calibración para rotación, escala y posición del croquis.</p>
            </article>
            <article>
              <span className="zapote-instruction-icon"><svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="7" y="12" width="14" height="12" rx="2"/><path d="M10 12V9a4 4 0 018 0v3"/><circle cx="14" cy="19" r="1.5"/></svg></span>
              <h3>Interpreta salud</h3>
              <p>Cada árbol tiene un indicador de salud estimado: óptimo (verde), regular (amarillo) o crítico (rojo).</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  )
}
