import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import traslateicon from "../../assets/images/traslateicon.svg"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";

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
    localStorage.getItem("i18nextLng") === "en"
      ? setLanguage("en")
      : setLanguage("hi");
  }, [lan]);

  const changeLanguage = (e, lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    setAnchorEl(null);
    dispatch(translation(lang));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
      <span className="mr-2">
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
