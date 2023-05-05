import React, { memo } from "react";
import "./footer.scss";
import { CopyRight } from "./CopyRight";
import { SocialMedia } from "./SocialMedia";

export const TopFooter = memo(() => {
  return (
    <>
      <div className='wrapper'>
        <footer className='footer'>
          <div className="container">
            <div className="row">
              <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12'>
                <div className="sk-footer-menu">
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
                <div className="sk-footer-menu">
                  <h5>Popular Topics</h5>
                  <ul>
                    <li>
                      <a href='javascript:;'>Online Mock Test</a>
                    </li>
                    <li>
                      <a href='javascript:;'>Government Schemes</a>
                    </li>
                    <li>
                      <a href='javascript:;'>Certificate</a>
                    </li>
                    <li>
                      <a href='javascript:;'>Resume Builder</a>
                    </li>
                    <li>
                      <a href='javascript:;'>Guidance</a>
                    </li>
                    <li>
                      <a href='javascript:;'>Jobs</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12'>
                <div className="sk-footer-menu">
                  <h5>About SheKunjs</h5>
                  <ul>
                    <li>
                      <a href='javascript:;'>About Us</a>
                    </li>
                    <li>
                      <a href='javascript:;'>Success Story</a>
                    </li>
                    <li>
                      <a href='javascript:;'>Career</a>
                    </li>
                    <li>
                      <a href='javascript:;'>Blog</a>
                    </li>
                    <li>
                      <a href='javascript:;'>Events</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12'>
                <div className="sk-footer-menu">
                  <h5>Need Some Help?</h5>
                  <ul>
                    <li>
                      <a href='javascript:;'>Contact Us</a>
                    </li>
                    <li>
                      <a href='javascript:;'>FAQs</a>
                    </li>
                    <li>
                      <a href='javascript:;'>Help & Support</a>
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
