import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ComplexStatisticsCard from "./ComplexStatisticsCard";

function PredioDashboard({ predioName, predioKey, trees, envData, getTreeHealth, downloadCSV }) {
  const [pyStats, setPyStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/data/stats_${predioKey}.json`)
      .then(r => r.json())
      .then(data => { setPyStats(data); setLoading(false); })
      .catch(() => {
        // Fallback: compute stats in JS
        const allHealth = trees.map(t => getTreeHealth(t));
        const total = trees.length;
        const species = [...new Set(trees.map(t => t.species))];
        const groups = [...new Set(trees.map(t => t.group))];
        const groupsBreak = groups.map(g => ({
          group: g,
          count: trees.filter(t => t.group === g).length,
          pct: Math.round(trees.filter(t => t.group === g).length / total * 100),
        }));
        const avgHealth = Math.round(allHealth.reduce((a, h) => a + h.score, 0) / allHealth.length);
        setPyStats({
          total_trees: total,
          species_count: species.length,
          group_count: groups.length,
          groups: groups,
          avg_health: avgHealth,
          group_breakdown: groupsBreak,
          health_distribution: {
            optimas: allHealth.filter(h => h.label === 'Óptima').length,
            buenas: allHealth.filter(h => h.label === 'Buena').length,
            regulares: allHealth.filter(h => h.label === 'Regular').length,
            criticas: allHealth.filter(h => h.label === 'Crítica').length,
          },
        });
        setLoading(false);
      });
  }, [predioKey]);

  const allHealth = trees.map(t => getTreeHealth(t));
  const optCount = allHealth.filter(h => h.label === 'Óptima' || h.status === 'good').length;
  const warnCount = allHealth.filter(h => h.label === 'Regular' || h.status === 'warning').length;
  const critCount = allHealth.filter(h => h.label === 'Crítica' || h.status === 'critical').length;
  const avgHealth = pyStats ? pyStats.avg_health : Math.round(allHealth.reduce((a, h) => a + h.score, 0) / allHealth.length);
  const totalTrees = pyStats ? pyStats.total_trees : trees.length;
  const speciesCount = pyStats ? pyStats.species_count : [...new Set(trees.map(t => t.species))].length;
  const groupCount = pyStats ? pyStats.group_count : [...new Set(trees.map(t => t.group))].length;
  const groupBreakdown = pyStats ? pyStats.group_breakdown : [];

  return (
    <Box sx={{ p: 3, maxWidth: 1400, mx: "auto" }}>
      <Box mb={3}>
        <Typography variant="h4" sx={{ color: "#e8ede4", fontWeight: 700 }}>
          Dashboard · {predioName}
        </Typography>
        <Typography variant="button" color="text.secondary" fontWeight="light">
          Estadísticas generadas con Python (pandas + numpy + matplotlib)
        </Typography>
      </Box>

      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <ComplexStatisticsCard
            color="success" title="Árboles" count={totalTrees}
            percentage={{ color: "success", amount: "100%", label: "del inventario" }} icon="forest"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ComplexStatisticsCard
            color="info" title="Variedades" count={speciesCount}
            percentage={{ color: "info", amount: String(speciesCount), label: "especies distintas" }} icon="yard"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ComplexStatisticsCard
            color="warning" title="Grupos" count={groupCount}
            percentage={{ color: "warning", amount: String(groupCount), label: "grupos botánicos" }} icon="group_work"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ComplexStatisticsCard
            color="primary" title="Salud promedio" count={`${avgHealth}%`}
            percentage={{
              color: avgHealth >= 70 ? "success" : avgHealth >= 50 ? "warning" : "error",
              amount: `${optCount} óptimos`,
              label: `${warnCount} regulares · ${critCount} críticos`,
            }}
            icon="monitor_heart"
          />
        </Grid>
      </Grid>

      {/* ── Python Charts ── */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 2, bgcolor: "#101d13" }}>
            <Typography variant="h6" sx={{ color: "#e8ede4", fontWeight: 600, mb: 1 }}>
              Distribución por grupo (matplotlib)
            </Typography>
            <Box
              component="img"
              src={`/charts/${predioKey}_bars.png`}
              alt={`Distribución por grupo - ${predioName}`}
              sx={{ width: "100%", height: "auto", borderRadius: 1, display: "block" }}
              onError={(e) => { e.target.style.display = "none"; }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2, bgcolor: "#101d13" }}>
            <Typography variant="h6" sx={{ color: "#e8ede4", fontWeight: 600, mb: 1 }}>
              Composición (matplotlib)
            </Typography>
            <Box
              component="img"
              src={`/charts/${predioKey}_pie.png`}
              alt={`Composición - ${predioName}`}
              sx={{ width: "100%", height: "auto", borderRadius: 1, display: "block" }}
              onError={(e) => { e.target.style.display = "none"; }}
            />
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, bgcolor: "#101d13" }}>
            <Typography variant="h6" sx={{ color: "#e8ede4", fontWeight: 600, mb: 1 }}>
              Salud del predio (matplotlib)
            </Typography>
            <Box
              component="img"
              src={`/charts/${predioKey}_health.png`}
              alt={`Salud - ${predioName}`}
              sx={{ width: "100%", height: "auto", borderRadius: 1, display: "block" }}
              onError={(e) => { e.target.style.display = "none"; }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, bgcolor: "#101d13" }}>
            <Typography variant="h6" sx={{ color: "#e8ede4", fontWeight: 600, mb: 1 }}>
              Histograma de salud (matplotlib)
            </Typography>
            <Box
              component="img"
              src={`/charts/${predioKey}_histogram.png`}
              alt={`Histograma - ${predioName}`}
              sx={{ width: "100%", height: "auto", borderRadius: 1, display: "block" }}
              onError={(e) => { e.target.style.display = "none"; }}
            />
          </Card>
        </Grid>
      </Grid>

      {/* ── Stats table ── */}
      {pyStats && pyStats.health_stats && (
        <Card sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" sx={{ color: "#e8ede4", fontWeight: 600, mb: 2 }}>
            Estadísticas descriptivas (pandas + numpy)
          </Typography>
          <Grid container spacing={2}>
            {[
              { label: "Media", value: `${pyStats.health_stats.mean}%`, color: "#26a69a" },
              { label: "Mediana", value: `${pyStats.health_stats.median}%`, color: "#c8a35c" },
              { label: "Desv. estándar", value: `${pyStats.health_stats.std}`, color: "#fb8c00" },
              { label: "Mínimo", value: `${pyStats.health_stats.min}%`, color: "#EF5350" },
              { label: "Máximo", value: `${pyStats.health_stats.max}%`, color: "#4CAF50" },
            ].map(item => (
              <Grid item xs key={item.label}>
                <Box textAlign="center" sx={{ p: 1.5, bgcolor: "#1a2e1f", borderRadius: 1 }}>
                  <Typography variant="h5" sx={{ color: item.color, fontWeight: 700 }}>
                    {item.value}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Card>
      )}

      {/* ── Bottom cards (env, health summary, export) ── */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <Box sx={{
                background: "linear-gradient(195deg, #26a69a, #1c8a7a)",
                borderRadius: "0.75rem", display: "flex", justifyContent: "center",
                alignItems: "center", width: "3rem", height: "3rem", mr: 2,
              }}>
                <Typography variant="body2" sx={{ color: "#fff", fontSize: "1.2rem" }}>
                  {envData.icon}
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ color: "#e8ede4", fontWeight: 600 }}>
                Estación ambiental
              </Typography>
              <Typography variant="caption" color="text.secondary" ml={1}>
                — Actualizado en vivo
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {[
                { label: "Temperatura", value: `${envData.temp}°C` },
                { label: "Humedad", value: `${envData.humidity}%` },
                { label: "Lluvia", value: `${envData.rainfall}mm` },
                { label: "UV", value: envData.uv },
                { label: "Viento", value: `${envData.wind}km` },
                { label: "Presión", value: `${envData.pressure}hPa` },
                { label: "Sensación", value: `${envData.feelsLike}°C` },
                { label: "Estado", value: envData.condition },
              ].map((item) => (
                <Grid item xs={3} key={item.label}>
                  <Box textAlign="center">
                    <Typography variant="h5" sx={{ color: "#e8ede4", fontWeight: 700 }}>
                      {item.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">{item.label}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, height: "100%" }}>
            <Typography variant="h6" sx={{ color: "#e8ede4", fontWeight: 600 }} mb={2}>
              Salud del predio
            </Typography>
            <Box textAlign="center" mb={2}>
              <Typography variant="h2" sx={{ color: "#4CAF50", fontWeight: 700 }}>
                {avgHealth}%
              </Typography>
              <Typography variant="button" color="text.secondary" fontWeight="light">
                Puntaje promedio
              </Typography>
            </Box>
            <Box>
              {[
                { label: "Óptimos", count: optCount, color: "#4CAF50" },
                { label: "Regulares", count: warnCount, color: "#fb8c00" },
                { label: "Críticos", count: critCount, color: "#F44335" },
              ].map((item) => (
                <Box key={item.label} display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Box display="flex" alignItems="center">
                    <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: item.color, mr: 1 }} />
                    <Typography variant="button" color="text.secondary">{item.label}</Typography>
                  </Box>
                  <Typography variant="button" sx={{ color: "#e8ede4", fontWeight: 700 }}>
                    {item.count}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, height: "100%" }}>
            <Typography variant="h6" sx={{ color: "#e8ede4", fontWeight: 600 }} mb={2}>
              Exportar datos
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Descarga el inventario completo en formato CSV para análisis en Excel, Python o Google Sheets.
            </Typography>
            <Box
              component="button"
              onClick={() => downloadCSV(trees)}
              sx={{
                background: "linear-gradient(195deg, #c8a35c, #b8923a)",
                color: "#fff", border: "none", borderRadius: "0.5rem",
                cursor: "pointer", width: "100%", py: 1.5, px: 3,
                fontSize: "0.875rem", fontWeight: 600,
                "&:hover": { background: "linear-gradient(195deg, #d4b06a, #c8a35c)" },
              }}
            >
              Descargar CSV
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

PredioDashboard.propTypes = {
  predioName: PropTypes.string.isRequired,
  predioKey: PropTypes.string.isRequired,
  trees: PropTypes.array.isRequired,
  envData: PropTypes.object.isRequired,
  getTreeHealth: PropTypes.func.isRequired,
  downloadCSV: PropTypes.func.isRequired,
};

export default PredioDashboard;
