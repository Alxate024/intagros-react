import { createTheme } from "@mui/material/styles";

import colors from "assets/theme/base/colors";
import breakpoints from "assets/theme/base/breakpoints";
import typography from "assets/theme/base/typography";
import boxShadows from "assets/theme/base/boxShadows";
import borders from "assets/theme/base/borders";
import globals from "assets/theme/base/globals";

import boxShadow from "assets/theme/functions/boxShadow";
import hexToRgb from "assets/theme/functions/hexToRgb";
import linearGradient from "assets/theme/functions/linearGradient";
import pxToRem from "assets/theme/functions/pxToRem";
import rgba from "assets/theme/functions/rgba";

export default createTheme({
  breakpoints: { ...breakpoints },
  palette: { ...colors },
  typography: { ...typography },
  boxShadows: { ...boxShadows },
  borders: { ...borders },
  functions: {
    boxShadow,
    hexToRgb,
    linearGradient,
    pxToRem,
    rgba,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...globals,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: colors.background.paper,
          color: colors.text.main,
          boxShadow: boxShadows.md,
          borderRadius: borders.borderRadius.xl,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: pxToRem(24),
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: colors.grey[300],
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: typography.fontWeightMedium,
          borderRadius: borders.borderRadius.lg,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: colors.grey[200],
          color: colors.text.primary,
        },
      },
    },
  },
});
