import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { isMobile } from "react-device-detect";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Timer from "react-compound-timer";

import {
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  Skeleton,
} from "@mui/material";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { Header, Footer, ScrollToTop } from "../../components";
import {
  getGuidanceCategory,
  fetchStartUserCareerTest,
  fetchUserCareerTestCount,
} from "../../store/guidance/action";
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

function CourseTest() {
  const history = useHistory();
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const { isLoading, guidanceCategory, testData, countData } = useSelector(
    (state) => state.guidanceReducer,
  );
  console.log(">>>>>>>>>>>>>>>>>>>>>", guidanceCategory);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [testTime, setTestTime] = useState(null);
  const [selectedCourseCategory, setSelectedCourseCategory] = useState(null);
  const [selectedCourseCategoryValue, setSelectedCourseCategoryValue] =
    useState(null);

  useEffect(() => {
    if (isMobile) {
      toast.error("This page is not available in mobile view.");
      history.push("/");
    }
  }, [history]);

  useEffect(() => {
    dispatch(getGuidanceCategory());
  }, [dispatch]);

  const handleCategoryChange = ({ target: { value } }) => {
    setSelectedCourseCategory(value?.name);
    setSelectedCourseCategoryValue(value);
  };

  const handleStartCourse = async () => {
    const res = await dispatch(
      fetchStartUserCareerTest(selectedCourseCategoryValue?.id),
    );
    if (res?.status_code === 200) {
      const counts = await dispatch(
        fetchUserCareerTestCount(selectedCourseCategoryValue?.id),
      );
      if (counts.status_code === 200 && counts.data.career_time) {
        setIsTestStarted(true);
        setTestTime((parseInt(counts?.data.career_time, 10) || 0) * 60000);
      }
    }
  };

  const handleTestFinished = () => {
    toast.error("Test finishes!");
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

  return (
    <div>
      <Header loginPage={true} page='guidance' subPage='careerTest' />
      <Container>
        <div className='maindiv_prog setmain'>
          <div className='select_test'>
            <h2>Select test Categories</h2>
            <Row>
              <Col md={9} xs={12}>
                <FormControl sx={{ m: 1 }}>
                  <Select
                    displayEmpty
                    value={selectedCourseCategory}
                    onChange={handleCategoryChange}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                      if (selected?.length === 0) {
                        return (
                          <>
                            <em>{"Test Categories"}</em>
                          </>
                        );
                      }
                      return selected;
                    }}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    {guidanceCategory?.map((item) => {
                      return (
                        <MenuItem key={item?.id} value={item}>
                          {item?.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Col>

              <Col md={3} xs={12}>
                <button
                  onClick={() => handleStartCourse()}
                  disabled={isTestStarted}
                >
                  {isTestStarted ? "Test Started" : "Start Test"}
                </button>
              </Col>
            </Row>
          </div>

          {isTestStarted && (
            <Row className='pt-md-5 pb-md-5'>
              <Col md={12} xs={12} className='text-left'>
                <div className='circular_progress_module'>
                  <Stack
                    className='d-flex justify-content-between'
                    spacing={2}
                    direction='row'
                  >
                    <h3>{testData?.career_category}</h3>
                    <button>Finish</button>
                  </Stack>
                </div>
                {renderProgress(testData?.progress)}
              </Col>
            </Row>
          )}
        </div>

        {isTestStarted && (
          <>
            <div className='time_set'>
              <p>
                <img src={timeIcon} alt='timeIcon' /> Time left:{" "}
                {renderTimmer(testTime)}
              </p>
            </div>

            <Row>
              <Col md={8} xs={12}>
                <div className='que_box'>
                  <h2>Question</h2>
                  {isLoading ? (
                    <Skeleton></Skeleton>
                  ) : (
                    <p>1. {testData?.question}</p>
                  )}
                  {testData && (
                    <RadioGroup aria-label='gender' name='radio-buttons-group'>
                      {testData?.optionA && (
                        <FormControlLabel
                          value='1'
                          control={<Radio />}
                          label={testData?.optionA}
                          // onChange={(e) => setAnswer(e.target.value)}
                        />
                      )}
                      {testData?.optionB && (
                        <FormControlLabel
                          value='2'
                          control={<Radio />}
                          label={testData?.optionB}
                          // onChange={(e) => setAnswer(e.target.value)}
                        />
                      )}
                      {testData?.optionC && (
                        <FormControlLabel
                          value='3'
                          control={<Radio />}
                          label={testData?.optionC}
                          // onChange={(e) => setAnswer(e.target.value)}
                        />
                      )}
                      {testData?.optionD && (
                        <FormControlLabel
                          value='4'
                          control={<Radio />}
                          label={testData?.optionD}
                          // onChange={(e) => setAnswer(e.target.value)}
                        />
                      )}
                    </RadioGroup>
                  )}
                </div>{" "}
                <div className='prev_next_btn'>
                  <Row>
                    <Col md={6} xs={6}>
                      <button className='back_button'>back</button>
                    </Col>

                    <Col md={6} xs={6} className='text-right'>
                      <button className='next_button'>next</button>
                    </Col>
                  </Row>
                </div>
              </Col>

              <Col md={4} xs={12}>
                <div className='que_status'>
                  <h2>Questions Status</h2>
                  <div className='que_num' id='col_gre'>
                    {[...Array(countData?.total_career_que).keys()].map((i) => (
                      <p>{i}</p>
                    ))}
                  </div>
                </div>
                <div className='ans_not'>
                  <ul>
                    <li>
                      <span className='dotte1'></span> Answered
                    </li>
                    <li>
                      <span className='dotte2'></span> Not visited
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </>
        )}
      </Container>
      <ScrollToTop />
      <Footer loginPage={false} />
    </div>
  );
}

export default CourseTest;
