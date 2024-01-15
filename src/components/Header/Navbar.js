import React, { useState, memo } from "react";
import "./navbar.scss";
import closeIcon from "../../assets/icons/svgs/close.png";
import memuIcon from "../../assets/icons/svgs/memu.png";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseIcon from "@mui/icons-material/Close";
import globalSreach from "../../assets/icons/svgs/globalSearch.png";
import logo from "../../assets/images/logo.svg";
import searchnavicon from "../../assets/images/searchicon.svg";
import mobilemenu from "../../assets/images/mobilemenuicon.svg";
import closemenuicon from "../../assets/images/closecmenu.svg";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import "./index.scss";
import { useLocation } from "react-router-dom";
import { Menu, MenuItem } from "@mui/material";
import { routingConstants } from "../../utils/constants";
import { Dropdown, ButtonToolbar } from "rsuite";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href) => {
    return location.pathname === href;
  };

  return (
    <header className='sk-header-bg'>
      <div
        className={`container ${props.newDesign ? "sk-custom-container" : ""}`}
      >
        <div className='Navbar'>
          <span className='nav-logo'>
            <img
              src={logo}
              alt='logo shekunj'
              onClick={() => {
                history.push("");
              }}
            />
          </span>

          <div className={`nav-items ${isOpen && "open"}`}>
            <Link to='/about-us' className={isActive("/about-us") && "active"}>
              {t("header.heading.1")}
            </Link>
            <a href='/courses' className={isActive("/courses") && "active"}>
              {t("header.heading.2")}
            </a>
            <Dropdown
              title={t("header.heading.3")}
              className='custom-dropdown'
              trigger='hover'
            >
              <Dropdown.Item
                onClick={() =>
                  history.push(routingConstants.SUCCESS_CAREER_OPTION)
                }
                className={
                  isActive(routingConstants.SUCCESS_CAREER_OPTION) && "active"
                }
              >
                {t("headerComponent.menuItem.5")}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => history.push(routingConstants.MOCKTEST)}
                className={isActive(routingConstants.MOCKTEST) && "active"}
              >
                {t("headerComponent.menuItem.6")}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => history.push(routingConstants.GUIDANCE_BOOK)}
                className={isActive(routingConstants.GUIDANCE_BOOK) && "active"}
              >
                {t("headerComponent.menuItem.7")}
              </Dropdown.Item>
            </Dropdown>
            <a
              href='/resume-builder'
              className={isActive("/resume-builder") && "active"}
            >
              {t("header.heading.4")}
            </a>
            <a href='/jobs' className={isActive("/jobs") && "active"}>
              {t("header.heading.6")}
            </a>
            <Dropdown
              title={t("header.heading.5")}
              className='custom-dropdown'
              trigger='hover'
            >
              <Dropdown.Item
                onClick={() => history.push(routingConstants.TOP_COLLEGES)}
                className={isActive(routingConstants.TOP_COLLEGES) && "active"}
              >
                Top Colleges
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => history.push(routingConstants.TOP_SCHOOLS)}
                className={isActive(routingConstants.TOP_SCHOOLS) && "active"}
              >
                Top Schools
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() =>
                  history.push(routingConstants.GOVERNMENT_SCHEMES)
                }
                className={
                  isActive(routingConstants.GOVERNMENT_SCHEMES) && "active"
                }
              >
                Government Schemes
              </Dropdown.Item>
            </Dropdown>
            <a
              href='/success-stories'
              className={isActive("/success-stories") && "active"}
            >
              {t("header.heading.8")}
            </a>
            <a href='/events/all' className='mobile-show'>
              {t("phase2.HEADER.events")}
            </a>
            <a href='/article' className='mobile-show'>
              {t("phase2.HEADER.blog")}
            </a>
            <a href='/frequently-asked-questions' className='mobile-show'>
              {t("phase2.HEADER.FAQ")}
            </a>
            <span
              className='sk-mobile-hide'
              onClick={() => history.push(routingConstants.SEARCH)}
            >
              <img src={searchnavicon} />
            </span>
          </div>
          <div className='mobile-show'>
            <span
              className='mr-3'
              onClick={() => history.push(routingConstants.SEARCH)}
            >
              <img src={searchnavicon} className='searchIconSmall' />
            </span>
            <span
              className={`nav-toggle ${isOpen && "open"}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <img src={closemenuicon} /> : <img src={mobilemenu} />}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default memo(Navbar);
