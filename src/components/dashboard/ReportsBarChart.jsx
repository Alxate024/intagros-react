import { useMemo } from "react";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

const shadowColors = {
  primary: "rgba(200, 163, 92, 0.4)",
  secondary: "rgba(123, 128, 154, 0.4)",
  info: "rgba(38, 166, 154, 0.4)",
  success: "rgba(76, 175, 80, 0.4)",
  warning: "rgba(255, 153, 0, 0.4)",
  error: "rgba(244, 67, 54, 0.4)",
  light: "rgba(74, 107, 78, 0.4)",
  dark: "rgba(58, 77, 63, 0.4)",
};

function configs(labels, datasets) {
  return {
    data: {
      labels,
      datasets: [
        {
          label: datasets.label,
          tension: 0.4,
          borderWidth: 0,
          borderRadius: 4,
          borderSkipped: false,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          data: datasets.data,
          maxBarThickness: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      interaction: { intersect: false, mode: "index" },
      scales: {
        y: {
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
            color: "rgba(255, 255, 255, .2)",
          },
          ticks: {
            suggestedMin: 0,
            beginAtZero: true,
            padding: 10,
            font: { size: 14, weight: "300", family: "Outfit" },
            color: "#fff",
          },
        },
        x: {
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
            color: "rgba(255, 255, 255, .2)",
          },
          ticks: {
            display: true,
            color: "#f8f9fa",
            padding: 10,
            font: { size: 14, weight: "300", family: "Outfit" },
          },
        },
      },
    },
  };
}

function ReportsBarChart({ color, title, chart }) {
  const { data, options } = configs(chart.labels || [], chart.datasets || {});

  return (
    <Card sx={{ height: "100%" }}>
      <Box sx={{ p: "1rem" }}>
        {useMemo(
          () => (
            <Box
              sx={{
                background: bgGradients[color] || bgGradients.info,
                boxShadow: `0 0.5rem 1rem ${shadowColors[color] || shadowColors.info}`,
                borderRadius: "0.75rem",
                py: 2,
                pr: 0.5,
                mt: -5,
                height: "12.5rem",
              }}
            >
              <Bar data={data} options={options} />
            </Box>
          ),
          [color, chart]
        )}
        <Box pt={3} pb={1} px={1}>
          <Typography
            variant="h6"
            sx={{ color: "#e8ede4", fontWeight: 600, textTransform: "capitalize" }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

ReportsBarChart.defaultProps = {
  color: "info",
};

ReportsBarChart.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  title: PropTypes.string.isRequired,
  chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
};

export default ReportsBarChart;
