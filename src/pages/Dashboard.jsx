import wpData from '../data/wordpress-data.json'

export default function Dashboard() {
  const { site, stats, posts, categories } = wpData

  const recentPosts = posts
    .filter(p => p.status === 'publish')
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)

  return (
    <div>
      <h2 className="page-title">🌿 Dashboard</h2>

      {/* Site info */}
      <div className="stat-card" style={{ textAlign:'left', marginBottom:'1.5rem', borderTop:'4px solid #388e3c' }}>
        <p style={{ fontSize:'1.1rem', fontWeight:700, color:'#1b5e20' }}>{site.title}</p>
        <p style={{ color:'#666', fontSize:'0.9rem', marginTop:'0.25rem' }}>{site.description}</p>
        <a href={site.base_url} target="_blank" rel="noreferrer" style={{ fontSize:'0.8rem', color:'#2e7d32' }}>{site.base_url}</a>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="number">{stats.total_posts}</div>
          <div className="label">Posts</div>
        </div>
        <div className="stat-card">
          <div className="number">{stats.total_pages}</div>
          <div className="label">Páginas</div>
        </div>
        <div className="stat-card">
          <div className="number">{stats.total_attachments}</div>
          <div className="label">Archivos</div>
        </div>
        <div className="stat-card">
          <div className="number">{stats.total_categories}</div>
          <div className="label">Categorías</div>
        </div>
        <div className="stat-card">
          <div className="number">{stats.total_tags}</div>
          <div className="label">Etiquetas</div>
        </div>
      </div>

      {/* Recent posts */}
      <h3 style={{ marginBottom:'1rem', color:'#333' }}>Posts Recientes</h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Fecha</th>
              <th>Categorías</th>
            </tr>
          </thead>
          <tbody>
            {recentPosts.map(post => (
              <tr key={post.id}>
                <td>
                  <a className="row-link" href={`/posts/${post.id}`}>{post.title || '(sin título)'}</a>
                </td>
                <td style={{ color:'#888', fontSize:'0.85rem' }}>
                  {new Date(post.date).toLocaleDateString('es-CO', { year:'numeric', month:'short', day:'numeric' })}
                </td>
                <td>
                  {post.categories.filter(c=>c.domain==='category').map(c => (
                    <span key={c.nicename} className="badge badge-green" style={{ marginRight:'0.25rem' }}>{c.name}</span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Categories */}
      <h3 style={{ margin:'2rem 0 1rem', color:'#333' }}>Categorías</h3>
      <div className="category-grid">
        {categories.map(cat => (
          <div key={cat.id} className="category-card">
            <h3>{cat.name}</h3>
            <code style={{ fontSize:'0.75rem', color:'#999' }}>/{cat.slug}</code>
            {cat.description && <p style={{ marginTop:'0.5rem' }}>{cat.description.slice(0, 120)}{cat.description.length > 120 ? '...' : ''}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
