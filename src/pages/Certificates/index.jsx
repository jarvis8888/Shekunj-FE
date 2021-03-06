import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Aos from "aos";

import { Footer, Header, SEO } from "../../components";
import { timeDifferenceFromDates } from "../../utils/utils";
import { getUserCourseCertificate } from "../../store/certificate";
import { getGuidanceCategory } from "../../store/guidance";
import { routingConstants } from "../../utils/constants";

import clock1 from "../../assets/icons/clock1.png";
import barChart from "../../assets/icons/bar-chart.png";
import lecturesIcon from "../../assets/icons/list.png";

import "./index.scss";
import CertificateSmall from "../../components/CertificateSmall";

function AllCertificatePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const certificateRef = useRef();
  const { t } = useTranslation();

  const { certificates } = useSelector((state) => state.certificateReducer);
  const { lan } = useSelector((state) => state.languageReducer);

  useEffect(() => {
    dispatch(getUserCourseCertificate());
  }, [dispatch, lan]);

  useEffect(() => {
    dispatch(getGuidanceCategory(null));
    dispatch(getGuidanceCategory());
    Aos.init({ duration: 2000 });
  }, [dispatch, lan]);

  
  return (
    <div>
      <SEO title='Sheकुंज - All Certificates' />
      <Header loginPage={true} subPage='allCertificatePage' />

      <div className='all_certif_banner noselect'>
        <Container>
          <Row>
            <Col md={6} xs={12} data-aos='slide-up'>
              <h2>{t("allCertificatePage.heading.1")}</h2>
              <p>{t("allCertificatePage.content.1")}</p>
            </Col>
          </Row>
        </Container>
      </div>
      <div className='all_certif_sec noselect'>
        <Container>
          <h2 className='my_achiev'>{t("allCertificatePage.heading.2")}</h2>
          {certificates.length > 0 ? (
            certificates.map((c) => (
              <>
                <div className='all_certif_box' key={c?.id}>
                  <Row>
                    <Col md={6} xs={12}>
                      <CertificateSmall
                       certificateData={c}
                        ref={certificateRef}                        
                        size='small'
                        id={c?.id}
                        key={c?.id}
                      />
                    </Col>
                    <Col md={6} xs={12}>
                      <div className='all_certif_con'>
                        <h2>{c?.course_name || t("common.n/a")}</h2>
                        {/* <p>{c?.description || t("common.n/a")} </p> */}
                        <div dangerouslySetInnerHTML={{ __html: c?.description || t("common.n/a") }} />
                        <div className='all_list'>
                          <ul>
                            <li>
                              <img src={clock1} alt='' />
                            </li>
                            <li>
                              {" "}
                              {
                                timeDifferenceFromDates(
                                  c?.course_start_time,
                                  c?.course_end_time,
                                ).hour
                              }{" "}
                              {
                                timeDifferenceFromDates(
                                  c?.course_start_time,
                                  c?.course_end_time,
                                ).minute
                              }
                            </li>
                          </ul>
                          <ul>
                            <li>
                              <img src={lecturesIcon} alt='' />
                            </li>
                            <li>
                              {c?.no_of_lecture || 0}{" "}
                              {t("allCertificatePage.other.1")}
                            </li>
                          </ul>
                          <ul>
                            <li>
                              <img src={barChart} alt='' />
                            </li>
                            <li>{t("allCertificatePage.other.2")}</li>
                          </ul>
                        </div>
                        <button
                          onClick={() =>
                            history.push(
                              routingConstants.ALL_CERTIFICATE_DETAIL + c?.id,
                            )
                          }
                        >
                          {t("allCertificatePage.button.1")}
                        </button>
                        <button
                          onClick={() => certificateRef.current.generatePDF(c?.id)}>
                          {t("allCertificatePage.button.2")}
                        </button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </>
            ))
          ) : (
            <div className='text-center'>{t("common.noDataFound")}</div>
          )}
        </Container>
      </div>
      <Footer loginPage={false} />
    </div>
  );
}

export default AllCertificatePage;
