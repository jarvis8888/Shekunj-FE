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
        <Dropdown title={t("header.heading.3")} className='custom-dropdown'>
          <Dropdown.Item
            onClick={() => history.push(routingConstants.SUCCESS_CAREER_OPTION)}
            className={
              isActive(routingConstants.SUCCESS_CAREER_OPTION) && "active"
            }
          >
            Career
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => history.push(routingConstants.SUCCESS_CAREER_OPTION)}
            className={
              isActive(routingConstants.SUCCESS_CAREER_OPTION) && "active"
            }
          >
            {t("headerComponent.menuItem.5")}
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => history.push(routingConstants.SUCCESS_CAREER_TEST)}
            className={
              isActive(routingConstants.SUCCESS_CAREER_TEST) && "active"
            }
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
          href='https://octahire.com/Resume_maker'
          target='_blank'
          rel='noreferrer'
        >
          {t("header.heading.4")}
        </a>
        <Dropdown title={t("header.heading.6")} className='custom-dropdown'>
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
            onClick={() => history.push(routingConstants.GOVERNMENT_SCHEMES)}
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
        <span>
          <img
            src={globalSreach}
            alt='close'
            className='search'
            width={18}
            height={18}
          />
        </span>
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
