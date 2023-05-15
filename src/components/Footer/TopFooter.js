import React, { memo } from "react";
import "./footer.scss";
import { CopyRight } from "./CopyRight";
import { SocialMedia } from "./SocialMedia";

export const TopFooter = memo(() => {
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
                    <li>
                      <a href='javascript:;'>Information Technology</a>
                    </li>
                    <li>
                      <a href='javascript:;'>Health</a>
                    </li>
                    <li>
                      <a href='javascript:;'>Language</a>
                    </li>
                    <li>
                      <a href='javascript:;'>Management</a>
                    </li>
                    <li>
                      <a href='javascript:;'>Sales & Marketing</a>
                    </li>
                    <li>
                      <a href='javascript:;'>Skill Based</a>
                    </li>
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
                      <a href='javascript:;'>Certificate</a>
                    </li>
                    <li>
                      <a
                        href='https://octahire.com/Resume_maker'
                        target='_blank'
                        rel='noreferrer'
                      >
                        Resume Builder
                      </a>
                    </li>
                    <li>
                      <a href='javascript:;'>Guidance</a>
                    </li>
                    <li>
                      <a
                        href='https://octahire.com/Home/candidate_register'
                        target='_blank'
                        rel='noreferrer'
                      >
                        Jobs
                      </a>
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
