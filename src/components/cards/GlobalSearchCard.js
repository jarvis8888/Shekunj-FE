import React, { useState } from "react";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { truncateString } from "../../utils/utils";

export const GlobalSearchCard = (props) => {
  const {
    SuccessStoriesData = [],
    BlogData = [],
    CousesData = [],
    MockTestData = [],
    loading,
    setActiveTab,
  } = props;
  const data = ["Success Story", "Blog", "Courses", "Mock Test"];

  const makeHtml = (htmlString) => {
    const htmlNode = document.createElement("div");
    htmlNode.innerHTML = htmlString;
    htmlNode.querySelectorAll("*").forEach(function (node) {
      node.removeAttribute("style");
    });
    return htmlNode.innerHTML;
  };

  return (
    <section className='sk-card-sec'>
      <div className='container'>
        <div className='sk-category'>
          <ul>
            {data.map((items) => {
              return (
                <li key={items}>
                  <a onClick={() => setActiveTab(items)}>{items}</a>
                </li>
              );
            })}
          </ul>
        </div>
        {loading ? (
          "Loading...."
        ) : (
          <div className='row'>
            {SuccessStoriesData.length ||
            BlogData.length ||
            CousesData.length ||
            MockTestData.length ? (
              <>
                {SuccessStoriesData &&
                  SuccessStoriesData.map((items, index) => {
                    return (
                      <>
                        <div className='col-md-3' key={index}>
                          <div className='sk-card-box'>
                            <div className='sk-card-img'>
                              <img src={items.image} alt='successStories' />
                            </div>
                            <div className='sk-content-card'>
                              <div className='sk-week-time'>
                                <span>
                                  <AccessTimeIcon /> {items.created_at}
                                </span>
                              </div>
                              <h6 className='sk-card-heading'>{items.title}</h6>
                              <div
                                className='sk-card-description'
                                dangerouslySetInnerHTML={{
                                  __html: makeHtml(
                                    `${truncateString(items.description, 100)}`,
                                  ),
                                }}
                              />
                              <div className='sk-tags'>
                                <span>Success Story</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}

                {BlogData &&
                  BlogData.map((items, index) => {
                    return (
                      <>
                        <div className='col-md-3' key={index}>
                          <div className='sk-card-box'>
                            <div className='sk-card-img'>
                              <img src={items.image} alt='blog' />
                            </div>
                            <div className='sk-content-card'>
                              <div className='sk-week-time'>
                                <span>
                                  <AccessTimeIcon /> {items.created_at}
                                </span>
                              </div>
                              <h6 className='sk-card-heading'>{items.title}</h6>
                              <div
                                className='sk-card-description'
                                dangerouslySetInnerHTML={{
                                  __html: makeHtml(
                                    `${truncateString(items.about_blog, 100)}`,
                                  ),
                                }}
                              />
                              <div className='sk-tags'>
                                <span>Blog</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                {CousesData &&
                  CousesData?.map((items, index) => {
                    return (
                      <>
                        <div className='col-md-3'>
                          <div className='sk-card-box'>
                            <div className='sk-card-img'>
                              <img src={items.image} alt='couses' />
                            </div>
                            <div className='sk-content-card'>
                              <div className='sk-week-time'>
                                <span>
                                  <AccessTimeIcon /> 1 Week Ago
                                </span>
                              </div>
                              <h6 className='sk-card-heading'>{items.name} </h6>
                              <div
                                className='sk-card-description'
                                dangerouslySetInnerHTML={{
                                  __html: makeHtml(
                                    `${truncateString(items.description, 100)}`,
                                  ),
                                }}
                              />
                              <div className='sk-time-education'>
                                <ul>
                                  <li>
                                    {" "}
                                    <AccessTimeIcon /> <span>
                                      6.10 hrs
                                    </span>{" "}
                                  </li>
                                  <li>
                                    {" "}
                                    <SchoolRoundedIcon /> 282,55 enrolled{" "}
                                  </li>
                                </ul>
                              </div>
                              <div className='sk-tags'>
                                <span>Courses</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                {MockTestData &&
                  MockTestData.map((items, index) => {
                    return (
                      <>
                        <div className='col-md-3'>
                          <div className='sk-card-box'>
                            <div className='sk-card-img'>
                              <img src={items.image} alt='mockTest' />
                            </div>
                            <div className='sk-content-card'>
                              <div className='sk-week-time'>
                                <span>
                                  <AccessTimeIcon /> 1 Week Ago
                                </span>
                              </div>
                              <h6 className='sk-card-heading'>{items.name}</h6>
                              <p className='sk-card-description'>
                                Lorem Ipsum has been the industry's standard
                                dummy text ever since the
                              </p>
                              <div className='sk-tags'>
                                <span>Mock Test</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </>
            ) : (
              "Based on your search no results found"
            )}
          </div>
        )}
      </div>
    </section>
  );
};
