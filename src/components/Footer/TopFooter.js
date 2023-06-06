import React, { memo, useEffect, useState } from "react";
import "./footer.scss";
import { CopyRight } from "./CopyRight";
import { SocialMedia } from "./SocialMedia";
import httpServices from "../../utils/ApiServices";
import { apiConstants, routingConstants } from "../../utils/constants";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const TopFooter = memo(() => {
  const history = useHistory();
  const { t } = useTranslation();
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
                  <h5>{t("phase2.FOOTER.Free_Courses")}</h5>
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
                  <h5>{t("phase2.FOOTER.Popular_Topics")}</h5>
                  <ul>
                    <li>
                      <a href='/mock-test/'>
                        {t("phase2.FOOTER.Online_Mock_Test")}
                      </a>
                    </li>
                    <li>
                      <a href='/government-schemes-in-india'>
                        {t("phase2.FOOTER.Government_Schemes")}
                      </a>
                    </li>
                    <li>
                      <a href='/all-certificate-page/'>
                        {" "}
                        {t("phase2.FOOTER.Certificate")}
                      </a>
                    </li>
                    <li>
                      <a href='/resume'>{t("phase2.FOOTER.Resume_Builder")}</a>
                    </li>
                    <li>
                      <a href='/online-counselling/'>
                        {t("phase2.FOOTER.Guidance")}
                      </a>
                    </li>
                    <li>
                      <a href='/jobs'>{t("phase2.FOOTER.Jobs")}</a>
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
                      <a href='/success-stories'>{t("header.heading.8")}</a>
                    </li>
                    <li>
                      <a href='/career-options'>{t("header.heading.5")}</a>
                    </li>
                    <li>
                      <a href='/blogs'>{t("phase2.HEADER.blog")}</a>
                    </li>
                    <li>
                      <a href='/event'>{t("phase2.HEADER.events")}</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12'>
                <div className='sk-footer-menu'>
                  <h5>{t("phase2.FOOTER.Need_Some_Help?")}</h5>
                  <ul>
                    <li>
                      <a href='/contact-us'>{t("phase2.FOOTER.Contact_Us")}</a>
                    </li>
                    <li>
                      <a href='/more-faq'>{t("phase2.HEADER.FAQ")}</a>
                    </li>
                    <li>
                      <a href='/more-faq'>{t("phase2.FOOTER.Help_Support")}</a>
                    </li>
                    <li>
                      <a href='/privacy-policy'>
                        {t("phase2.FOOTER.Terms_Policy")}
                      </a>
                    </li>
                    <li>
                      <a href='javascript:;'>{t("phase2.FOOTER.Sitemap")}</a>
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
