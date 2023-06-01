import React, { memo, useEffect, useState } from "react";
import "./footer.scss";
import { CopyRight } from "./CopyRight";
import { SocialMedia } from "./SocialMedia";
import httpServices from "../../utils/ApiServices";
import { apiConstants, routingConstants } from "../../utils/constants";
import { useHistory } from "react-router-dom";

export const TopFooter = memo(() => {
  const history = useHistory();

  const [courseLoader, setCourseLoader] = useState(false);
  const [data, setData] = useState([]);

  const allCourses = async () => {
    setCourseLoader(true);
    try {
      const data = await httpServices.get(
        `${apiConstants.COURSES.COURSE_LIST}?limit=50`,
      );
      setData(data?.results);
    } catch (error) {
      console.error(error);
    } finally {
      setCourseLoader(false);
    }
  };
  useEffect(() => {
    allCourses();
  }, []);

  return (
    <>
      <div className='wrapper'>
        <footer className='footer'>
          <div className='container'>
            <div className='row'>
              <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12'>
                <div className='sk-footer-menu'>
                  <h5>Free Courses</h5>
                  <ul>
                    {data?.length
                      ? data
                          .sort((a, b) => b.enrold - a.enrold)
                          .slice(0, 6)
                          .map((item, index) => (
                            <li key={item.id}>
                              <a
                                href={
                                  routingConstants.COURSE_DETAILS + item?.id
                                }
                              >
                                {item.name.length > 20
                                  ? item.name.substring(0, 20) + "..."
                                  : item.name}
                              </a>
                            </li>
                          ))
                      : null}
                  </ul>
                </div>
              </div>
              <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12'>
                <div className='sk-footer-menu'>
                  <h5>Popular Topics</h5>
                  <ul>
                    <li>
                      <a href='/mock-test/'>Online Mock Test</a>
                    </li>
                    <li>
                      <a href='/government-schemes-in-india'>
                        Government Schemes
                      </a>
                    </li>
                    <li>
                      <a href='/all-certificate-page/'>Certificate</a>
                    </li>
                    <li>
                      <a href='/resume'>Resume Builder</a>
                    </li>
                    <li>
                      <a href='/online-counselling/'>Guidance</a>
                    </li>
                    <li>
                      <a href='/jobs'>Jobs</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12'>
                <div className='sk-footer-menu'>
                  <h5>About SheKunjs</h5>
                  <ul>
                    <li>
                      <a href='/about-us'>About Us</a>
                    </li>
                    <li>
                      <a href='/success-stories'>Success Story</a>
                    </li>
                    <li>
                      <a href='/career-options'>Career</a>
                    </li>
                    <li>
                      <a href='/blogs'>Blog</a>
                    </li>
                    <li>
                      <a href='/event'>Events</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12'>
                <div className='sk-footer-menu'>
                  <h5>Need Some Help?</h5>
                  <ul>
                    <li>
                      <a href='javascript:;'>Contact Us</a>
                    </li>
                    <li>
                      <a href='/more-faq'>FAQs</a>
                    </li>
                    <li>
                      <a href='/more-faq'>Help & Support</a>
                    </li>
                    <li>
                      <a href='javascript:;'>Terms & Policy</a>
                    </li>
                    <li>
                      <a href='javascript:;'>Sitemap</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <SocialMedia />
        <CopyRight />
      </div>
    </>
  );
});
