import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import LanguageIcon from "@mui/icons-material/Language";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  language: {
    borderRadius: "0 !important",
    width: "128px",
    height: "40px",
    color: "#000000 !important",
    border: "1px solid #000000 !important",
    textTransform: "none !important",
    fontFamily: "Poppins !important",
    fontStyle: "normal",
    fontWeight: "300 !important",
    fontSize: "16px !important",
  },
});

function ChangeLanguageButton() {
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

  const changeLanguage = (e, lan) => {
    i18n.changeLanguage(lan);
    setLanguage(lan);
    setAnchorEl(null);
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
        startIcon={<LanguageIcon />}
      >
        {language.startsWith("en") ? "English" : "Hindi"}
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
        <MenuItem onClick={(e) => changeLanguage(e, "hi")}>Hindi</MenuItem>
      </Menu>
    </>
  );
}

export default ChangeLanguageButton;
