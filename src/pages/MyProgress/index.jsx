import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ProgressChart from "./ProgressChart";
import CurrentCourse from "./CurrentCourse";
import InProgressCourse from "./InProgressCourse";
import YourTest from "./YourText";
import { Header, Footer, SEO } from "../../components";
import { getUserCourseProgress } from "../../store/my-progress";
import AddsPopup from '../AddsPopup/AddsPopup'

import "./index.scss";
import { routingConstants } from "../../utils/constants";
import { useTranslation } from "react-i18next";

function MyProgress() {

  
  const [addPopup, setAddPopup] = useState(false);
  const handleClose = () => setAddPopup(false);
  const handleShow = () => setAddPopup(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleShow();
    }, 2000); 
  
    return () => clearTimeout(timer);
  }, []); 

  const { user } = useSelector((state) => state.authReducer);
  const { myProgress } = useSelector((state) => state.myProgressReducer);
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { lan } = useSelector((state) => state.languageReducer);

  useEffect(() => {
    dispatch(getUserCourseProgress());
  }, [dispatch, lan]);

  const filterCoursesData = (coursesData = [], type) => {
    if (type === "current") {
      return coursesData.filter((c) => c?.is_current === false);
    } else if (type === "inProgress") {
      return coursesData.filter((c) => c?.is_current === true);
    }
    return [];
  };

  return (
    <div>
      <SEO title='Sheकुंज - My Progress' />
      <Header loginPage={true} subPage='myProgress' />
      <div className='dashboard_main pt-5 pb-5 noselect'>
        <Container>
          <Row>
            <Col md={12}>
              <h1>
                {t("common.greeting.hello")} {user?.name || t("common.n/a")} {user?.last_name || t("common.n/a")}!
              </h1>
              <p className='dashboard_back'>
                {t("common.greeting.goodToSeeYou")}
              </p>
            </Col>
          </Row>
          <Row>
            {/* left side content start */}
            <Col md={7} xs={12}>
              {
                <CurrentCourse
                  courses={filterCoursesData(
                    myProgress?.courses_data,
                    "current",
                  )}
                />
              }
              {
                <InProgressCourse
                  courses={filterCoursesData(
                    myProgress?.courses_data,
                    "inProgress",
                  )}
                />
              }
            </Col>
            {/* left side content end */}

            {/* right side content */}
            <Col md={5} xs={12}>
              {myProgress?.user_progress_data?.total_course === 0 ? (
                ""
              ) : (
                <ProgressChart
                  userProgress={myProgress?.user_progress_data || null}
                />
              )}
              <div className='certificate-section'>
                <Row>
                  <Col md={12}>
                    <h6>{t("dashboardPage.certificate")}</h6>
                    <p>
                    Your path to the success by our industry recognized certificates to help you achieve your desired goals.
                    </p>
                  </Col>
                </Row>
                <div>                  
                  <Link to={routingConstants.ALL_CERTIFICATE_PAGE}>
                    <button className='btn all_certificatebutton'>
                      {t("dashboardPage.button.1")}
                    </button>
                  </Link>
                </div>
              </div>
              {<YourTest tests={myProgress?.courses_data} />}
            </Col>
            {/* right side content end */}
          </Row>
          <AddsPopup popupShow={addPopup}
            popupClose={handleClose} />
        </Container>
      </div>
      <Footer loginPage={false} />
    </div>
  );
}

export default MyProgress;
