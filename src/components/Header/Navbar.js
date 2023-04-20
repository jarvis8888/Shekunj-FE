import React, { useState } from "react";
import "./navbar.scss";
import closeIcon from "../../assets/icons/svgs/close.png";
import memuIcon from "../../assets/icons/svgs/memu.png";
import globalSreach from "../../assets/icons/svgs/globalSearch.png";
import logo from "../../assets/icons/logo.png";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='Navbar'>
      <span className='nav-logo'>
        <img src={logo} alt='close' width={100} height={30} />
      </span>
      <div className={`nav-items ${isOpen && "open"}`}>
        <a href='/about-us'> {t("header.heading.1")}</a>

        <a href='/courses'>{t("header.heading.2")}</a>

        <a>{t("header.heading.3")}</a>
        <a
          href='https://octahire.com/Resume_maker'
          target='_blank'
          rel='noreferrer'
        >
          {t("header.heading.4")}
        </a>
        <a>{t("header.heading.5")}</a>
        <a
          href='https://octahire.com/Home/candidate_register'
          target='_blank'
          rel='noreferrer'
        >
          {t("header.heading.6")}
        </a>
        <a href='/success-stories'>{t("header.heading.8")}</a>
        <span>
          <img src={globalSreach} alt='close' />
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

export default Navbar;
