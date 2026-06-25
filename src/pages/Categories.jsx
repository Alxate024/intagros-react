import wpData from '../data/wordpress-data.json'

export default function Categories() {
  const { categories, tags, posts } = wpData

  const postCountByCategory = {}
  posts.forEach(post => {
    post.categories.filter(c => c.domain === 'category').forEach(c => {
      postCountByCategory[c.nicename] = (postCountByCategory[c.nicename] || 0) + 1
    })
  })

  return (
    <div>
      <h2 className="page-title">🏷️ Categorías ({categories.length})</h2>
      <div className="category-grid" style={{ marginBottom:'2rem' }}>
        {categories.map(cat => (
          <div key={cat.id} className="category-card">
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <h3>{cat.name}</h3>
              {postCountByCategory[cat.slug] && (
                <span className="badge badge-green">{postCountByCategory[cat.slug]} posts</span>
              )}
            </div>
            <code style={{ fontSize:'0.75rem', color:'#999', display:'block', marginBottom:'0.5rem' }}>/{cat.slug}</code>
            {cat.description && <p>{cat.description.slice(0, 150)}{cat.description.length > 150 ? '...' : ''}</p>}
          </div>
        ))}
      </div>

      {tags.length > 0 && (
        <>
          <h2 className="page-title" style={{ fontSize:'1.3rem' }}>🔖 Etiquetas ({tags.length})</h2>
          <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
            {tags.map(tag => (
              <span key={tag.id} className="badge badge-blue" style={{ padding:'0.4rem 0.8rem', fontSize:'0.9rem' }}>
                {tag.name}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
