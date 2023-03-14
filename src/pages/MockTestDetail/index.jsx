import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Timer from "react-compound-timer";
import useExitPrompt from "../../hooks/useExitPromt";

import {
  Autocomplete,
  Container,
  Card,
  FormControlLabel,
  Radio,
  RadioGroup,
  Skeleton,
  TextField,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import img1 from "../../assets/images/shekunj_magzine.jpg";
import global from "../../assets/images/Success/global.png";

import { routingConstants } from "../../utils/constants";
import { Header, Footer } from "../../components";
import {
  getGuidanceCategory,
  fetchStartUserCareerTest,
  fetchUserCareerTestCount,
  postAnswer,
  endTest,
} from "../../store/guidance/action";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import timeIcon from "../../assets/images/Courses/time.png";

import "./index.scss";
import "../CoursesModule/index.scss";

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

function MockTestDetail() {
  const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);
  const [questionNumber, setQuestionNumber] = React.useState(1);
  const [answer, setAnswer] = React.useState();
  const [toggle, setToggle] = React.useState(true);
  const [showTimer, setShowTimer] = React.useState(false);

  const [check1, setCheck1] = React.useState(false);
  const [check2, setCheck2] = React.useState(false);
  const [check3, setCheck3] = React.useState(false);
  const [check4, setCheck4] = React.useState(false);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [testTime, setTestTime] = useState(null);
  // const [selectedCourseCategory, setSelectedCourseCategory] = useState(null);
  // const [selectedCourseCategoryValue, setSelectedCourseCategoryValue] =
  //   useState(null);
  const target = useRef(null)

  const { id } = useParams();
  console.log("MockTestIdddd", id);
  const history = useHistory();
  const dispatch = useDispatch();
  const detect = useDeviceDetect();
  // eslint-disable-next-line no-unused-vars
  const { isLoading, guidanceCategory, testData, countData } = useSelector(
    (state) => state?.guidanceReducer,
  );

  const progress = Math.round(100 / (countData?.total_career_que || 0)) || 0;
  const question_history = JSON.parse(localStorage.getItem('question_history'))
  useEffect(() => {
    // console.log("testDataMockTest", testData)
    if(questionNumber!==1){
      if(question_history?.length>0){
        const filterHistory=question_history?.filter(his=>his.cat_id===id)
        if(filterHistory.length>0){
          filterHistory[0].q_no=questionNumber
          filterHistory[0].question_id=testData?.id
          const pos=filterHistory[0].index;
          question_history[pos]=filterHistory[0];
          localStorage.setItem('question_history',JSON.stringify(question_history))
        }else{
          question_history.push({ q_no:questionNumber, question_id: testData?.id,cat_id:id,index:question_history.length })
          localStorage.setItem('question_history',JSON.stringify(question_history))
        }
      }else{
        localStorage.setItem('question_history', JSON.stringify([{ q_no:questionNumber, question_id: testData?.id,cat_id:id ,index:0}]))  
      }
      
    }
    
   
  }, [testData])
  


  const { t } = useTranslation();
  const { lan } = useSelector((state) => state.languageReducer);

  // useEffect(()=> {
  //   setQuestionNumber(countData?.user_career_test_count + 1)
  // },[countData])

  useEffect(() => {
    const nv = localStorage.getItem("selectedCourseCategoryValue");
    localStorage.removeItem("selectedCourseCategoryValue");
    localStorage.removeItem("isCarrerTestStarted");
    setShowExitPrompt(false);
    if (nv) {
      dispatch(endTest(nv, history));
      history.push(routingConstants.CAREER_TEST_RESULT + nv);
    }
    // if(question_history?.questionNumber && question_history?.cat_id===id){
    //   setQuestionNumber(question_history?.questionNumber)
    // }else{
    //   localStorage.removeItem('question_history')
    // }
   const filterHistory=question_history?.filter(his=>his.cat_id===id);;
   if(filterHistory?.length>0){
    const fetchQuestion=filterHistory[0];
    setQuestionNumber(fetchQuestion?.q_no)
    //  if(fetchQuestion?.q_no && fetchQuestion?.cat_id===id){
      
    // }else{
    //   localStorage.removeItem('question_history')
    // }
   }
  }, []);

  useEffect(() => {
    dispatch(fetchUserCareerTestCount(id));
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [dispatch, id, lan]);

  // useEffect(() => {
  //   if (detect.isMobile) {
  //     history.push(`${routingConstants.HOME_PAGE}?redirect=mobileView`);
  //   }
  // }, [history, detect.isMobile, t, dispatch, selectedCourseCategoryValue?.id]);

  useEffect(() => {
    return () => {
      // const nv = localStorage.getItem("selectedCourseCategoryValue");
      const nv = localStorage.getItem("guidanceCategory?.id");
      if (nv) {
        dispatch(endTest(nv, history));
      }
    };
  }, [dispatch, history]);

  useEffect(() => {
    return () => {
      setShowExitPrompt(false);
    };
  }, []);

  // useEffect(() => {
  //   window.addEventListener("keydown", (e) => {
  //     if (localStorage.getItem("isCarrerTestStarted")) {
  //       if (
  //         (e.which || e.keyCode) === 116 ||
  //         ((e.which || e.keyCode) === 82 && e.ctrlKey)
  //       ) {
  //         const a = window.confirm(
  //           "Are you sure you want to refresh the page, if you click on Ok button you will be redirect on result page",
  //         );
  //         if (a) {
  //           const nv = localStorage.getItem("selectedCourseCategoryValue");
  //           localStorage.removeItem("isCarrerTestStarted");
  //           // localStorage.removeItem("selectedCourseCategoryValue");
  //           history.push(
  //             routingConstants.CAREER_TEST_RESULT +
  //               selectedCourseCategoryValue?.id,
  //           );
  //           e.preventDefault();
  //           if (nv) {
  //             dispatch(endTest(nv, history));
  //           }
  //         } else {
  //           e.preventDefault();
  //         }
  //       }
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   const unloadCallback = (event) => {
  //     var r = window.confirm("Successful Message!");
  //     if (r == true){
  //       window.location.reload();
  //     }
  //   };
  //   window.addEventListener("beforeunload", unloadCallback);
  //   return () => window.removeEventListener("beforeunload", unloadCallback);
  // }, []);

  useEffect(() => {
    if (testData) {
      if (testData?.answer === "A") {
        setCheck1(true);
        setCheck2(false);
        setCheck3(false);
        setCheck4(false);
        setAnswer(testData?.answer);
      } else if (testData?.answer === "B") {
        setCheck2(true);
        setCheck1(false);
        setCheck3(false);
        setCheck4(false);
        setAnswer(testData?.answer);
      } else if (testData?.answer === "C") {
        setCheck3(true);
        setCheck1(false);
        setCheck2(false);
        setCheck4(false);
        setAnswer(testData?.answer);
      } else if (testData?.answer === "D") {
        setCheck4(true);
        setCheck1(false);
        setCheck2(false);
        setCheck3(false);
        setAnswer(testData?.answer);
      } else {
        setCheck1(false);
        setCheck2(false);
        setCheck3(false);
        setCheck4(false);
      }
    }
  }, [
    testData,
    testData?.answer,
    testData?.optionA,
    testData?.optionB,
    testData?.optionC,
    testData?.optionD,
  ]);

  const handleFinishQuestion = () => {
    // return false;
    const data = {
      answer,
      career_test: testData?.id,
    };
    if (answer) {
      dispatch(
        // postAnswer(data, history, selectedCourseCategoryValue?.id, true),
        postAnswer(data, history, id, true),
      );
      setAnswer("");
    } else {
      toast.error("Select option for next question", {
        position: "bottom-center",
      });
    }
  };

  React.useEffect(() => {
    // if (selectedCourseCategoryValue?.id) {
    if (fetchUserCareerTestCount?.id) {
      dispatch(
        // fetchUserCareerTestCount(selectedCourseCategoryValue?.id, history),
        fetchUserCareerTestCount(fetchUserCareerTestCount?.id, history),
      );
    }
    //   }, [dispatch, toggle, history, selectedCourseCategoryValue?.id]);
  }, [dispatch, toggle, history, fetchUserCareerTestCount?.id]);

  React.useEffect(() => {
    if (countData && countData?.career_time > 0) {
      setTestTime(parseInt(countData?.career_time, 10) * 60000);
      setShowTimer(true);
      // localStorage.setItem("isCarrerTestStarted", true);
    }
  }, [countData, countData?.career_time]);

  useEffect(() => {
    dispatch(getGuidanceCategory(id));
  }, [dispatch, lan]);

  // useEffect(() => {
  //   dispatch(fetchStartUserCareerTest(id));
  // }, [dispatch, lan]);

  const handleStartCourse = async () => {
    setShowExitPrompt(true);
    localStorage.setItem("isCarrerTestStarted", true);
    // if (!selectedCourseCategoryValue)
    if (!guidanceCategory?.id) {
      return;
    }
    const res = await dispatch(
      // fetchStartUserCareerTest(selectedCourseCategoryValue?.id, history),
      fetchStartUserCareerTest(guidanceCategory?.id, history),
    );
    if (res?.status_code === 200) {
      const counts = await dispatch(
        // fetchUserCareerTestCount(selectedCourseCategoryValue?.id),
        fetchUserCareerTestCount(guidanceCategory?.id),
      );
      if (counts.status_code === 200 && counts.data.career_time) {
        setIsTestStarted(true);
        setTestTime((parseInt(counts?.data.career_time, 10) || 0) * 60000);
      }
      target.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTestFinished = () => {
    // dispatch(endTest(selectedCourseCategoryValue?.id));
    dispatch(endTest(guidanceCategory?.id));
    toast.error(t("error.other.2"));
    history.push(
      //  routingConstants.CAREER_TEST_RESULT + selectedCourseCategoryValue?.id,
      routingConstants.CAREER_TEST_RESULT + guidanceCategory?.id,
    );
  };

  const handlePrevQuestion = () => {
    if (questionNumber > 1) setQuestionNumber((prev) => prev - 1);
    dispatch(
      fetchStartUserCareerTest(
        // selectedCourseCategoryValue?.id,
        guidanceCategory?.id,
        history,
        testData?.prev_module,
        0,
      ),
    );
  };

  const handleNextQuestion = () => {
    const data = {
      answer,
      career_test: testData?.id,
    };
    const newProgress = (countData?.user_career_test_count + 1) * progress;

    if (answer) {
      setQuestionNumber((prev) => prev + 1);
      dispatch(
        // postAnswer(data, history, selectedCourseCategoryValue?.id, false),
        // postAnswer(data, history, fetchUserCareerTestCount?.id, false),
        postAnswer(data, history, guidanceCategory?.id, false),
      );
      setAnswer("");
      if (testData?.answer) {
        dispatch(
          fetchStartUserCareerTest(
            // selectedCourseCategoryValue?.id,
            guidanceCategory?.id,
            history,
            testData?.next_module,
          ),
        );
      } else {
        dispatch(
          fetchStartUserCareerTest(
            // selectedCourseCategoryValue?.id,
            guidanceCategory?.id,
            history,
            testData?.next_module,
            newProgress,
          ),
        );
      }
    
     
      setToggle((prev) => !prev);
    } else {
      toast.error(t("error.other.1"), {
        position: "bottom-center",
      });
    }
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
            <Timer.Hours formatValue={(value) => `${((value < 10 ? `0${value} : ` : `${value} : `))}`} />
            <Timer.Minutes formatValue={(value) => `${(value < 10 ? `0${value} : ` : `${value} : `)}`} />
            <Timer.Seconds formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`} />
          </>
        )}
      </Timer>
    );
  };

  const renderProgress = (count = 0) => {
    return (
      <IOSSlider
        aria-label='ios slider'
        className={
          (testData?.progress <= 33 && "red1-progress") ||
          (testData?.progress <= 60 && "yellow1-progress") ||
          (testData?.progress <= 100 && "green1-progress")
        }
        value={count}
        valueLabelFormat={(value) => <div>{value}%</div>}
        valueLabelDisplay='on'
        disabled
      />
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
      <Header loginPage={true} page='guidance' subPage='careerTest' />
      <Container>
        <div className='maindiv_prog setmain noselect'>


          <div className='select_test' key={guidanceCategory?.id}>
            {/* <h2>Test Started</h2> */}

            <Row>
              <Col md={8} xs={12}>
                <div className='deatil_box'>
                  <img
                    src={guidanceCategory && guidanceCategory?.image}
                    class='card-img-top'
                    alt='...'
                  ></img>
                  <h4 className='mb-3'>
                    {guidanceCategory && guidanceCategory?.name}
                  </h4>
                  <Row>
                    {guidanceCategory && (
                      <Col md={6} xs={12} className='mb-3'>
                        <span>{t("mockTest.detail.career_test_time")}</span> :{" "}
                        {guidanceCategory && guidanceCategory?.career_test_time}
                      </Col>
                    )}
                  </Row>
                  <Row>
                    {guidanceCategory?.no_of_questions && (
                      <Col md={6} xs={12}>
                        <h6>
                          <span>{t("mockTest.detail.no_of_questions")}</span> :{" "}
                          {guidanceCategory &&
                            guidanceCategory?.no_of_questions}
                        </h6>
                      </Col>
                    )}
                    {guidanceCategory && (
                      <Col md={6} xs={12}>
                        <span>{t("mockTest.detail.total_score")}</span> :{" "}
                        {guidanceCategory && guidanceCategory?.total_score}
                      </Col>
                    )}
                  </Row>
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={3} xs={12} className='mt-1'>
                <button
                  onClick={() => {
                    handleStartCourse()

                  }}

                  disabled={isTestStarted}
                >
                  {isTestStarted
                    ? t("successCareerTestPage.button.1")
                    : t("successCareerTestPage.button.2")}
                </button>
              </Col>
            </Row>
          </div>

          {isTestStarted && (
            <Row className='pt-md-5 pb-md-5'>
              <Col md={12} xs={12} className='text-left'>
                <div ref={target} className='circular_progress_module'>
                  <Stack
                    className='d-flex justify-content-between'
                    spacing={2}
                    direction='row'
                  >
                    <h3>{guidanceCategory?.name}</h3>
                    {/* <button onClick={() => handleFinishQuestion()}>
                    {t("coursesPage.coursesModulePage.button.2")}
                  </button> */}
                  </Stack>
                  {renderProgress(testData?.progress)}
                </div>
              </Col>
            </Row>
          )}
        </div>

        {isTestStarted && (
          <>
            <div className='time_set noselect'>
              <p>
                <img src={timeIcon} alt='timeIcon' /> {t("common.time.5") + " "}
                {showTimer && renderTimmer(testTime)}
              </p>
            </div>

            <Row >
              <Col md={8} xs={12}>
                <div className='que_box noselect'>
                  <h2>{t("allCertificatePage.other.5")}</h2>
                  {isLoading ? (
                    <Skeleton></Skeleton>
                  ) : (
                    <p>
                      {questionNumber?.questionNumber ? questionNumber?.questionNumber : questionNumber}. {testData?.question}
                    </p>
                  )}
                  {testData && (
                    <RadioGroup aria-label='gender' name='radio-buttons-group'>
                      {testData?.optionA &&
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
                            label={testData?.optionA}
                          />
                        ))}
                      {testData?.optionB &&
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
                            label={testData?.optionB}
                          />
                        ))}
                      {testData?.optionC &&
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
                            label={testData?.optionC}
                          />
                        ))}
                      {testData?.optionD &&
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
                            label={testData?.optionD}
                          />
                        ))}
                    </RadioGroup>
                  )}
                </div>{" "}
                <div className='prev_next_btn noselect'>
                  <Row>
                    <Col md={6} xs={6}>
                      {questionNumber > "1" ? (
                        <button
                          className='back_button'
                          onClick={() => handlePrevQuestion()}
                          disabled={!testData?.prev_module}
                        >
                          {t("coursesPage.coursesModulePage.button.1")}
                        </button>
                      ) : (
                        " "
                      )}
                    </Col>

                    <Col md={6} xs={6} className='text-right'>
                      {countData?.total_career_que === questionNumber ? (
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
                    {[...Array(countData?.total_career_que).keys()].map((i) => (
                      <p
                        id={
                          i + 1 <= countData?.user_career_test_count
                            ? "col_gre"
                            : "col_grey"
                        }
                      >
                        {i + 1}
                      </p>
                    ))}
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
          </>
        )}
      </Container>
      <Footer loginPage={false} />
    </div>
  );
}

export default MockTestDetail;
