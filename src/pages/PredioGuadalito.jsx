import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import guadalitoTreesDefault from '../data/guadalitoTrees'
import MapboxOrchard3D from '../components/MapboxOrchard3D'
import './PredioGuadalito.css'

// Croquis constants (compatible with Zapote controls)
const IMAGE_WIDTH = 1102
const IMAGE_HEIGHT = 787

const GUADALITO_BASE_LNG = -76.4307778
const GUADALITO_BASE_LAT = 3.6451667

export default function PredioGuadalito() {
  const [selectedTreeId, setSelectedTreeId] = useState(1)
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

  // --- estados de calibración / overlay (persistidos como "guadalito_*")
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

  // --- edición interactiva de puntos: convertir lon/lat => x,y en croquis
  const [editingPoints, setEditingPoints] = useState(false)

  function lonLatToXY(lon, lat) {
    const rad = (rotation * Math.PI) / 180
    const rx = (lon - puntoLng) / puntoEscala
    const ry = (puntoLat - lat) / puntoEscala

    // invertir la rotación
    const dx = rx * Math.cos(rad) + ry * Math.sin(rad)
    const dy = -rx * Math.sin(rad) + ry * Math.cos(rad)

    const x = dx + IMAGE_WIDTH / 2
    const y = dy + IMAGE_HEIGHT / 2
    return [x, y]
  }

  function handleMapClick(e) {
    if (!editingPoints || !e?.lngLat) return
    const lng = e.lngLat.lng ?? e.lngLat[0]
    const lat = e.lngLat.lat ?? e.lngLat[1]
    const [x, y] = lonLatToXY(lng, lat)

    setTrees((prev) => prev.map((t) => (t.id === selectedTreeId ? { ...t, x, y } : t)))
    // also persist a temporary mapping to localStorage so it survives refresh
    const saved = JSON.parse(localStorage.getItem('guadalito_point_overrides') || '{}')
    saved[selectedTreeId] = { x, y }
    localStorage.setItem('guadalito_point_overrides', JSON.stringify(saved))
  }

  // función para convertir coordenadas de croquis a lon/lat (rotación incluida)
  function getLngLat(x, y) {
    const dx = x - IMAGE_WIDTH / 2
    const dy = y - IMAGE_HEIGHT / 2
    const rad = (rotation * Math.PI) / 180

    const rx = dx * Math.cos(rad) - dy * Math.sin(rad)
    const ry = dx * Math.sin(rad) + dy * Math.cos(rad)

    return {
      longitude: puntoLng + rx * puntoEscala,
      latitude: puntoLat - ry * puntoEscala,
    }
  }

  const selectedTree = useMemo(
    () => trees.find((tree) => tree.id === selectedTreeId) ?? trees[0],
    [selectedTreeId, trees],
  )

  const filteredTrees = useMemo(() => {
    const q = search.trim().toLowerCase()
    return trees.filter((t) => {
      const matchesSpecies = speciesFilter === 'Todas' || t.species === speciesFilter
      const matchesGroup = groupFilter === 'Todos' || t.group === groupFilter
      const matchesSearch = q.length === 0 || `${t.id} ${t.species} ${t.group}`.toLowerCase().includes(q)
      return matchesSpecies && matchesGroup && matchesSearch
    })
  }, [groupFilter, search, speciesFilter, trees])

  return (
    <div className="guadalito">
      <section className="guadalito-hero">
        <div className="guadalito-hero__copy">
          <nav className="guadalito-breadcrumb" aria-label="Migas de pan">
            <Link to="/">Inicio</Link>
            <span>/</span>
            <strong>Predio Guadalito</strong>
          </nav>
          <span className="guadalito-kicker">Inventario digital de frutales</span>
          <h1>Predio Guadalito</h1>
          <p>Mapa interactivo con croquis calibrable (anclar para guardar configuración).</p>
        </div>

        <div className="guadalito-hero__stats" aria-label="Resumen del inventario">
          <article>
            <strong>{trees.length}</strong>
            <span>Arboles registrados</span>
          </article>
          <article>
            <strong>—</strong>
            <span>Variedades</span>
          </article>
          <article>
            <strong>—</strong>
            <span>Grupos productivos</span>
          </article>
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
            </select>
          </label>

          <label className="guadalito-field">
            <span>Especie</span>
            <select value={speciesFilter} onChange={(event) => setSpeciesFilter(event.target.value)}>
              <option>Todas</option>
            </select>
          </label>

        </aside>

        <div className="guadalito-map-shell">
          <div className="guadalito-map-toolbar">
            <div>
              <span>Plano base</span>
              <strong>Croquis Predio Guadalito</strong>
            </div>
            <button
              type="button"
              onClick={() => {
                setSearch('')
                setGroupFilter('Todos')
                setSpeciesFilter('Todas')
              }}
            >
              Limpiar filtros
            </button>
          </div>

          <div className="guadalito-mapbox-panel">
            <MapboxOrchard3D
              trees={filteredTrees}
              selectedTreeId={selectedTreeId}
              onSelectTree={setSelectedTreeId}
              initialViewState={{
                longitude: GUADALITO_BASE_LNG,
                latitude: GUADALITO_BASE_LAT,
                zoom: 17.5,
                pitch: 0,
                bearing: 0,
              }}
              mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
              getLngLat={getLngLat}
              onMapClick={handleMapClick}
            />

            <div className="guadalito-controls-panel">
              <button
                className={`zapote-anchor-btn ${isAnclado ? 'anclado' : ''}`}
                onClick={toggleAnclar}
              >
                {isAnclado ? '🔒 Anclado' : '🔓 Anclar Posición'}
              </button>

              <div className="zapote-control-group">
                <label>Editar puntos</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setEditingPoints((v) => !v)}
                    className={editingPoints ? 'active' : ''}
                  >
                    {editingPoints ? '🛠️ Editando' : '✍️ Editar puntos'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const exportData = trees.map(({ id, x, y }) => ({ id, x, y }))
                      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
                      const url = URL.createObjectURL(blob)
                      const a = document.createElement('a')
                      a.href = url
                      a.download = 'guadalito_point_overrides.json'
                      a.click()
                      URL.revokeObjectURL(url)
                    }}
                  >Exportar JSON</button>
                </div>
              </div>

              <div className="zapote-control-group">
                <label>Pan rápido</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => {
                      if (isAnclado) return
                      const v = puntoLat + 0.0001
                      localStorage.setItem('guadalito_puntoLat', v.toString())
                      setPuntoLat(v)
                    }}
                    disabled={isAnclado}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (isAnclado) return
                      const v = puntoLat - 0.0001
                      localStorage.setItem('guadalito_puntoLat', v.toString())
                      setPuntoLat(v)
                    }}
                    disabled={isAnclado}
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (isAnclado) return
                      const v = puntoLng - 0.0001
                      localStorage.setItem('guadalito_puntoLng', v.toString())
                      setPuntoLng(v)
                    }}
                    disabled={isAnclado}
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (isAnclado) return
                      const v = puntoLng + 0.0001
                      localStorage.setItem('guadalito_puntoLng', v.toString())
                      setPuntoLng(v)
                    }}
                    disabled={isAnclado}
                  >
                    →
                  </button>
                </div>
              </div>

              <div className="zapote-control-group">
                <label>Rotación ({rotation.toFixed(0)}°)</label>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  step="1"
                  value={rotation}
                  onChange={(e) => setRotation(Number(e.target.value))}
                  disabled={isAnclado}
                />
              </div>

              <div className="zapote-control-group">
                <label>Escala</label>
                <input
                  type="range"
                  min="0.000001"
                  max="0.000050"
                  step="0.0000001"
                  value={puntoEscala}
                  onChange={(e) => setPuntoEscala(Number(e.target.value))}
                  disabled={isAnclado}
                />
              </div>

              <div className="zapote-control-group">
                <label>Mover Este-Oeste</label>
                <input
                  type="range"
                  min="-0.01"
                  max="0.01"
                  step="0.00001"
                  value={puntoLng - GUADALITO_BASE_LNG}
                  onChange={(e) => setPuntoLng(GUADALITO_BASE_LNG + Number(e.target.value))}
                  disabled={isAnclado}
                />
              </div>

              <div className="zapote-control-group">
                <label>Mover Norte-Sur</label>
                <input
                  type="range"
                  min="-0.01"
                  max="0.01"
                  step="0.00001"
                  value={puntoLat - GUADALITO_BASE_LAT}
                  onChange={(e) => setPuntoLat(GUADALITO_BASE_LAT + Number(e.target.value))}
                  disabled={isAnclado}
                />
              </div>
            </div>
          </div>
        </div>

        <aside className="guadalito-panel guadalito-panel--detail">
          <div className="guadalito-detail-top">
            <span style={{ background: selectedTree?.color }} />
            <div>
              <small>{selectedTree?.group}</small>
              <h2>Arbol {selectedTree?.id}</h2>
              <p>{selectedTree?.species}</p>
            </div>
          </div>

          <dl className="guadalito-facts">
            <div>
              <dt>Grupo</dt>
              <dd>{selectedTree?.group}</dd>
            </div>
            <div>
              <dt>Coordenada en croquis</dt>
              <dd>{Math.round(selectedTree?.x ?? 0)}, {Math.round(selectedTree?.y ?? 0)}</dd>
            </div>
            <div>
              <dt>Total de esta especie</dt>
              <dd>—</dd>
            </div>
          </dl>

          <div className="guadalito-next">
            <button
              type="button"
              onClick={() => setSelectedTreeId(selectedTree?.id === 1 ? trees.length : (selectedTree?.id ?? 1) - 1)}
            >
              Anterior
            </button>
            <button
              type="button"
              onClick={() => setSelectedTreeId(selectedTree?.id === trees.length ? 1 : (selectedTree?.id ?? 1) + 1)}
            >
              Siguiente
            </button>
          </div>
        </aside>
      </section>
    </div>
  )
}
