import React from "react";
import "./index.scss";
import "../Search/index.scss";
import { withHeaderFooter } from "../../hocs/withHeaderFooter";

const index = () => {
  return <div>
    <section className="sk-search-sec">
      <div className="container sk-custom-container">
        <div className="row">
          <div className="col-xl-10 mx-auto">
            <div className="sk-content-sec">
              <div className="sk-title-heading mb-4">
                <h1>Inspiring Stories of <span>Women</span></h1>
                <p>Success stories at SheKunj focus on sharing captivating stories of inspiring women, encompassing diverse roles, including homemakers, athletes, leaders, artists, activists, professionals, and entrepreneurs, aiming to uplift and motivate individuals from all walks of life.</p>
              </div>
              <div class="sk-category mb-0">
                <ul>
                  <li><a href="javascript:;" class="active-time">#All</a></li>
                  <li><a href="javascript:;">#Success Story</a></li>
                  <li><a href="javascript:;">#Article</a></li>
                  <li><a href="javascript:;">#Courses</a></li>
                  <li><a href="javascript:;">#Mock Test</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div className="container">
        <div className="row">
          
        </div>
      </div>
    </section>
  </div>;
};

export default withHeaderFooter(index);
