import React from "react";
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
import { toast } from "react-toastify";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import Cookies from "js-cookie";

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
  const [show, setShow] = React.useState(true);
  const [expanded, setExpanded] = React.useState("panel1");
  const { courseModulesList, course, isLoading, moduleprogress } = useSelector(
    (state) => state.coursesReducer,
  );
  const dispatch = useDispatch();
  const detect = useDeviceDetect();
  const { id } = useParams();
  const history = useHistory();

  const progress = Math.round(100 / (courseModulesList.length || 0)) || 0;

  React.useEffect(() => {
    if (detect.isMobile) {
      toast.error("This page is not availble in mobile view.");
      history.push("/");
    }
  }, [history, detect]);

  React.useEffect(() => {
    dispatch(startCourse(id));
    dispatch(getSingleCourseModule(id));
  }, [dispatch, id]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleAccordian = () => {
    setShow((prev) => !prev);
  };

  const handlePrevModule = (page) => {
    Cookies.set("module", page);
    const p = (page - 1) * progress;
    dispatch(startCourse(id, page, p, true));
  };

  const handleNextModule = (page) => {
    Cookies.set("module", page);
    const p = (page - 1) * progress;
    dispatch(startCourse(id, page, p, true));
  };

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
    Cookies.remove("module");
    history.push(`/CoursesTest/${id}`);
  };

  return (
    <div>
      <Header loginPage={true} page='courses' />
      <div className='course_module mt-md-0 mb-md-0 mt-4 mb-4'>
        <Container>
          <Row className='pt-md-5 pb-md-5'>
            <Col md={12} xs={12} className='text-left mb-5'>
              <div className='circular_progress_module'>
                <Stack spacing={2} direction='row'>
                  <h2>Your Progress</h2>
                </Stack>

                {renderProgress(moduleprogress)}
              </div>
            </Col>

            {!show && (
              <div className='tog_set'>
                <img src={toggle} alt='' onClick={handleAccordian} />
                <div className='number-bgbox'>1</div>
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
                      1.{obj.id}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {show && (
              <Col md={4} xs={12}>
                <div className='accordion_box'>
                  <div className='close_btn'>
                    <h4>Course content</h4>
                    <img
                      src={close}
                      alt='...'
                      style={{ cursor: "pointer" }}
                      onClick={handleAccordian}
                    />
                  </div>
                  <Accordion
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                  >
                    <AccordionSummary
                      aria-controls='panel1d-content'
                      id='panel1d-header'
                    >
                      <Typography>
                        <div className='number-bgbox'>1</div>
                        Introduction
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ul className='pl-5 position-relative'>
                        {courseModulesList.map((obj, ind) => (
                          <li
                            key={obj?.id}
                            className={
                              Number(course?.current_module) > obj?.id
                                ? "active-accordiantext"
                                : ""
                            }
                          >
                            {Number(course?.current_module) > obj?.id && (
                              <img
                                src={Rightcheck}
                                className='ml-2'
                                alt='...'
                              />
                            )}
                            1.{ind+1} {obj?.title}
                          </li>
                        ))}
                      </ul>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </Col>
            )}

            <Col md={show ? 8 : 11} xs={12}>
              <div className='card_courses'>
                <div className='card'>
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
                    <div
                      className='des_dynamic_con'
                      dangerouslySetInnerHTML={{
                        __html: course?.description,
                      }}
                    />
                  )}

                  <div className='prev_next_btn'>
                    <Row>
                      <Col md={6} xs={6}>
                        <button
                          className='back_button'
                          onClick={() => handlePrevModule(course?.prev_module)}
                          disabled={course?.current_module === "1"}
                        >
                          back
                        </button>
                      </Col>

                      <Col md={6} xs={6} className='text-right'>
                        {course?.next_module === null ? (
                          <button
                            className='next_button'
                            onClick={() => handleFinish()}
                          >
                            finish
                          </button>
                        ) : (
                          <button
                            className='next_button'
                            onClick={() =>
                              handleNextModule(course?.next_module)
                            }
                          >
                            next
                          </button>
                        )}
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <ScrollToTop />
      <Footer loginPage={false} />
    </div>
  );
};

export default CourseModule;
