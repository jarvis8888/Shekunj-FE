import React from "react";
import cardimg3 from '../../assets/images/card-img3.jpg';
import cardimg2 from '../../assets/images/card-img2.jpg';
import cardimg1 from '../../assets/images/card-img1.jpg';
import cardimg0 from '../../assets/images/card-img1.jpg';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


export const GlobalSearchCard = () => {
  return (
  <section className="sk-card-sec">
    <div className="container">
      <div className="sk-category">
        <ul>
          <li><a href="javascript:;">Success Story</a></li>
          <li><a href="javascript:;">Hindi</a></li>
          <li><a href="javascript:;">News</a></li>
          <li><a href="javascript:;">Blog</a></li>
          <li><a href="javascript:;">Courses</a></li>
          <li><a href="javascript:;">Mock Test</a></li>
          <li><a href="javascript:;">Certifications</a></li>
        </ul>
      </div>
      <div className="row">
        <div className="col-md-3">
          <div className="sk-card-box">
            <div className="sk-card-img">
              <img src={cardimg3} />
            </div>
            <div className="sk-content-card">
              <div className="sk-week-time">
                <span><AccessTimeIcon/> 1 Week Ago</span>
              </div>
              <h6 className="sk-card-heading">Top 10 Technology Trends That You Can Learn in 2023</h6>
              <p className="sk-card-description">Lorem Ipsum has been the industry's standard dummy text ever since the</p>
              <div className="sk-tags"><span>Success Story</span></div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="sk-card-box">
            <div className="sk-card-img">
              <img src={cardimg2} />
            </div>
            <div className="sk-content-card">
              <div className="sk-week-time">
                <span><AccessTimeIcon/> 1 Week Ago</span>
              </div>
              <h6 className="sk-card-heading">Basic of Interview</h6>
              <p className="sk-card-description">Lorem Ipsum has been the industry's standard dummy text ever since the</p>
              <div className="sk-tags"><span>Blog</span></div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="sk-card-box">
            <div className="sk-card-img">
              <img src={cardimg1} />
            </div>
            <div className="sk-content-card">
              <div className="sk-week-time">
                <span><AccessTimeIcon/> 1 Week Ago</span>
              </div>
              <h6 className="sk-card-heading">Government </h6>
              <p className="sk-card-description">Lorem Ipsum has been the industry's standard dummy text ever since the</p>
              <div className="sk-time-education">
                <ul>
                  <li> <AccessTimeIcon/> <span>6.10 hrs</span> </li>
                  <li> <SchoolRoundedIcon/> 282,55 enrolled </li>
                </ul>
              </div>
              <div className="sk-tags"><span>Courses</span></div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="sk-card-box">
            <div className="sk-card-img">
              <img src={cardimg0} />
            </div>
            <div className="sk-content-card">
              <div className="sk-week-time">
                <span><AccessTimeIcon/> 1 Week Ago</span>
              </div>
              <h6 className="sk-card-heading">Top 10 Technology Trends That You Can Learn in 2023</h6>
              <p className="sk-card-description">Lorem Ipsum has been the industry's standard dummy text ever since the</p>
              <div className="sk-tags"><span>Mock Test</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
  ;
};
