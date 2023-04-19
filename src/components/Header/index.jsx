import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Divider,
  Drawer,
  List,
  Menu,
  MenuItem,
  Badge,
  ListItem,
  ListItemText,
} from "@mui/material";
import { getAllNotifications } from "../../store/notifications";
import moment from "moment";
import Button from "@mui/material/Button";
import { makeStyle } from "@mui/styles";
import { getUserProfile, logOut, refreshPage } from "../../store/auth/action";
import { isAuthenticated } from "../../utils/utils";
import ChangeLanguageButton from "../LanguageButton";
import Logo from "../../assets/images/logo.svg";
import close from "../../assets/icons/x.png";
import BellIcon from "react-bell-icon";
import dateFormat, { masks } from "dateformat";
import "./index.scss";
import { routingConstants } from "../../utils/constants";
import { pink } from "@mui/material/colors";
import { compareAsc, format } from "date-fns";
import Cookies from "js-cookie";
const Header = ({ page, subPage }) => {
  // const classes = useStyles();
  const { notifications } = useSelector((state) => state.notificationsReducer);
  const { t } = useTranslation();
  const { isAuth, user } = useSelector((state) => state.authReducer);
  const { lan } = useSelector((state) => state.languageReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  // const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllNotifications());
  }, [dispatch, lan]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl77, setAnchorEl77] = useState(null);
  const [anchorEl777, setAnchorEl777] = useState(null);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);
  const [showmenu, setShowmenu] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const date = new Date();
  // useEffect(() => {
  //   const interval = setInterval(() => getTime(deadline), 1000);

  //   return () => clearInterval(interval);
  // }, []);

  const open = Boolean(anchorEl);
  const open77 = Boolean(anchorEl77);
  const open777 = Boolean(anchorEl777);
  const open1 = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);
  const open3 = Boolean(anchorEl3);

  useEffect(() => {
    if (Cookies.get("sheToken") == undefined || null) {
      localStorage.removeItem("login_data");
      localStorage.removeItem("event_data");
    }
  }, []);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick77 = (event) => {
    setAnchorEl77(event.currentTarget);
  };

  const handleClose77 = () => {
    setAnchorEl77(null);
  };
  const handleClick777 = (event) => {
    setAnchorEl777(event.currentTarget);
  };

  const handleClose777 = () => {
    setAnchorEl777(null);
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

  const handleClick3 = (event) => {
    setAnchorEl3(event.currentTarget);
  };

  const handleClose3 = () => {
    setAnchorEl3(null);
  };

  useEffect(() => {
    dispatch(refreshPage());
    if (isAuthenticated()) {
      dispatch(getUserProfile());
    }
  }, [dispatch, lan]);

  const handleLogout = () => {
    dispatch(logOut(history));
    setAnchorEl(null);
  };

  const handleNotification1 = () => {
    // history.push(routingConstants.MY_PROFILE);
    setAnchorEl(null);
  };
  const handleNotificationAll = () => {
    history.push(routingConstants.ALL_NOTIFICATION);
    setAnchorEl77(null);
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
    history.push(routingConstants.GOVERNMENT_SCHEMES);
    setAnchorEl1(null);
  };

  const handleGuidance1 = () => {
    history.push(routingConstants.SUCCESS_CAREER_OPTION);
    setAnchorEl2(null);
  };

  const handleGuidance2 = () => {
    // history.push(routingConstants.SUCCESS_CAREER_TEST);
    history.push(routingConstants.MOCKTEST);
    setAnchorEl2(null);
  };

  const handleGuidance3 = () => {
    history.push(routingConstants.GUIDANCE_BOOK);
    setAnchorEl2(null);
  };

  const handleMoreBlogs = () => {
    history.push(routingConstants.MORE_BLOG);
    setAnchorEl3(null);
  };
  // const handleMoreMagazine = () => {
  //   history.push(routingConstants.MORE_MAGAZINE);
  //   setAnchorEl3(null);
  // };

  const handleMoreEvent = () => {
    history.push(routingConstants.MORE_EVENT);
    setAnchorEl3(null);
  };

  const handleMoreMagazine = () => {
    history.push(routingConstants.MORE_MAGAZINE);
    setAnchorEl3(null);
  };

  const handleMoreFAQ = () => {
    history.push(routingConstants.FAQ);
    setAnchorEl3(null);
  };

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setShowmenu(!showmenu);
  };

  const notificationsFunction = (data) => {
    if (data["Notifications "] == undefined) {
      return (
        <BellIcon width='40' active={true} animate={true} color='#ec498a' />
      );
    } else if (data["Notifications "].length == 0) {
      return (
        <BellIcon width='40' active={true} animate={true} color='#ec498a' />
      );
    } else {
      if (
        moment(data["Notifications "]?.[0].updated_at).format("MM/DD/YYYY") ==
        moment(Date.now()).format("MM/DD/YYYY")
      ) {
        return (
          <Badge
            badgeContent='New'
            style={{ color: "#e83e8c" }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <BellIcon width='40' active={true} animate={true} color='#ec498a' />
          </Badge>
        );
      } else {
        return (
          <BellIcon width='40' active={true} animate={true} color='#ec498a' />
        );
      }
    }
  };

  return (
    <>
      <div className='noselect'>
        <header className='other_head'>
          <div className='container'>
            <div className='topbar'>
              <div className='row'>
                <div className='col-md-3 col-7'>
                  <div className='sign_in'>
                    <Link className='navbar-brand' to='/'>
                      <img src={Logo} alt='...' />
                    </Link>

                    <p>{t("headerComponent.other.1")}</p>
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
                            alt={user?.name || t("common.n/a")}
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
                          {user?.name || t("common.n/a")}&nbsp;
                          {user && user?.last_name}
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
                            {t("headerComponent.menuItem.1")}
                          </MenuItem>
                          <MenuItem
                            onClick={handleProgress}
                            className={subPage === "myProgress" && "active"}
                          >
                            {t("headerComponent.menuItem.2")}
                          </MenuItem>
                          <MenuItem
                            onClick={handleCertificate}
                            className={
                              subPage === "allCertificatePage" && "active"
                            }
                          >
                            {t("headerComponent.menuItem.3")}
                          </MenuItem>
                          <MenuItem onClick={handleLogout}>
                            {t("headerComponent.menuItem.4")}
                          </MenuItem>
                        </Menu>
                      </>
                    ) : (
                      <Link
                        className='btn btn-bg-pink ml-xl-3 ml-md-2'
                        to={{
                          pathname: routingConstants.LOGIN,
                          state: { from: window.location.pathname },
                        }}
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
              <nav className='navbar navbar-expand-md '>
                <button
                  className='navbar-toggler'
                  type='button'
                  data-toggle='collapse'
                  data-target='#collapsibleNavbar'
                  onClick={toggleDrawer}
                >
                  <span className='navbar-toggler-icon'></span>
                </button>
                <Drawer
                  anchor='left'
                  open={showmenu}
                  className='toggleDrawer'
                  onBackdropClick={toggleDrawer}
                >
                  <Divider />
                  <List>
                    <img
                      src={close}
                      alt=''
                      style={{
                        float: "right",
                        marginRight: "10px",
                        height: "30px",
                        width: "30px",
                      }}
                      onClick={toggleDrawer}
                    />
                    <div className='toggleDrawerOptions'>
                      <ListItem
                        className={page === "about-us" && "active-route"}
                        onClick={() => {
                          history.push("/about-us");
                        }}
                      >
                        <ListItemText
                          primary='About'
                          style={{
                            color: page === "about-us" ? "#fff" : "#ec498a",
                          }}
                        />
                      </ListItem>

                      <ListItem
                        className={page === "courses" && "active-route"}
                        onClick={() => {
                          history.push("/courses");
                        }}
                      >
                        <ListItemText
                          primary='Courses'
                          style={{
                            color: page === "courses" ? "#fff" : "#ec498a",
                          }}
                        />
                      </ListItem>

                      <ListItem
                        id='basic-button2'
                        aria-controls='basic-menu2'
                        aria-haspopup='true'
                        aria-expanded={open2 ? "true" : undefined}
                        onClick={handleClick2}
                        style={{ color: "#ec498a" }}
                      >
                        <ListItemText primary={t("header.heading.3")} />
                      </ListItem>
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
                          className={
                            subPage === "careerOption" && "active-route"
                          }
                        >
                          {t("headerComponent.menuItem.5")}
                        </MenuItem>
                        <MenuItem
                          onClick={handleGuidance2}
                          className={subPage === "mockTest" && "active-route"}
                        >
                          {t("headerComponent.menuItem.6")}
                        </MenuItem>
                        <MenuItem
                          onClick={handleGuidance3}
                          className={
                            subPage === "bookCounsller" && "active-route"
                          }
                        >
                          {t("headerComponent.menuItem.7")}
                        </MenuItem>
                      </Menu>
                      <ListItem
                        onClick={() => {
                          window.open(
                            "https://octahire.com/Resume_maker",
                            "_blank",
                          );
                        }}
                        style={{ color: "#ec498a" }}
                      >
                        <ListItemText primary='Resume Builder' />
                      </ListItem>

                      <ListItem
                        id='basic-button1'
                        aria-controls='basic-menu1'
                        aria-haspopup='true'
                        aria-expanded={open1 ? "true" : undefined}
                        onClick={handleClick1}
                        style={{ color: "#ec498a" }}
                      >
                        <ListItemText primary={t("header.heading.5")} />
                      </ListItem>
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
                          className={subPage === "colleges" && "active-route"}
                        >
                          {t("headerComponent.menuItem.8")}
                        </MenuItem>
                        <MenuItem
                          onClick={handleSchools}
                          className={subPage === "schools" && "active-route"}
                        >
                          {t("headerComponent.menuItem.9")}
                        </MenuItem>
                        <MenuItem
                          onClick={handleExams}
                          className={subPage === "govExams" && "active-route"}
                        >
                          {t("headerComponent.menuItem.10")}
                        </MenuItem>
                      </Menu>
                      <ListItem
                        onClick={() => {
                          window.open(
                            "https://octahire.com/Home/candidate_register",
                            "_blank",
                          );
                        }}
                        style={{ color: "#ec498a" }}
                      >
                        <ListItemText primary='Jobs' />
                      </ListItem>
                      <ListItem
                        id='basic-button3'
                        aria-controls='basic-menu3'
                        aria-haspopup='true'
                        aria-expanded={open3 ? "true" : undefined}
                        onClick={handleClick3}
                        style={{ color: "#ec498a" }}
                      >
                        <ListItemText primary={t("header.heading.7")} />
                      </ListItem>
                      <Menu
                        id='basic-menu3'
                        anchorEl={anchorEl3}
                        open={open3}
                        onClose={handleClose3}
                        MenuListProps={{
                          "aria-labelledby": "basic-button3",
                        }}
                      >
                        <MenuItem
                          onClick={handleMoreEvent}
                          className={subPage === "moreEvent" && "active-route"}
                        >
                          {t("headerComponent.menuItem.11")}
                        </MenuItem>
                        <MenuItem
                          onClick={handleMoreBlogs}
                          className={subPage === "moreblog" && "active-route"}
                        >
                          {t("headerComponent.menuItem.13")}
                        </MenuItem>

                        <MenuItem
                          onClick={handleMoreFAQ}
                          className={subPage === "moreFAQ" && "active-route"}
                        >
                          {/* {t("headerComponent.menuItem.14")} */}
                          FAQ
                        </MenuItem>
                      </Menu>

                      <Button
                        id='basic-button777'
                        aria-controls='basic-menu777'
                        className='notificationButton'
                        variant='text'
                        style={{
                          left: 8,
                        }}
                        aria-haspopup='true'
                        aria-expanded={open777 ? "true" : undefined}
                        onClick={handleClick777}
                      >
                        <BellIcon
                          width='30'
                          active={true}
                          animate={true}
                          color='#ec498a'
                        />
                      </Button>

                      <Menu
                        id='basic-menu777'
                        MenuListProps={{
                          "aria-labelledby": "basic-button77",
                        }}
                        aria-labelledby='text'
                        anchorEl={anchorEl777}
                        open={open777}
                        onClose={handleClose777}
                        transformOrigin={{
                          horizontal: "left",
                          vertical: "top",
                        }}
                        anchorOrigin={{
                          horizontal: "right",
                          vertical: "top",
                        }}
                        sx={{
                          "&.MuiPaper-root": { minWidth: "350px !important" },
                        }}
                      >
                        {notifications["Notifications "]?.length > 0 ? (
                          notifications["Notifications "]?.map((c) => {
                            return (
                              <>
                                <MenuItem onClick={handleNotification1}>
                                  <Link
                                    className='limited-text'
                                    to={`/${c?.url}`}
                                    style={{ color: "#121212" }}
                                    replace
                                  >
                                    {c?.title}
                                  </Link>
                                </MenuItem>
                                <Divider />
                              </>
                            );
                          })
                        ) : (
                          <MenuItem>No Data Found</MenuItem>
                        )}
                        <MenuItem
                          onClick={handleNotificationAll}
                          style={{
                            color: "#121212",
                            textAlign: "center",
                          }}
                          class='center'
                          className={page === "more" && "active-route"}
                        >
                          <strong>View ALL</strong>
                        </MenuItem>
                      </Menu>

                      <ListItem
                        className={page === "success-stories" && "active-route"}
                        onClick={() => {
                          history.push("/success-stories");
                        }}
                      >
                        <ListItemText
                          primary='Success story'
                          style={{
                            color:
                              page === "success-stories" ? "#fff" : "#ec498a",
                          }}
                        />
                      </ListItem>
                    </div>
                  </List>
                  <Divider />
                </Drawer>
                <div
                  className='collapse navbar-collapse'
                  id='collapsibleNavbar'
                >
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
                      <Link className='nav-link' to='/about-us'>
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
                          {t("headerComponent.menuItem.5")}
                        </MenuItem>
                        <MenuItem
                          onClick={handleGuidance2}
                          className={subPage === "mockTest" && "active"}
                        >
                          {t("headerComponent.menuItem.6")}
                        </MenuItem>
                        <MenuItem
                          onClick={handleGuidance3}
                          className={subPage === "bookCounsller" && "active"}
                        >
                          {t("headerComponent.menuItem.7")}
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
                          {t("headerComponent.menuItem.8")}
                        </MenuItem>
                        <MenuItem
                          onClick={handleSchools}
                          className={subPage === "schools" && "active"}
                        >
                          {t("headerComponent.menuItem.9")}
                        </MenuItem>
                        <MenuItem
                          onClick={handleExams}
                          className={subPage === "govExams" && "active"}
                        >
                          {t("headerComponent.menuItem.10")}
                        </MenuItem>
                      </Menu>
                    </li>
                    <li
                      className={
                        page === "jobs" ? "nav-item active" : "nav-item"
                      }
                    >
                      <a
                        className='nav-link'
                        rel='noreferrer'
                        target='_blank'
                        href='https://octahire.com/Home/candidate_register'
                      >
                        {t("header.heading.6")}
                      </a>
                    </li>

                    <li
                      className={
                        page === "more" ? "nav-item active" : "nav-item"
                      }
                    >
                      <button
                        className='nav-link guidence_button'
                        id='basic-button3'
                        aria-controls='basic-menu3'
                        aria-haspopup='true'
                        aria-expanded={open3 ? "true" : undefined}
                        onClick={handleClick3}
                      >
                        {t("header.heading.7")}
                      </button>
                      <Menu
                        id='basic-menu3'
                        anchorEl={anchorEl3}
                        open={open3}
                        onClose={handleClose3}
                        MenuListProps={{
                          "aria-labelledby": "basic-button3",
                        }}
                      >
                        <MenuItem
                          onClick={handleMoreEvent}
                          className={subPage === "moreEvent" && "active"}
                        >
                          {t("headerComponent.menuItem.11")}
                        </MenuItem>

                        <MenuItem
                          onClick={handleMoreBlogs}
                          className={subPage === "moreblog" && "active"}
                        >
                          {t("headerComponent.menuItem.13")}
                        </MenuItem>

                        <MenuItem
                          onClick={handleMoreFAQ}
                          className={subPage === "moreFAQ" && "active"}
                        >
                          FAQ
                        </MenuItem>
                      </Menu>
                    </li>

                    <li
                      className={
                        page === "story" ? "nav-item active" : "nav-item"
                      }
                    >
                      <Link
                        className='nav-link'
                        to={routingConstants.SUCCESS_STORIES}
                      >
                        {t("header.heading.8")}
                      </Link>
                    </li>

                    <li>
                      <Button
                        id='basic-button77'
                        aria-controls='basic-menu77'
                        className='notificationButton'
                        variant='text'
                        style={{
                          top: 13,
                          left: 0,
                        }}
                        aria-haspopup='true'
                        aria-expanded={open77 ? "true" : undefined}
                        onClick={handleClick77}
                      >
                        <span className='nav-link'>
                          {notificationsFunction(notifications)}
                        </span>
                      </Button>
                      <Menu
                        id='basic-menu77'
                        MenuListProps={{
                          "aria-labelledby": "basic-button77",
                        }}
                        aria-labelledby='text'
                        anchorEl={anchorEl77}
                        open={open77}
                        onClose={handleClose77}
                        transformOrigin={{
                          horizontal: "left",
                          vertical: "top",
                        }}
                        anchorOrigin={{
                          horizontal: "right",
                          vertical: "top",
                        }}
                      >
                        {notifications["Notifications "]?.length > 0 ? (
                          notifications["Notifications "]
                            ?.slice(0, 5)
                            ?.map((c) => {
                              return (
                                <>
                                  <MenuItem
                                    onClick={handleNotification1}
                                    className='nav-link '
                                  >
                                    <Link
                                      className='limited-text'
                                      to={`/${c?.url}`}
                                      style={{ color: "#121212" }}
                                      replace
                                    >
                                      {c?.title}
                                    </Link>
                                  </MenuItem>
                                  <Divider />
                                </>
                              );
                            })
                        ) : (
                          <MenuItem>No Data Found</MenuItem>
                        )}
                        <MenuItem
                          onClick={handleNotificationAll}
                          style={{
                            color: "#121212",
                            textAlign: "center",
                            cursor: "pointer",
                          }}
                          className={
                            page === "more" ? "nav-item active" : "nav-item"
                          }
                        >
                          <strong>View ALL</strong>
                        </MenuItem>
                      </Menu>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
