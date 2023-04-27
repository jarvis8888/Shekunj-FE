import React, { useState } from "react";
import "./index.scss";
import fackbook from "../../assets/icons/svgs/facebook.png";
import twitter from "../../assets/icons/svgs/twitter.png";
import instagram from "../../assets/icons/svgs/instagram.png";
import linkedin from "../../assets/icons/svgs/linkedin.png";

function SocialMediaIcons() {
  const [facebookLikes, setFacebookLikes] = useState(0);
  const [twitterLikes, setTwitterLikes] = useState(0);
  const [instagramLikes, setInstagramLikes] = useState(0);
  const [youtubeLikes, setYoutubeLikes] = useState(0);

  return (
    <div className='SocialMediaIconscontainer'>
      <div
        className='likes'
        style={{ backgroundColor: "#305B94", borderRadius: "10px 0 0 10px" }}
      >
        <i className='fab fa-facebook-f'>
          <img src={fackbook} alt='facebook' />
        </i>
        <div style={{ color: "#fff" }}>{`${facebookLikes}`}</div>
        <div style={{ color: "#fff" }}> {`Likes`}</div>
      </div>
      <div className='likes' style={{ backgroundColor: "#49ABEC" }}>
        <i className='fab fa-twitter'>
          <img src={twitter} alt='facebook' />
        </i>
        <div style={{ color: "#fff" }}>{`${facebookLikes}`}</div>
        <div style={{ color: "#fff" }}>{`Likes`}</div>
      </div>
      <div className='likes' style={{ backgroundColor: "#305B94" }}>
        <i className='fab fa-instagram'>
          <img src={instagram} alt='facebook' />
        </i>
        <div style={{ color: "#fff" }}>{`${facebookLikes}`}</div>
        <div style={{ color: "#fff" }}>{`Likes`}</div>
      </div>
      <div
        className='likes'
        style={{ backgroundColor: "#E09B3D", borderRadius: "0 10px 10px 0 " }}
      >
        <i className='fab fa-youtube'>
          <img src={linkedin} alt='facebook' />
        </i>

        <div style={{ color: "#fff" }}>{`${facebookLikes}`}</div>
        <div style={{ color: "#fff" }}>{`Likes`}</div>
      </div>
    </div>
  );
}

export default SocialMediaIcons;
