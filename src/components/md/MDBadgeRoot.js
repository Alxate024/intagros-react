import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

export default styled(Badge)(({ theme, ownerState }) => {
  const { palette, typography, borders, functions } = theme;
  const { color, variant, size, circular, indicator, border, container } = ownerState;

  const { white, gradients, badgeColors } = palette;
  const { fontSizeXS, fontSizeSM, fontSizeMD, fontWeightBold } = typography;
  const { borderRadius } = borders;
  const { pxToRem, linearGradient } = functions;

  const validColors = ["primary", "secondary", "info", "success", "warning", "error", "light", "dark"];

  const validSizes = {
    xs: { height: pxToRem(16), fontSize: fontSizeXS },
    sm: { height: pxToRem(18), fontSize: fontSizeXS },
    md: { height: pxToRem(22), fontSize: fontSizeSM },
    lg: { height: pxToRem(26), fontSize: fontSizeMD },
  };

  const sizeValue = validSizes[size] || validSizes.sm;

  return {
    "& .MuiBadge-badge": {
      backgroundColor: validColors.includes(color)
        ? variant === "gradient"
          ? linearGradient(gradients[color].main, gradients[color].state)
          : badgeColors[color]?.background || gradients[color]?.main
        : white.main,
      color: validColors.includes(color)
        ? badgeColors[color]?.text || white.main
        : white.main,
      fontSize: sizeValue.fontSize,
      fontWeight: fontWeightBold,
      height: sizeValue.height,
      minWidth: sizeValue.height,
      borderRadius: circular ? "50%" : borderRadius.lg,
      ...(indicator && {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: pxToRem(10),
        height: pxToRem(10),
        minWidth: pxToRem(10),
        minHeight: pxToRem(10),
      }),
      ...(border && {
        border: `${pxToRem(2)} solid ${white.main}`,
      }),
      ...(container && {
        position: "relative",
        transform: "none",
        display: "inline-flex",
      }),
    },
  };
});
