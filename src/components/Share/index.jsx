import React, { useState } from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from "react-share";
import facebookicon from "../../assets/images/facebook.svg";
import linkedinicon from "../../assets/images/linkedin.svg";
import twittericon from "../../assets/images/twitter.svg";
import whatsappicon from "../../assets/images/whatsapp.svg";
import instagramicon from "../../assets/images/instagram.svg";
import toasterConfig from "../../utils/toasterCongig";
import { toast } from "react-toastify";

const SocialShare = ({ currentUrl, title, image }) => {
  const handleInstagramClick = () => {
    navigator.clipboard.writeText(currentUrl);
    toast.success("URL copied to clipboard!", toasterConfig);
    setTimeout(() => {
      window.open("https://www.instagram.com/", "_blank");
    }, 2000); // Delay in milliseconds (adjust as needed)
  };

  // Dynamically set the og:image meta tag
  React.useEffect(() => {
    const metaTag = document.querySelector('meta[property="og:image"]');
    if (metaTag) {
      metaTag.setAttribute("content", image);
    }
  }, [image]);

  return (
    <ul>
      <li>
        <FacebookShareButton url={currentUrl} quote={title} imageUrl={image}>
          <img src={facebookicon} alt='Facebook' />
        </FacebookShareButton>
      </li>
      <li>
        <LinkedinShareButton
          url={currentUrl}
          title={title}
          summary={title}
          imageUrl={image}
        >
          <img src={linkedinicon} alt='LinkedIn' />
        </LinkedinShareButton>
      </li>
      <li>
        <TwitterShareButton url={currentUrl} title={title} imageUrl={image}>
          <img src={twittericon} alt='Twitter' />
        </TwitterShareButton>
      </li>
      <li>
        <WhatsappShareButton url={currentUrl} title={title} separator=' - '>
          <img src={whatsappicon} alt='WhatsApp' />
        </WhatsappShareButton>
      </li>
      <li onClick={handleInstagramClick} style={{ cursor: "pointer" }}>
        <img src={instagramicon} alt='instagramicon' />
      </li>
    </ul>
  );
};

export default SocialShare;
