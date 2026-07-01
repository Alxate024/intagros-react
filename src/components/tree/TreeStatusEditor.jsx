import { useState } from 'react';
import './TreeStatusEditor.css';

const HEALTH_OPTIONS = [
  { value: 'optima', label: 'Óptima', color: '#4CAF50', icon: '🟢' },
  { value: 'buena', label: 'Buena', color: '#66BB6A', icon: '🟡' },
  { value: 'regular', label: 'Regular', color: '#fb8c00', icon: '🟠' },
  { value: 'critica', label: 'Crítica', color: '#F44335', icon: '🔴' },
];

const PROD_OPTIONS = [
  { value: 'alta', label: 'Alta', icon: '🔥' },
  { value: 'media', label: 'Media', icon: '👍' },
  { value: 'baja', label: 'Baja', icon: '👎' },
  { value: 'nada', label: 'Nada', icon: '❌' },
];

export default function TreeStatusEditor({
  treeId,
  currentHealth,
  currentProduccion,
  currentNotas,
  onUpdate,
  onReset,
}) {
  const [editHealth, setEditHealth] = useState(currentHealth || 'buena');
  const [editProd, setEditProd] = useState(currentProduccion || 'alta');
  const [editNotas, setEditNotas] = useState(currentNotas || '');
  const [dirty, setDirty] = useState(false);

  const handleSave = () => {
    onUpdate(treeId, { health: editHealth, produccion: editProd, notas: editNotas });
    setDirty(false);
  };

  const handleReset = () => {
    onReset(treeId);
    setEditHealth('buena');
    setEditProd('alta');
    setEditNotas('');
    setDirty(false);
  };

  const selectedHealth = HEALTH_OPTIONS.find(h => h.value === editHealth) || HEALTH_OPTIONS[0];

  return (
    <div className="tree-status-editor">
      <div className="tse-section">
        <label className="tse-label">Estado de salud</label>
        <div className="tse-chip-group">
          {HEALTH_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`tse-chip ${editHealth === opt.value ? 'tse-chip--active' : ''}`}
              style={editHealth === opt.value ? { borderColor: opt.color, background: opt.color + '22' } : {}}
              onClick={() => { setEditHealth(opt.value); setDirty(true); }}
            >
              {opt.icon} {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="tse-section">
        <label className="tse-label">Producción</label>
        <div className="tse-chip-group">
          {PROD_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`tse-chip ${editProd === opt.value ? 'tse-chip--active' : ''}`}
              onClick={() => { setEditProd(opt.value); setDirty(true); }}
            >
              {opt.icon} {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="tse-section">
        <label className="tse-label">Notas de campo</label>
        <textarea
          className="tse-textarea"
          rows={2}
          value={editNotas}
          onChange={(e) => { setEditNotas(e.target.value); setDirty(true); }}
          placeholder="Ej: necesita riego, presenta plagas..."
        />
      </div>

      {dirty && (
        <div className="tse-actions">
          <button type="button" className="tse-btn tse-btn--save" onClick={handleSave}>
            Guardar cambio
          </button>
          <button type="button" className="tse-btn tse-btn--reset" onClick={handleReset}>
            Restaurar predeterminado
          </button>
        </div>
      )}
    </div>
  );
}

export { HEALTH_OPTIONS, PROD_OPTIONS };
