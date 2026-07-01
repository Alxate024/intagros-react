import { useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card'
import guadalitoTreesDefault, { guadalitoSpecies, guadalitoGroups } from '../data/guadalitoTrees'
import MapboxOrchard3D from '../components/MapboxOrchard3D'
import PredioDashboard from '../components/dashboard/PredioDashboard'
import MDTypography from '../components/md/MDTypography'
import './PredioGuadalito.css'
import './PredioZapote.css'

const IMAGE_WIDTH = 1102
const IMAGE_HEIGHT = 787
const GUADALITO_BASE_LNG = -76.4307778
const GUADALITO_BASE_LAT = 3.6451667

const normalizeText = (value) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
const speciesToFilename = (species) => normalizeText(species).replace(/\s+/g, '-')

const speciesImageFile = {
  'Aguacate Lorena': 'agucate_lorena.png',
  'Aguacate Booth-7': 'agucate-lorena.png',
  'Aguacate Lula': 'agucate-lorena.png',
  'Anon': 'Anon.png',
  'Brevo': 'agucate-lorena.png',
  'Carambola': 'agucate-lorena.png',
  'Granada': 'agucate-lorena.png',
  'Grosello': 'grosella.webp',
  'Guanabano': 'guanabano.png',
  'Guayaba Común': 'guayaba-comun.png',
  'Guayaba Coronilla': 'guayaba-comun.png',
  'Limón Mandarino': 'limon_tahiti.png',
  'Limón Nativo': 'limon-nativo.png',
  'Limón Tahití': 'limon_tahiti.png',
  'Madroño': 'madroño.png',
  'Mamey': 'mamey.png',
  'Mandarina Arrayana': 'mandarina_arraya.png',
  'Mandarina Oneco': 'mandarina_oneco.png',
  'Mango Común (Hilacha)': 'mango-haden.png',
  'Mango Tommy': 'mango-tommy.png',
  'Marañón': 'agucate-lorena.png',
  'Naranja Común': 'naranja_salerma.png',
  'Naranja Ombligona': 'naranja_ombligona.webp',
  'Naranja Sweety': 'naranja_sweety.png',
  'Naranja Valencia': 'naranja_salerma.png',
  'Níspero': 'nispero.png',
  'Tangelo Orlando': 'tangelo-orlando.png',
  'Zapote': 'zapote.png',
  'Zapote Costeño': 'zapote.png',
}

function getTreeVisualProfile(tree) {
  const species = normalizeText(tree.species)
  const imageFile = speciesImageFile[tree.species] || `${speciesToFilename(tree.species)}.png`
  const treeImage = `/media/${imageFile}`
  if (species.includes('mango')) return { canopy: '#23451f', border: '#d7a23b', customImage: treeImage, shape: 'oval' }
  if (species.includes('aguacate')) return { canopy: '#1f3b22', border: '#253719', customImage: treeImage, shape: 'tall' }
  if (tree.group === 'Citricos' || species.includes('limon') || species.includes('naranja') || species.includes('mandarina') || species.includes('tangelo'))
    return { canopy: '#2e5523', border: species.includes('limon') ? '#cbd84a' : '#e48b24', customImage: treeImage, shape: 'round' }
  if (species.includes('guayaba') || species.includes('guayana'))
    return { canopy: '#4c7438', border: '#b9d878', customImage: treeImage, shape: 'round' }
  if (species.includes('guanabano') || species.includes('anon'))
    return { canopy: '#315229', border: '#8cae66', customImage: treeImage, shape: 'oval' }
  if (species.includes('zapote') || species.includes('mamey'))
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

// ── Health system ─────────────────────────────────────────────────────
const treeHealthBase = {
  Citricos: { score: 73, label: 'Regular', status: 'warning' },
  Mangos: { score: 82, label: 'Buena', status: 'good' },
  Aguacates: { score: 85, label: 'Buena', status: 'good' },
  Guayabas: { score: 78, label: 'Regular', status: 'warning' },
  'Otros frutales': { score: 70, label: 'Regular', status: 'warning' },
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
  temp: 28.1, feelsLike: 30.3, humidity: 72, rainfall: 10.7,
  uv: 6, wind: 9.1, pressure: 1012, condition: 'Parcialmente nublado', icon: '⛅',
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
  const a = document.createElement('a'); a.href = url; a.download = 'predio-guadalito-export.csv'
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

export default function PredioGuadalito() {
  const [selectedTreeId, setSelectedTreeId] = useState(null)
  const [speciesFilter, setSpeciesFilter] = useState('Todas')
  const [groupFilter, setGroupFilter] = useState('Todos')
  const [search, setSearch] = useState('')

  const [trees, setTrees] = useState(() => {
    const baseTrees = guadalitoTreesDefault.map((t) => ({ ...t }))
    try {
      const saved = JSON.parse(localStorage.getItem('guadalito_point_overrides') || '{}')
      return baseTrees.map((t) => (saved[t.id] ? { ...t, ...saved[t.id] } : t))
    } catch {
      return baseTrees
    }
  })

  const [puntoLng, setPuntoLng] = useState(() => {
    const saved = localStorage.getItem('guadalito_puntoLng')
    return saved ? parseFloat(saved) : GUADALITO_BASE_LNG
  })
  const [puntoLat, setPuntoLat] = useState(() => {
    const saved = localStorage.getItem('guadalito_puntoLat')
    return saved ? parseFloat(saved) : GUADALITO_BASE_LAT
  })
  const [puntoEscala, setPuntoEscala] = useState(() => {
    const saved = localStorage.getItem('guadalito_puntoEscala')
    return saved ? parseFloat(saved) : 0.000008
  })
  const [rotation, setRotation] = useState(() => {
    const saved = localStorage.getItem('guadalito_rotation')
    return saved ? parseFloat(saved) : 0
  })
  const [isAnclado, setIsAnclado] = useState(() => {
    const saved = localStorage.getItem('guadalito_isAnclado')
    return saved === 'true'
  })

  const toggleAnclar = () => {
    if (!isAnclado) {
      localStorage.setItem('guadalito_puntoLng', puntoLng.toString())
      localStorage.setItem('guadalito_puntoLat', puntoLat.toString())
      localStorage.setItem('guadalito_puntoEscala', puntoEscala.toString())
      localStorage.setItem('guadalito_rotation', rotation.toString())
      localStorage.setItem('guadalito_isAnclado', 'true')
    } else {
      localStorage.setItem('guadalito_isAnclado', 'false')
    }
    setIsAnclado(!isAnclado)
  }

  const [editingPoints, setEditingPoints] = useState(false)
  const [pendingPlacement, setPendingPlacement] = useState(null) // {x, y, lng, lat}

  const toggleEditingPoints = () => {
    const next = !editingPoints
    setEditingPoints(next)
    setPendingPlacement(null)
    if (next) {
      localStorage.removeItem('guadalito_point_overrides')
      setTrees(guadalitoTreesDefault.map((t) => ({ ...t })))
      setSelectedTreeId(1)
    }
  }

  function lonLatToXY(lon, lat) {
    const rad = (rotation * Math.PI) / 180
    const rx = (lon - puntoLng) / puntoEscala
    const ry = (puntoLat - lat) / puntoEscala
    const dx = rx * Math.cos(rad) + ry * Math.sin(rad)
    const dy = -rx * Math.sin(rad) + ry * Math.cos(rad)
    return [dx + IMAGE_WIDTH / 2, dy + IMAGE_HEIGHT / 2]
  }

  function handleMapClick(e) {
    if (!editingPoints || !e?.lngLat || pendingPlacement) return
    if (selectedTreeId === null) { setSelectedTreeId(1); return }
    const lng = e.lngLat.lng ?? e.lngLat[0]
    const lat = e.lngLat.lat ?? e.lngLat[1]
    const [x, y] = lonLatToXY(lng, lat)
    setPendingPlacement({ x, y, lng, lat })
  }

  function confirmPlacement() {
    if (!pendingPlacement || selectedTreeId === null) return
    const { lng, lat } = pendingPlacement
    const nextId = selectedTreeId >= trees.length ? 1 : selectedTreeId + 1
    setTrees((prev) => prev.map((t) => (t.id === selectedTreeId ? { ...t, lng, lat } : t)))
    const saved = JSON.parse(localStorage.getItem('guadalito_point_overrides') || '{}')
    saved[selectedTreeId] = { lng, lat }
    localStorage.setItem('guadalito_point_overrides', JSON.stringify(saved))
    setSelectedTreeId(nextId)
    setPendingPlacement(null)
  }

  function cancelPlacement() {
    setPendingPlacement(null)
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

  const selectedTree = useMemo(
    () => trees.find((tree) => tree.id === selectedTreeId) ?? null,
    [selectedTreeId, trees],
  )

  const placedTreeIds = useMemo(() => {
    try { return new Set(Object.keys(JSON.parse(localStorage.getItem('guadalito_point_overrides') || '{}')).map(Number)) }
    catch { return new Set() }
  }, [trees])

  const mapTrees = useMemo(() => {
    return trees
  }, [trees])

  const filteredTrees = useMemo(() => {
    const q = search.trim().toLowerCase()
    return trees.filter((t) => {
      const matchesSpecies = speciesFilter === 'Todas' || t.species === speciesFilter
      const matchesGroup = groupFilter === 'Todos' || t.group === groupFilter
      const matchesSearch = q.length === 0 || `${t.id} ${t.species} ${t.group}`.toLowerCase().includes(q)
      return matchesSpecies && matchesGroup && matchesSearch
    })
  }, [groupFilter, search, speciesFilter, trees])

  const speciesCounts = useMemo(
    () => trees.reduce((acc, t) => { acc[t.species] = (acc[t.species] ?? 0) + 1; return acc }, {}),
    [trees],
  )

  const dashboardStats = useMemo(() => ({
    total: trees.length,
    speciesCount: guadalitoSpecies.length,
    groupCount: guadalitoGroups.length,
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
            <strong>Predio Guadalito</strong>
          </nav>
          <div className="guadalito-hero__copy">
            <span className="zapote-kicker">Inventario digital de frutales</span>
            <h1>Predio Guadalito</h1>
            <p>Mapa interactivo con croquis calibrable, edición de puntos, exportación de datos y monitoreo de salud.</p>
          </div>
          <div className="guadalito-hero__stats" aria-label="Resumen del inventario">
            {[
              { label: 'Árboles registrados', value: trees.length, color: 'success' },
              { label: 'Variedades', value: guadalitoSpecies.length, color: 'info' },
              { label: 'Grupos productivos', value: guadalitoGroups.length, color: 'warning' },
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
            <input type="search" value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Ej: 12, Tangelo, Citricos" />
          </label>

          <label className="guadalito-field">
            <span>Grupo</span>
            <select value={groupFilter} onChange={(e) => setGroupFilter(e.target.value)}>
              <option>Todos</option>
              {guadalitoGroups.map((g) => (<option key={g}>{g}</option>))}
            </select>
          </label>

          <label className="guadalito-field">
            <span>Especie</span>
            <select value={speciesFilter} onChange={(e) => setSpeciesFilter(e.target.value)}>
              <option>Todas</option>
              {guadalitoSpecies.map((s) => (<option key={s}>{s}</option>))}
            </select>
          </label>
        </aside>

        <div className="guadalito-map-shell">
          <div className="guadalito-map-toolbar">
            <div>
              <span>Plano base</span>
              <strong>Croquis Predio Guadalito</strong>
            </div>
            <button type="button"
              onClick={() => { setSearch(''); setGroupFilter('Todos'); setSpeciesFilter('Todas') }}>
              Limpiar filtros
            </button>
          </div>

          <div className="guadalito-mapbox-panel">
            <MapboxOrchard3D
              trees={filteredTrees}
              selectedTreeId={selectedTree?.id ?? null}
              onSelectTree={setSelectedTreeId}
              initialViewState={{
                longitude: GUADALITO_BASE_LNG, latitude: GUADALITO_BASE_LAT,
                zoom: 17.5, pitch: 0, bearing: 0,
              }}
              mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
              getLngLat={getLngLat}
              onMapClick={handleMapClick}
              renderMarker={(tree, isSelected) => <TreeMarkerIcon tree={tree} isSelected={isSelected} />}
              pendingMarker={pendingPlacement ? { lng: pendingPlacement.lng, lat: pendingPlacement.lat } : null}
            />

            <div className="guadalito-controls-panel">
              <button className={`zapote-anchor-btn ${isAnclado ? 'anclado' : ''}`} onClick={toggleAnclar}>
                {isAnclado ? '🔒 Anclado' : '🔓 Anclar Posición'}
              </button>
              <button type="button" onClick={() => {
                const cal = { puntoLng, puntoLat, puntoEscala, rotation }
                const blob = new Blob([JSON.stringify(cal, null, 2)], { type: 'application/json' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a'); a.href = url; a.download = 'guadalito_calibracion.json'
                a.click(); URL.revokeObjectURL(url)
              }}>📥 Fijar</button>

              <div className="zapote-control-group">
                <label>Editar puntos</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button type="button" onClick={toggleEditingPoints}
                    className={editingPoints ? 'active' : ''}>
                    {editingPoints ? '🛠️ Editando' : '✍️ Editar puntos'}
                  </button>
                  <button type="button" onClick={() => {
                    const data = trees.map(({ id, x, y, lng, lat }) => ({ id, x, y, lng, lat }))
                    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a'); a.href = url; a.download = 'guadalito_points.json'
                    a.click(); URL.revokeObjectURL(url)
                  }}>Exportar JSON</button>
                  <button type="button" onClick={() => {
                    const raw = localStorage.getItem('guadalito_point_overrides') || '{}'
                    const blob = new Blob([raw], { type: 'application/json' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a'); a.href = url; a.download = 'guadalito_overrides_raw.json'
                    a.click(); URL.revokeObjectURL(url)
                  }}>📥 Fijar</button>
                </div>
              </div>

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
                  value={puntoLng - GUADALITO_BASE_LNG}
                  onChange={(e) => setPuntoLng(GUADALITO_BASE_LNG + Number(e.target.value))} disabled={isAnclado} />
              </div>

              <div className="zapote-control-group">
                <label>Mover Norte-Sur</label>
                <input type="range" min="-0.01" max="0.01" step="0.00001"
                  value={puntoLat - GUADALITO_BASE_LAT}
                  onChange={(e) => setPuntoLat(GUADALITO_BASE_LAT + Number(e.target.value))} disabled={isAnclado} />
              </div>
            </div>
          </div>
        </div>

        {editingPoints ? (
          <aside className="guadalito-panel guadalito-panel--detail">
            <div className="guadalito-panel__head">
              <span>Colocación rápida</span>
              <strong>{selectedTreeId ?? 1} / {trees.length}</strong>
            </div>
            <div className="zp-edit-status">
              {pendingPlacement ? (
                <div className="zp-confirm-box">
                  <p className="zp-confirm-msg">¿Estás seguro de anclar árbol <strong>#{selectedTreeId}</strong> aquí?</p>
                  <div className="zp-confirm-actions">
                    <button className="zp-confirm-yes" onClick={confirmPlacement}>Sí</button>
                    <button className="zp-confirm-no" onClick={cancelPlacement}>No</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="zp-edit-tree-box">
                    <span className="zp-edit-tree-id">#{selectedTreeId ?? 1}</span>
                    {(() => {
                      const t = trees.find(x => x.id === (selectedTreeId ?? 1))
                      if (!t) return null
                      const p = getTreeVisualProfile(t)
                      return <><span className="zp-edit-tree-species" style={{ color: p.border }}>{t.species}</span><span className="zp-edit-tree-group">{t.group}</span></>
                    })()}
                  </div>
                  <p className="zp-edit-hint">Haz clic en el mapa para colocar este árbol</p>
                  <p className="zp-edit-count">{placedTreeIds.size} / {trees.length} colocados</p>
                  <div className="guadalito-next" style={{ marginTop: '0.75rem' }}>
                    <button type="button" onClick={() => setSelectedTreeId(selectedTreeId === 1 ? trees.length : selectedTreeId - 1)}>Anterior</button>
                    <button type="button" onClick={() => setSelectedTreeId(selectedTreeId === trees.length ? 1 : selectedTreeId + 1)}>Siguiente</button>
                  </div>
                </>
              )}
            </div>
          </aside>
        ) : selectedTree ? (
        <aside className="guadalito-panel guadalito-panel--detail">
          <div className="guadalito-detail-top">
            <span style={{ background: selectedTree.color }} />
            <div>
              <small>{selectedTree.group}</small>
              <h2>Arbol {selectedTree.id}</h2>
              <p>{selectedTree.species}</p>
            </div>
            <button className="zapote-close-btn" onClick={() => setSelectedTreeId(null)}>✕</button>
            {editingPoints && <span className="zp-editing-badge" style={{ marginTop: '0.25rem' }}>COLOCAR</span>}
          </div>

          <dl className="guadalito-facts">
            <div><dt>Grupo</dt><dd>{selectedTree.group}</dd></div>
            <div><dt>Coordenada en croquis</dt><dd>{Math.round(selectedTree.x)}, {Math.round(selectedTree.y)}</dd></div>
            {selectedTree.lng != null && <div><dt>Coordenada Mapbox</dt><dd>{selectedTree.lng.toFixed(6)}, {selectedTree.lat.toFixed(6)}</dd></div>}
            <div><dt>Total de esta especie</dt><dd>{speciesCounts[selectedTree.species] ?? 0}</dd></div>
            <div><dt>Salud estimada</dt><dd>{(() => { const h = getTreeHealth(selectedTree); return `${h.label} (${h.score}%)` })()}</dd></div>
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
            <div className="zapote-empty-panel">
              <p className="zapote-empty-hint">Activa "Editar puntos" para colocar árboles</p>
              <p className="zapote-empty-sub">{placedTreeIds.size} / {trees.length} árboles colocados</p>
            </div>
          </aside>
        )}
      </section>

      <PredioDashboard
        predioName="Guadalito"
        trees={trees}
        dashboardStats={dashboardStats}
        envData={envData}
        getTreeHealth={getTreeHealth}
        downloadCSV={downloadCSV}
      />
    </div>
  )
}
