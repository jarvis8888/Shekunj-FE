import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({
  title,
  description = `'Shekunj.com works on women
empowerment and skill development by
providing free training, job-oriented courses,
jobs & internships and career counseling.'`,
  image,
  keywords,
  link,
  currentUrl,
}) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta property='og:title' content={title} />
        <meta property='og:image' content={image} />
        <meta property='og:description' content={description} />
        {/* <meta property='og:url' content={image} /> */}
        <meta property='og:keywords' content={keywords} />
        <meta name='keywords' content={keywords} />
        <link rel='canonical' href={link} />

        {/* <!-- Open Graph Meta Tags --> */}
        <meta property='og:description' content={description} />

        <meta property='og:url' content={currentUrl} />
        <meta property='og:type' content='website' />

        {/* <!-- Twitter Card Meta Tags --> */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={description} />
        <meta name='twitter:image' content={image} />
        <link rel="canonical" href={link} data-rh="true" />
      </Helmet>
    </>
  );
};

export default SEO;
