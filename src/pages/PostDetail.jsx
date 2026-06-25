import { useParams, Link } from 'react-router-dom'
import wpData from '../data/wordpress-data.json'

export default function PostDetail() {
  const { id } = useParams()
  const post = wpData.posts.find(p => p.id === id) || wpData.pages.find(p => p.id === id)

  if (!post) return (
    <div className="empty">
      <div className="empty-icon">❌</div>
      <p>Post no encontrado</p>
      <Link to="/posts" className="back-btn" style={{ justifyContent:'center', marginTop:'1rem' }}>← Volver</Link>
    </div>
  )

  return (
    <div>
      <Link to="/posts" className="back-btn">← Volver a Posts</Link>
      <div className="post-detail">
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span>👤 {post.creator}</span>
          <span>📅 {new Date(post.date).toLocaleDateString('es-CO', { year:'numeric', month:'long', day:'numeric' })}</span>
          <span className={`badge ${post.status === 'publish' ? 'badge-green' : 'badge-orange'}`}>{post.status}</span>
          {post.categories?.filter(c => c.domain === 'category').map(c => (
            <span key={c.nicename} className="badge badge-blue">{c.name}</span>
          ))}
        </div>
        {post.excerpt && (
          <blockquote style={{ borderLeft:'4px solid #2e7d32', paddingLeft:'1rem', color:'#555', marginBottom:'1.5rem', fontStyle:'italic' }}>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          </blockquote>
        )}
        <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  )
}
