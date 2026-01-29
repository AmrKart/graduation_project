import React, { useEffect } from "react";
import PropTypes from "prop-types";
import withRouter from "./Common/withRouter";
import { useDispatch } from "react-redux";
import { changeLayoutMode } from "../store/actions";
import { layoutModeTypes } from "../constants/layout";

const NonAuthLayout = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize dark mode for non-auth pages (login, etc.)
    dispatch(changeLayoutMode(layoutModeTypes.DARK));
  }, [dispatch]);

  return <React.Fragment>{props.children}</React.Fragment>;
};

NonAuthLayout.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object,
};

export default withRouter(NonAuthLayout);
