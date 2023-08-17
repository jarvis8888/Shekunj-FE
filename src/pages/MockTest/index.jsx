import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { useHistory, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Timer from "react-compound-timer";
import useExitPrompt from "../../hooks/useExitPromt";
import Cross from "../../assets/icons/cross.png";
import Search from "../../assets/images/search_white_icon.svg";
import mockimgb from "../../assets/images/mockbanner.png";
import boderarrow from "../../assets/images/borderarrow.png";

// import Search from "../../assets/icons/search1.png";
import { Helmet } from "react-helmet-async";
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
import axios from "axios";
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
import { adsList } from "../../store/ads";
import { withHeaderFooter } from "../../hocs/withHeaderFooter";
import { CustomLoader } from "../../components/customLoader/CustomLoader";
import { NoDataFound } from "../../components/noDataFound/NoDataFound";

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

function MockTest() {
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
  const [selectedCourseCategory, setSelectedCourseCategory] = useState(null);
  const [selectedCourseCategoryValue, setSelectedCourseCategoryValue] =
    useState(null);
  const [mockTestBoxAds, setMockTestBoxAds] = useState([]);
  const [image, setImage] = useState("NA");
  const [adds, setAdds] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [tempData, setTempData] = useState([]);

  const history = useHistory();
  const dispatch = useDispatch();
  const detect = useDeviceDetect();
  const { t } = useTranslation();
  const { lan } = useSelector((state) => state.languageReducer);

  const SearchFilterHandle = (e) => {
    e.preventDefault();
    dispatch(getGuidanceCategory(`?search=${searchInput}`));
  };

  const handleResetSearch = () => {
    dispatch(getGuidanceCategory());
    setSearchInput("");
  };

  // eslint-disable-next-line no-unused-vars
  const { isLoading, guidanceCategory, testData, countData } = useSelector(
    (state) => state?.guidanceReducer,
  );

  const progress = Math.round(100 / (countData?.total_career_que || 0)) || 0;

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
                return item.image_type == "mock_test";
              });
              setMockTestBoxAds(filterArray1);
              // console.log("filterArray1mock_test",filterArray1)
            }
          });
      },
      function (error) {
        // alert("Your location is blocked")
        axios.get(`/private_adds/private_add`).then((response) => {
          if (response && response.data.results.length > 0) {
            let filterArray1 = response.data.results.filter((item, index) => {
              return item.image_type == "mock_test";
            });
            setMockTestBoxAds(filterArray1);
            // console.log("filterArray1coursebox",filterArray1)
          }
        });
      },
    );
  }, []);

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

  useEffect(() => {
    const nv = localStorage.getItem("selectedCourseCategoryValue");
    localStorage.removeItem("selectedCourseCategoryValue");
    localStorage.removeItem("isCarrerTestStarted");
    setShowExitPrompt(false);
    if (nv) {
      dispatch(endTest(nv, history));
      history.push(routingConstants.CAREER_TEST_RESULT + nv);
    }
  }, []);

  useEffect(() => {
    return () => {
      const nv = localStorage.getItem("selectedCourseCategoryValue");
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
    const data = {
      answer,
      career_test: testData?.id,
    };
    if (answer) {
      dispatch(
        postAnswer(data, history, selectedCourseCategoryValue?.id, true),
      );
      setAnswer("");
    } else {
      toast.error("Select option for next question", {
        position: "bottom-center",
      });
    }
  };

  React.useEffect(() => {
    if (selectedCourseCategoryValue?.id) {
      dispatch(
        fetchUserCareerTestCount(selectedCourseCategoryValue?.id, history),
      );
    }
  }, [dispatch, toggle, history, selectedCourseCategoryValue?.id]);

  React.useEffect(() => {
    if (countData && countData?.career_time > 0) {
      setTestTime(parseInt(countData?.career_time, 10) * 60000);
      setShowTimer(true);
      // localStorage.setItem("isCarrerTestStarted", true);
    }
  }, [countData, countData?.career_time]);

  useEffect(() => {
    dispatch(getGuidanceCategory());
  }, [dispatch, lan]);

  const handleTestFinished = () => {
    dispatch(endTest(selectedCourseCategoryValue?.id));
    toast.error(t("error.other.2"));
    history.push(
      routingConstants.CAREER_TEST_RESULT + selectedCourseCategoryValue?.id,
    );
  };

  const handlePrevQuestion = () => {
    if (questionNumber > 1) setQuestionNumber((prev) => prev - 1);
    dispatch(
      fetchStartUserCareerTest(
        selectedCourseCategoryValue?.id,
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
        postAnswer(data, history, selectedCourseCategoryValue?.id, false),
      );
      setAnswer("");
      if (testData?.answer) {
        dispatch(
          fetchStartUserCareerTest(
            selectedCourseCategoryValue?.id,
            history,
            testData?.next_module,
          ),
        );
      } else {
        dispatch(
          fetchStartUserCareerTest(
            selectedCourseCategoryValue?.id,
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
            <Timer.Hours /> :
            <Timer.Minutes />:
            <Timer.Seconds />
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

  useEffect(() => {
    checkFunction();
  }, [guidanceCategory]);

  const shuffleFun = (gb, index) => {
    if (gb?.id === "advertistment") {
      return (
        <>
          {mockTestBoxAds?.length > 0 ? (
            <div className="container">
              <div className="row">
                <div className='col-md-3'>
                  <div onClick={() => addEmail(mockTestBoxAds[0]?.add_email)}>
                    <a href={mockTestBoxAds[0]?.url_adds} target='_blank'>
                      <img
                        src={mockTestBoxAds[0]?.image}
                        alt='mockTestBoxAds'
                        className='guidanceOptionImageAdd'
                      />
                    </a>
                    <div className='overlay'></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      );
    } else {
      return (
     
        <div className='col-xl-3 col-lg-4 col-md-4 col-sm-6'>
          <div className="sk-mtask-box">
            <CardMedia
              className='guidanceOptionImage'
              component='img'
              image={gb?.image}
              alt='image'
            />
            <CardContent>
              <Typography
                variant='h6'
                className='guidanceOptionTitle limited-text-mock-test'
                fullWidth
              >
                {gb?.name}
              </Typography>
            </CardContent>
            <Typography
              sx={{ mb: 1.5 }}
              className='guidanceOptionTitle2'
              color='text.secondary'
              fullWidth
            >
              {t(`mockTest.total_time`)}: {gb?.career_test_time}
            </Typography>
            <CardActions className='actions'>
              <Button
                size='small'
                variant='contained'
                href={gb && gb.form_link}
              >
                <Link
                  to={routingConstants?.MOCKTEST + gb?.slug}
                  className=''
                  key={gb?.id}
                >
                  {t(`mockTest.take_test`)}
                </Link>
              </Button>
            </CardActions>
          </div>
        </div>
      
      );
    }
  };

  const checkFunction = () => {
    let num = Math.floor(Math.random() * (13 - 0) + 0);
    let res = guidanceCategory;
    let dummydata = {
      id: "advertistment",
    };
    Object.values(res).splice(num, 0, dummydata);
    if (res) {
      setTempData(res);
    }
  };

  return (
    <div className='noselect'>
      <Helmet>
        <title>Free Online Career Mock Test Series - Shekunj.com</title>
        <link rel='canonical' href='https://www.shekunj.com/mock-test/' />
        <meta
          name='description'
          content='Practice Free Online Test Series & Mock Tests for Banking, SSC, JEE, 
          NEET, and other Government and Non-Government Exams and score high marks!'
        />
        <meta
          name='keywords'
          content='free online mock test, online career test, online career assessment, test series, free online mock test series,'
        />
      </Helmet>

      <div className='SuccStory_banner_mock'>
        {" "}
        <div className='container sk-custom-container'>
          <div className='row'>
            <div className='col-md-6' data-aos='slide-up'>
              <div className='sk-mockContent-box'>
                <div className='global_img'>
                  <img src={global} alt='' className='vert-move' />
                </div>
                <div className=''>
                  <h2> {t("Shekunj Online Test..")}</h2>
                  <p> Have a look how SheKunj has played an important role</p>
                </div>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='sk-mockImg-box'>
                <img src={mockimgb} alt='mock_test_image' />
              </div>
            </div>
          </div>
          <span className='borarrow'>
            <img src={boderarrow} alt='bimage' />
          </span>
        </div>
      </div>
      <div className='Div_Mock_Title'>
        <div className='container sk-custom-container'>
          <div className='mock_test_tit noselect'>
            <Row>
              <Col md={6} xs={12}>
                <h2>Free Online Mock Test Series</h2>
                {/* <p>
                  {t("careerTopColleges.other.2")}{" "}
                  {topCollages?.collage_list?.length || 0}{" "}
                  {t("careerTopColleges.other.3")}
                </p> */}
              </Col>
              <Col md={6} xs={12}>
                <div className='input-group searchSection_mock'>
                  <form onSubmit={SearchFilterHandle}>
                    <div className='d-flex'>
                      <div className='wraper '>
                        <input
                          type='text'
                          onChange={(e) => setSearchInput(e.target.value)}
                          value={searchInput}
                          name='searchInput'
                          class='form-control searchInput_mock'
                          placeholder='Search here...'
                        />
                      </div>
                      <div className='d-flex mocktest_submit1'>
                        <button type='submit' className='searchBtn1_mock'>
                          <img
                            src={Search}
                            alt='Search'
                            className='searchIcon_mock'
                          />
                        </button>
                        <img
                          src={Cross}
                          alt='Cross'
                          className='searchclose_mock'
                          onClick={() => handleResetSearch()}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      {/* <Container class="event_responsive13"> */}
      <div className='container sk-custom-container'>
        <div className='row'>
          
            {/* {guidanceCategory?.length > 0 &&
            guidanceCategory?.map((gb, index) => { */}
            {isLoading ? (
              <CustomLoader />
            ) : tempData?.length > 0 ? (
              tempData?.map((gb, index) => {
                return (
                  <>
                    {/* <Grid Container spacing={2} className='gridContainer flex'>
                    <Col md={1} xl={12}>
                      <Card className='GuidanceOptionCard noselect'>
                        <CardMedia
                          className='guidanceOptionImage'
                          component='img'
                          image={gb?.image}
                          alt='image'
                        />
                        <CardContent>
                          <Typography
                            variant='h6'
                            className='guidanceOptionTitle limited-text-mock-test'
                            fullWidth
                          >
                            {gb?.name}
                          </Typography>
                        </CardContent>
                        <Typography
                          sx={{ mb: 1.5 }}
                          className='guidanceOptionTitle2'
                          color='text.secondary'
                          fullWidth
                        >
                          Total Time: {gb?.career_test_time}
                        </Typography>
                        <CardActions className='actions'>
                          <Button
                            size='small'
                            variant='contained'
                            href={gb && gb.form_link}
                          >
                            <Link
                              to={routingConstants.MOCKTEST + gb?.id}
                              className=''
                              key={gb?.id}
                            >
                              Start Test
                            </Link>
                          </Button>
                        </CardActions>
                      </Card>
                    </Col>
                  </Grid> */}

                    {shuffleFun(gb, index)}

                    {/* {Math.floor(Math.random() * (12 - 0) + 0) == index ? (
                    <>
                      <Grid
                        Container
                        spacing={2}
                        className='gridContainer flex'
                      >
                        <Col md={1} xl={12}>
                          <Card className='GuidanceOptionCard '>
                            {mockTestBoxAds.length > 0 && (
                              <div
                                onClick={() =>
                                  addEmail(mockTestBoxAds[0]?.add_email)
                                }
                              >
                                <a
                                  href={mockTestBoxAds[0]?.url_adds}
                                  target='_blank'
                                >
                                  <img
                                    src={mockTestBoxAds[0]?.image}
                                    alt='Image'
                                    className='guidanceOptionImageAdd'
                                  />
                                </a>
                                <div className='overlay'></div>
                              </div>
                            )}
                          </Card>
                        </Col>
                      </Grid>
                    </>
                  ) : (
                    <>
                      { index == 10 && (
                        <>
                          <Grid
                            Container
                            spacing={2}
                            className='gridContainer flex'
                          >
                            <Col md={1} xl={12}>
                              <Card className='GuidanceOptionCard '>
                                {mockTestBoxAds.length > 0 && (
                                  <div
                                    onClick={() =>
                                      addEmail(mockTestBoxAds[0]?.add_email)
                                    }
                                  >
                                    <a
                                      href={mockTestBoxAds[0]?.url_adds}
                                      target='_blank'
                                    >
                                      <img
                                        src={mockTestBoxAds[0]?.image}
                                        alt='Image'
                                        className='guidanceOptionImageAdd'
                                      />
                                    </a>
                                    <div className='overlay'></div>
                                  </div>
                                )}
                              </Card>
                            </Col>
                          </Grid>
                        </>
                      )}
                    </>
                  )} */}
                  </>
                );
              })
            ) : (
              <NoDataFound />
            )}
          </div>
        </div>
    </div>
  );
}

export default withHeaderFooter(MockTest);
