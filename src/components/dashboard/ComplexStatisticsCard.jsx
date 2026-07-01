import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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

function ComplexStatisticsCard({ color, title, count, percentage, icon }) {
  return (
    <Card sx={{ position: "relative", overflow: "visible" }}>
      <Box display="flex" justifyContent="space-between" pt={1} px={2}>
        <Box
          sx={{
            background: bgGradients[color] || bgGradients.info,
            boxShadow: `0 0.5rem 1rem ${shadowColors[color] || shadowColors.info}`,
            borderRadius: "0.75rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "4rem",
            height: "4rem",
            mt: -3,
          }}
        >
          <Icon sx={{ fontSize: "1.5rem", color: "#fff" }}>
            {icon}
          </Icon>
        </Box>
        <Box textAlign="right" lineHeight={1.25}>
          <Typography variant="button" fontWeight="light" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h4" sx={{ color: "#e8ede4", fontWeight: 700 }}>
            {count}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", my: 1 }} />
      <Box pb={2} px={2}>
        <Typography variant="button" color="text.secondary" display="flex" alignItems="center">
          <Typography
            component="span"
            variant="button"
            fontWeight="bold"
            sx={{ color: `${percentage.color}.main` }}
          >
            {percentage.amount}
          </Typography>
          &nbsp;{percentage.label}
        </Typography>
      </Box>
    </Card>
  );
}

ComplexStatisticsCard.defaultProps = {
  color: "info",
  percentage: { color: "success", amount: "", label: "" },
};

ComplexStatisticsCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "light", "dark"]),
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark", "white"]),
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  icon: PropTypes.node.isRequired,
};

export default ComplexStatisticsCard;
