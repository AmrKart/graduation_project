import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

//i18n
import { withTranslation } from "react-i18next";

// Redux
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import withRouter from "../../Common/withRouter";
import { translate } from "@@/locales/translate";

// users

const ProfileMenu = (props) => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);


  const user = useSelector((state) => state.Authentication.user);


  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >

          <i className="bx bxs-user font-size-20 align-middle me-1" />
          <span className="d-none d-sm-inline-block ms-2 me-1">{user?.user?.fullName ?? ""}</span>
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu-end">
          <Link to="/profile" className="dropdown-item">
            <i className="bx bxs-user font-size-16 align-middle me-1 " />
            <span>{translate("profile")}</span>
          </Link>
          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>{translate("logout")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};


export default ProfileMenu
