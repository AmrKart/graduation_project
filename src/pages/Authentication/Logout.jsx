import React, { useEffect } from "react";
import PropTypes from "prop-types";
import withRouter from "../../components/Common/withRouter";

//redux
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@@/store/actions"
import { buildShamcarRequest } from "@@/helpers/buildRequest";
const Logout = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout(buildShamcarRequest({}, history)))
  }, [])
  return <></>;
};

Logout.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Logout);
