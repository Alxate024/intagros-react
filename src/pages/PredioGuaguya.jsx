import { useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card'
import guaguyaTreesDefault, { guaguya_groups, guaguya_species } from '../data/guaguya-trees'
import MapboxOrchard3D from '../components/MapboxOrchard3D'
import PredioDashboard from '../components/dashboard/PredioDashboard'
import MDTypography from '../components/md/MDTypography'
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

  function getLngLat(x, y, tree) {
    if (tree?.lng != null && tree?.lat != null) return { longitude: tree.lng, latitude: tree.lat }
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
      const dx = x - IMAGE_WIDTH / 2
      const dy = y - IMAGE_HEIGHT / 2
      const rad = 0
      const lng = Number((GUAGUYA_BASE_LNG + (dx * Math.cos(rad) - dy * Math.sin(rad)) * 0.000008).toFixed(7))
      const lat = Number((GUAGUYA_BASE_LAT - (dx * Math.sin(rad) + dy * Math.cos(rad)) * 0.000008).toFixed(7))
      return { ...tree, x, y, lng, lat }
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
            {[
              { label: 'Árboles registrados', value: trees.length, color: 'success' },
              { label: 'Variedades', value: guaguya_species.length, color: 'info' },
              { label: 'Grupos productivos', value: guaguya_groups.length, color: 'warning' },
            ].map((item) => (
              <Card key={item.label} sx={{ p: 2, minWidth: 140, textAlign: 'center', backgroundColor: 'rgba(26,46,31,0.95)' }}>
                <MDTypography variant="h3" fontWeight="bold" color={item.color}>
                  {item.value}
                </MDTypography>
                <MDTypography variant="button" color="text" fontWeight="light">
                  {item.label}
                </MDTypography>
              </Card>
            ))}
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

      <PredioDashboard
        predioName="Guaguya"
        trees={trees}
        dashboardStats={dashboardStats}
        envData={envData}
        getTreeHealth={getTreeHealth}
        downloadCSV={downloadCSV}
      />
    </div>
  )
}
