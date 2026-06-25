import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import guadalitoTrees from '../data/guadalitoTrees'
import './PredioGuadalito.css'

const wikipediaCache = new Map()

async function fetchWikipediaSummary(query) {
  if (wikipediaCache.has(query)) return wikipediaCache.get(query)
  const params = new URLSearchParams({ action: 'query', format: 'json', origin: '*', generator: 'search', gsrsearch: query, gsrlimit: '1', prop: 'extracts|info|pageimages', exintro: '1', explaintext: '1', inprop: 'url', piprop: 'thumbnail', pithumbsize: '420' })
  const res = await fetch(`https://es.wikipedia.org/w/api.php?${params.toString()}`)
  if (!res.ok) throw new Error('Wikipedia error')
  const json = await res.json()
  const page = Object.values(json.query?.pages ?? {})[0]
  const summary = page ? { title: page.title, extract: page.extract, url: page.fullurl, image: page.thumbnail?.source } : null
  wikipediaCache.set(query, summary)
  return summary
}

export default function PredioGuadalitoTree() {
  const { id } = useParams()
  const treeId = Number(id)
  const tree = guadalitoTrees.find((t) => t.id === treeId)
  const [wiki, setWiki] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    if (!tree) return undefined
    setLoading(true)
    fetchWikipediaSummary(tree.species)
      .then((s) => { if (mounted) setWiki(s) })
      .catch(() => { if (mounted) setWiki(null) })
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [id, tree])

  if (!tree) {
    return (
      <div className="guadalito">
        <section className="guadalito-hero">
          <div className="guadalito-hero__copy">
            <h1>Árbol no encontrado</h1>
            <p>El árbol solicitado no existe en este inventario.</p>
            <Link to="/predio-guadalito">Volver al mapa</Link>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="guadalito">
      <section className="guadalito-hero">
        <div className="guadalito-hero__copy">
          <nav className="guadalito-breadcrumb" aria-label="Migas de pan">
            <Link to="/">Inicio</Link>
            <span>/</span>
            <Link to="/predio-guadalito">Predio Guadalito</Link>
            <span>/</span>
            <strong>Árbol {tree.id}</strong>
          </nav>
          <span className="guadalito-kicker">Ficha individual</span>
          <h1>{tree.species} — #{tree.id}</h1>
          <p>Grupo: {tree.group}</p>
          <p>Coordenadas aproximadas: ({tree.x}, {tree.y})</p>
        </div>

        <div className="guadalito-hero__stats" aria-label="Resumen rápido">
          <article>
            <strong>{tree.id}</strong>
            <span>Código del árbol</span>
          </article>
          <article>
            <strong>{tree.species}</strong>
            <span>Especie</span>
          </article>
          <article>
            <strong>{tree.group}</strong>
            <span>Grupo</span>
          </article>
        </div>
      </section>

      <section className="guadalito-workbench">
        <aside className="guadalito-panel">
          <div className="guadalito-panel__head">
            <span>Información externa</span>
            <strong>Wikipedia</strong>
          </div>
          <div style={{ padding: '0.6rem' }}>
            {loading && <p>Cargando resumen...</p>}
            {!loading && wiki && (
              <article>
                {wiki.image && <img src={wiki.image} alt="" style={{ width: '100%', borderRadius: 6, objectFit: 'cover' }} />}
                <h3>{wiki.title}</h3>
                <p>{wiki.extract}</p>
                <a href={wiki.url} target="_blank" rel="noreferrer">Leer en Wikipedia</a>
              </article>
            )}
            {!loading && !wiki && <p>No se encontró resumen en Wikipedia para esta especie.</p>}
          </div>
        </aside>

        <div className="guadalito-map-shell">
          <div className="guadalito-map-toolbar">
            <span>Acciones</span>
            <strong>Enlaces rápidos</strong>
          </div>
          <div style={{ padding: 16 }}>
            <Link to="/predio-guadalito">Volver al mapa</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
