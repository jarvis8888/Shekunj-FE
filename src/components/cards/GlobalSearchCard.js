import React from "react";
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
  } = props;
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
            <li>
              <a href='javascript:;'>Success Story</a>
            </li>
            <li>
              <a href='javascript:;'>Hindi</a>
            </li>
            <li>
              <a href='javascript:;'>News</a>
            </li>
            <li>
              <a href='javascript:;'>Blog</a>
            </li>
            <li>
              <a href='javascript:;'>Courses</a>
            </li>
            <li>
              <a href='javascript:;'>Mock Test</a>
            </li>
            <li>
              <a href='javascript:;'>Certifications</a>
            </li>
          </ul>
        </div>
        {loading ? (
          "Loading...."
        ) : (
          <div className='row'>
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
                                <AccessTimeIcon /> <span>6.10 hrs</span>{" "}
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
                            Lorem Ipsum has been the industry's standard dummy
                            text ever since the
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
          </div>
        )}
      </div>
    </section>
  );
};
