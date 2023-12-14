import React, { useState, useEffect, useRef, useCallback } from "react";
// import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import ReactModal from "react-modal-resizable-draggable";
import { Document, Page, pdfjs } from "react-pdf";
import "./index.scss";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
// import Fullscreen from 'fullscreen-react';
// import ReactFullscreen from 'react-easyfullscreen';

// import {file} from "./pdf-sample.pdf"
// import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai"
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {
  Container,
  Row,
  Col,
  Carousel,
  Card,
  Nav,
  NavDropdown,
  Navbar,
  Modal,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { getAllMagzines } from "../../store/magzine";
import {
  setCollapseMagzines,
  getAllMagzines as fetchMagzines,
} from "../../store/magzine/action";
import { singleMagzineDetails } from "../../store/magzine/action";
import { Header, Footer } from "../../components";
import down1 from "../../assets/icons/down1.png";
import up from "../../assets/icons/up.png";
import double_quote from "../../assets/icons/double_quote.png";
import global from "../../assets/images/Success/global.png";
import "./index.scss";
import { useTranslation } from "react-i18next";
import { routingConstants } from "../../utils/constants";
import "./index.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import HTMLFlipBook from "react-pageflip";
import { adsList } from "../../store/ads";
import { BiFullscreen } from "react-icons/bi";
import { BsZoomIn, BsZoomOut } from "react-icons/bs";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { IoMdShareAlt } from "react-icons/io";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
// import {isMobile} from 'react-device-detect';
import { RWebShare } from "react-web-share";
import Cookies from "js-cookie";
const url =
  "https://cors-anywhere.herokuapp.com/http://www.pdf995.com/samples/pdf.pdf";
// import ReactAudioPlayer from 'react-audio-player';

function MagzineDetails(m) {
  const [isEnter, setIsEnter] = useState(false);
  // const [isMobile, setIsMobile] = useState(false);

  const [magzineData, setMagzineData] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const { magzines } = useSelector((state) => state.magzinesReducer);
  const dispatch = useDispatch();
  const { lan } = useSelector((state) => state.languageReducer);
  const { t } = useTranslation();
  const book = useRef();
  const screen1 = useFullScreenHandle();
  const screen2 = useFullScreenHandle();
  // const url = `https://cors-anywhere.herokuapp.com/${magzines?.pdf}`;
  // const url = "https://cors-anywhere.herokuapp.com/https://shekunj.s3.amazonaws.com/media/E-magazine/august.pdf";
  const isMobile = navigator.userAgent.includes("Mobile");

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [fullscreen, setfullopen] = useState(false);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  /*To Prevent right click on screen*/
  // document.addEventListener("contextmenu", (event) => {
  //   event.preventDefault();
  // });

  useEffect(() => {
    dispatch(singleMagzineDetails(id));
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [dispatch, id, lan]);

  const [storiesBannerAds, setStoriesBannerAds] = useState([]);
  const [storiesBoxAds, setStoriesBoxAds] = useState([]);
  const [image, setImage] = useState("NA");
  const [adds, setAdds] = useState([]);
  const [magzineDetailsBoxAds, setMagzineDetailsBoxAds] = useState([]);
  const [turnPageStop, setTurnPageStop] = useState(false);

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
                    (type) => type.image_type === "magazine_detail",
                  )
                );
              });
              setMagzineDetailsBoxAds(filterArray1);
              // console.log("filterArray1magazine_detail",filterArray1)
            }
          });
      },
      function (error) {
        // alert("Your location is blocked")
        axios.get(`/private_adds/private_add`).then((response) => {
          if (response && response.data.results.length > 0) {
            let filterArray1 = response.data.results.filter((item, index) => {
              return (
                Array.isArray(item.image_type) &&
                item.image_type.some(
                  (type) => type.image_type === "magazine_detail",
                )
              );
            });
            setMagzineDetailsBoxAds(filterArray1);
            // console.log("filterArray1coursebox",filterArray1)
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
                  (type) => type.image_type === "magazine_detail",
                )
              );
            });
            setMagzineDetailsBoxAds(filterArray1);
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
        });
    });
  };
  const reportChange = useCallback(
    (state, handle) => {
      console.log("ksdhkgjhakdhgkjhk");
      if (handle === screen1) {
        console.log("Screen 1 went to", state, handle);
      }
      if (handle === screen2) {
        console.log("Screen 2 went to", state, handle);
      }
    },
    [screen1, screen2],
  );

  useEffect(() => {
    const token = Cookies.get("sheToken");
    axios
      .get(`more/magazine/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setMagzineData(response.data.data.magazine_images));
  }, []);

  // useEffect(() => {
  //   var checkDevice = navigator.userAgent.match(
  //     /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
  //   );
  //   if (checkDevice) {
  //     // if we are on mobile device the scroll into view will be managed by the browser
  //     setIsMobile(true)
  //   } else setIsMobile(false)
  // }, [isMobile])

  const handlePrev = () => {
    book.current.pageFlip().flipPrev();
    setTurnPageStop(false);
  };
  const handleNxt = () => {
    book.current.pageFlip().flipNext();
    setTurnPageStop(false);
  };
  return (
    <div className='noselect'>
      <Header loginPage={true} page='more' subPage='moreMagazineDetail' />
      <div className='SuccStory_banner'>
        <Container>
          <Row>
            <Col md={1}>
              <div className='global_img'>
                <img src={global} alt='' className='vert-move' />
              </div>
            </Col>
            <Col md={6} data-aos='slide-up'>
              <h2> {t("successStoriesPage.heading.1")}</h2>
              <p className='sucess_first_p'>
                {t("successStoriesPage.content.1")}
              </p>
              <p>{t("successStoriesPage.content.4")}</p>
            </Col>
          </Row>
        </Container>
      </div>
      {/* google add */}

      {/* {
        advertistImg()
      } */}

      <Container>
        <Row>
          <div className='col-md-12'>
            <div
              className='ads_story_cover'
              onClick={() => addEmail(magzineDetailsBoxAds[0]?.add_email)}
            >
              <a href={magzineDetailsBoxAds[0]?.url_adds} target='_blank'>
                <img
                  src={magzineDetailsBoxAds[0]?.image}
                  alt='Image'
                  className='ads_story_cover_img'
                />
              </a>
            </div>
          </div>
        </Row>
      </Container>

      <div className='magazine_container noselect'>
        <Container>
          <div
            className='magazine_div'
            style={{
              // width: `${screen1.active ? '90rem' : '59rem'}`,
              height: `${screen1.active ? "70rem" : "36.7rem"}`,
            }}
          >
            <FullScreen handle={screen1} onChange={reportChange}>
              <div
                style={{
                  width: !screen1.active ? 680 : 2000,
                  height: !screen1.active ? 485 : 1000,
                  alignContent: !screen1.active ? "center" : "flex-end",
                  alignItems: !screen1.active ? "center" : "flex-end",
                  justifyContent: !screen1.active ? "center" : "flex-end",
                }}
              >
                <TransformWrapper initialScale={1} maxScale={7} disabled={true}>
                  {({
                    zoomIn,
                    zoomOut,
                    resetTransform,
                    wheel,
                    wheelDisabled,
                  }) => (
                    <React.Fragment>
                      <TransformComponent>
                        {!screen1.active && (
                          <div
                            style={{
                              width: 680,
                              height: 485,
                              alignContent: "center",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {/* <div style={{height: 1000, width: 1000, backgroundColor: 'blue'}} > */}
                            <HTMLFlipBook
                              height={485}
                              width={340}
                              // width={340}
                              // maxWidth={1000}
                              // width={isMobile ? 500 : 320}
                              // className="flipbook"
                              mobileScrollSupport={true}
                              showCover={true}
                              // renderOnlyPageLengthChange={true}
                              size='fixed'
                              // size= {isMobile ? "fixed" : "stretch"}
                              ref={book}
                            >
                              {magzineData &&
                                magzineData.map((elem) => {
                                  return (
                                    <div>
                                      {/* <img src={elem.images} width='1000px' height="1000px" /> */}
                                      <img
                                        src={elem.images}
                                        style={{ width: 340, height: 485 }}
                                      />
                                    </div>
                                  );
                                })}
                            </HTMLFlipBook>
                            {/* </div> */}
                          </div>
                        )}
                        {screen1.active && (
                          <div
                            style={{
                              width: 1580,
                              height: 1000,
                              alignContent: "center",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {/* <div style={{height: 1000, width: 1000, backgroundColor: 'blue'}} > */}
                            <HTMLFlipBook
                              height={1000}
                              width={790}
                              // width={340}
                              // maxWidth={1000}
                              // width={isMobile ? 500 : 320}
                              // className="flipbook"
                              mobileScrollSupport={true}
                              showCover={true}
                              // renderOnlyPageLengthChange={true}
                              size='fixed'
                              // size= {isMobile ? "fixed" : "stretch"}
                              ref={book}
                            >
                              {magzineData &&
                                magzineData.map((elem) => {
                                  return (
                                    <div>
                                      {/* <img src={elem.images} width='1000px' height="1000px" /> */}
                                      <img
                                        src={elem.images}
                                        style={{ width: 790, height: 1000 }}
                                      />
                                    </div>
                                  );
                                })}
                            </HTMLFlipBook>
                            {/* </div> */}
                          </div>
                        )}
                      </TransformComponent>
                      <div
                        className='icons_div'
                        style={{
                          paddingTop: `${screen1.active ? "1.2rem" : "1rem"}`,
                          // marginLeft: `${screen1.active ? '22rem' : ''}`
                        }}
                      >
                        <MdArrowBackIosNew
                          onClick={() => {
                            resetTransform();
                            handlePrev();
                          }}
                          className='icon_class'
                        />
                        <MdArrowForwardIos
                          onClick={() => {
                            resetTransform();
                            handleNxt();
                          }}
                          className='icon_class'
                        />
                        <BsZoomIn
                          onClick={() => zoomIn(setTurnPageStop(true))}
                          className='icon_class'
                        />
                        <BsZoomOut
                          onClick={() => zoomOut(setTurnPageStop(true))}
                          className='icon_class'
                        />
                        {!screen1.active ? (
                          <BsFullscreen
                            onClick={screen1.enter}
                            className='icon_class'
                          />
                        ) : (
                          <BsFullscreenExit
                            onClick={screen1.exit}
                            className='icon_class'
                          />
                        )}
                        {!screen1.active ? (
                          <RWebShare
                            data={{
                              // url: "http://localhost:3000",
                              url: history.location,
                              title: "Share",
                            }}
                            style={{ width: "19%" }}
                            onClick={() => console.log("shared successfully!")}
                          >
                            <AiOutlineShareAlt
                              style={{
                                color: "white",
                                cursor: "pointer",
                                fontSize: "22px",
                              }}
                            />
                          </RWebShare>
                        ) : (
                          ""
                        )}
                      </div>
                    </React.Fragment>
                  )}
                </TransformWrapper>
              </div>
            </FullScreen>
          </div>
        </Container>
      </div>
      <div className='want noselect'>
        <Container>
          <h2>{t("successStoriesPage.content.2")}</h2>
          <button onClick={() => history.push("/courses")} className='want_btn'>
            {t("successStoriesPage.button.2")}
          </button>
        </Container>
      </div>

      <Footer loginPage={false} />
    </div>
  );
}

export default MagzineDetails;
