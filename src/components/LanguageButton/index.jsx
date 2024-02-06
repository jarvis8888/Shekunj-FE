import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import traslateicon from "../../assets/images/traslateicon.svg";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { translation } from "../../store/language";

const useStyles = makeStyles({
  language: {
    borderRadius: "2px !important",
    border: "1px solid #888 !important",
    textTransform: "none !important",
    fontFamily: "Poppins !important",
    fontWeight: "300 !important",
    fontSize: "14px !important",
    height: "38px",
  },
});

function ChangeLanguageButton() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = useLocation();
  const location = useLocation();
  const { lan } = useSelector((state) => state.languageReducer);
  const [language, setLanguage] = useState(
    localStorage.getItem("i18nextLng") || "en",
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const { i18n } = useTranslation();

  const open = Boolean(anchorEl);

  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    // const initialLanguage = localStorage.getItem("i18nextLng");
    const paramsLanguage = new URLSearchParams(location.search).get("lang");
    if (
      paramsLanguage &&
      (paramsLanguage === "en" || paramsLanguage === "hi")
    ) {
      i18n.changeLanguage(paramsLanguage);
      localStorage.setItem("i18nextLng", paramsLanguage);
      setLanguage(paramsLanguage);
      dispatch(translation(paramsLanguage));

      const { pathname, search } = location;
      const updatedSearch = new URLSearchParams(search);
      updatedSearch.set("lang", paramsLanguage);

      const newUrl = `${pathname}?${updatedSearch.toString()}`;

      history.push(newUrl);
    } else {
      const localLanguage = localStorage.getItem("i18nextLng");

      if (localLanguage && (localLanguage === "en" || localLanguage === "hi")) {
        i18n.changeLanguage(localLanguage);
        localStorage.setItem("i18nextLng", localLanguage);
        setLanguage(localLanguage);
        dispatch(translation(localLanguage));
        const { pathname, search } = location;
        const updatedSearch = new URLSearchParams(search);
        updatedSearch.set("lang", localLanguage);

        const newUrl = `${pathname}?${updatedSearch.toString()}`;

        history.push(newUrl);
      } else {
        i18n.changeLanguage("en");
        setLanguage("en");
        localStorage.setItem("i18nextLng", "en");
        const { pathname, search } = location;

        const updatedSearch = new URLSearchParams(search);
        updatedSearch.set("lang", "en");

        const newUrl = `${pathname}?${updatedSearch.toString()}`;

        history.push(newUrl);
      }
    }
  }, [lan]);

  const changeLanguage = (e, lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    setAnchorEl(null);
    dispatch(translation(lang));
    const { pathname, search } = location;

    const updatedSearch = new URLSearchParams(search);
    updatedSearch.set("lang", lang);

    const newUrl = `${pathname}?${updatedSearch.toString()}`;

    history.push(newUrl);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // useEffect(() => {
  //   const setLanguageFromUrl = () => {
  //     const urlSearchParams = new URLSearchParams(window.location.search);
  //     const langParam = urlSearchParams.get("lang");
  //     const { pathname, search } = location;

  //     if (langParam && (langParam === "en" || langParam === "hi")) {
  //       i18n.changeLanguage(langParam);
  //       setLanguage(langParam);
  //       dispatch(translation(langParam));
  //       localStorage.setItem("i18nextLng", langParam);
  //     } else {
  //       i18n.changeLanguage("en");
  //       setLanguage("en");
  //       dispatch(translation("en"));
  //       localStorage.setItem("i18nextLng", "en");
  //     }
  //   };

  //   setLanguageFromUrl();
  // }, [lan, location]);

  return (
    <>
      <Button
        id='fade-button'
        className={classes.language}
        aria-controls='fade-menu'
        aria-haspopup='true'
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
      >
        <span className='mr-1'>
          <img src={traslateicon} />
        </span>

        {language.startsWith("en") ? "English" : "हिन्दी"}
      </Button>
      <Menu
        id='fade-menu'
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={(e) => changeLanguage(e, "en")}>English</MenuItem>
        <MenuItem onClick={(e) => changeLanguage(e, "hi")}>हिन्दी</MenuItem>
      </Menu>
    </>
  );
}

export default ChangeLanguageButton;
