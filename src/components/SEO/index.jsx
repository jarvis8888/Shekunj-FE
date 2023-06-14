import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, image, keywords, link, currentUrl }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta property='og:title' content={title} />
        <meta property='og:image' content={image} />
        <meta
          property='og:description'
          content='Shekunj.com works on women
      empowerment and skill development by
      providing free training, job-oriented courses,
      jobs & internships and career counseling.'
        />
        {/* <meta property='og:url' content={image} /> */}
        <meta property='og:keywords' content={keywords} />
        <meta name='keywords' content={keywords} />
        <link rel='canonical' href={link} />
        <meta property='og:image' content={image} />

        {/* <!-- Open Graph Meta Tags --> */}
        <meta
          property='og:title'
          content={
            "India's Leading Women Empowerment Organization - Shekunj.com"
          }
        />
        <meta
          property='og:description'
          content='Shekunj.com works on women
      empowerment and skill development by
      providing free training, job-oriented courses,
      jobs & internships and career counseling.'
        />
        <meta property='og:image' content={image} />
        <meta property='og:url' content={currentUrl} />
        <meta property='og:type' content='website' />

        {/* <!-- Twitter Card Meta Tags --> */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={title} />
        <meta
          name='twitter:description'
          content='Shekunj.com works on women
      empowerment and skill development by
      providing free training, job-oriented courses,
      jobs & internships and career counseling.'
        />
        <meta name='twitter:image' content={image} />
      </Helmet>
    </>
  );
};

export default SEO;
