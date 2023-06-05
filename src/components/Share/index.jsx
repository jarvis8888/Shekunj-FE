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
import { Helmet } from "react-helmet-async";
import SEO from "../SEO";

const SocialShare = ({ currentUrl, title, image }) => {
  const handleInstagramClick = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(currentUrl)
        .then(() => {
          toast.success("URL copied to clipboard!", toasterConfig);
          setTimeout(() => {
            window.open("https://www.instagram.com/", "_blank");
          }, 2000); // Delay in milliseconds (adjust as needed)
        })
        .catch((error) => {
          console.error("Failed to copy URL to clipboard:", error);
        });
    } else if (
      document.queryCommandSupported &&
      document.queryCommandSupported("copy")
    ) {
      const textArea = document.createElement("textarea");
      textArea.value = currentUrl;
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand("copy");
        const message = successful
          ? "URL copied to clipboard!"
          : "Unable to copy URL to clipboard.";
        toast.success(message, toasterConfig);
        setTimeout(() => {
          window.open("https://www.instagram.com/", "_blank");
        }, 2000); // Delay in milliseconds (adjust as needed)
      } catch (error) {
        console.error("Failed to copy URL to clipboard:", error);
      }

      document.body.removeChild(textArea);
    } else {
      console.error(
        "Clipboard writeText and execCommand functions are not supported in this browser.",
      );
    }
  };

  // Dynamically set the og:image meta tag
  // React.useEffect(() => {
  //   const metaTag = document.querySelector('meta[property="og:image"]');
  //   if (metaTag) {
  //     metaTag.setAttribute("content", image);
  //   }
  // }, [image]);

  return (
    <>
      <SEO
        title={title}
        keyword='women empowerment organizations, free online courses in india, free career guidance'
        description='Shekunj.com works for women empowerment by providing free online certification courses, 
          career guidance, job and internship opportunities across India.'
        currentUrl={currentUrl}
        image={image}
      />
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
    </>
  );
};

export default SocialShare;
