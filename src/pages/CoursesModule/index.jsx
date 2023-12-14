import React, { useEffect, useState } from "react";
import AddsPopup from "../AddsPopup/AddsPopup";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import { Header, Footer, ScrollToTop } from "../../components";
import Rightcheck from "../../assets/images/Courses/right.png";
import Stack from "@mui/material/Stack";
import close from "../../assets/images/Courses/close.png";
import toggle from "../../assets/images/Courses/toggle.png";
import "./index.scss";
import { Skeleton } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCourseModule, startCourse } from "../../store/courses/action";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { routingConstants } from "../../utils/constants";
import { useTranslation } from "react-i18next";
import { subModule } from "../../store/courses";
import { coursesTypes } from "../../store/courses/types";
import { useRef } from "react";
// import { Document, Page } from 'react-pdf';
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import axios from "axios";
import ContentLoader, { Facebook } from "react-content-loader";
import { adsList } from "../../store/ads";
import { ClipLoader } from "react-spinners";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(270deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const IOSSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#3880ff" : "#3880ff",
  height: 10,
  padding: "15px 0",
  "& .MuiSlider-valueLabel": {
    fontSize: 12,
    fontWeight: "normal",
    top: -6,
    backgroundColor: "unset",
    color: theme.palette.text.primary,
    "&:before": {
      display: "none",
    },
  },
}));

const CourseModule = () => {
  const [addPopup, setAddPopup] = useState(false);
  const handleClose = () => setAddPopup(false);
  const handleShow = () => setAddPopup(true);
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 4000);
  // }, []);

  useEffect(() => {
    handleShow();
  }, []);

  const [show, setShow] = React.useState(true);
  const [showSubActive, setShowsubActive] = React.useState("1.1");
  const [expanded, setExpanded] = React.useState("panel1");
  const [currentProgress, setCurrentProgress] = React.useState();
  const [arr, setArray] = React.useState();
  const { courseModulesList, course, isLoading, moduleprogress, currentModal } =
    useSelector((state) => state.coursesReducer);

  const lastSelectedIndexOne = useRef();
  const lastSelectedObject = useRef();
  const lastSelectedIndex = useRef();

  useEffect(() => {
    handleCurrentModule(currentModal);
  }, [currentModal]);

  const { lan } = useSelector((state) => state.languageReducer);
  const dispatch = useDispatch();
  const detect = useDeviceDetect();
  const { id } = useParams();
  const history = useHistory();
  const { t } = useTranslation();
  const fun = () => {
    const p = [];
    courseModulesList?.forEach((obj) => {
      obj?.sub_task?.forEach((item, ind) => {
        p.push(ind);
      });
    });
    return Math.round(100 / (p.length || 0)) || 0;
  };

  const progress = courseModulesList && fun();

  const willDispatchCurrentModal = useRef(true);
  useEffect(() => {
    if (!willDispatchCurrentModal.current || progress === Infinity) return;
    dispatch({
      type: coursesTypes.CURRENT_MODAL,
      payload: 1,
    });
    if (progress !== Infinity) {
      willDispatchCurrentModal.current = false;
    }
  }, [progress]);

  React.useEffect(() => {
    // if (detect.isMobile) {
    //   history.push(`${routingConstants.HOME_PAGE}?redirect=mobileView`);
    // }
  }, [history, detect.isMobile, t]);

  React.useEffect(() => {
    dispatch(startCourse(id, currentModal, currentProgress, true));
    dispatch(getSingleCourseModule(id));
  }, [dispatch, id, lan]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleAccordian = () => {
    setShow((prev) => !prev);
    const ratio =
      course?.pdf_height > course?.pdf_width
        ? course?.pdf_height / course?.pdf_width
        : course?.pdf_width / course?.pdf_height;
    const width = course?.pdf_width * 1.333 - testRef.current?.offsetWidth;
    const result = width * ratio;
    setIframe(course?.pdf_height * 1.333 - result);

    if (lastSelectedIndexOne.current && lastSelectedIndex.current) {
      manageClick(
        lastSelectedIndexOne.current,
        lastSelectedObject.current,
        lastSelectedIndex.current,
      );
    }
    handleCurrentModule(false);
  };

  const handlePrevModule = (page) => {
    const splitedArr = arr[page - 1].split(".");
    const value = parseInt(splitedArr[0]);
    if (Math.round(arr[page]) - Math.round(arr[page - 1]) === 1) {
      setExpanded(`panel${value}`);
    }
    const p = page * progress;
    setShowsubActive(arr[page - 1]);
    dispatch(startCourse(id, page, p === 0 ? progress : p, true));
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleNextModule = (page) => {
    const splitedArr = arr[page - 1].split(".");
    const value = parseInt(splitedArr[0]);
    const valueOne = parseInt(splitedArr[1]);
    if (valueOne === 1) {
      setExpanded(`panel${value}`);
    }
    const p = page * progress;
    setShowsubActive(arr[page - 1]);
    dispatch(startCourse(id, page, p > 100 ? 100 : p, true));
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleCurrentModule = (page, scrollTop = true) => {
    const p = currentModal * progress;
    dispatch(startCourse(id, page, p > 100 ? 100 : p, true));
    setCurrentProgress(p > 100 ? 100 : p);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const openSubModule = (obj1) => {
    dispatch(subModule(obj1?.id));
  };

  const manageClick = (ind1, obj1, ind) => {
    lastSelectedIndexOne.current = ind1;
    lastSelectedObject.current = obj1;
    lastSelectedIndex.current = ind;

    openSubModule(obj1);
    setShowsubActive(`${ind + 1}.${ind1 + 1}`);
    return handleCurrentModule(currentModal);
  };

  const [iframeWidth, setIframe] = React.useState("100%");
  const renderProgress = (count = 0) => {
    return (
      <IOSSlider
        aria-label='ios slider'
        className={
          (count <= 33 && "red1-progress") ||
          (count <= 60 && "yellow1-progress") ||
          (count <= 100 && "green1-progress")
        }
        value={count}
        valueLabelFormat={(value) => <div>{value}%</div>}
        valueLabelDisplay='on'
        disabled
      />
    );
  };

  const handleFinish = () => {
    history.push(routingConstants.COURSES_TEST + id);
  };

  const embededLink = (link = null) => {
    if (link) {
      const a = link?.split("=");
      return a[1];
    }
    return "";
  };

  const testRef = useRef();

  const manageContent = () => {
    if (course?.is_pdf && course.description !== null) {
      return (
        <div onContextMenu={(e) => e.preventDefault()}>
          {/* <iframe
            id='idIframe'
            ref={testRef}
            width={`${100}%`}
            height={`${iframeWidth}`}
            frameBorder='0'
            title='iFrame'
            allowfullscreen='true'
            key={course?.heading}
            src={`${course?.description}#toolbar=0&navpanes=0&scrollbar=0&view=fit"`}
            style={{
              overflow: 'hidden',
              pointerEvents: 'none',
              overflowX: 'hidden',
              overflowY: 'hidden',
              display: 'block'
            }}
            onLoad={() => {
              const ratio = (course?.pdf_height > course?.pdf_width ? (course?.pdf_height / course?.pdf_width) : (course?.pdf_width / course?.pdf_height))
              const width = (course?.pdf_width * 1.333) - testRef.current?.offsetWidth;
              const result = width * ratio
              setIframe((course?.pdf_height * 1.333) - result)
            }}
            scrolling='no'
          /> */}
          <Document
            options={{ cMapUrl: "cmaps/", cMapPacked: true }}
            file={course?.description}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<ClipLoader className='loader' color='#ec498a' />}
          >
            {[...Array(course?.total_pages)]?.map((page, index) => {
              return <Page pageNumber={index + 1} />;
            })}
          </Document>
        </div>
      );
    } else if (course.description === null) {
      return <div>{t("coursesPage.pdfSize.heading")}</div>;
    } else {
      return (
        <div
          className='imgSet innerhtmlcontainer'
          dangerouslySetInnerHTML={{
            __html: course?.description,
          }}
        />
      );
    }
  };

  useEffect(() => {
    const data = [];
    courseModulesList.forEach((obj, ind) => {
      obj.sub_task.forEach((obj1, ind1) => {
        data.push(`${ind + 1}.${ind1 + 1}`);
      });
    });
    setArray(data);
  }, [courseModulesList.length]);

  const [adsCourseModule, setAdsCourseModule] = useState([]);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [image, setImage] = useState("NA");

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const addEmail = (email) => {
    navigator.geolocation.getCurrentPosition(async function (position, values) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      let params = {
        latitude: latitude.toString(),
        longitude: longitude.toString(),
      };
      axios
        .post("/private_adds/click_add/", {
          // add_email:`${adds[0]?.add_email}`
          add_email: email,
          latitude: params.latitude.toString(),
          longitude: params.longitude.toString(),
        })
        .then((response) => {
          // setAdds(response.data.results);
          console.log("addEmailresponse", response);
        });
    });
  };
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>code below >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(async function (position, values) {
  //     const latitude = position.coords.latitude;
  //     const longitude = position.coords.longitude;

  //     let params = {
  //       latitude: latitude.toString(),
  //       longitude: longitude.toString(),
  //     };
  //     axios
  //       .get(
  //         `/private_adds/private_add?latitude=${latitude}&longitude=${longitude}`,
  //       )
  //       .then((response) => {
  //         if (response.data.results.length > 0) {
  //           let filterArray = response.data.results.filter((item, index) => {
  //             return item.image_type == "courses_module";
  //           });
  //           let findImage =
  //             filterArray.length > 0 ? filterArray[0].image : "NA";
  //           setImage(findImage);
  //           setAdsCourseModule(filterArray);
  //         }
  //       })   .catch((error) => {
  //         // setMessage("No data found");
  //         console.log(error);
  //     })
  //   });
  //   dispatch(adsList());
  // }, [dispatch]);

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>code latest Below >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  useEffect(() => {
    dispatch(adsList());
    navigator.geolocation.getCurrentPosition(
      async function (position, values) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        let params = {
          latitude: latitude.toString(),
          longitude: longitude.toString(),
        };
        axios
          .get(
            `/private_adds/private_add?latitude=${latitude}&longitude=${longitude}`,
          )
          .then((response) => {
            if (response && response.data.results.length > 0) {
              let filterArray1 = response.data.results.filter((item, index) => {
                return (
                  Array.isArray(item.image_type) &&
                  item.image_type.some(
                    (type) => type.image_type === "courses_module",
                  )
                );
              });
              setAdsCourseModule(filterArray1);
              // console.log("filterArray1courses_module",filterArray1)
            }
          });
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
        // alert("Your location is blocked")
        axios.get(`/private_adds/private_add`).then((response) => {
          if (response && response.data.results.length > 0) {
            let filterArray1 = response.data.results.filter((item, index) => {
              return (
                Array.isArray(item.image_type) &&
                item.image_type.some(
                  (type) => type.image_type === "courses_module",
                )
              );
            });
            setAdsCourseModule(filterArray1);
            // console.log("filterArray1coursebox",filterArray1)
          }
        });
      },
    );
  }, []);

  const keys = [...Array().keys(course?.total_pages)];

  return (
    <div>
      <Header loginPage={true} page='courses' />
      <div className='course_module mt-md-0 mb-md-0 mt-4 mb-4 noselect kuldeep_pdf'>
        <Container>
          <Row>
            <div className='col-md-12'>
              {adsCourseModule.length > 0 && (
                <div
                  className='ads_course_mod_cover'
                  onClick={() => addEmail(adsCourseModule[0]?.add_email)}
                >
                  <a href={adsCourseModule[0]?.url_adds} target='_blank'>
                    <img
                      src={adsCourseModule[0]?.image}
                      alt='adsCourseModule'
                      className='ads_Course_module'
                    />
                  </a>
                </div>
              )}
            </div>
          </Row>
        </Container>
        {/* {loading ? (
        <div className="loader-container">
      	  <div className="spinner"></div>
        </div>
      ) : ( */}

        <Container>
          <Row className='pt-md-5 pb-md-5'>
            <Col md={12} xs={12} className='text-left mb-5'>
              <div className='circular_progress_module'>
                <Stack spacing={2} direction='row'>
                  <h2>{t("coursesPage.coursesModulePage.heading.1")}</h2>
                </Stack>
                {renderProgress(moduleprogress)}
              </div>
            </Col>

            {!show && (
              <div className='tog_set'>
                <img src={toggle} alt='' onClick={handleAccordian} />
                <ul className='pl-2 position-relative'>
                  {courseModulesList.map((obj, ind) => (
                    <li
                      key={obj?.id}
                      className={
                        Number(course?.current_module) > obj?.id
                          ? "active-accordiantext"
                          : ""
                      }
                    >
                      <div className='number-bgbox'>{ind + 1}</div>
                      {obj?.sub_task &&
                        obj?.sub_task?.map(
                          (obj1, ind1) =>
                            obj1?.title && (
                              <li key={ind1}>
                                <ul className='pl-5 position-relative'>
                                  <li
                                    key={obj?.id}
                                    className={
                                      Number(course?.id) === obj?.id
                                        ? "active-accordiantext"
                                        : ""
                                    }
                                    style={{
                                      cursor: "pointer",
                                      marginLeft: "-40px",
                                    }}
                                  >
                                    {Number(course?.id) === obj?.id && (
                                      <img
                                        src={Rightcheck}
                                        className='ml-2'
                                        alt='...'
                                      />
                                    )}
                                    <span
                                      onClick={() =>
                                        manageClick(ind1, obj1, ind)
                                      }
                                      style={{
                                        color:
                                          showSubActive ===
                                          `${ind + 1}.${ind1 + 1}`
                                            ? "pink"
                                            : "black",
                                        cursor: "pointer",
                                      }}
                                    >
                                      {ind + 1}.{ind1 + 1}
                                    </span>
                                  </li>
                                </ul>
                              </li>
                            ),
                        )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {show && (
              <Col md={4} xs={12}>
                <div className='accordion_box'>
                  <div className='close_btn'>
                    <h4>{t("coursesPage.coursesModulePage.heading.2")}</h4>
                    <img
                      src={close}
                      alt='...'
                      style={{ cursor: "pointer" }}
                      onClick={handleAccordian}
                    />
                  </div>
                  {courseModulesList?.map(
                    (obj, ind) =>
                      obj?.heading && (
                        <Accordion
                          expanded={expanded === `panel${ind + 1}`}
                          onChange={handleChange(`panel${ind + 1}`)}
                          key={ind}
                        >
                          <AccordionSummary
                            aria-controls={`panel${ind + 1}d-content`}
                            id={`panel${ind + 1}d-header`}
                          >
                            <Typography>
                              <div className='number-bgbox'>{ind + 1}</div>
                              <span>{obj?.heading}</span>
                            </Typography>
                          </AccordionSummary>
                          {obj?.sub_task &&
                            obj?.sub_task?.map(
                              (obj1, ind1) =>
                                obj1?.title && (
                                  <AccordionDetails key={ind1}>
                                    <ul className='pl-5 position-relative'>
                                      <li
                                        key={obj?.id}
                                        className={
                                          Number(course?.id) === obj?.id
                                            ? "active-accordiantext"
                                            : ""
                                        }
                                      >
                                        {Number(course?.id) === obj?.id && (
                                          <img
                                            src={Rightcheck}
                                            className='ml-2'
                                            alt='...'
                                          />
                                        )}
                                        {ind + 1}.{ind1 + 1}
                                        <span
                                          onClick={() =>
                                            manageClick(ind1, obj1, ind)
                                          }
                                          style={{
                                            color:
                                              showSubActive ===
                                              `${ind + 1}.${ind1 + 1}`
                                                ? "pink"
                                                : "black",
                                            cursor: "pointer",
                                          }}
                                        >
                                          <>&nbsp;</> {obj1?.title}
                                        </span>
                                      </li>
                                    </ul>
                                  </AccordionDetails>
                                ),
                            )}
                        </Accordion>
                      ),
                  )}
                </div>
              </Col>
            )}
            <Col md={show ? 8 : 11} xs={12}>
              <div>
                <div>
                  {isLoading ? (
                    <>
                      {[1, 2].map((a) => (
                        <div className='mb-5' key={a}>
                          <Skeleton
                            variant='rectangular'
                            width={750}
                            height={45}
                            animation='wave'
                            style={{ marginBottom: 6 }}
                          />
                          <Skeleton
                            variant='rectangular'
                            width={750}
                            height={25}
                            animation='wave'
                            style={{ marginBottom: 15 }}
                          />
                          {[1, 2, 3, 4, 5].map((a) => (
                            <Skeleton
                              key={a}
                              variant='rectangular'
                              width={750}
                              height={15}
                              animation='wave'
                              style={{ marginBottom: 6 }}
                            />
                          ))}
                        </div>
                      ))}
                    </>
                  ) : (
                    <div class='iframe-divarea'>
                      {manageContent()}

                      {course?.file_link && (
                        <>
                          <h2>
                            <strong>Here is the video</strong>
                          </h2>
                          <iframe
                            width='560'
                            height='315'
                            src={`https://www.youtube.com/embed/${embededLink(
                              course?.file_link,
                            )}`}
                            title='YouTube video player'
                            frameBorder='0'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                            allowFullScreen
                          ></iframe>
                        </>
                      )}
                    </div>
                  )}
                  <div className='prev_next_btn'>
                    <Row>
                      {/* <Col md={6} xs={6}>
                        <button
                          className='back_button'
                          onClick={() => handlePrevModule(course?.prev_module)}
                          disabled={
                            course?.current_module === '1' ||
                            course?.current_module === null
                          }
                        >
                          {t('coursesPage.coursesModulePage.button.1')}
                        </button>
                      </Col> */}
                      <Col md={6} xs={6}>
                        {course?.current_module > "1" ? (
                          <button
                            className='back_button'
                            onClick={() =>
                              handlePrevModule(course?.prev_module)
                            }
                            disabled={
                              course?.current_module === "1" ||
                              course?.current_module === null
                            }
                          >
                            {t("coursesPage.coursesModulePage.button.1")}
                          </button>
                        ) : (
                          " "
                        )}
                      </Col>
                      <Col md={6} xs={6} className='text-right'>
                        {course?.next_module === null ? (
                          <button
                            className='next_button'
                            onClick={() => handleFinish()}
                          >
                            {t("coursesPage.coursesModulePage.button.2")}
                          </button>
                        ) : (
                          <button
                            className='next_button'
                            onClick={() =>
                              handleNextModule(course?.next_module)
                            }
                          >
                            {t("coursesPage.coursesModulePage.button.3")}
                          </button>
                        )}
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <AddsPopup popupShow={addPopup} popupClose={handleClose} />
        </Container>
        {/* )} */}
      </div>
      <ScrollToTop />
      <Footer loginPage={false} />
    </div>
  );
};

export default CourseModule;
