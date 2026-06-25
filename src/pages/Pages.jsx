import { useState } from 'react'
import wpData from '../data/wordpress-data.json'

export default function Pages() {
  const [search, setSearch] = useState('')

  const filtered = wpData.pages.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h2 className="page-title">📄 Páginas ({wpData.pages.length})</h2>
      <div className="table-container">
        <div className="table-header">
          <input
            className="search-input"
            placeholder="Buscar páginas..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <span style={{ color:'#888', fontSize:'0.9rem' }}>{filtered.length} resultado{filtered.length !== 1 ? 's' : ''}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Slug</th>
              <th>Estado</th>
              <th>Orden</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(page => (
              <tr key={page.id}>
                <td style={{ fontWeight:500 }}>{page.title || '(sin título)'}</td>
                <td><code style={{ fontSize:'0.8rem', color:'#888' }}>{page.slug}</code></td>
                <td>
                  <span className={`badge ${page.status === 'publish' ? 'badge-green' : 'badge-gray'}`}>
                    {page.status === 'publish' ? 'Publicada' : page.status}
                  </span>
                </td>
                <td style={{ color:'#888' }}>{page.menu_order}</td>
                <td style={{ color:'#888', fontSize:'0.85rem' }}>
                  {new Date(page.date).toLocaleDateString('es-CO')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
