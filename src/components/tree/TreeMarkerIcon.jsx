import { useMemo } from 'react';

const HEALTH_COLORS = { optima: '#4CAF50', buena: '#66BB6A', regular: '#fb8c00', critica: '#F44335' };

const PROD_SYMBOLS = { alta: '🔥', media: '💧', baja: '🌱', nada: '⛔' };

const speciesProfiles = {
  mango: { canopy: '#23451f', border: '#d7a23b', shape: 'oval' },
  aguacate: { canopy: '#1f3b22', border: '#253719', shape: 'tall' },
  guayaba: { canopy: '#4c7438', border: '#b9d878', shape: 'round' },
  guanabano: { canopy: '#315229', border: '#8cae66', shape: 'oval' },
  anon: { canopy: '#315229', border: '#8cae66', shape: 'oval' },
  zapote: { canopy: '#2d4722', border: '#a65f35', shape: 'broad' },
  mamey: { canopy: '#2d4722', border: '#a65f35', shape: 'broad' },
};

function getProfile(tree) {
  const s = (tree.species || '').toLowerCase();
  for (const [key, profile] of Object.entries(speciesProfiles)) {
    if (s.includes(key)) return profile;
  }
  if (tree.group?.toLowerCase().includes('citricos')) {
    const isLemon = s.includes('limon');
    return { canopy: '#2e5523', border: isLemon ? '#cbd84a' : '#e48b24', shape: 'round' };
  }
  return { canopy: '#314f28', border: '#9b7d35', shape: 'round' };
}

export default function TreeMarkerIcon({ tree, isSelected }) {
  const profile = useMemo(() => getProfile(tree), [tree.species, tree.group]);
  const healthColor = HEALTH_COLORS[tree._healthStatus] || '#66BB6A';
  const prodSymbol = PROD_SYMBOLS[tree._produccion] || '';

  return (
    <div className={`zp-tree-marker ${isSelected ? 'zp-tree-marker--selected' : ''} ${tree._healthStatus ? `zp-tree-marker--${tree._healthStatus}` : ''}`}>
      <div className="zp-tree-marker-pin" style={{ '--zp-canopy': profile.canopy, '--zp-border': profile.border }}>
        <img src="/media/point-icon.png" alt="" className="zp-tree-marker-img" />
        <span className="zp-tree-marker-dot" style={{ background: profile.border }} />
        <span className="zp-tree-marker-health" style={{ background: healthColor }}>
          {prodSymbol && <span className="zp-tree-marker-prod">{prodSymbol}</span>}
        </span>
      </div>
      <span className="zp-tree-marker-id" style={{ color: profile.border }}>{tree.id}</span>
    </div>
  );
}
