import { useState } from 'react'
import wpData from '../data/wordpress-data.json'

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']

export default function Attachments() {
  const [search, setSearch] = useState('')
  const [view, setView] = useState('grid')

  const filtered = wpData.attachments.filter(a =>
    (a.title || a.slug).toLowerCase().includes(search.toLowerCase())
  )
  const images = filtered.filter(a => IMAGE_TYPES.includes(a.mime_type) || a.attachment_url.match(/\.(jpg|jpeg|png|gif|webp)$/i))
  const others = filtered.filter(a => !images.includes(a))

  return (
    <div>
      <h2 className="page-title">📁 Archivos ({wpData.attachments.length})</h2>
      <div className="table-container" style={{ marginBottom:'2rem' }}>
        <div className="table-header">
          <input
            className="search-input"
            placeholder="Buscar archivos..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div style={{ display:'flex', gap:'0.5rem' }}>
            <button onClick={() => setView('grid')} style={{ padding:'0.4rem 0.8rem', borderRadius:'6px', border:'1px solid #ddd', cursor:'pointer', background: view==='grid'?'#2e7d32':'white', color: view==='grid'?'white':'#333' }}>⊞ Grid</button>
            <button onClick={() => setView('list')} style={{ padding:'0.4rem 0.8rem', borderRadius:'6px', border:'1px solid #ddd', cursor:'pointer', background: view==='list'?'#2e7d32':'white', color: view==='list'?'white':'#333' }}>☰ Lista</button>
          </div>
        </div>
      </div>

      {view === 'grid' ? (
        <>
          <h3 style={{ marginBottom:'1rem', color:'#333' }}>Imágenes ({images.length})</h3>
          <div className="attach-grid" style={{ marginBottom:'2rem' }}>
            {images.slice(0, 60).map(a => (
              <div key={a.id} className="attach-card">
                <img
                  src={a.attachment_url}
                  alt={a.title}
                  onError={e => { e.target.style.display='none' }}
                />
                <a href={a.attachment_url} target="_blank" rel="noreferrer">
                  {a.title?.slice(0, 30) || a.slug}
                </a>
              </div>
            ))}
          </div>
          <h3 style={{ marginBottom:'1rem', color:'#333' }}>Otros archivos ({others.length})</h3>
          <div className="attach-grid">
            {others.map(a => (
              <div key={a.id} className="attach-card">
                <div className="attach-icon">📄</div>
                <a href={a.attachment_url} target="_blank" rel="noreferrer">
                  {a.title?.slice(0, 30) || a.slug}
                </a>
                <small style={{ color:'#aaa' }}>{a.mime_type}</small>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>URL</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id}>
                  <td style={{ fontWeight:500 }}>{a.title || a.slug}</td>
                  <td><span className="badge badge-gray">{a.mime_type || 'desconocido'}</span></td>
                  <td>
                    <a href={a.attachment_url} target="_blank" rel="noreferrer" className="row-link"
                      style={{ fontSize:'0.8rem', maxWidth:'300px', display:'block', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                      {a.attachment_url}
                    </a>
                  </td>
                  <td style={{ color:'#888', fontSize:'0.85rem' }}>{new Date(a.date).toLocaleDateString('es-CO')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
