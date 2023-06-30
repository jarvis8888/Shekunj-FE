import React, { useEffect, useState } from "react";
import "./index.scss";
import fackbook from "../../assets/images/facebooksideicon.svg";
import twitter from "../../assets/images/twittersideicon.svg";
import instagram from "../../assets/images/Instagramsideicon.svg";
import linkedin from "../../assets/images/linkedinsideicon.svg";
import httpServices from "../../utils/ApiServices";

const SocialMediaIcons = React.memo(() => {
  const [data, setData] = useState();

  const socialMediaData = async () => {
    try {
      const url = "/more/social_likes";
      const response = await httpServices.get(url);

      if (response.status_code === 200) {
        const { data } = response;
        if (Array.isArray(data) && data.length > 0) {
          setData(data[0]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    socialMediaData();
  }, []);

  return (
    <div className='SocialMediaIconscontainer'>
      <div
        className='likes'
        style={{ backgroundColor: "#305B94", borderRadius: "4px 0 0 4px" }}
        onClick={() => {
          window.open(data?.facebook_link, "_blank");
        }}
      >
        <i className='fab fa-facebook-f'>
          <img src={fackbook} alt='facebook' />
        </i>
        <div style={{ color: "#fff" }}>{data?.facebook}</div>
        <div style={{ color: "#fff", fontSize: "12px" }}>
          {data?.facebook_content}
        </div>
      </div>
      <div
        className='likes'
        style={{ backgroundColor: "#49ABEC" }}
        onClick={() => {
          window.open(data?.twitter_link, "_blank");
        }}
      >
        <i className='fab fa-twitter'>
          <img src={twitter} alt='twitter' />
        </i>
        <div style={{ color: "#fff" }}>{data?.twitter}</div>
        <div style={{ color: "#fff", fontSize: "12px" }}>
          {data?.twitter_content}
        </div>
      </div>
      <div
        className='likes'
        style={{ backgroundColor: "#2867B2" }}
        onClick={() => {
          window.open(data?.linkedin_link, "_blank");
        }}
      >
        <i className='fab fa-youtube'>
          <img src={linkedin} alt='youtube' />
        </i>
        <div style={{ color: "#fff" }}>{data?.linkedin}</div>
        <div style={{ color: "#fff", fontSize: "12px" }}>
          {data?.facebook_content}
        </div>
      </div>
      <div
        className='likes sk-instagram'
        style={{ backgroundColor: "#305B94", borderRadius: "0 4px 4px 0" }}
        onClick={() => {
          window.open(data?.insta_link, "_blank");
        }}
      >
        <i className='fab fa-instagram'>
          <img src={instagram} alt='instagram' />
        </i>
        <div style={{ color: "#fff" }}>{data?.insta}</div>
        <div style={{ color: "#fff", fontSize: "12px" }}>
          {data?.insta_content}
        </div>
      </div>
    </div>
  );
});

export default SocialMediaIcons;
