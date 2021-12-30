import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { getUserCourseCertificateDetail } from "../../store/certificate";
import { formatDate } from "../../utils/utils";
import Certificate_text from "../../assets/images/AllCertificate/Certificate_text.png";
import para from "../../assets/images/AllCertificate/para.png";
import signature from "../../assets/images/AllCertificate/signature.png";
import "./index.scss";
import { routingConstants } from "../../utils/constants";
import { useTranslation } from "react-i18next";

const CertificatesDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const { certificateDetail: certificate } = useSelector(
    (state) => state.certificateReducer,
  );
  const { t } = useTranslation();

  useEffect(() => {
    if (id) {
      dispatch(getUserCourseCertificateDetail(id, history));
    } else {
      history.push(routingConstants.ALL_CERTIFICATE_PAGE);
    }
  }, [id, history, dispatch]);

  return (
    <div className='container mt-4'>
      <div className='box_certificate'>
        <Row>
          <Col md={7} xs={12} className='offset-3'>
            <div className='cercifi_con'>
              <img className='cer_text' src={Certificate_text} alt='' />
              <img src={para} alt='' />
              <h2>{certificate?.name || "N/A"}</h2>
              <hr className='hr_line' />
              <p>
                {t("certificateDetailPage.content.1.1")} {certificate?.id}{" "}
                {t("certificateDetailPage.content.1.2")}
              </p>
              <h3>“{t("certificateDetailPage.heading.1")}”</h3>
              <p>
                {t("certificateDetailPage.other.1")}{" "}
                {formatDate(certificate?.course_start_time, "MMM Do YYYY")} to{" "}
                {formatDate(certificate?.course_end_time, "MMM Do YYYY")}
              </p>
              <p>{t("certificateDetailPage.other.2")}</p>
            </div>
          </Col>
        </Row>

        <div className='date_set'>
          <div>{formatDate(certificate?.course_end_time, "DD/MM/YYYY")}</div>
          <hr className='hr_line2' />
          <div>Date</div>
        </div>
        <div className='signature_set'>
          <img src={signature} alt='' />
          <hr className='hr_line2' />
          <div>{t("certificateDetailPage.other.3")}</div>
          <div>{t("certificateDetailPage.other.4")}</div>
        </div>
      </div>
    </div>
  );
};

export default CertificatesDetail;
