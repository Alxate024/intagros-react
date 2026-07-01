import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ComplexStatisticsCard from "./ComplexStatisticsCard";
import ReportsBarChart from "./ReportsBarChart";
import PieChartCard from "./PieChartCard";

function PredioDashboard({ predioName, trees, dashboardStats, envData, getTreeHealth, downloadCSV }) {
  const allHealth = trees.map(t => getTreeHealth(t));
  const optCount = allHealth.filter(h => h.label === 'Óptima' || h.status === 'good').length;
  const warnCount = allHealth.filter(h => h.label === 'Regular' || h.status === 'warning').length;
  const critCount = allHealth.filter(h => h.label === 'Crítica' || h.status === 'critical').length;
  const avgHealth = Math.round(allHealth.reduce((a, h) => a + h.score, 0) / allHealth.length);

  const groups = [...new Set(trees.map(t => t.group))];
  const groupCounts = groups.map(g => ({
    label: g,
    count: trees.filter(t => t.group === g).length,
  }));

  return (
    <Box sx={{ p: 3 }}>
      <Box mb={3}>
        <Typography variant="h4" sx={{ color: "#e8ede4", fontWeight: 700 }}>
          Dashboard · {predioName}
        </Typography>
        <Typography variant="button" color="text.secondary" fontWeight="light">
          Panel de control con métricas en tiempo real
        </Typography>
      </Box>

      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <ComplexStatisticsCard
            color="success"
            title="Árboles"
            count={dashboardStats.total}
            percentage={{ color: "success", amount: "100%", label: "del inventario" }}
            icon="forest"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ComplexStatisticsCard
            color="info"
            title="Variedades"
            count={dashboardStats.speciesCount}
            percentage={{ color: "info", amount: String(dashboardStats.speciesCount), label: "especies distintas" }}
            icon="yard"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ComplexStatisticsCard
            color="warning"
            title="Grupos"
            count={dashboardStats.groupCount}
            percentage={{ color: "warning", amount: String(dashboardStats.groupCount), label: "grupos botánicos" }}
            icon="group_work"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ComplexStatisticsCard
            color="primary"
            title="Salud promedio"
            count={`${avgHealth}%`}
            percentage={{
              color: avgHealth >= 70 ? "success" : avgHealth >= 50 ? "warning" : "error",
              amount: `${optCount} óptimos`,
              label: `${warnCount} regulares · ${critCount} críticos`,
            }}
            icon="monitor_heart"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={8}>
          <ReportsBarChart
            color="success"
            title="Distribución por grupo"
            chart={{
              labels: groupCounts.map(g => g.label),
              datasets: { label: "Árboles", data: groupCounts.map(g => g.count) },
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <PieChartCard
            icon={{ color: "info", component: "pie_chart" }}
            title="Composición"
            description="Proporción de grupos"
            chart={{
              labels: groupCounts.map(g => g.label),
              datasets: {
                label: "Grupos",
                data: groupCounts.map(g => g.count),
                backgroundColors: ["primary", "info", "success", "warning", "error", "secondary", "light", "dark"],
              },
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <Box
                sx={{
                  background: "linear-gradient(195deg, #26a69a, #1c8a7a)",
                  boxShadow: "0 0.5rem 1rem rgba(38, 166, 154, 0.4)",
                  borderRadius: "0.75rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "3rem",
                  height: "3rem",
                  mr: 2,
                }}
              >
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
                    <Typography variant="caption" color="text.secondary">
                      {item.label}
                    </Typography>
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
                    <Typography variant="button" color="text.secondary">
                      {item.label}
                    </Typography>
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
                boxShadow: "0 0.5rem 1rem rgba(200, 163, 92, 0.4)",
                color: "#fff",
                border: "none",
                borderRadius: "0.5rem",
                cursor: "pointer",
                width: "100%",
                py: 1.5,
                px: 3,
                fontSize: "0.875rem",
                fontWeight: 600,
                "&:hover": {
                  background: "linear-gradient(195deg, #d4b06a, #c8a35c)",
                },
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
  trees: PropTypes.array.isRequired,
  dashboardStats: PropTypes.object.isRequired,
  envData: PropTypes.object.isRequired,
  getTreeHealth: PropTypes.func.isRequired,
  downloadCSV: PropTypes.func.isRequired,
};

export default PredioDashboard;
