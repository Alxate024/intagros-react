import { forwardRef } from "react";
import PropTypes from "prop-types";
import MDBadgeRoot from "components/md/MDBadgeRoot";

const MDBadge = forwardRef(
  ({ color, variant, size, circular, indicator, border, container, children, ...rest }, ref) => (
    <MDBadgeRoot
      {...rest}
      ownerState={{ color, variant, size, circular, indicator, border, container, children }}
      ref={ref}
      color="default"
    >
      {children}
    </MDBadgeRoot>
  )
);

MDBadge.defaultProps = {
  color: "info",
  variant: "gradient",
  size: "sm",
  circular: false,
  indicator: false,
  border: false,
  container: false,
  children: false,
};

MDBadge.propTypes = {
  color: PropTypes.oneOf([
    "primary", "secondary", "info", "success", "warning", "error", "light", "dark",
  ]),
  variant: PropTypes.oneOf(["gradient", "contained"]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg"]),
  circular: PropTypes.bool,
  indicator: PropTypes.bool,
  border: PropTypes.bool,
  container: PropTypes.bool,
  children: PropTypes.node,
};

export default MDBadge;
