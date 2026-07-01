import { useState, useCallback, useMemo } from 'react';

const STORAGE_PREFIX = 'intagros_tree_status_';

function loadSaved(predioKey) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + predioKey);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveStatus(predioKey, data) {
  localStorage.setItem(STORAGE_PREFIX + predioKey, JSON.stringify(data));
}

export default function useTreeStatus(predioKey, trees) {
  const [statusMap, setStatusMap] = useState(() => loadSaved(predioKey));

  const updateTree = useCallback((treeId, updates) => {
    setStatusMap((prev) => {
      const next = { ...prev, [treeId]: { ...(prev[treeId] || {}), ...updates } };
      saveStatus(predioKey, next);
      return next;
    });
  }, [predioKey]);

  const resetTree = useCallback((treeId) => {
    setStatusMap((prev) => {
      const next = { ...prev };
      delete next[treeId];
      saveStatus(predioKey, next);
      return next;
    });
  }, [predioKey]);

  const resetAll = useCallback(() => {
    setStatusMap({});
    localStorage.removeItem(STORAGE_PREFIX + predioKey);
  }, [predioKey]);

  const getTree = useCallback((tree) => {
    const saved = statusMap[tree.id];
    const defaultHealth = getDefaultHealth(tree);
    const status = saved?.health || defaultHealth.status;
    const produccion = saved?.produccion || 'alta';
    const notas = saved?.notas || '';
    const healthLabel = { optima: 'Óptima', buena: 'Buena', regular: 'Regular', critica: 'Crítica' };
    return {
      ...tree,
      _healthStatus: status,
      _produccion: produccion,
      _notas: notas,
      _healthLabel: healthLabel[status] || 'Buena',
      _healthOverride: !!saved?.health,
    };
  }, [statusMap]);

  const exportData = useCallback(() => {
    return JSON.stringify(statusMap, null, 2);
  }, [statusMap]);

  const stats = useMemo(() => {
    const counts = { optima: 0, buena: 0, regular: 0, critica: 0 };
    const produccion = { alta: 0, media: 0, baja: 0, nada: 0 };
    if (!trees) return { counts, produccion, total: 0 };
    trees.forEach((t) => {
      const s = statusMap[t.id];
      const dh = getDefaultHealth(t);
      const health = s?.health || dh.status;
      counts[health] = (counts[health] || 0) + 1;
      const prod = s?.produccion || 'alta';
      produccion[prod] = (produccion[prod] || 0) + 1;
    });
    return { counts, produccion, total: trees.length };
  }, [trees, statusMap]);

  const restoreFromJSON = useCallback((jsonStr) => {
    try {
      const data = JSON.parse(jsonStr);
      setStatusMap(data);
      saveStatus(predioKey, data);
      return true;
    } catch {
      return false;
    }
  }, [predioKey]);

  return { statusMap, updateTree, resetTree, resetAll, getTree, exportData, stats, restoreFromJSON };
}

function getDefaultHealth(tree) {
  const base = {
    Aguacates: 85, Mangos: 82, Citricos: 73, Guayabas: 78,
    Anonaceas: 90, Zapote: 88, 'Otros frutales': 70,
    Aguacate: 85, Mango: 82, Citricos: 73, Guayaba: 78,
  };
  const b = base[tree.group] || base[tree.group?.replace(/s$/, '')] || 75;
  const variation = ((tree.id * 7 + (tree.species?.length || 5) * 3) % 15) - 7;
  const score = Math.min(100, Math.max(35, b + variation));
  if (score >= 80) return { score, status: 'optima' };
  if (score >= 60) return { score, status: 'buena' };
  if (score >= 40) return { score, status: 'regular' };
  return { score, status: 'critica' };
}
