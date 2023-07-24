import React, { memo, useState } from "react";
import ChangeLanguageButton from "../LanguageButton";
import { Avatar, Link, Menu, MenuItem } from "@mui/material";
import { routingConstants } from "../../utils/constants";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import "./navbar.scss";
import "../../Styles/global.scss";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, logOut, refreshPage } from "../../store/auth/action";
import Cookies from "js-cookie";
import { isAuthenticated } from "../../utils";
import { Dropdown } from "rsuite";
import { useLocation } from "react-router-dom";

function TopNavbar(props) {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuth, user } = useSelector((state) => state.authReducer);
  const { lan } = useSelector((state) => state.languageReducer);

  const [anchorEl, setAnchorEl] = useState(null);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const open = Boolean(anchorEl);

  const handleSubmenuClick = () => {
    setShowSubMenu(!showSubMenu);
  };

  const handleLogout = () => {
    dispatch(logOut(history));
    setAnchorEl(null);
  };
  React.useEffect(() => {
    dispatch(refreshPage());
    if (isAuthenticated()) {
      dispatch(getUserProfile());
    }
  }, [dispatch, lan]);

  const isActive = (href) => {
    return location.pathname === href;
  };

  React.useEffect(() => {
    if (Cookies.get("sheToken") == undefined || null) {
      localStorage.removeItem("login_data");
      localStorage.removeItem("event_data");
    }
  }, []);

  return (
    <div className='sk-headerTop-bg'>
      <div
        className={`container ${props.newDesign ? "sk-custom-container" : ""}`}
      >
        <div className='header-top'>
          <nav className=''>
            <ul>
              <li className='mobile'>
                <a
                  href='/events/all'
                  className={isActive("/events/all") && "active"}
                >
                  {t("phase2.HEADER.events")}
                </a>
              </li>
              <li className='mobile'>
                <a href='/article' className={isActive("/article") && "active"}>
                  {t("phase2.HEADER.blog")}
                </a>
              </li>
              <li className='mobile'>
                <a
                  href='/frequently-asked-questions'
                  className={
                    isActive("/frequently-asked-questions") && "active"
                  }
                >
                  {t("phase2.HEADER.FAQ")}
                </a>
              </li>
              <li>
                <ChangeLanguageButton />
              </li>
              <li>
                {isAuth ? (
                  <>
                    <div className='profile'>
                      {user && user?.profile_pic ? (
                        <img
                          src={user?.profile_pic}
                          className='profile-img'
                          alt={user?.name || t("common.n/a")}
                        />
                      ) : (
                        <Avatar
                          className=''
                          style={{ cursor: "pointer" }}
                          sx={{ width: 34, height: 34 }}
                        />
                      )}
                      <Dropdown
                        title={user?.name || t("common.n/a")}
                        className='custom-dropdown'
                      >
                        <Dropdown.Item
                          onClick={() =>
                            history.push(routingConstants.MY_PROFILE)
                          }
                          className={
                            isActive(routingConstants.MY_PROFILE) && "active"
                          }
                        >
                          {t("headerComponent.menuItem.1")}
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            history.push(routingConstants.MY_PROGESS)
                          }
                          className={
                            isActive(routingConstants.MY_PROGESS) && "active"
                          }
                        >
                          {t("headerComponent.menuItem.2")}
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            history.push(routingConstants.ALL_CERTIFICATE_PAGE)
                          }
                          className={
                            isActive(routingConstants.ALL_CERTIFICATE_PAGE) &&
                            "active"
                          }
                        >
                          {t("headerComponent.menuItem.3")}
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>
                          {t("headerComponent.menuItem.4")}
                        </Dropdown.Item>
                      </Dropdown>
                    </div>
                  </>
                ) : (
                  <>
                    <a href='/login'>
                      <button type='button' className='sk-header-btn'>
                        {t("header.authButton")}
                      </button>
                    </a>
                  </>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default memo(TopNavbar);
