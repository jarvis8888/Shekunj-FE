import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Menu, MenuItem } from "@mui/material";

import { getUserProfile, logOut, refreshPage } from "../../store/auth/action";
import { isAuthenticated } from "../../utils/utils";
import ChangeLanguageButton from "../LanguageButton";
import Logo from "../../assets/images/logo.svg";
import close from "../../assets/icons/x.png";

import "./index.scss";
import { routingConstants } from "../../utils/constants";

const Header = ({ page, subPage }) => {
  const { t } = useTranslation();
  const { isAuth, user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);

  const open = Boolean(anchorEl);
  const open1 = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  useEffect(() => {
    dispatch(refreshPage());
    if (isAuthenticated()) {
      dispatch(getUserProfile());
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logOut(history));
    setAnchorEl(null);
  };

  const handleProfile = () => {
    history.push(routingConstants.MY_PROFILE);
    setAnchorEl(null);
  };
  const handleProgress = () => {
    history.push(routingConstants.MY_PROGESS);
    setAnchorEl(null);
  };

  const handleCertificate = () => {
    history.push(routingConstants.ALL_CERTIFICATE_PAGE);
    setAnchorEl(null);
  };

  const handleColleges = () => {
    history.push(routingConstants.TOP_COLLEGES);
    setAnchorEl1(null);
  };

  const handleSchools = () => {
    history.push(routingConstants.TOP_SCHOOLS);
    setAnchorEl1(null);
  };

  const handleExams = () => {
    history.push(routingConstants.GOVERNMENT_EXAMS);
    setAnchorEl1(null);
  };

  const handleGuidance1 = () => {
    history.push(routingConstants.SUCCESS_CAREER_OPTION);
    setAnchorEl2(null);
  };

  const handleGuidance2 = () => {
    history.push(routingConstants.SUCCESS_CAREER_TEST);
    setAnchorEl2(null);
  };

  const handleGuidance3 = () => {
    history.push(routingConstants.GUIDANCE_BOOK);
    setAnchorEl2(null);
  };

  return (
    <div>
      <header className='other_head'>
        <div className='container'>
          <div className='topbar'>
            <div className='row'>
              <div className='col-md-3 col-12'>
                <div className='sign_in'>
                  <Link className='navbar-brand' to='/'>
                    <img src={Logo} alt='...' />
                  </Link>

                  <p>Sign In</p>
                </div>
              </div>

              <div className='col-md-9 col-5 pl-md-0 pl-lg-2 text-right'>
                
                <div className='top_bar_btn d-inline-flex'>
                  {isAuth ? (
                    <>
                      {user && user?.profile_pic ? (
                        <img
                          src={user?.profile_pic}
                          className='profile-img'
                          alt={user?.name || "N/A"}
                        />
                      ) : (
                        <Avatar
                          className='ml-xl-3 ml-md-2'
                          style={{ cursor: "pointer" }}
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
                        onClick={handleClick}
                      >
                        {user?.name || "N/A"}
                      </span>
                      <Menu
                        id='basic-menu'
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem
                          onClick={handleProfile}
                          className={subPage === "myProfile" && "active"}
                        >
                          My Profile
                        </MenuItem>
                        <MenuItem
                          onClick={handleProgress}
                          className={subPage === "myProgress" && "active"}
                        >
                          My Progress
                        </MenuItem>
                        <MenuItem
                          onClick={handleCertificate}
                          className={
                            subPage === "allCertificatePage" && "active"
                          }
                        >
                          My Certificates
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </>
                  ) : (
                    <Link
                      className='btn btn-bg-pink ml-xl-3 ml-md-2'
                      to={routingConstants.LOGIN}
                    >
                      {t("header.authButton")}
                    </Link>
                  )}

                  <div className='set_language d-inline-block ml-xl-3 ml-md-2'>
                    <ChangeLanguageButton />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='middle_nav_login'>
            <nav className='navbar navbar-expand-md'>
              <button
                className='navbar-toggler'
                type='button'
                data-toggle='collapse'
                data-target='#collapsibleNavbar'
              >
                <span className='navbar-toggler-icon'></span>
              </button>
              <div className='collapse navbar-collapse' id='collapsibleNavbar'>
                <button
                  className='navbar-toggler close_set'
                  type='button'
                  data-toggle='collapse'
                  data-target='#collapsibleNavbar'
                >
                  <img src={close} alt='' />
                </button>
                <ul className='navbar-nav'>
                  <li
                    className={
                      page === "about" ? "nav-item active" : "nav-item"
                    }
                  >
                    <Link className='nav-link' to='/about'>
                      {t("header.heading.1")}
                    </Link>
                  </li>
                  <li
                    className={
                      page === "courses" ? "nav-item active" : "nav-item"
                    }
                  >
                    <Link className='nav-link' to='/courses'>
                      {t("header.heading.2")}
                    </Link>
                  </li>
                  <li
                    className={
                      page === "guidance" ? "nav-item active" : "nav-item"
                    }
                  >
                    <button
                      className='nav-link guidence_button'
                      id='basic-button2'
                      aria-controls='basic-menu2'
                      aria-haspopup='true'
                      aria-expanded={open2 ? "true" : undefined}
                      onClick={handleClick2}
                    >
                      {t("header.heading.3")}
                    </button>
                    <Menu
                      id='basic-menu2'
                      anchorEl={anchorEl2}
                      open={open2}
                      onClose={handleClose2}
                      MenuListProps={{
                        "aria-labelledby": "basic-button2",
                      }}
                    >
                      <MenuItem
                        onClick={handleGuidance1}
                        className={subPage === "careerOption" && "active"}
                      >
                        Career Option
                      </MenuItem>
                      <MenuItem
                        onClick={handleGuidance2}
                        className={subPage === "careerTest" && "active"}
                      >
                        Career Test
                      </MenuItem>
                      <MenuItem
                        onClick={handleGuidance3}
                        className={subPage === "bookCounsller" && "active"}
                      >
                        Book a Counsellor
                      </MenuItem>
                    </Menu>
                  </li>
                  <li
                    className={
                      page === "resume" ? "nav-item active" : "nav-item"
                    }
                  >
                    <a
                      className='nav-link'
                      rel='noreferrer'
                      href='https://octahire.com/Resume_maker'
                      target='_blank'
                    >
                      {t("header.heading.4")}
                    </a>
                  </li>
                  <li
                    className={
                      page === "career" ? "nav-item active" : "nav-item"
                    }
                  >
                    <button
                      className='nav-link guidence_button'
                      id='basic-button1'
                      aria-controls='basic-menu1'
                      aria-haspopup='true'
                      aria-expanded={open1 ? "true" : undefined}
                      onClick={handleClick1}
                    >
                      {t("header.heading.5")}
                    </button>
                    <Menu
                      id='basic-menu1'
                      anchorEl={anchorEl1}
                      open={open1}
                      onClose={handleClose1}
                      MenuListProps={{
                        "aria-labelledby": "basic-button1",
                      }}
                    >
                      <MenuItem
                        onClick={handleColleges}
                        className={subPage === "colleges" && "active"}
                      >
                        Top Colleges
                      </MenuItem>
                      <MenuItem
                        onClick={handleSchools}
                        className={subPage === "schools" && "active"}
                      >
                        Top Schools
                      </MenuItem>
                      <MenuItem
                        onClick={handleExams}
                        className={subPage === "govExams" && "active"}
                      >
                        Governmant Exams
                      </MenuItem>
                    </Menu>
                  </li>

                  <li
                    className={page === "jobs" ? "nav-item active" : "nav-item"}
                  >
                    <a
                      className='nav-link'
                      rel='noreferrer'
                      target='_blank'
                      href='https://octahire.com/Recruiters/job_recruiters?location='
                    >
                      {t("header.heading.6")}
                    </a>
                  </li>

                  <li
                    className={
                      page === "blogs" ? "nav-item active" : "nav-item"
                    }
                  >
                    <a
                      className='nav-link'
                      rel='noreferrer'
                      target='_blank'
                      href={routingConstants.BLOGS}
                    >
                      {t("header.heading.7")}
                    </a>
                  </li>

                  <li
                    className={
                      page === "story" ? "nav-item active" : "nav-item"
                    }
                  >
                    <Link className='nav-link' to={routingConstants.SUCCESS_STORIES}>
                      {t("header.heading.8")}
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
