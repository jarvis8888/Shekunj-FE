import React from "react";
import "./footer.scss";
import logo from "../../assets/images/whitelogo.svg";
import facebookicon from "../../assets/images/facebook.svg";
import linkedinicon from "../../assets/images/linkedin.svg";
import twittericon from "../../assets/images/twitter.svg";
import pintresticon from "../../assets/images/pintrest.svg";
import instagramicon from "../../assets/images/instagram.svg";
import instagram from "../../assets/images/instagram.png";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";

export const SocialMedia = () => {
  return (
    <section className='sk-socialMedia-sec'>
      <div className='container'>
        <div className='row align-items-center'>
          <div class='col-xl-6 col-md-4 col-sm-4'>
            <div className='sk-social-icon text-left'>
              <div className='mb-3'>
                <img src={logo} alt='Company Logo' />
              </div>
              <ul>
                <li>
                  <a
                    href='https://www.facebook.com/SheKunj/'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <img src={facebookicon} alt='facebookicon' />
                  </a>
                </li>
                <li>
                  <a
                    href='https://www.linkedin.com/showcase/shekunjedu/'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <img src={linkedinicon} />
                  </a>
                </li>
                <li>
                  <a
                    href='https://twitter.com/SheKunj_edu?s=20'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <img src={twittericon} />
                  </a>
                </li>
                <li>
                  <a href='javascript:;'>
                    <img src={pintresticon} />
                  </a>
                </li>
                <li>
                  <a
                    href='https://www.instagram.com/shekunj_edu/?hl=en'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <img src={instagramicon} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='col-xl-3 col-md-4 col-sm-4'>
            <div className='sk-footer-menu'>
              <h5>For Information</h5>
              <p>
                <a href='mailto:info@shekunj.com'>
                  <MailOutlineRoundedIcon /> info@shekunj.com
                </a>{" "}
              </p>
            </div>
          </div>
          <div className='col-xl-3 col-md-4 col-sm-4'>
            <div className='sk-footer-menu'>
              <h5>For Support</h5>
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
