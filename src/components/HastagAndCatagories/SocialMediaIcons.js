import React, { useState } from "react";
import "./index.scss";
import fackbook from "../../assets/images/facebooksideicon.svg";
import twitter from "../../assets/images/twittersideicon.svg";
import instagram from "../../assets/images/Instagramsideicon.svg";
import linkedin from "../../assets/images/linkedinsideicon.svg";

function SocialMediaIcons() {
  const [facebookLikes, setFacebookLikes] = useState(0);
  const [twitterLikes, setTwitterLikes] = useState(0);
  const [instagramLikes, setInstagramLikes] = useState(0);
  const [youtubeLikes, setYoutubeLikes] = useState(0);

  return (
    <div className='SocialMediaIconscontainer'>
      <div
        className='likes'
        style={{ backgroundColor: "#305B94", borderRadius: "4px 0 0 4px" }}
      >
        <i className='fab fa-facebook-f'>
          <img src={fackbook} alt='facebook' />
        </i>
        <div style={{ color: "#fff" }}>{`${facebookLikes}`}</div>
        <div style={{ color: "#fff", fontSize: "12px" }}> {`Likes`}</div>
      </div>
      <div className='likes' style={{ backgroundColor: "#49ABEC" }}>

        <i className='fab fa-twitter'>
          <img src={twitter} alt='twitter' />
        </i>
        <div style={{ color: "#fff" }}>{`${facebookLikes}`}</div>
        <div style={{ color: "#fff", fontSize: "12px" }}>{`Likes`}</div>
      </div>
      <div
        className='likes'
        style={{ backgroundColor: "#2867B2"}}

      >
        <i className='fab fa-youtube'>
          <img src={linkedin} alt='youtube' />
        </i>

        <div style={{ color: "#fff" }}>{`${facebookLikes}`}</div>
        <div style={{ color: "#fff", fontSize: "12px" }}>{`Likes`}</div>
      </div>
      <div className='likes sk-instagram' style={{ backgroundColor: "#305B94", borderRadius: "0 4px 4px 0"}}>
        <i className='fab fa-instagram'>
          <img src={instagram} alt='instagram' />
        </i>
        <div style={{ color: "#fff" }}>{`${facebookLikes}`}</div>
        <div style={{ color: "#fff", fontSize: "12px" }}>{`Likes`}</div>
      </div>
    </div>
  );
}

export default SocialMediaIcons;
