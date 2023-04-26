import React, { useState } from "react";

function SocialMediaIcons() {
  const [facebookLikes, setFacebookLikes] = useState(0);
  const [twitterLikes, setTwitterLikes] = useState(0);
  const [instagramLikes, setInstagramLikes] = useState(0);
  const [youtubeLikes, setYoutubeLikes] = useState(0);

  const handleFacebookLike = () => {
    setFacebookLikes(facebookLikes + 1);
  };

  const handleTwitterLike = () => {
    setTwitterLikes(twitterLikes + 1);
  };

  const handleInstagramLike = () => {
    setInstagramLikes(instagramLikes + 1);
  };

  const handleYoutubeLike = () => {
    setYoutubeLikes(youtubeLikes + 1);
  };

  const socialMediaStyles = {
    textAlign: "center",
    fontSize: "24px",
    lineHeight: "150px",
    cursor: "pointer",
  };

  const facebookStyles = {
    ...socialMediaStyles,
    backgroundColor: "#305B94",
    color: "white",
  };

  const twitterStyles = {
    ...socialMediaStyles,
    backgroundColor: "#49ABEC",
    color: "white",
  };

  const instagramStyles = {
    ...socialMediaStyles,
    backgroundColor: "#2867B2",
    color: "white",
  };

  const youtubeStyles = {
    ...socialMediaStyles,
    backgroundColor: "#7024C4",
    color: "white",
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        borderRadius: "20px",
        padding: "10px 0",
      }}
    >
      <div style={facebookStyles} onClick={handleFacebookLike}>
        <i className='fab fa-facebook-f'></i>
        <div>{`${facebookLikes} Likes`}</div>
      </div>
      <div style={twitterStyles} onClick={handleTwitterLike}>
        <i className='fab fa-twitter'></i>
        <div>{`${twitterLikes} Likes`}</div>
      </div>
      <div style={instagramStyles} onClick={handleInstagramLike}>
        <i className='fab fa-instagram'></i>
        <div>{`${instagramLikes} Likes`}</div>
      </div>
      <div style={youtubeStyles} onClick={handleYoutubeLike}>
        <i className='fab fa-youtube'></i>
        <div>{`${youtubeLikes} Likes`}</div>
      </div>
    </div>
  );
}

export default SocialMediaIcons;
