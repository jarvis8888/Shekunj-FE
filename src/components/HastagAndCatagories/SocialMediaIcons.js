import React, { useEffect, useState } from "react";
import "./index.scss";
import fackbook from "../../assets/images/facebooksideicon.svg";
import twitter from "../../assets/images/twittersideicon.svg";
import instagram from "../../assets/images/Instagramsideicon.svg";
import linkedin from "../../assets/images/linkedinsideicon.svg";
import httpServices from "../../utils/ApiServices";

const SocialMediaIcons = React.memo(() => {
  const [facebookLikes, setFacebookLikes] = useState("");
  const [twitterLikes, setTwitterLikes] = useState("");
  const [instagramLikes, setInstagramLikes] = useState("");
  const [youtubeLikes, setYoutubeLikes] = useState("");

  const socialMediaData = async () => {
    try {
      const url = "/more/social_likes";
      const response = await httpServices.get(url);

      if (response.status_code === 200) {
        const { data } = response;
        if (Array.isArray(data) && data.length > 0) {
          const { facebook, linkedin, twitter, insta } = data[0];
          setFacebookLikes(facebook);
          setTwitterLikes(twitter);
          setInstagramLikes(insta);
          setYoutubeLikes(linkedin);
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
      >
        <i className='fab fa-facebook-f'>
          <img src={fackbook} alt='facebook' />
        </i>
        <div style={{ color: "#fff" }}>{facebookLikes}</div>
        <div style={{ color: "#fff", fontSize: "12px" }}>Likes</div>
      </div>
      <div className='likes' style={{ backgroundColor: "#49ABEC" }}>
        <i className='fab fa-twitter'>
          <img src={twitter} alt='twitter' />
        </i>
        <div style={{ color: "#fff" }}>{twitterLikes}</div>
        <div style={{ color: "#fff", fontSize: "12px" }}>Likes</div>
      </div>
      <div className='likes' style={{ backgroundColor: "#2867B2" }}>
        <i className='fab fa-youtube'>
          <img src={linkedin} alt='youtube' />
        </i>
        <div style={{ color: "#fff" }}>{youtubeLikes}</div>
        <div style={{ color: "#fff", fontSize: "12px" }}>Likes</div>
      </div>
      <div
        className='likes sk-instagram'
        style={{ backgroundColor: "#305B94", borderRadius: "0 4px 4px 0" }}
      >
        <i className='fab fa-instagram'>
          <img src={instagram} alt='instagram' />
        </i>
        <div style={{ color: "#fff" }}>{instagramLikes}</div>
        <div style={{ color: "#fff", fontSize: "12px" }}>Likes</div>
      </div>
    </div>
  );
});

export default SocialMediaIcons;
