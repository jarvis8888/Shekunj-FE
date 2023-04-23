import React from "react";
import "./footer.scss";
import logo from "../../assets/images/whitelogo.svg";
import twitter1 from "../../assets/images/twitter1.png";
import facebook from "../../assets/images/facebook.png";
import youTube from "../../assets/images/youTube.png";
import linkedinlogo from "../../assets/images/linkedinlogo.png";
import instagram from "../../assets/images/instagram.png";

export const SocialMedia = () => {
  return (
    <div className='socialMedia'>
      <div>
        <div class='logo'>
          <img src={logo} alt='Company Logo' />
        </div>
        <div class='social-media'>
          <a href='#'>
            <i class='fa fa-facebook'>
              <img
                className='img'
                src={facebook}
                alt='twitter1'
                width={34}
                height={34}
              />
            </i>
          </a>
          <a href='#'>
            <i class='fa fa-twitter'>
              {" "}
              <img
                className='img'
                src={linkedinlogo}
                alt='twitter1'
                width={34}
                height={34}
              />
            </i>
          </a>
          <a href='#'>
            <i class='fa fa-instagram'>
              {" "}
              <img
                className='img'
                src={twitter1}
                alt='twitter1'
                width={34}
                height={34}
              />
            </i>
          </a>
          <a href='#'>
            <i class='fa fa-instagram'>
              {" "}
              <img
                className='img'
                src={instagram}
                alt='twitter1'
                width={34}
                height={34}
              />
            </i>
          </a>
          <a href='#'>
            <i class='fa fa-instagram'>
              {" "}
              <img
                className='img'
                src={youTube}
                alt='twitter1'
                width={34}
                height={34}
              />
            </i>
          </a>
        </div>
      </div>
      <div>
        <div style={{ color: "#fff" }}>For Information</div>
        <div style={{ color: "#d3317d" }}>info@shekunj.com</div>
      </div>
      <div>
        <div style={{ color: "#fff" }}>For Information</div>
        <div style={{ color: "#d3317d" }}>info@shekunj.com</div>
      </div>
    </div>
  );
};
