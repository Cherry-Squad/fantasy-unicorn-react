import React from "react";
import PropTypes from "prop-types";

import StageRoute from "../StageRoute";

/**
 * Works like Route from "react-router".
 *
 * If the user is fully activated (logged in, filled form, got a team), renders Route.
 * Otherwise, it renders Redirect to the email validation page or the login page.
 *
 * @see Route
 * @see Redirect
 */
const UserRoute = ({ path, exact = false, component }) => (
  <StageRoute stage={3} path={path} exact={exact} component={component} />
);

UserRoute.propTypes = {
  /**
   * The path to be routed
   *
   * @see Route
   */
  path: PropTypes.string,
  /**
   * The flag indicating whether the router should route the path exactly as it is
   *
   * @default false
   * @see Route
   */
  exact: PropTypes.bool,
  /**
   * The component to route to
   *
   * @see Route
   */
  component: PropTypes.elementType,
};

export default UserRoute;
