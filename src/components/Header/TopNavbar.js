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

function TopNavbar() {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
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

  React.useEffect(() => {
    if (Cookies.get("sheToken") == undefined || null) {
      localStorage.removeItem("login_data");
      localStorage.removeItem("event_data");
    }
  }, []);

  return (
    <div className='header-top'>
      <nav>
        <ul>
          <li>
            <a href='/event'>Events</a>
          </li>
          <li>
            <a href='/blogs'>Blogs</a>
          </li>
          <li>
            <a href='/more-faq'>FQA</a>
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
                      className='ml-xl-3 ml-md-2'
                      style={{ cursor: "pointer" }}
                      sx={{ width: 34, height: 34 }}
                    />
                  )}
                  <span
                    style={{
                      lineHeight: "38px",
                      marginLeft: "10px",
                      cursor: "pointer",
                    }}
                    id='basic-button'
                    aria-controls='basic-menu'
                    aria-haspopup='true'
                    aria-expanded={open ? "true" : undefined}
                    onClick={(event) => setAnchorEl(event.currentTarget)}
                  >
                    {user?.name || t("common.n/a")}&nbsp;
                    {user && user?.last_name}
                  </span>
                  <Menu
                    id='basic-menu'
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => setAnchorEl(null)}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        history.push(routingConstants.MY_PROFILE);
                        setAnchorEl(null);
                      }}
                      // className={subPage === "myProfile" && "active"}
                    >
                      {t("headerComponent.menuItem.1")}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        history.push(routingConstants.MY_PROGESS);
                        setAnchorEl(null);
                      }}
                      // className={subPage === "myProgress" && "active"}
                    >
                      {t("headerComponent.menuItem.2")}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        history.push(routingConstants.ALL_CERTIFICATE_PAGE);
                        setAnchorEl(null);
                      }}
                      // className={subPage === "allCertificatePage" && "active"}
                    >
                      {t("headerComponent.menuItem.3")}
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      {t("headerComponent.menuItem.4")}
                    </MenuItem>
                  </Menu>

                </div>
              </>
            ) : (
              <>
                <a href='/login'>
                  <button style={{ padding: "4px 10px", borderRadius: "6px" }}>
                    {t("header.authButton")}
                  </button>
                </a>
              </>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default memo(TopNavbar);
