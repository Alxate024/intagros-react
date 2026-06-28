import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import guaguyaTreesDefault, { guaguya_groups, guaguya_species } from '../data/guaguya-trees'
import MapboxOrchard3D from '../components/MapboxOrchard3D'
import './PredioGuadalito.css'

const guaguyaLayout = {
  1: [105, 88],
  2: [210, 88],
  3: [315, 88],
  4: [415, 88],
  5: [515, 88],
  6: [610, 88],
  7: [705, 88],
  8: [812, 88],
  9: [762, 44],
  10: [705, 190],
  11: [610, 190],
  12: [515, 190],
  13: [415, 190],
  14: [210, 190],
  15: [105, 190],
  16: [105, 300],
  17: [210, 300],
  18: [515, 300],
  19: [610, 300],
  20: [705, 300],
  21: [812, 300],
  22: [915, 300],
  23: [915, 390],
  24: [812, 390],
  25: [705, 390],
  26: [658, 350],
  27: [610, 390],
  28: [515, 390],
  29: [210, 390],
  30: [105, 390],
  31: [210, 485],
  32: [315, 485],
  33: [415, 485],
  34: [515, 485],
  35: [610, 485],
  36: [705, 485],
  37: [812, 485],
  38: [915, 485],
  39: [1010, 485],
  40: [915, 575],
  41: [812, 575],
  42: [705, 575],
  43: [610, 575],
  44: [315, 575],
  45: [210, 575],
  46: [105, 575],
  47: [105, 670],
  48: [210, 670],
  49: [315, 670],
  50: [610, 670],
  51: [705, 670],
  52: [415, 760],
  53: [315, 760],
  54: [105, 760],
}

const normalizeText = (value) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

// Croquis constants and overlay (compatible with Zapote controls)
const IMAGE_WIDTH = 1102
const IMAGE_HEIGHT = 787

const GUAGUYA_BASE_LNG = -76.4311
const GUAGUYA_BASE_LAT = 3.6458


export default function PredioGuaguya() {
  const [selectedTreeId, setSelectedTreeId] = useState(1)
  const [speciesFilter, setSpeciesFilter] = useState('Todas')
  const [groupFilter, setGroupFilter] = useState('Todos')
  const [search, setSearch] = useState('')

  // --- calibration / overlay states (persisted as `guaguya_*`)
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

    const rx = dx * Math.cos(rad) - dy * Math.sin(rad)
    const ry = dx * Math.sin(rad) + dy * Math.cos(rad)

    return {
      longitude: puntoLng + rx * puntoEscala,
      latitude: puntoLat - ry * puntoEscala,
    }
  }

  const trees = useMemo(
    () =>
      guaguyaTreesDefault.map((tree) => {
        const [x, y] = guaguyaLayout[tree.id] ?? [tree.x, tree.y]
        return { ...tree, x, y }
      }),
    [],
  )

  const selectedTree = useMemo(
    () => trees.find((tree) => tree.id === selectedTreeId) ?? trees[0],
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
    () =>
      trees.reduce((acc, tree) => {
        acc[tree.species] = (acc[tree.species] ?? 0) + 1
        return acc
      }, {}),
    [trees],
  )

  const groupTotals = useMemo(
    () =>
      guaguya_groups.map((group) => ({
        group,
        total: trees.filter((tree) => tree.group === group).length,
      })),
    [trees],
  )

  return (
    <div className="guadalito">
      <section className="guadalito-hero">
        <div className="guadalito-hero__copy">
          <nav className="guadalito-breadcrumb" aria-label="Migas de pan">
            <Link to="/">Inicio</Link>
            <span>/</span>
            <strong>Predio Guaguya</strong>
          </nav>
          <span className="guadalito-kicker">Inventario digital de frutales</span>
          <h1>Predio Guaguya</h1>
          <p>
            Mapa interactivo basado en el croquis del predio Guaguya, con arboles
            numerados, filtros por especie y lectura rapida por grupo productivo.
          </p>
        </div>

        <div className="guadalito-hero__stats" aria-label="Resumen del inventario">
          <article>
            <strong>{trees.length}</strong>
            <span>Arboles registrados</span>
          </article>
          <article>
            <strong>{guaguya_species.length}</strong>
            <span>Variedades</span>
          </article>
          <article>
            <strong>{guaguya_groups.length}</strong>
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
              selectedTreeId={selectedTree.id}
              onSelectTree={setSelectedTreeId}
              initialViewState={{
                longitude: puntoLng,
                latitude: puntoLat,
                zoom: 17.5,
                pitch: 0,
                bearing: 0,
              }}
              mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
              getLngLat={getLngLat}
            />

            <div className="guadalito-controls-panel">
              <button
                className={`zapote-anchor-btn ${isAnclado ? 'anclado' : ''}`}
                onClick={toggleAnclar}
              >
                {isAnclado ? '🔒 Anclado' : '🔓 Anclar Posición'}
              </button>

              <div className="zapote-control-group">
                <label>Pan rápido</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => {
                      if (isAnclado) return
                      const v = puntoLat + 0.0001
                      localStorage.setItem('guaguya_puntoLat', v.toString())
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
                      localStorage.setItem('guaguya_puntoLat', v.toString())
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
                      localStorage.setItem('guaguya_puntoLng', v.toString())
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
                      localStorage.setItem('guaguya_puntoLng', v.toString())
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
                  value={puntoLng - GUAGUYA_BASE_LNG}
                  onChange={(e) => setPuntoLng(GUAGUYA_BASE_LNG + Number(e.target.value))}
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
                  value={puntoLat - GUAGUYA_BASE_LAT}
                  onChange={(e) => setPuntoLat(GUAGUYA_BASE_LAT + Number(e.target.value))}
                  disabled={isAnclado}
                />
              </div>
            </div>
          </div>
        </div>

        <aside className="guadalito-panel guadalito-panel--detail">
          <div className="guadalito-detail-top">
            <span style={{ background: selectedTree.color }} />
            <div>
              <small>{selectedTree.group}</small>
              <h2>Arbol {selectedTree.id}</h2>
              <p>{selectedTree.species}</p>
            </div>
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
          </dl>

          <div className="guadalito-next">
            <button
              type="button"
              onClick={() => setSelectedTreeId(selectedTree.id === 1 ? trees.length : selectedTree.id - 1)}
            >
              Anterior
            </button>
            <button
              type="button"
              onClick={() => setSelectedTreeId(selectedTree.id === trees.length ? 1 : selectedTree.id + 1)}
            >
              Siguiente
            </button>
          </div>
        </aside>
      </section>
    </div>
  )
}
