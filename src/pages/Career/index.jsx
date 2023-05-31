import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { routingConstants } from "../../utils/constants";
// import ContentLoader, { Facebook } from 'react-content-loader';
import { ClipLoader } from "react-spinners";
import { AccordionComponent, Footer, Header, SEO } from "../../components";
import {
  getTopCollages,
  reSetFilterValue,
  toggleCollapseValue,
  allTopcollegeBySearch,
} from "../../store/career";
import TopCollage from "../../assets/images/Career/clg.jpg";
import "../HomePage/index.scss";
import "./index.scss";
import Cross from "../../assets/icons/cross.png";
import Search from "../../assets/icons/search1.png";
import { Link } from "react-router-dom";
import axios from "axios";
import test from "../../assets/images/test.jpg";
import logo from "../../assets/icons/filter.png";
// import { Link,Route } from "react-router-dom";
import { adsList } from "../../store/ads";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import Pagination from "../../components/Pagination";
import ComingSoon from "../../components/ComingSoon";

const CareerPage = () => {
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   },2000);
  // }, []);

  const dispatch = useDispatch();
  const { topCollages, courseSector, ownership, isLoading } = useSelector(
    (state) => state.careerReducer,
  );

  const { lan } = useSelector((state) => state.languageReducer);
  const { t } = useTranslation();
  const [offset, setOffset] = useState(0);
  const [flag, setFlag] = useState(true);
  const pageLimit = 10;

  useEffect(() => {
    dispatch(reSetFilterValue());

    navigator.geolocation.getCurrentPosition(
      async function (position, values) {
        const latitude = position?.coords?.latitude;
        const longitude = position?.coords?.longitude;

        dispatch(
          getTopCollages({
            filter: false,
            latitude,
            longitude,
            pageLimit,
            offset,
          }),
        );
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
        dispatch(getTopCollages(false));
      },
    );
  }, []);

  // const transformPrice = (price) => {
  //   let nf = new Intl.NumberFormat("en-US");
  //   return nf.format(
  //     Number.isNaN(parseInt(price, 10)) ? 0 : parseInt(price, 10) || 0,
  //   );
  // };

  const transformImg = (image) => {
    return image ? image : TopCollage;
  };

  // const STREAM = {
  //   name: t("careerTopColleges.listItems.1"),
  //   rows: topCollages?.collage_stream_list || [],
  // };

  const STATE = {
    name: t("careerTopColleges.listItems.2"),
    rows: topCollages?.state_list || [],
  };
  const CITY = {
    name: t("careerTopColleges.listItems.3"),
    rows: topCollages?.city_list || [],
  };

  // const ownership = {
  //   name: t("careerTopColleges.listItems.4"),
  //   rows: topCollages?.college_type || [],
  // };

  //  const ownership={
  //   name: t("careerTopColleges.listItems.4"),
  //   rows: topCollages?.state_list || [],
  //  }

  const [collegeBannerAds, setCollegeBannerAds] = useState([]);
  const [collegeBoxAds, setCollegeBoxAds] = useState([]);
  const [image, setImage] = useState("NA");
  const detect = useDeviceDetect();

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

  // >>>>>>>>>>>>>>>>>>latest code change>>>>>>>>>>>>>>>>>>
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
      topCollages?.collage_list?.results.length > 0 &&
      collegeBoxAds.length &&
      flag
    ) {
      const addslen = collegeBoxAds.length;
      let len = topCollages?.collage_list?.count / pageLimit;
      len = Math.trunc(len);

      const adds_arr = findAdds(addslen, len);
      sessionStorage.setItem(
        "current_adds",
        JSON.stringify({ addIndex: 0, addsData: adds_arr }),
      );
      setFlag(false);
    }
  }, [topCollages, collegeBoxAds]);
  useEffect(() => {
    dispatch(adsList());
    navigator.geolocation.getCurrentPosition(
      async function (position, values) {
        const latitude = position?.coords?.latitude;
        const longitude = position?.coords?.longitude;
        axios
          .get(
            `/private_adds/private_add?latitude=${latitude}&longitude=${longitude}`,
          )
          .then((response) => {
            if (response && response.data.results.length > 0) {
              let filterArray1 = response.data.results.filter((item, index) => {
                return item.image_type == "top_college_box";
              });
              setCollegeBoxAds(filterArray1);

              // console.log("filterArray1top_college_box",filterArray1)
              let filterArray2 = response.data.results.filter((item, index) => {
                return item.image_type == "top_college_banner";
              });
              setCollegeBannerAds(filterArray2);
            }
          });
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
        // alert("Your location is blocked")
        axios.get(`/private_adds/private_add`).then((response) => {
          if (response && response.data.results.length > 0) {
            let filterArray1 = response.data.results.filter((item, index) => {
              return item.image_type == "top_college_box";
            });

            // sessionStorage.setItem('current_adds', JSON.stringify([0, 1]));
            let filterArray2 = response.data.results.filter((item, index) => {
              return item.image_type == "top_college_banner";
            });
            setCollegeBannerAds(filterArray2);
          }
        });
      },
    );
  }, []);

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Latest code >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // useEffect(() => {
  //   dispatch(adsList())
  //   navigator.geolocation.getCurrentPosition(async function (position, values) {
  //     const latitude = position.coords.latitude;
  //     const longitude = position.coords.longitude;

  //     let params = {
  //       latitude: latitude.toString(),
  //       longitude: longitude.toString(),
  //     }
  //     axios
  //     .get(
  //       `/private_adds/private_add?latitude=${latitude}&longitude=${longitude}`,
  //     )
  //     .then((response) => {
  //       if (response.data.results.length > 0) {
  //         let filterArray = response.data.results.filter((item, index) => {
  //           return  item.image_type == "top_college_box"||item.image_type ="top_college_banner";
  //         });
  //         console.log('asdjsdss',filterArray[0])
  //           if (filterArray[0].image_type == "top_college_box") {
  //             let findImage =
  //           filterArray.length > 0 ? filterArray[0].image : "NA";
  //           setImage(findImage);
  //           setCollegeBoxAds(filterArray);
  //             }else if(filterArray[0].image_type == "top_college_banner"){
  //               let findImage =
  //               filterArray.length > 0 ? filterArray[0].image : "NA";
  //               setImage(findImage);
  //               setCollegeBannerAds(filterArray);
  //             }
  //           }
  //         })

  //   } ,
  //   function(error) {
  //     console.error("Error Code = " + error.code + " - " + error.message);
  //     // alert("Your location is blocked")
  //   axios
  //   .get(
  //     `/private_adds/private_add`,
  //   )
  //   .then((response) => {
  //     if (response.data.results.length > 0) {
  //       let filterArray = response.data.results.filter((item, index) => {
  //         return  item.image_type == "top_college_box"||item.image_type == "top_college_banner";
  //       });
  //       console.log('asdjsdss',filterArray[0])
  //         if (filterArray[0].image_type == "top_college_box") {
  //           let findImage =
  //         filterArray.length > 0 ? filterArray[0].image : "NA";
  //         setImage(findImage);
  //         setCollegeBoxAds(filterArray);
  //           }else if(filterArray[0].image_type == "top_college_banner"){
  //             let findImage =
  //             filterArray.length > 0 ? filterArray[0].image : "NA";
  //             setImage(findImage);
  //             setCollegeBannerAds(filterArray);
  //           }
  //         }
  //       })
  //  }
  // )
  // },[])

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const page_adds = JSON.parse(sessionStorage.getItem("current_adds"));
  const [searchInput, setSearchInput] = useState("");
  const SearchFilterHandle = (e) => {
    e.preventDefault();
    dispatch(
      getTopCollages({
        search: searchInput !== "" ? `&search=${searchInput}` : "",
      }),
    );
  };
  const handleResetSearch = () => {
    dispatch(getTopCollages({ filter: true, search: "" }));
    setSearchInput("");
  };
  const paginationBack = () => {
    navigator.geolocation.getCurrentPosition(async function (position, values) {
      const latitude = position?.coords?.latitude;
      const longitude = position?.coords?.longitude;

      dispatch(
        getTopCollages({
          filter: true,
          latitude,
          longitude,
          pageLimit,
          offset: offset - 10,
          search: searchInput !== "" ? `&search=${searchInput}` : "",
        }),
      );
    });

    if (page_adds) {
      setTimeout(() => {
        sessionStorage.setItem(
          "current_adds",
          JSON.stringify({ ...page_adds, addIndex: page_adds?.addIndex - 1 }),
        );
      }, 500);
    }

    setOffset(offset - 10);
    window.scrollTo(0, 1000);
  };

  const paginationNext = () => {
    navigator.geolocation.getCurrentPosition(async function (position, values) {
      const latitude = position?.coords?.latitude;
      const longitude = position?.coords?.longitude;

      dispatch(
        getTopCollages({
          filter: true,
          latitude,
          longitude,
          pageLimit,
          offset: offset + 10,
          search: searchInput !== "" ? `&search=${searchInput}` : "",
        }),
      );
    });
    if (page_adds) {
      setTimeout(() => {
        sessionStorage.setItem(
          "current_adds",
          JSON.stringify({ ...page_adds, addIndex: page_adds?.addIndex + 1 }),
        );
      }, 500);
    }

    setOffset(offset + 10);
    window.scrollTo(0, 1000);
  };

  console.log(page_adds?.addsData[page_adds?.addIndex][0]);
  return (
    <div>
      <ComingSoon />
    </div>
  );
};

export default CareerPage;
