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
  const icons = {
    facebook: facebookicon,
    linkedin: linkedinicon,
    twitter: twittericon,
    whatsapp: whatsappicon,
    instagram: instagramicon,
  };

  const handleInstagramClick = () => {
    navigator.clipboard.writeText(currentUrl);
    toast.success("URL copied to clipboard!", toasterConfig);
    setTimeout(() => {
      window.open("https://www.instagram.com/", "_blank");
    }, 2000); // Delay in milliseconds (adjust as needed)
  };

  const shareButtons = [
    {
      platform: "facebook",
      Button: FacebookShareButton,
      quote: title,
      imageUrl: image,
    },
    {
      platform: "linkedin",
      Button: LinkedinShareButton,
      url: currentUrl,
      title,
      imageUrl: image,
    },
    {
      platform: "twitter",
      Button: TwitterShareButton,
      url: currentUrl,
      title,
      imageUrl: image,
    },
    {
      platform: "whatsapp",
      Button: WhatsappShareButton,
      url: currentUrl,
      title,
      separator: " - ",
      imageUrl: image,
    },
    { platform: "instagram", Button: "button", onClick: handleInstagramClick },
  ];

  // Dynamically set the og:image meta tag
  React.useEffect(() => {
    const metaTag = document.querySelector('meta[property="og:image"]');
    if (metaTag) {
      metaTag.setAttribute("content", image);
    }
  }, [image]);

  return (
    <ul>
      {shareButtons.map(({ platform, Button, ...props }) => (
        <li key={platform}>
          {platform === "instagram" ? (
            <img
              src={icons[platform]}
              alt={platform}
              onClick={handleInstagramClick}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <Button {...props}>
              <img src={icons[platform]} alt={platform} />
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default SocialShare;
