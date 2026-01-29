import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import SimpleBar from 'simplebar-react';

// MetisMenu
import MetisMenu from 'metismenujs';
import { Link, useLocation } from 'react-router-dom';
import withRouter from '../Common/withRouter';

//i18n
import { withTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { ShamcarRoutes } from '@@/routes/routeEnum';
import { translate, translationHelper } from '@@/locales/translate';
import { Icons } from '../Common/Icons';
import { authProtectedRoutes } from '@@/routes';
import { useSelector } from 'react-redux';

const SidebarContent = (props) => {
  let authUserData;

  const { profile } = useSelector((state) => ({
    profile: state.Authentication.user,
  }));

  if (localStorage.getItem('authUser')) {
    try {
      authUserData = JSON.parse(localStorage.getItem('authUser'));
    } catch (error) {
      ""
    }
  }
  const ref = useRef();
  const [open, setOpen] = useState(false);
  const activateParentDropdown = useCallback((item) => {
    item.classList.add('active');
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];

    if (parent2El && parent2El.id !== 'side-menu') {
      parent2El.classList.add('mm-show');
    }

    if (parent) {
      parent.classList.add('mm-active');
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add('mm-show'); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add('mm-active'); // li
          parent3.childNodes[0].classList.add('mm-active'); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add('mm-show'); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add('mm-show'); // li
              parent5.childNodes[0].classList.add('mm-active'); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;

      if (item && item.classList.contains('active')) {
        item.classList.remove('active');
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== 'side-menu') {
          parent2El.classList.remove('mm-show');
        }

        parent.classList.remove('mm-active');
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove('mm-show');

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove('mm-active'); // li
            parent3.childNodes[0].classList.remove('mm-active');

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove('mm-show'); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove('mm-show'); // li
                parent5.childNodes[0].classList.remove('mm-active'); // a tag
              }
            }
          }
        }
      }
    }
  };

  const path = useLocation();
  const activeMenu = useCallback(() => {
    const pathName = path.pathname;
    let matchingMenuItem = null;
    const ul = document.getElementById('side-menu');
    const items = ul.getElementsByTagName('a');
    removeActivation(items);

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [path.pathname, activateParentDropdown]);

  useEffect(() => {
    ref.current.recalculate();
  }, []);

  useEffect(() => {
    new MetisMenu('#side-menu');
    activeMenu();
  }, []);

  useEffect(() => {
    const ul = document.getElementById('side-menu');
    const items = ul.getElementsByTagName('a');
    const sections = ul.getElementsByClassName("route-wrapper");

    for (const item of items) {

      const route = authProtectedRoutes?.find(el => el?.path == item?.pathname);
      if (route?.roles) {
        const userRoles = profile?.user?.roles ?? [];
        if (!userRoles?.some(el => route?.roles?.some(el1 => el1 == el))) {
          item?.classList?.add("display-route-custome")
        }

      }
    }
    for (const section of sections) {
      let hideSection = true;
      const sectionItems = section.getElementsByTagName('a');
      for (const sectionItem of sectionItems) {
        if (!sectionItem.classList.contains("display-route-custome")) {
          hideSection = false;
        }
      }
      if (hideSection) {
        section.classList.add("display-route-custome")

      }

    }
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    activeMenu();
  }, [activeMenu]);

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled pt-3" id="side-menu">
            <div className='route-wrapper'>
              <li className="menu-title">{props.t('Menu')} </li>

              <li>
                <Link to="/">
                  <i className="bx bx-home-circle"></i>
                  <span>{translationHelper("dashboard")}</span>
                </Link>
              </li>
              <li>
                <Link to={ShamcarRoutes.USERS}>
                  <i className="bx bx-user"></i>
                  <span>{translate("users")}</span>
                </Link>
              </li>
              <li>
                <Link to={ShamcarRoutes.ADMINS}>
                  <i className="bx bxs-user-rectangle"></i>
                  <span>{translate("admins")}</span>
                </Link>
              </li>

              <li className="menu-title">{props.t('vehicles')} </li>
              <li>
                <Link to={ShamcarRoutes.CAR_MODELS}>
                  <i className="bx bx-car"></i>
                  <span>{translate("carModels")}</span>
                </Link>
              </li>
              <li>
                <Link to={ShamcarRoutes.CAR_MAKES}>
                  <i className="bx bx-car"></i>
                  <span>{translate("carMakes")}</span>
                </Link>
              </li>

            </div>








          </ul>
        </div>
      </SimpleBar>

    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
