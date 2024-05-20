import React, { memo, useEffect, useState } from "react";
import "./footer.scss";
import { CopyRight } from "./CopyRight";
import { SocialMedia } from "./SocialMedia";
import httpServices from "../../utils/ApiServices";
import { apiConstants, routingConstants } from "../../utils/constants";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const TopFooter = memo((props) => {
  const history = useHistory();
  const { t } = useTranslation();
  const [courseLoader, setCourseLoader] = useState(false);
  const [data, setData] = useState([]);
  console.log("🚀 ~ TopFooter ~ data:", data);

  const allCourses = async () => {
    setCourseLoader(true);
    try {
      const data = await httpServices.get(
        `${apiConstants.COURSES.CATEGORY_LIST}?limit=50`,
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
          <div
            className={`container ${
              props.newDesign ? "sk-custom-container" : ""
            }`}
          >
            <div className='row'>
              <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12'>
                <div className='sk-footer-menu'>
                  <h5>{t("phase2.FOOTER.Free_Courses")}</h5>
                  <ul>
                    {data?.length
                      ? data.map((item, index) => (
                          <li key={item.id}>
                            <a href={routingConstants.COURSES}>
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
                  <h5>{t("phase2.FOOTER.Popular_Topics")}</h5>
                  <ul>
                    <li>
                      <a href='/government-schemes-in-india'>
                        {t("phase2.FOOTER.Government_Schemes")}
                      </a>
                    </li>
                    <li>
                      <a href='/mock-test/'>
                        {t("phase2.FOOTER.Online_Mock_Test")}
                      </a>
                    </li>
                    <li>
                      <a href='/success-stories'>{t("header.heading.8")}</a>
                    </li>
                    <li>
                      <a href='/resume-builder'>{t("header.heading.4")}</a>
                    </li>
                    <li>
                      <a href='/contact-us'>Advertisement</a>
                    </li>
                    <li>
                      <a href='/top-colleges-in-india/'>Top Colleges</a>
                    </li>
                    <li>
                      <a href='/top-schools-in-india/'>Top Schools</a>
                    </li>
                    <li>
                      <a href='/career-options/'>
                        {t("headerComponent.menuItem.5")}
                      </a>
                    </li>
                    <li>
                      <a href='/online-counselling/'>
                        {t("phase2.FOOTER.Guidance")}
                      </a>
                    </li>
                    <li>
                      <a href='/all-certificate-page/'>
                        {" "}
                        {t("phase2.FOOTER.Certificate")}
                      </a>
                    </li>
                    <li>
                      <a href='/events/all'> {t("phase2.HEADER.events")}</a>
                    </li>
                    <li>
                      <a href='/article'>{t("phase2.HEADER.blog")}</a>
                    </li>
                    <li>
                      <a href='/jobs'>{t("header.heading.6")}</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12'>
                <div className='sk-footer-menu'>
                  <h5>{t("phase2.FOOTER.About_SheKunjs")}</h5>
                  <ul>
                    <li>
                      <a href='/about-us'> {t("header.heading.1")}</a>
                    </li>
                    <li>
                      <a href='/contact-us'>{t("phase2.FOOTER.Contact_Us")}</a>
                    </li>
                    {/* <li>
                      <a href='/success-stories'>{t("header.heading.8")}</a>
                    </li>
                    <li>
                      <a href='/career-options'>{t("header.heading.5")}</a>
                    </li>
                    <li>
                      <a href='/article'>{t("phase2.HEADER.blog")}</a>
                    </li>
                    <li>
                      <a href='/events/all'>{t("phase2.HEADER.events")}</a>
                    </li> */}
                  </ul>
                </div>
              </div>
              <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12'>
                <div className='sk-footer-menu'>
                  <h5>{t("phase2.FOOTER.Need_Some_Help?")}</h5>
                  <ul>
                    {/* <li>
                      <a href='/contact-us'>{t("phase2.FOOTER.Contact_Us")}</a>
                    </li> */}
                    <li>
                      <a href='/frequently-asked-questions'>
                        {t("phase2.FOOTER.Help_Support")}
                      </a>
                    </li>
                    <li>
                      <a href='/privacy-policy'>
                        {t("phase2.FOOTER.Terms_Policy")}
                      </a>
                    </li>
                    <li>
                      <a href='/sitemap.xml' target='_blank'>
                        {t("phase2.FOOTER.Sitemap")}
                      </a>
                    </li>
                    <li>
                      <a href='/frequently-asked-questions'>
                        {t("phase2.HEADER.FAQ")}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <SocialMedia newDesign={props.newDesign} />
        <CopyRight />
      </div>
    </>
  );
});
