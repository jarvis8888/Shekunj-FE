import React from "react";
import ChangeLanguageButton from "../LanguageButton";
import { Link } from "@mui/material";
import { routingConstants } from "../../utils/constants";
import { useTranslation } from "react-i18next";
import "./navbar.scss";
import "../../Styles/global.scss";

function TopNavbar() {
  const { t } = useTranslation();

  return (
    <div className='header-top'>
      <nav>
        <ul>
          <li>
            <a href='#'>Events</a>
          </li>
          <li>
            <a href='#'>Blogs</a>
          </li>
          <li>
            <a href='#'>FQA</a>
          </li>
          <li>
            <ChangeLanguageButton />
          </li>
          <li>
            {/* <a href='/login'>
              <button className='button'>{t("header.authButton")}</button>
            </a> */}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default TopNavbar;
