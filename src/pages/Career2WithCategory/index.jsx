import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { routingConstants } from "../../utils/constants";
import httpServices from "../../utils/ApiServices";
import { AccordionComponent, Footer, Header, SEO } from "../../components";
import {
  getGovernmentExams,
  reSetFilterValue,
  toggleCollapseValue,
} from "../../store/career";
import { noImage } from "../../utils/ApiServices";
import { adsList } from "../../store/ads";
import "../HomePage/index.scss";
import "./index.scss";
import "../Career1/index.scss";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import Pagination from "../../components/Pagination";
import { CustomLoader } from "../../components/customLoader/CustomLoader";
import { NoDataFound } from "../../components/noDataFound/NoDataFound";
import NewPagination from "../../components/Pagination/NewPagination";
import { withHeaderFooter } from "../../hocs/withHeaderFooter";

const Career2WithCategory = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const location = useLocation();
  const { id, name } = location.state;
  console.log("🚀 ~ Career2WithCategory ~ id:", id);
  const { governmentExams, isLoading } = useSelector(
    (state) => state.careerReducer,
  );
  const { lan } = useSelector((state) => state.languageReducer);
  const [offset, setOffset] = useState(0);
  const [flag, setFlag] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [GovtCategoryData, setGovtCategoryData] = useState([]);
  const [GovtListData, setGovtListData] = useState([]);
  const pageLimit = 5;
  useEffect(() => {
    dispatch(reSetFilterValue());
    dispatch(getGovernmentExams(false, pageLimit, offset));
  }, [lan]);

  const transformImg = (image) => {
    return image ? image : noImage;
  };
  const [govBannerAds, setGovBannerAds] = useState([]);
  const [govBoxAds, setGovBoxAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [govtScmSideAdds, setGovtScmSideAdds] = useState([]);
  const [image, setImage] = useState("NA");
  const detect = useDeviceDetect();

  const page_adds = JSON.parse(sessionStorage.getItem("current_adds"));
  const findAdds = (addslen, len) => {
    let x = 0;

    let arr = [];
    for (let i = 0; i < len; i++) {
      let y;
      if (x + 1 >= addslen) {
        y = 0;
      } else {
        y = x + 1;
      }
      if (x >= addslen) {
        x = 0;
        y = 1;
      }

      arr.push([x, y]);
      if (x + 1 >= addslen) {
        x = 1;
      } else {
        x += 2;
      }
    }
    return arr;
  };
  useEffect(() => {
    if (
      governmentExams?.govt_list?.results?.length > 0 &&
      govBoxAds?.length &&
      flag
    ) {
      const addslen = govBoxAds?.length;
      let len = governmentExams?.govt_list?.count / pageLimit;
      len = Math.trunc(len);
      console.log(len, addslen);
      const adds_arr = findAdds(addslen, len);
      sessionStorage.setItem(
        "current_adds",
        JSON.stringify({ addIndex: 0, addsData: adds_arr }),
      );
      setFlag(false);
    }
  }, [governmentExams, govBoxAds]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async function (position, values) {
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
          if (response.data.results.length > 0) {
            let filterArray = response.data.results.filter((item, index) => {
              return (
                Array.isArray(item.image_type) &&
                item.image_type.some(
                  (type) => type.image_type === "govt_scm_cover",
                )
              );
            });
            let findImage =
              filterArray.length > 0 ? filterArray[0].image : "NA";
            setImage(findImage);
            setGovBannerAds(filterArray);
          }
        })
        .catch((error) => {
          // setMessage("No data found");
          console.log(error);
        });
    });
    dispatch(adsList());
  }, [dispatch]);

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
              let filterArray = response.data.results.filter((item, index) => {
                return (
                  Array.isArray(item.image_type) &&
                  item.image_type.some(
                    (type) => type.image_type === "govt_scm_cover",
                  )
                );
              });
              let findImage =
                filterArray.length > 0 ? filterArray[0].image : "NA";
              setImage(findImage);
              setGovBannerAds(filterArray);
              let filterArray1 = response.data.results.filter((item, index) => {
                return (
                  Array.isArray(item.image_type) &&
                  item.image_type.some(
                    (type) => type.image_type === "govt_scm_box",
                  )
                );
              });
              setGovBoxAds(filterArray1);

              let filterArray2 = response.data.results.filter((item, index) => {
                return (
                  Array.isArray(item.image_type) &&
                  item.image_type.some(
                    (type) => type.image_type === "govt_scm_side_ads",
                  )
                );
              });
              setGovtScmSideAdds(filterArray2);
            }
          });
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
        // alert("Your location is blocked")
        axios.get(`/private_adds/private_add`).then((response) => {
          if (response && response.data.results.length > 0) {
            let filterArray = response.data.results.filter((item, index) => {
              return (
                Array.isArray(item.image_type) &&
                item.image_type.some(
                  (type) => type.image_type === "govt_scm_cover",
                )
              );
            });
            let findImage =
              filterArray.length > 0 ? filterArray[0].image : "NA";
            setImage(findImage);
            setGovBannerAds(filterArray);
            let filterArray1 = response.data.results.filter((item, index) => {
              return (
                Array.isArray(item.image_type) &&
                item.image_type.some(
                  (type) => type.image_type === "govt_scm_box",
                )
              );
            });
            setGovBoxAds(filterArray1);
            let filterArray2 = response.data.results.filter((item, index) => {
              return (
                Array.isArray(item.image_type) &&
                item.image_type.some(
                  (type) => type.image_type === "govt_scm_side_ads",
                )
              );
            });
            setGovtScmSideAdds(filterArray2);
          }
        });
      },
    );
  }, []);

  //
  //   const totalPages = Math.ceil(governmentExams?.govt_list?.count / pageLimit);

  //   const visiblePages = Array.from({ length: 5 })
  //     .map((_, index) => startPage + index)
  //     .filter((pageNumber) => pageNumber <= totalPages);

  // Handle next page click
  //   const nextPage = () => {
  //     dispatch(getGovernmentExams(true, pageLimit, offset + pageLimit));
  //     if (page_adds) {
  //       setTimeout(() => {
  //         sessionStorage.setItem(
  //           "current_adds",
  //           JSON.stringify({ ...page_adds, addIndex: page_adds?.addIndex + 1 }),
  //         );
  //       }, 500);
  //     }
  //     if (currentPage < totalPages) {
  //       setCurrentPage(currentPage + 1);
  //       setOffset(offset + pageLimit);
  //       // setEndPage(endPage + 1);
  //     }
  //     if (startPage + 1 < totalPages) {
  //       setStartPage(startPage + 1);
  //     }
  //   };

  // Handle previous page click
  //   const previousPage = () => {
  //     dispatch(getGovernmentExams(true, pageLimit, offset - pageLimit));

  //     if (page_adds) {
  //       setTimeout(() => {
  //         sessionStorage.setItem(
  //           "current_adds",
  //           JSON.stringify({ ...page_adds, addIndex: page_adds?.addIndex - 1 }),
  //         );
  //       }, 500);
  //     }
  //     if (currentPage > 1) {
  //       setCurrentPage(currentPage - 1);
  //       setOffset(offset - pageLimit);
  //       // setEndPage(endPage - 1);
  //     }
  //     if (startPage > 1) {
  //       setStartPage(startPage - 1);
  //     }
  //   };

  //   const handleClick = (pageNumber) => {
  //     setCurrentPage(pageNumber);
  //     const newOffset = (pageNumber - 1) * pageLimit;
  //     dispatch(getGovernmentExams(true, pageLimit, newOffset));
  //     if (page_adds) {
  //       setTimeout(() => {
  //         sessionStorage.setItem(
  //           "current_adds",
  //           JSON.stringify({ ...page_adds, addIndex: page_adds?.addIndex + 1 }),
  //         );
  //       }, 500);
  //     }
  //     setOffset(newOffset);
  //   };

  const getGovernmentWithCategoryData = async (limit, offset, id) => {
    setLoading(true);
    try {
      const url = `/career/government-exam/?limit=${limit}&offset=${offset}&govt_category_id__in=${id} `;
      const data = await httpServices.get(url);
      console.log("🚀 ~ getGovernmentWithCategoryData ~ data:", data);
      const { govt_category, govt_list } = data;
      setGovtCategoryData(govt_category);
      setGovtListData(govt_list);

      setLoading(false);
    } catch {
      setLoading(false);
    }
  };
  // Calculate the total number of pages
  const totalPages = Math.ceil(GovtListData?.count / pageLimit);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    setOffset((pageNumber - 1) * pageLimit); // Update the offset based on the clicked page number
  };

  // Handle next page click
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setOffset(offset + pageLimit);
      // setEndPage(endPage + 1);
    }
    if (startPage + 1 < totalPages) {
      setStartPage(startPage + 1);
    }
  };

  // Handle previous page click
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setOffset(offset - pageLimit);
      // setEndPage(endPage - 1);
    }
    if (startPage > 1) {
      setStartPage(startPage - 1);
    }
  };

  const visiblePages = Array.from({ length: 4 })
    .map((_, index) => startPage + index)
    .filter((pageNumber) => pageNumber <= totalPages);

  useEffect(() => {
    getGovernmentWithCategoryData(pageLimit, offset, id);
  }, [id, offset, lan]);

  return (
    <>
      <SEO
        title='List of Government Schemes in India - Benefits - Shekunj.com'
        link='https://www.shekunj.com/government-schemes-in-india/'
        keywords='government policies and Schemes in india government
  schemes and programs new government schemes in india central government schemes'
        description='List of Government Schemes: Women Empowerment Schemes, Beti Bachao Beti Padhao, Start Up India Scheme, Bima
  Yojana, women helpline scheme.'
      />

      <div>
        <section className='sk-topschool-banner'>
          <div className='container sk-custom-container'>
            <Row>
              {govBannerAds.length > 0 && (
                <div
                  className='col-md-12 ads_gov_cover'
                  onClick={() => addEmail(govBannerAds[0]?.add_email)}
                >
                  <a
                    href={govBannerAds[0]?.url_adds}
                    target='_blank'
                    rel='noreferrer'
                  >
                    {detect.isMobile
                      ? govBannerAds[0]?.image_mobile && (
                          <img
                            src={govBannerAds[0]?.image_mobile}
                            // src={govBannerAds[0]?.image}
                            alt='govBannerAds'
                            className='ads_gov'
                          />
                        )
                      : govBannerAds[0]?.image && (
                          <img
                            src={govBannerAds[0]?.image}
                            // src={govBannerAds[0]?.image}
                            alt='govBannerAds '
                            className='ads_gov'
                          />
                        )}
                  </a>
                </div>
              )}
            </Row>
          </div>
        </section>

        <section className='sk-Topmiddle-sec'>
          <div className='container sk-custom-container'>
            <div className='noselect sk-spaceBottom-school'>
              <h1 className='sk-storyHeading-top'>{name}</h1>
              <div class='sk-thireChangescolor-back'>
                <button class='sk-loadMore' type='button'>
                  <KeyboardBackspaceIcon /> Back
                </button>
              </div>
            </div>
            <div className='row'>
              <Col md={8} className='mx-auto'>
                <>
                  {isLoading ? (
                    <CustomLoader />
                  ) : GovtListData?.results?.length > 0 ? (
                    GovtListData?.results?.map(
                      (c, index) =>
                        c?.name && (
                          <>
                            <div
                              className=' noselect'
                              style={{ height: "auto" }}
                            >
                              <Row>
                                <Col md={12} xs={12}>
                                  <div className='sk-topSchoolbox-list'>
                                    <div className='sk-topLeftimg-box'>
                                      <Link
                                        to={
                                          routingConstants.GOVERNMENT_SCHEMES +
                                          c.id
                                        }
                                        key={c?.id}
                                      >
                                        <img
                                          srcSet={transformImg(c?.logo)}
                                          alt='...'
                                          className=''
                                        />
                                      </Link>
                                    </div>
                                    <div className='top_col_content'>
                                      <h3 className='sk-innerContent-design'>
                                        <Link
                                          to={
                                            routingConstants.GOVERNMENT_SCHEMES +
                                            c.id
                                            // c.name.split(" ").join("_")
                                          }
                                          className=''
                                          key={c?.id}
                                        >
                                          {c && c.name}
                                        </Link>
                                      </h3>

                                      <ul class='list-inline list-unstyled'>
                                        {c.state && (
                                          <li>
                                            <span>
                                              {t("careerGovExams.other.8")}
                                            </span>{" "}
                                            : {c && c.state}
                                          </li>
                                        )}
                                        {/* {c.state && <li>|</li>} */}
                                        {c.scheme_level && (
                                          <li>
                                            <span>
                                              {t("careerGovExams.other.4")}
                                            </span>{" "}
                                            : {c && c.scheme_level}
                                          </li>
                                        )}

                                        {/* {c.scheme_level && <li>|</li>} */}

                                        {c.age_criteria && (
                                          <li>
                                            <span>
                                              {t("careerGovExams.other.6")}
                                            </span>{" "}
                                            : {c && c.age_criteria}
                                          </li>
                                        )}
                                      </ul>

                                      <Row>
                                        {c.whom_this_scheme_for && (
                                          <Col md={12} xs={12}>
                                            <span className='gov_scm_heading'>
                                              {t("careerGovExams.other.5")}
                                            </span>{" "}
                                            : {c && c.whom_this_scheme_for}
                                          </Col>
                                        )}
                                        {c.benefits && (
                                          <Col md={12} xs={12}>
                                            <span className='gov_scm_heading'>
                                              {t("careerGovExams.other.7")}
                                            </span>{" "}
                                            {/* : {c && c.benefits} */}
                                            <p>
                                              <div
                                                dangerouslySetInnerHTML={{
                                                  __html: `<div>${
                                                    c &&
                                                    c.benefits.substr(0, 150)
                                                  }</div>`,
                                                }}
                                              />
                                            </p>
                                            <div className='sk-Topview-more'>
                                              <Link
                                                className=''
                                                to={
                                                  routingConstants.GOVERNMENT_SCHEMES +
                                                  c.id
                                                  // c.name.split(" ").join("_")
                                                }
                                                key={c?.id}
                                              >
                                                Read More...
                                              </Link>
                                            </div>
                                          </Col>
                                        )}
                                      </Row>
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </>
                        ),
                    )
                  ) : (
                    <NoDataFound />
                  )}
                </>

                {governmentExams?.govt_list?.count > pageLimit && (
                  <>
                    <NewPagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      visiblePages={visiblePages}
                      previousPage={
                        governmentExams?.govt_list?.previous
                          ? previousPage
                          : null
                      }
                      nextPage={
                        governmentExams?.govt_list?.next ? nextPage : null
                      }
                      handleClick={handleClick}
                    />
                  </>
                )}
              </Col>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default withHeaderFooter(Career2WithCategory);
