import React, { useState, memo } from "react";
import "./navbar.scss";
import closeIcon from "../../assets/icons/svgs/close.png";
import memuIcon from "../../assets/icons/svgs/memu.png";
import globalSreach from "../../assets/icons/svgs/globalSearch.png";
import logo from "../../assets/icons/logo.png";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import "./index.scss";
import { useLocation } from "react-router-dom";
import { Menu, MenuItem } from "@mui/material";
import { routingConstants } from "../../utils/constants";

const Navbar = (props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);

  const open = Boolean(anchorEl);
  const open1 = Boolean(anchorE2);

  const isActive = (href) => {
    return location.pathname === href;
  };

  return (
    <div className='Navbar'>
      <span className='nav-logo'>
        <img src={logo} alt='close' width={100} height={30} />
      </span>
      <div className={`nav-items ${isOpen && "open"}`}>
        <a href='/about-us' className={isActive("/about-us") && "active"}>
          {t("header.heading.1")}
        </a>
        <a href='/courses' className={isActive("/courses") && "active"}>
          {t("header.heading.2")}
        </a>
        <a
          id='subMenu-mobile'
          href={routingConstants.SUCCESS_CAREER_OPTION}
          className={
            isActive(routingConstants.SUCCESS_CAREER_OPTION) && "active"
          }
        >
          {t("headerComponent.menuItem.5")}
        </a>
        <a
          id='subMenu-mobile'
          href={routingConstants.SUCCESS_CAREER_TEST}
          className={isActive(routingConstants.SUCCESS_CAREER_TEST) && "active"}
        >
          {t("headerComponent.menuItem.6")}
        </a>
        <a
          id='subMenu-mobile'
          href={routingConstants.GUIDANCE_BOOK}
          className={isActive(routingConstants.GUIDANCE_BOOK) && "active"}
        >
          {t("headerComponent.menuItem.7")}
        </a>

        <span
          className='subMenu-items'
          aria-controls='basic-menu'
          aria-haspopup='true'
          aria-expanded={open ? "true" : undefined}
          onClick={(event) => setAnchorEl(event.currentTarget)}
          style={{ cursor: "pointer" }}
        >
          {t("header.heading.3")}
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
                history.push(routingConstants.SUCCESS_CAREER_OPTION);
                setAnchorEl(null);
              }}
            >
              {t("headerComponent.menuItem.5")}
            </MenuItem>
            <MenuItem
              onClick={() => {
                history.push(routingConstants.SUCCESS_CAREER_TEST);
                setAnchorEl(null);
              }}
            >
              {t("headerComponent.menuItem.6")}
            </MenuItem>
            <MenuItem
              onClick={() => {
                history.push(routingConstants.GUIDANCE_BOOK);
                setAnchorEl(null);
              }}
            >
              {t("headerComponent.menuItem.7")}
            </MenuItem>
          </Menu>
        </span>
        <a
          href='https://octahire.com/Resume_maker'
          target='_blank'
          rel='noreferrer'
        >
          {t("header.heading.4")}
        </a>

        <a
          href='https://octahire.com/Home/candidate_register'
          target='_blank'
          rel='noreferrer'
        >
          {t("header.heading.6")}
        </a>
        <a
          id='subMenu-mobile'
          href={routingConstants.TOP_COLLEGES}
          className={isActive(routingConstants.TOP_COLLEGES) && "active"}
        >
          Top Colleges
        </a>
        <a
          id='subMenu-mobile'
          href={routingConstants.TOP_SCHOOLS}
          className={isActive(routingConstants.TOP_SCHOOLS) && "active"}
        >
          Top Schools
        </a>
        <a
          id='subMenu-mobile'
          href={routingConstants.GOVERNMENT_SCHEMES}
          className={isActive(routingConstants.GOVERNMENT_SCHEMES) && "active"}
        >
          Government Schemes
        </a>
        <span
          className='subMenu-items'
          aria-controls='basic-menu'
          aria-haspopup='true'
          aria-expanded={open1 ? "true" : undefined}
          onClick={(event) => setAnchorE2(event.currentTarget)}
          style={{ cursor: "pointer" }}
        >
          {t("header.heading.5")}
          <Menu
            id='basic-menu'
            anchorEl={anchorE2}
            open={open1}
            onClose={() => setAnchorE2(null)}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                history.push(routingConstants.TOP_COLLEGES);
                setAnchorE2(null);
              }}
            >
              Top Colleges
            </MenuItem>
            <MenuItem
              onClick={() => {
                history.push(routingConstants.TOP_SCHOOLS);
                setAnchorE2(null);
              }}
            >
              Top Schools
            </MenuItem>
            <MenuItem
              onClick={() => {
                history.push(routingConstants.GOVERNMENT_SCHEMES);
                setAnchorE2(null);
              }}
            >
              Government Schemes
            </MenuItem>
          </Menu>
        </span>
        <a
          href='/success-stories'
          className={isActive("/success-stories") && "active"}
        >
          {t("header.heading.8")}
        </a>
        <a>
          <img src={globalSreach} alt='close' className='search' />
        </a>
      </div>
      <div
        className={`nav-toggle ${isOpen && "open"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <img src={closeIcon} alt='close' />
        ) : (
          <img src={memuIcon} alt='close' />
        )}
      </div>
    </div>
  );
};

export default memo(Navbar);
