import {
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  Skeleton,
} from "@mui/material";
import React, { useEffect } from "react";
import Stack from "@mui/material/Stack";
import { Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import Slider from "@mui/material/Slider";
import Timer from "react-compound-timer";

import useExitPrompt from "../../hooks/useExitPromt";
import { Header, Footer } from "../../components";

import "./index.scss";
import "../CoursesModule/index.scss";

import time from "../../assets/images/Courses/time.png";
import { useDispatch, useSelector } from "react-redux";
import {
  endTest,
  getUserTestQuestion,
  postAnswer,
  testCountSummery,
} from "../../store/courses/action";
import { styled } from "@mui/material/styles";
import { apiConstants, routingConstants } from "../../utils/constants";
import { useTranslation } from "react-i18next";

const IOSSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#3880ff" : "#3880ff",
  marginTop: 20,
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

function CourseTest() {
  const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);
  const [questionNumber, setQuestionNumber] = React.useState(1);
  const [answer, setAnswer] = React.useState();
  const [showTimer, setShowTimer] = React.useState(false);
  const [timer, setTimer] = React.useState();
  
  

  const [check1, setCheck1] = React.useState(false);
  const [check2, setCheck2] = React.useState(false);
  const [check3, setCheck3] = React.useState(false);
  const [check4, setCheck4] = React.useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const detect = useDeviceDetect();
  const { id } = useParams();

  const { t } = useTranslation();

  const { question, questionCount, isLoading } = useSelector(
    (state) => state.coursesReducer,
  );

 
  useEffect(() => {
    setQuestionNumber(questionCount.user_course_test_count + 1);
  }, [questionCount]);

  const { lan } = useSelector((state) => state.languageReducer);

  const progress =
    Math.round(100 / (questionCount?.total_course_que || 0)) || 0;

  // useEffect(() => {
  //  // const nv = localStorage.getItem("selectedCourseCategoryValue");
  //   //localStorage.removeItem("isCarrerTestStarted");
  //  // setShowExitPrompt(false);
  //  let status  = localStorage.getItem("NeedToRelaod");
  //  if (status === "YES") {
  //    //dispatch(endTest(nv, history));
  //    localStorage.setItem("NeedToRelaod", "NO")
  //    history.push(routingConstants.CAREER_TEST_RESULT + 16);
  //  }
  // }, []);

  useEffect(() => {
    dispatch(getUserTestQuestion(id, history));
    dispatch(testCountSummery(id, history));
    // if (detect.isMobile) {
    //   history.push(`${routingConstants.HOME_PAGE}?redirect=mobileView`);
    // }
  }, [history, detect.isMobile, id, dispatch, t, lan]);

  useEffect(() => {
    return () => {
      if (id) {
        dispatch(endTest(id));
      }
    };
  }, [dispatch, id]);

  useEffect(() => {
    setShowExitPrompt(true);
    // if(showExitPrompt){
    // setShowExitPrompt(false);
    // // if (nv) {
    //  //  dispatch(endTest(nv, history));
    //    history.push(routingConstants.CAREER_TEST_RESULT + 16);
    // }
    localStorage.setItem("NeedToRelaod", "YES");
  }, []);

  // useEffect(() => {
  //   window.addEventListener("keydown", (e) => {
  //     if (localStorage.getItem("isTestStarted")) {
  //       if (
  //         (e.which || e.keyCode) === 116 ||
  //         ((e.which || e.keyCode) === 82 && e.ctrlKey)
  //       ) {
  //         const a = window.confirm("Are you sure you want to refresh the page, if you click on Ok button you will be redirect on result page");
  //         if (a) {
  //           e.preventDefault();
  //           localStorage.removeItem("isTestStarted");
  //           if (id) {
  //             dispatch(endTest(id, history));
  //           }
  //         } else {
  //           e.preventDefault();
  //         }
  //       }
  //     }
  //   });
  // }, [dispatch, history, id]);

  useEffect(() => {
    if (question) {
      if (question?.answer === "A") {
        setCheck1(true);
        setCheck2(false);
        setCheck3(false);
        setCheck4(false);
        setAnswer(question?.answer);
      } else if (question?.answer === "B") {
        setCheck2(true);
        setCheck1(false);
        setCheck3(false);
        setCheck4(false);
        setAnswer(question?.answer);
      } else if (question?.answer === "C") {
        setCheck3(true);
        setCheck1(false);
        setCheck2(false);
        setCheck4(false);
        setAnswer(question?.answer);
      } else if (question?.answer === "D") {
        setCheck4(true);
        setCheck1(false);
        setCheck2(false);
        setCheck3(false);
        setAnswer(question?.answer);
      } else {
        setCheck1(false);
        setCheck2(false);
        setCheck3(false);
        setCheck4(false);
      }
    }
  }, [
    question,
    question?.answer,
    question?.optionA,
    question?.optionB,
    question?.optionC,
    question?.optionD,
  ]);

  React.useEffect(() => {
    dispatch(testCountSummery(id, history));
  }, [dispatch, history, id, lan]);

  React.useEffect(() => {
    if (questionCount && questionCount?.counse_time > 0) {
      setTimer(parseInt(questionCount?.counse_time, 10) * 60000);
      setShowTimer(true);
      localStorage.setItem("isTestStarted", true);
    }
  }, [questionCount, questionCount?.counse_time]);

  const handleNextQuestion = () => {
    const data = {
      answer,
      course_test: question?.id,
    };
    const newProgress = (questionCount?.user_course_test_count + 1) * progress;

    if (answer) {
      setQuestionNumber((prev) => prev + 1);
      dispatch(postAnswer(data, history, id, false));
      setAnswer("");
      if (question?.answer) {
        dispatch(getUserTestQuestion(id, history, question?.next_module));
      } else {
        dispatch(
          getUserTestQuestion(id, history, question?.next_module, newProgress),
        );
      }
    } else {
      toast.error(t("error.other.1"), {
        position: "bottom-center",
      });
    }
  };

  const handleFinishQuestion = () => {
    setShowExitPrompt(true);
    const data = {
      answer,
      course_test: question?.id,
    };
    if (answer) {
      dispatch(postAnswer(data, history, id, true));
      setAnswer("");
    } else {
      toast.error(t("error.other.1"), {
        position: "bottom-center",
      });
    }
  };

  const handlePrevQuestion = () => {
    if (questionNumber > 1) setQuestionNumber((prev) => prev - 1);
    dispatch(getUserTestQuestion(id, history, question?.prev_module, 0));
  };

  const renderProgress = (count = 0) => {
    return (
      <IOSSlider
        aria-label='ios slider'
        className={
          (question?.progress <= 33 && "red1-progress") ||
          (question?.progress <= 60 && "yellow1-progress") ||
          (question?.progress <= 100 && "green1-progress")
        }
        value={count}
        valueLabelFormat={(value) => <div>{value}%</div>}
        valueLabelDisplay='on'
        disabled
      />
    );
  };

  const handleTestFinished = () => {
    dispatch(endTest(id));
    toast.error(t("error.other.2"));
    history.push(routingConstants.COURSES_RESULT + id);
  };

  const renderTimmer = (value) => {
    return (
      <Timer
        initialTime={value}
        checkpoints={[
          {
            time: 0,
            callback: () => handleTestFinished(),
          },
        ]}
        direction='backward'
      >
        {() => (
          <>
            <Timer.Hours /> :
            <Timer.Minutes />:
            <Timer.Seconds />
          </>
        )}
      </Timer>
    );
  };

  const handleAnswerCheck = (e, ans) => {
    setAnswer(ans);
    if (e.target.value === "1") {
      setCheck1(true);
      setCheck2(false);
      setCheck3(false);
      setCheck4(false);
    } else if (e.target.value === "2") {
      setCheck1(false);
      setCheck2(true);
      setCheck3(false);
      setCheck4(false);
    } else if (e.target.value === "3") {
      setCheck1(false);
      setCheck2(false);
      setCheck3(true);
      setCheck4(false);
    } else if (e.target.value === "4") {
      setCheck1(false);
      setCheck2(false);
      setCheck3(false);
      setCheck4(true);
    }
  };

  return (
    <div>
      <Header loginPage={true} page='courses' />
      <Container>
        <div className='maindiv_prog noselect'>
          <Row className='pt-md-5 pb-md-5'>
            <Col md={12} xs={12} className='text-left'>
              <div className='circular_progress_module'>
                <Stack spacing={2} direction='row'>
                  {" "}
                  <h3>{t("coursesPage.coursesModulePage.heading.1")}</h3>
                </Stack>
                {renderProgress(question?.progress)}
              </div>
            </Col>
          </Row>
        </div>
        <div className='time_set noselect'>
          <p>
            <img src={time} alt='' /> {t("common.time.5")}{" "}
            {showTimer && renderTimmer(timer)}
          </p>
        </div>

        <Row>
          <Col md={8} xs={12}>
            <div className='que_box noselect'>
              <h2>{t("allCertificatePage.other.5")}</h2>
              {isLoading ? (
                <Skeleton></Skeleton>
              ) : (
                <p>
                  {questionNumber}. {question?.question}
                </p>
              )}
              {question && (
                <RadioGroup name='radio-buttons-group' value={answer}>
                  {question?.optionA &&
                    (isLoading ? (
                      <Skeleton />
                    ) : (
                      <FormControlLabel
                        value='1'
                        control={
                          <Radio
                            checked={check1}
                            onChange={(e) => handleAnswerCheck(e, "A")}
                          />
                        }
                        label={question?.optionA}
                      />
                    ))}
                  {question?.optionB &&
                    (isLoading ? (
                      <Skeleton />
                    ) : (
                      <FormControlLabel
                        value='2'
                        control={
                          <Radio
                            checked={check2}
                            onChange={(e) => handleAnswerCheck(e, "B")}
                          />
                        }
                        label={question?.optionB}
                      />
                    ))}
                  {question?.optionC &&
                    (isLoading ? (
                      <Skeleton />
                    ) : (
                      <FormControlLabel
                        value='3'
                        control={
                          <Radio
                            checked={check3}
                            onChange={(e) => handleAnswerCheck(e, "C")}
                          />
                        }
                        label={question?.optionC}
                      />
                    ))}
                  {question?.optionD &&
                    (isLoading ? (
                      <Skeleton />
                    ) : (
                      <FormControlLabel
                        value='4'
                        control={
                          <Radio
                            checked={check4}
                            onChange={(e) => handleAnswerCheck(e, "D")}
                          />
                        }
                        label={question?.optionD}
                      />
                    ))}
                </RadioGroup>
              )}
            </div>{" "}
            <br />
            <div className='prev_next_btn noselect'>
              <Row>
                <Col md={6} xs={6}>
                  <button
                    className='back_button'
                    onClick={() => handlePrevQuestion()}
                    disabled={!question?.prev_module}
                  >
                    {t("coursesPage.coursesModulePage.button.1")}
                  </button>
                </Col>

                <Col md={6} xs={6} className='text-right'>
                  {questionCount?.total_course_que === questionNumber ? (
                    <button
                      className='next_button'
                      onClick={() => handleFinishQuestion()}
                    >
                      {t("coursesPage.coursesModulePage.button.2")}
                    </button>
                  ) : (
                    <button
                      className='next_button'
                      onClick={() => handleNextQuestion()}
                    >
                      {t("coursesPage.coursesModulePage.button.3")}
                    </button>
                  )}
                </Col>
              </Row>
            </div>
          </Col>
          <Col md={4} xs={12}>
            <div className='que_status noselect'>
              <h2>{t("successCareerTestPage.heading.2")}</h2>
              <div className='que_num'>
                {[...Array(questionCount?.total_course_que).keys()].map(
                  (obj) => (
                    <p
                      id={
                        obj + 1 <= questionCount?.user_course_test_count
                          ? "col_gre"
                          : "col_grey"
                      }
                    >
                      {obj + 1}
                    </p>
                  ),
                )}
              </div>
            </div>

            <div className='ans_not noselect'>
              <ul>
                <li>
                  <span className='dotte1'></span>{" "}
                  {t("successCareerTestPage.other.2")}
                </li>
                <li>
                  <span className='dotte2'></span>{" "}
                  {t("successCareerTestPage.other.3")}
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer loginPage={false} />
    </div>
  );
}

export default CourseTest;
