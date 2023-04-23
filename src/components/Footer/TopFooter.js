import React, { memo } from "react";
import "./footer.scss";
import { CopyRight } from "./CopyRight";
import { SocialMedia } from "./SocialMedia";

export const TopFooter = memo(() => {
  return (
    <>
      <div className='wrapper'>
        <footer className='footer'>
          <div className='footer-section'>
            <h2 className='footer-heading'>Free Courses</h2>
            <ul>
              <li>
                <a href='#'>Information Technology</a>
              </li>
              <li>
                <a href='#'>Health</a>
              </li>
              <li>
                <a href='#'>Language</a>
              </li>
              <li>
                <a href='#'>Management</a>
              </li>
              <li>
                <a href='#'>Sales & Marketing</a>
              </li>
              <li>
                <a href='#'>Skill Based</a>
              </li>
            </ul>
          </div>
          <div className='footer-section'>
            <h2 className='footer-heading'>Popular Topics</h2>
            <ul>
              <li>
                <a href='#'>Online Mock Test</a>
              </li>
              <li>
                <a href='#'>Government Schemes</a>
              </li>
              <li>
                <a href='#'>Certificate</a>
              </li>
              <li>
                <a href='#'>Resume Builder</a>
              </li>
              <li>
                <a href='#'>Guidance</a>
              </li>
              <li>
                <a href='#'>Jobs</a>
              </li>
            </ul>
          </div>
          <div className='footer-section'>
            <h2 className='footer-heading'>About SheKunjs</h2>
            <ul>
              <li>
                <a href='#'>About Us</a>
              </li>
              <li>
                <a href='#'>Success Story</a>
              </li>
              <li>
                <a href='#'>Career</a>
              </li>
              <li>
                <a href='#'>Blog</a>
              </li>
              <li>
                <a href='#'>Events</a>
              </li>
            </ul>
          </div>
          <div className='footer-section'>
            <h2 className='footer-heading'>Need Some Help?</h2>
            <ul>
              <li>
                <a href='#'>Contact Us</a>
              </li>
              <li>
                <a href='#'>FAQs</a>
              </li>
              <li>
                <a href='#'>Help & Support</a>
              </li>
              <li>
                <a href='#'>Terms & Policy</a>
              </li>
              <li>
                <a href='#'>Sitemap</a>
              </li>
            </ul>
          </div>
        </footer>
        <hr className='footer-hr' />
        <SocialMedia />
        <hr className='footer-hr' />
        <CopyRight />
      </div>
    </>
  );
});
