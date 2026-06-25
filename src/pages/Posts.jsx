import { useState } from 'react'
import { Link } from 'react-router-dom'
import wpData from '../data/wordpress-data.json'

export default function Posts() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = wpData.posts.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || p.status === filter
    return matchSearch && matchFilter
  })

  return (
    <div>
      <h2 className="page-title">📝 Posts ({wpData.posts.length})</h2>
      <div className="table-container">
        <div className="table-header">
          <input
            className="search-input"
            placeholder="Buscar posts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            style={{ padding:'0.5rem', borderRadius:'8px', border:'1px solid #ddd', outline:'none' }}
          >
            <option value="all">Todos</option>
            <option value="publish">Publicados</option>
            <option value="draft">Borradores</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Categorías</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={5} className="empty"><div className="empty-icon">🔍</div>No se encontraron posts</td></tr>
            ) : filtered.map(post => (
              <tr key={post.id}>
                <td>
                  <Link className="row-link" to={`/posts/${post.id}`}>
                    {post.title || '(sin título)'}
                  </Link>
                </td>
                <td style={{ color:'#666' }}>{post.creator}</td>
                <td style={{ color:'#888', fontSize:'0.85rem', whiteSpace:'nowrap' }}>
                  {new Date(post.date).toLocaleDateString('es-CO')}
                </td>
                <td>
                  <span className={`badge ${post.status === 'publish' ? 'badge-green' : 'badge-orange'}`}>
                    {post.status === 'publish' ? 'Publicado' : post.status}
                  </span>
                </td>
                <td>
                  {post.categories.filter(c => c.domain === 'category').map(c => (
                    <span key={c.nicename} className="badge badge-blue" style={{ marginRight:'0.25rem' }}>{c.name}</span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
