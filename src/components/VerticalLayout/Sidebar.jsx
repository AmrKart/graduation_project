import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import withRouter from "../Common/withRouter";

//i18n
import { withTranslation } from "react-i18next";
import SidebarContent from "./SidebarContent";

import { Link } from "react-router-dom";

import logoLightPng from "../../assets/images/image.png";
import logoLightSvg from "../../assets/images/image.png";
import logoDark from "../../assets/images/image.png";

const Sidebar = (props) => {
    return (
        <React.Fragment>
            <div className="vertical-menu">
                <div className="navbar-brand-box">
                    <Link to="/" className="logo logo-dark">
                        <span className="logo-sm">
                            <img src={logoLightSvg} alt="" height="50" width="50" />
                        </span>
                        <span className="logo-lg" >
                            <img src={logoDark} alt="" height="70" style={{ padding: '4px' }} />
                        </span>
                    </Link>

                    {/* <Link to="/" className="logo logo-light ">
                        <span className="logo-sm">
                            <img src={logoLightSvg} alt="" height="70" width="68" style={{ objectFit: "cover", marginBottom: "10px" }} />
                        </span>
                        <div className="p-2">

                            <span className="logo-lg " style={{ paddingTop: "10px !important" }}>
                                <img src={logoLightPng} alt="" height="70" />
                            </span>
                        </div>
                    </Link> */}
                </div>
                <div data-simplebar className="h-100">
                    {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
                </div>

                <div className="sidebar-background"></div>
            </div>
        </React.Fragment>
    );
};

Sidebar.propTypes = {
    type: PropTypes.string,
};

const mapStatetoProps = (state) => {
    return {
        layout: state.Layout,
    };
};
export default connect(
    mapStatetoProps,
    {}
)(withRouter(withTranslation()(Sidebar)));
