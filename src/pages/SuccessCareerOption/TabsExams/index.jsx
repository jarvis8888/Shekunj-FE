import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// import Nikita from "../../../assets/images/Nikita-Sharma.png";

import {
  getGuidanceCategory,
  getGuidanceCategoryDetail,
  resetCategoryDetail,
} from "../../../store/guidance";
import backButtonImg from "../../../assets/images/Guidance/back-arrow.png";
// import Share from "../../../assets/images/Guidance/share-button.png";
// import Bookmark from "../../../assets/images/Guidance/bookmark-button.png";
import "./index.scss";
import { useTranslation } from "react-i18next";
import { adsList } from "../../../store/ads";
import axios from "axios";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const ref = useRef(null);
  const [categoryDetail, setCategoryDetail] = useState({
    isVisible: false,
    id: null,
  });
  const [showGovtExams, setShowGovtExams] = useState(false);
  const { careerOptions, guidanceCategoryDetail, isLoading } = useSelector(
    (state) => state.guidanceReducer,
  );
  const [careerOptionBoxAds, setCareerOptionBoxAds] = useState([]);
  const [image, setImage] = useState("NA");
  const [adds, setAdds] = useState([]);
  const { t } = useTranslation();

  const { id } = useParams();

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>code below>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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
  //             return item.image_type == "career_option";
  //           });
  //           let findImage =
  //             filterArray.length > 0 ? filterArray[0].image : "NA";
  //           setImage(findImage);
  //           setCareerOptionBoxAds(filterArray);
  //         }
  //       })   .catch((error) => {
  //         // setMessage("No data found");
  //         console.log(error);
  //     })
  //   });
  //   dispatch(adsList());
  // }, [dispatch]);

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>latest code below >>>>>>>>>>>>>>>>>>>>>

  useEffect(() => {
    dispatch(adsList())
    navigator.geolocation.getCurrentPosition(async function (position, values) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      let params = {
        latitude: latitude.toString(),
        longitude: longitude.toString(),
      }
      axios
        .get(
          `/private_adds/private_add?latitude=${latitude}&longitude=${longitude}`,
        )
        .then((response) => {
          if (response && response.data.results.length > 0) {
            let filterArray1 = response.data.results.filter((item, index) => {

              return item.image_type == "career_option";

            });
            setCareerOptionBoxAds(filterArray1);
            // console.log("filterArray1career_option",filterArray1)
          }
        })
    },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
        // alert("Your location is blocked")    
        axios
          .get(
            `/private_adds/private_add`,
          )
          .then((response) => {
            if (response && response.data.results.length > 0) {
              let filterArray1 = response.data.results.filter((item, index) => {
                return item.image_type == "career_option";
              });
              setCareerOptionBoxAds(filterArray1);
              // console.log("filterArray1coursebox",filterArray1) 
            }
          })
      }
    )
  }, [])


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

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const handleChangeGovtExam = (value) => {
    setShowGovtExams(false);
    setCategoryDetail(false);
    setValue(0);
    dispatch(getGuidanceCategory());
  };

  useEffect(() => {
    dispatch(getGuidanceCategoryDetail(id));
    // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [dispatch, id]);

  const handleExamChange = (obj, id) => {
    setShowGovtExams(true);
    setCategoryDetail(false);
    setValue(0);
    setTabValue(obj);
    dispatch(resetCategoryDetail());
    dispatch(getGuidanceCategoryDetail(id));
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFullView = (id) => {
    setShowGovtExams(false);
    setCategoryDetail({ isVisible: true, id: id });
  };

  const onBackChange = (obj, id) => {
    setCategoryDetail(false);
    setShowGovtExams(true);
  };

  function renderExamTypes() {
    return (
      <Col md={4} xs={12}>
        {/* <Tab
          label={t("successCareerOption.heading.3")}
          onClick={() => handleChangeGovtExam(true)}
          {...a11yProps(0)}
        /> */}
        <Tabs
          orientation='vertical'
          variant='scrollable'
          value={categoryDetail && tabValue}
          onChange={handleChange}
          aria-label='categories'
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          {careerOptions?.map((g, i) => (
            <>
              <Tab
                key={g?.id}
                label={g?.name}
                onClick={() => handleExamChange(i, g?.id)}
                iconPosition='start'
                {...a11yProps(1)}
              />
            </>
          ))}
        </Tabs>
      </Col>
    );
  }


  return (
    <>
      <div className='Com_title'>
        <h1>{t("successCareerOption.heading.2")}</h1>
      </div>

      <Box
        sx={{
          flexGrow: 1,
          bgColor: "background.paper",
        }}
      >
        <Row>
          {renderExamTypes()}
          {!showGovtExams && !categoryDetail && (
            <div className='col-8 text-center mt-5'>
              {t("successCareerOption.other.1")}
            </div>
          )}
          <Col md={8} xs={12} >
            <TabPanel value={value} index={0} >
              {/* <Row > */}
                <Container ref={ref} className="wrap-container">
                  {/* {showGovtExams && careerOptions && ( */}
                  {showGovtExams &&
                    careerOptions &&
                    guidanceCategoryDetail?.length > 0 &&
                    guidanceCategoryDetail?.map(
                      (guidanceCategoryDetail, index) => {
                        if(guidanceCategoryDetail?.image || guidanceCategoryDetail?.name){
                          return(
                            <div
                                  // ref={ref}
                                  onClick={() =>
                                    handleFullView(guidanceCategoryDetail?.id)
                                  }
                                  className='tabs_box success_test_responsive'
                                  key={guidanceCategoryDetail?.id}
                                >
                                  <h2>{guidanceCategoryDetail?.name}</h2>
                                  <img
                                    src={guidanceCategoryDetail?.image}
                                    className='GuidanceOptionCardImage'
                                  ></img>
                                  <br />
                                  <button
                                    onClick={() =>
                                      handleFullView(guidanceCategoryDetail?.id)
                                    }
                                  >
                                    {t("successCareerOption.button.1")}
                                  </button>


                                </div>
                          )
                        }
                        // return (
                        //   <Row>
                            
                        //     {/* <Col md={6} xs={12}> */}
                        //     {
                        //       guidanceCategoryDetail?.image || guidanceCategoryDetail?.name ?
                                
                        //         : ""
                        //     }

                        //     <br />
                        //     <div>
                        //       {index == 0 ? (
                        //         <div>
                        //           {careerOptionBoxAds.length > 0 && (
                        //             // <div className='col-md-12'>
                        //             <div
                        //               className='col-md-6 tabs-box'
                        //               onClick={() => addEmail(careerOptionBoxAds[0]?.add_email)}
                        //             >
                        //               <a href={careerOptionBoxAds[0]?.url_adds} target='_blank'>
                        //                 <img
                        //                   src={careerOptionBoxAds[0]?.image}
                        //                   alt='Image'
                        //                   className='GuidanceOptionCardImageAdd'
                        //                 />
                        //               </a>
                        //             </div>
                        //           )}
                        //         </div>
                        //       ) : (
                        //         ""
                        //       )}
                        //     </div>
                        //     <br />
                        //     {/* </Col> */}
                        //   </Row>
                        // );
                      },
                    )}

                  {/* )} */}
                  {/* </Row> */}
                </Container>
              {/* </Row> */}
              {/* <>
                                <div

                                  className='col-md-12 ads_home_cover_careerOption'
                                  onClick={() =>
                                    addEmail(careerOptionBoxAds[0]?.add_email)
                                  }
                                >
                                  {careerOptionBoxAds.length > 0 && (
                                    <div >
                                      <a
                                        href={careerOptionBoxAds[0]?.url_adds}
                                        target='_blank'
                                      >
                                        <img
                                          src={careerOptionBoxAds[0]?.image}
                                          alt='Image'
                                          className='google_ads_home_careerOption'
                                        />
                                      </a>
                                      <div className='overlay'></div>
                                    </div>
                                  )}
                                </div>

                            </> */}
              {/* {careerOptionBoxAds.length > 0 && (
                  // <div className='col-md-12'>
                  <div
                    className='col-md-12'
                    onClick={() => addEmail(careerOptionBoxAds[0]?.add_email)}
                  >
                    <a href={careerOptionBoxAds[0]?.url_adds} target='_blank'>
                      <img
                        src={careerOptionBoxAds[0]?.image}
                        alt='Image'
                        className='google_add_courses'
                      />
                    </a>
                  </div>
                )}
     */}

            </TabPanel>

            {categoryDetail.isVisible &&
              guidanceCategoryDetail?.length > 0 &&
              guidanceCategoryDetail?.map((guidanceCategoryDetail) => {

                if (categoryDetail.id == guidanceCategoryDetail.id) {
                  return (
                    <TabPanel>
                      {/* {categoryDetail && guidanceCategoryDetail && ( */}

                      {/* // <TabPanel key={guidanceCategoryDetail?.id}> */}

                      <div className='banking-exampage'>
                        <div>
                          <span
                            className='back_button'
                            onClick={() => onBackChange()}
                          >
                            <img src={backButtonImg} alt='' />
                            {t("successCareerOption.other.2")}
                          </span>
                        </div>
                        <div className='banking-examheader'>
                          <h2>{guidanceCategoryDetail?.category_name}</h2>
                        </div>
                        {guidanceCategoryDetail?.description ? (
                          <div
                            className='locationdiv'
                            dangerouslySetInnerHTML={{
                              __html: guidanceCategoryDetail?.description,
                            }}
                          ></div>
                        ) : (
                          <div className='text-center'>
                            {isLoading
                              ? t("common.loading")
                              : t("common.noDataFound")}
                          </div>
                        )}
                        <hr className='border-colorbottom'></hr>
                      </div>
                    </TabPanel>
                  );
                }
              })}
          </Col>
        </Row>
      </Box>
    </>
  );
}
