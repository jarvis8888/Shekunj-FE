import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "India's Leading Women Empowerment Organization - Shekunj.com",
  description = `'Shekunj.com works on women
empowerment and skill development by
providing free training, job-oriented courses,
jobs & internships and career counseling.'`,
  image = "https://shekunj.s3.amazonaws.com/media/success_story_images/shekunj192.png",
  keywords = "women empowerment organizations, free online courses in india, free career guidance",
  link,
  currentUrl,
}) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta
          prefix='og: http://ogp.me/ns#'
          property='og:image'
          content={image}
        />

        <meta property='og:title' content={title} />
        <meta property='og:image' content={image} />
        <meta name='description' content={description} />
        <meta name='msapplication-TileImage' content={image} />
        <meta property='og:keywords' content={keywords} />
        <meta name='keywords' content={keywords} />
        <link rel='canonical' href={link} />
        <meta property='og:image:width' content='300' />
        <meta property='og:image:height' content='300' />

        {/* <!-- Open Graph Meta Tags --> */}
        <meta property='og:description' content={description} />

        <meta property='og:url' content={currentUrl} />
        <meta property='og:type' content='website' />

        {/* <!-- Twitter Card Meta Tags --> */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={description} />
        <meta name='twitter:image' content={image} />
      </Helmet>
    </>
  );
};

export default SEO;
