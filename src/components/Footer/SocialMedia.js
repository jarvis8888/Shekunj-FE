import React from "react";
import "./footer.scss";
import logo from "../../assets/images/whitelogo.svg";
import facebookicon from "../../assets/images/facebook.svg";
import linkedinicon from "../../assets/images/linkedin.svg";
import twittericon from "../../assets/images/twitter.svg";
import pintresticon from "../../assets/images/pintrest.svg";
import instagramicon from "../../assets/images/instagram.svg";
import youtubeIcon from "../../assets/images/youtube.svg";
import instagram from "../../assets/images/instagram.png";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import { useTranslation } from "react-i18next";

export const SocialMedia = () => {
  const { t } = useTranslation();
  return (
    <section className='sk-socialMedia-sec'>
      <div className='container'>
        <div className='row align-items-center'>
          <div class='col-xl-6 col-md-4 col-sm-4'>
            <div className='sk-social-icon text-left'>
              <div className='sk-footerSpace-bottom'>
                <img src={logo} alt='Company Logo' />
              </div>
              <ul>
                <li>
                  <a
                    href='https://www.facebook.com/Shekunj-105073495386436'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <img src={facebookicon} alt='facebookicon' />
                  </a>
                </li>
                <li>
                  <a
                    href='https://in.linkedin.com/showcase/shekunjedu'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <img src={linkedinicon} alt='linkedinicon' />
                  </a>
                </li>
                <li>
                  <a
                    href='https://twitter.com/SheKunj_edu'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <img src={twittericon} alt='twittericon ' />
                  </a>
                </li>

                <li>
                  <a
                    href='https://in.linkedin.com/showcase/shekunjedu'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <img src={instagramicon} alt='instagramicon' />
                  </a>
                </li>
                <li>
                  <a
                    href='https://www.youtube.com/@shekunj_edu'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <img src={youtubeIcon} alt='youtubeIcon' />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='col-xl-3 col-md-4 col-sm-4'>
            <div className='sk-footer-menu'>
              <h5> {t("phase2.FOOTER.For_Information")}</h5>
              <p>
                <a href='mailto:info@shekunj.com'>
                  <MailOutlineRoundedIcon /> info@shekunj.com
                </a>{" "}
              </p>
            </div>
          </div>
          <div className='col-xl-3 col-md-4 col-sm-4'>
            <div className='sk-footer-menu'>
              <h5> {t("phase2.FOOTER.For_Support")}</h5>
              <p>
                <a href='mailto:support@shekunj.com'>
                  <MailOutlineRoundedIcon /> support@shekunj.com
                </a>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
