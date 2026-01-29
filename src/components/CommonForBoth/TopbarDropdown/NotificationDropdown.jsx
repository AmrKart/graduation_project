import React, { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import { useNavigate } from "react-router-dom"
import { Dropdown, DropdownToggle } from "reactstrap"

//Import images


//i18n
import { withTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import * as actions from '@@/store/actions';

const NotificationDropdown = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)

  // const { notifications } = useSelector(
  //   (state) => ({
  //     notifications: state.InternalNotifications.internalNotifications.count,
  //   })
  // );
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchData = () => {
  //     dispatch(actions.getNotificationsCount(buildReraRequest({})));
  //   };

  //   fetchData();

  //   const intervalId = setInterval(fetchData, 5 * 60 * 1000);

  //   return () => clearInterval(intervalId);
  // }, [dispatch]);
  const history = useNavigate();




  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          onClick={() => {
            // dispatch(actions.restCount());
            // history(ReraRoutes.INTERNAL_NOTIFICATIONS)
          }}
          className="btn header-item noti-icon position-relative"
          tag="button"
          id="page-header-notifications-dropdown"
        >
          <i className="bx bx-bell bx-tada" />
          <span className="badge bg-danger rounded-pill">{""}</span>
        </DropdownToggle>


      </Dropdown>
    </React.Fragment>
  )
}

export default withTranslation()(NotificationDropdown)

NotificationDropdown.propTypes = {
  t: PropTypes.any
}