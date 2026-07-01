import { useMemo } from "react";
import PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

ChartJS.register(ArcElement, Tooltip, Legend);

const bgGradients = {
  primary: "linear-gradient(195deg, #c8a35c, #b8923a)",
  secondary: "linear-gradient(195deg, #747b8a, #495361)",
  info: "linear-gradient(195deg, #26a69a, #1c8a7a)",
  success: "linear-gradient(195deg, #66BB6A, #43A047)",
  warning: "linear-gradient(195deg, #FFA726, #FB8C00)",
  error: "linear-gradient(195deg, #EF5350, #E53935)",
  light: "linear-gradient(195deg, #2a3d2f, #1a2e1f)",
  dark: "linear-gradient(195deg, #3a4d3f, #1a2e1f)",
};

const paletteColors = {
  primary: "#c8a35c",
  secondary: "#7b809a",
  info: "#26a69a",
  success: "#4CAF50",
  warning: "#fb8c00",
  error: "#F44335",
  light: "#2a3d2f",
  dark: "#3a4d3f",
};

function configs(labels, datasets) {
  const backgroundColors = (datasets.backgroundColors || []).map(
    (color) => paletteColors[color] || paletteColors.dark
  );

  return {
    data: {
      labels,
      datasets: [
        {
          label: datasets.label,
          weight: 9,
          cutout: 0,
          tension: 0.9,
          pointRadius: 2,
          borderWidth: 2,
          backgroundColor: backgroundColors.length ? backgroundColors : [paletteColors.dark],
          fill: false,
          data: datasets.data,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      interaction: { intersect: false, mode: "index" },
    },
  };
}

function PieChartCard({ icon, title, description, height, chart }) {
  const { data, options } = configs(chart.labels || [], chart.datasets || {});

  const renderChart = (
    <Box sx={{ py: 2, pr: 2, pl: icon.component ? 1 : 2 }}>
      {title || description ? (
        <Box display="flex" px={description ? 1 : 0} pt={description ? 1 : 0}>
          {icon.component && (
            <Box
              sx={{
                background: bgGradients[icon.color] || bgGradients.info,
                boxShadow: `0 0.5rem 1rem rgba(38, 166, 154, 0.4)`,
                borderRadius: "0.75rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "4rem",
                height: "4rem",
                mt: -5,
                mr: 2,
              }}
            >
              <Icon sx={{ color: "#fff", fontSize: "1.5rem" }}>{icon.component}</Icon>
            </Box>
          )}
          <Box mt={icon.component ? -2 : 0}>
            {title && (
              <Typography variant="h6" sx={{ color: "#e8ede4", fontWeight: 600 }}>
                {title}
              </Typography>
            )}
            <Box mb={2}>
              <Typography variant="button" color="text.secondary">
                {description}
              </Typography>
            </Box>
          </Box>
        </Box>
      ) : null}
      {useMemo(
        () => (
          <Box height={height}>
            <Pie data={data} options={options} />
          </Box>
        ),
        [chart, height]
      )}
    </Box>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
}

PieChartCard.defaultProps = {
  icon: { color: "info", component: "" },
  title: "",
  description: "",
  height: "19.125rem",
};

PieChartCard.propTypes = {
  icon: PropTypes.shape({
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "light", "dark"]),
    component: PropTypes.node,
  }),
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
};

export default PieChartCard;
