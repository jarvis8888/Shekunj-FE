import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  createElement,
} from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import * as htmlToImage from "html-to-image";

import { getUserCourseCertificateDetail } from "../../store/certificate";
import { routingConstants } from "../../utils/constants";

import Certificate_text from "../../assets/images/AllCertificate/View_Certificate.png";
import para from "../../assets/images/AllCertificate/para.png";
import signature from "../../assets/images/AllCertificate/signature.png";
import logo1 from "../../assets/images/AllCertificate/logo1.png";
import logo22 from "../../assets/images/AllCertificate/logo22.png";
import logo3 from "../../assets/images/AllCertificate/logo3.png";
import PSD_Certificate from "../../assets/images/PSD_Certificate/Certificate_pdf.png";
import thiscer_img from "../../assets/images/PSD_Certificate/thiscer_img.png";
import logo11 from "../../assets/images/PSD_Certificate/logo1.png";
import logo222 from "../../assets/images/PSD_Certificate/logo2.png";
import logo33 from "../../assets/images/PSD_Certificate/logo3.png";
import signature_pdf from "../../assets/images/PSD_Certificate/signature_pdf.png";
import CircularProgress from "@mui/material/CircularProgress";
import useDeviceDetect from "../../hooks/useDeviceDetect";

import "./index.scss";
import moment from "moment";
import { Loader } from "../../components";
import { display } from "@mui/system";
const thiscer_img1 = require("../../assets/images/PSD_Certificate/thiscer_img.png");

const CertificatesDetail = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const divRef = React.useRef();
  const { id, isDownload } = useParams();
  const { t } = useTranslation();
  const detect = useDeviceDetect();

  const [isLoaded, setIsLoaded] = useState(true);
  const [ newCer, setNewCer ] = useState('')

  const { certificateDetail: certificate } = useSelector(
    (state) => state.certificateReducer,
  );
  const { lan } = useSelector((state) => state.languageReducer);

  useEffect(() => {
    if (props?.id || id) {
      dispatch(getUserCourseCertificateDetail(props?.id || id , history));
    } 
    else {
      history.push(routingConstants.ALL_CERTIFICATE_PAGE);
    }
  }, [id, history, dispatch, props?.id, lan]);

  useEffect(() => {
    if (isDownload) {
      setIsLoaded(false);
        const node = document.querySelector(".box_certificate_large");
        const element = node.cloneNode(true);
        element.setAttribute("id", "_new_cer_PDF");
        element.classList.add("cer_PDF");
        if (element.getElementsByClassName("cetificateText")[0]) {
          element
            .getElementsByClassName("cetificateText")[0]
            .setAttribute("src", thiscer_img1?.default);
        }
        if(certificate){
          document.body.appendChild(element);
          downloadPDF(element);
        }
        setNewCer(element)
    }
  }, [certificate]);

  const downloadPDF = (node) => {
    html2canvas(node,{scale:0.3}).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF("landscape", "px", "a4", false);
      var width = pdf.internal.pageSize.getWidth();
      var height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'x', 0, 0, width, height);
      // pdf.save(`${certificate && certificate?.last_name}`);
      pdf.save("mycertificate.pdf")
      document.getElementById("_new_cer_PDF").remove();
      setNewCer('')
      setIsLoaded(true);
    })
  };

  useImperativeHandle(ref, () => ({
    generatePDF() {
      if (location.pathname !== "/certificate-detail/") {
        history.push(`/certificate-detail/${props?.id}/true`);
      }
    },
  }));


  return (  
    isDownload ? (
    <div
      ref = {divRef}
      className='noselect'
      style={{ width: "100%", display: "flex", justifyContent: "center" }}
    >
      {isLoaded === false && <Loader className={ (newCer && detect?.isMobile) ? "set-back loader" : "loader"} />}
      { (detect?.isMobile && newCer && isLoaded === false) && <Loader className="duplicate_loader"/>}
      <div style={{ width: "95%" }} className=' p-0' id='capture'>
        <div className='mob_box_certificate_small ayushi-certificate2 '></div>
        <div id='cer_PDF' className={ props.size === "large"  ? "box_certificate_large mt-4" : "box_certificate_small mb-4" }>
          <Row>
            <Col md={7} xs={12} className="certificateContent" >
              <div className={ props.size === "large" ? "cercifi_con_large" : "cercifi_con_small"}>
                <img className='cer_text' src={PSD_Certificate} alt='' />
                <br />
                <img className='last-img cetificateText' src={para} alt='' />
                <h2>
                  {certificate?.name || t("common.n/a")}&nbsp;
                  {certificate && certificate?.last_name}
                </h2>
                <hr className='hr_line' />
                <h5 className='certi-ref'>
                  for successfully completing the course
                </h5>
                <h3>{certificate?.course_name}</h3>
                <p className='first-number'>
                  {t("certificateDetailPage.content.1.1")} <br />
                  {t("certificateDetailPage.content.1.2")}
                </p>
                <p className='second-number'>
                  Date of Achievement :{" "}
                  {moment(certificate?.course_end_time).format("DD-MM-YYYY")}
                </p>
                <p>
                  Certificate ID:{" "}
                  <span>
                    {" "}
                    SH108-{moment(certificate?.course_end_time).format("YY")}EW
                    {id}
                  </span>
                </p>
              </div>
            </Col>
          </Row>
          <div className='cer_logo'>
            <img className='img1' src={logo11} alt='' srcSet='' />
            <img className='img2' src={logo222} alt='' srcSet='' />
            <img className='img3' src={logo33} alt='' srcSet='' />
          </div>
          <div className='signature_set'>
            <img src={signature} alt='' />
            <hr className='hr_line2' />
            <div className='name-surname'>
              {t("certificateDetailPage.other.4")}
              <div className='president'>
                {t("certificateDetailPage.other.3")}
              </div>
            </div>
          </div>
        </div>
        {props.showButton && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: 15,
              marginBottom: 15,
              userSelect: "none",
            }}
          >
            <Link to='/courses' style={{ textDecoration: "none" }}>
              <button className='back_course'>
                {t("allCertificatePage.button.3")}
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div
      className='noselect'
      style={{ width: "100%", display: "flex", justifyContent: "center" }}
    >
      {isLoaded === false && <Loader />}
      <div style={{ width: "95%" }} className=' p-0' id='capture'>
        <div className='mob_box_certificate_small ayushi-certificate2 '></div>
        <div
          id='download'
          className={
            props.size === "large---"
            ? "box_certificate_large mt-4"
            : "box_certificate_small certificate1234 mb-4 box_small"
          }
        >
          <Row className= {  props.size === "large" ? "cercifi_con_small view_certificate_two view_content_small" : 
          "cercifi_con_small view_certificate_two cercifi_con_small_view"
          }>
            <Col md={7} xs={12} className='offset-3'>
              <div
                className={
                  props.size === "large"
                    ? "cercifi_sm_con_large cercifi_small"
                    : "cercifi_con_small cercifi_con_small_view"
                }
              >
                <img className='cer_text' src={Certificate_text} alt='' />
                <img className='last-img' src={para} alt='' />
                <h2>
                  {certificate?.name || t("common.n/a")}&nbsp;
                  {certificate && certificate?.last_name}
                </h2>
                <hr className='hr_line' />
                <h5 className='certi-ref'>
                  for successfully completing the course
                </h5>
                <h3>{certificate?.course_name}</h3>
                <p className='first-number'>
                  {t("certificateDetailPage.content.1.1")} <br />
                  {t("certificateDetailPage.content.1.2")}
                </p>
                <p className='second-number'>
                  Date of Achievement :{" "}
                  {moment(certificate?.course_end_time).format("DD-MM-YYYY")}
                </p>
                <p>
                  Certificate ID:{" "}
                  <span>
                    {" "}
                    SH108-{moment(certificate?.course_end_time).format("YY")}EW
                    {id}
                  </span>
                </p>
              </div>
            </Col>
          </Row>
          <div className='cer_logo cer_log_small'>
            <img className='img1' src={logo1} alt='' srcSet='' />
            <img className='img2' src={logo22} alt='' srcSet='' />
            <img className='img3' src={logo3} alt='' srcSet='' />
          </div>
          <div className={  props.size === "large" ? "small_set" : 'signature_set'} >
            <img src={signature_pdf} alt='' />
            <hr className='hr_line2' />
            <div className='name-surname'>
              {t("certificateDetailPage.other.4")}
              <div className='president'>
                {t("certificateDetailPage.other.3")}
              </div>
            </div>
          </div>
        </div>
        {props.showButton && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: 15,
              marginBottom: 15,
              userSelect: "none",
            }}
          >
            <Link to='/courses' style={{ textDecoration: "none" }}>
              <button className='back_course'>
                {t("allCertificatePage.button.3")}
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
  );
});

export default CertificatesDetail;
