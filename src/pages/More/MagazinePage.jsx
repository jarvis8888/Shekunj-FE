import React, { useState, useEffect } from "react";
// import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import ReactModal from "react-modal-resizable-draggable";
import { Document, Page, pdfjs } from "react-pdf";
// import {PDFtoIMG} from 'react-pdf-to-image';
// import {file} from "./pdf-sample.pdf"
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import HTMLFlipBook from "react-pageflip";
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
import { routingConstants } from "../../utils/constants";
import Moment from "react-moment";
import { getAllMagzines } from "../../store/magzine";
import {
  setCollapseMagzines,
  getAllMagzines as fetchMagzines,
} from "../../store/magzine/action";
import { Header, Footer } from "../../components";
import img1 from "../../assets/images/shekunj_magzine.jpg";
import down1 from "../../assets/icons/down1.png";
import up from "../../assets/icons/up.png";
import global from "../../assets/images/Success/global.png";
import "./index.scss";
import { useTranslation } from "react-i18next";
// import { Document, Page,pdfjs } from 'react-pdf';
import axios from "axios";
import { adsList } from "../../store/ads";
import { color } from "@mui/system";
// import { DocViewerRenderers } from "react-doc-viewer";

function MagzinePage(m) {
  // const [numPages, setNumPages] = useState(null);
  // const [pageNumber, setPageNumber] = useState(1);
  const [image, setImage] = useState("NA");
  const [magzineBoxAdds, setMagzineBoxAdds] = useState([]);
  const [adds, setAdds] = useState([]);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [show, setShow] = useState(false);
  const [docs, setDocs] = useState([]);
  const [storiesBannerAds, setStoriesBannerAds] = useState([]);
  const [storiesBoxAds, setStoriesBoxAds] = useState([]);

  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { lan } = useSelector((state) => state?.languageReducer);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const url = `https://cors-anywhere.herokuapp.com/${m?.pdf}`;

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

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

  useEffect(() => {
    dispatch(adsList());
    navigator.geolocation.getCurrentPosition(
      async function (position, values) {
        const latitude = position?.coords?.latitude;
        const longitude = position?.coords?.longitude;

        let params = {
          latitude: latitude.toString(),
          longitude: longitude.toString(),
        };
        axios
          .get(
            `/private_adds/private_add?latitude=${latitude}&longitude=${longitude}`,
          )
          .then((response) => {
            if (response && response?.data?.results?.length > 0) {
              let filterArray1 = response?.data?.results?.filter(
                (item, index) => {
                  return (
                    Array.isArray(item.image_type) &&
                    item.image_type.some(
                      (type) => type.image_type === "magazine_index",
                    )
                  );
                },
              );
              setMagzineBoxAdds(filterArray1);
            }
          });
      },
      function (error) {
        axios.get(`/private_adds/private_add`).then((response) => {
          if (response && response?.data?.results?.length > 0) {
            let filterArray1 = response?.data?.results?.filter(
              (item, index) => {
                return (
                  Array.isArray(item.image_type) &&
                  item.image_type.some(
                    (type) => type.image_type === "magazine_index",
                  )
                );
              },
            );
            setMagzineBoxAdds(filterArray1);
          }
        });
      },
    );
  }, []);

  const addEmail = (email) => {
    navigator.geolocation.getCurrentPosition(async function (position, values) {
      const latitude = position?.coords?.latitude;
      const longitude = position?.coords?.longitude;

      let params = {
        latitude: latitude.toString(),
        longitude: longitude.toString(),
      };
      axios
        .post("/private_adds/click_add/", {
          // add_email:`${adds[0]?.add_email}`
          add_email: email,
          latitude: params?.latitude.toString(),
          longitude: params?.longitude.toString(),
        })
        .then((response) => {
          console.log("addEmailresponse", response);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (index) => {
    setShow(index);
  };

  const { magzines } = useSelector((state) => {
    return state.magzinesReducer;
  });

  React.useEffect(() => {
    dispatch(fetchMagzines());
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [dispatch, lan]);

  useEffect(() => {
    dispatch(getAllMagzines());
  }, [dispatch, lan]);

  const handleSetCollapse = (id, is_collapse) => {
    dispatch(setCollapseMagzines(id, is_collapse ? false : true));
  };

  // document.addEventListener("contextmenu", function (e) {
  //   e.preventDefault();
  // });

  return (
    <div>
      <Header loginPage={true} page='more' subPage='moreMagazine' />
      <div className='SuccStory_banner noselect'>
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

      <Container className='comming_soon'>
        <h1 className='comming_soon_h1'>COMING SOON</h1>
        <div className='loader-demo-box'>
          <p className='jumping-dots-loader'>
            {" "}
            <span></span> <span></span> <span></span>{" "}
          </p>
        </div>
      </Container>

      {/* code comment */}
      <Container>
        {magzines["magazine_list"]?.length > 0 ? (
          magzines["magazine_list"]?.map((m, index) => {
            return (
              <>
                <div className='Magzine noselect' key={m?.id}>
                  <Row>
                    <Col>
                      <Card.Link style={{ color: "#a63d67 " }}>
                        <Card
                          className='MagzineCard'
                          key={m?.id}
                          href={m?.form_link}
                        >
                          <Link
                            to={routingConstants.MORE_MAGAZINE + m?.id}
                            key={m?.id}
                          >
                            <Card.Img
                              className='magzineImage'
                              variant='top'
                              src={m?.image}
                              alt=''
                              srcSet=''
                            />
                            <Card.Body className='magzineCardBody'>
                              <Card.Text className='createdText'>
                                Created_at:
                                <Moment format='D MMM YYYY' withTitle>
                                  {m?.created_at}
                                </Moment>
                              </Card.Text>

                              <Card.Title>{m?.title}</Card.Title>
                              <Card.Subtitle className='mb-2 text-muted'>
                                {" "}
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: `<div>${m?.about_magazine}</div>`,
                                  }}
                                />
                              </Card.Subtitle>

                              <Card.Text className='updatedText'>
                                Updated_at :
                                <Moment format='D MMM YYYY' withTitle>
                                  {m?.updated_at}
                                </Moment>
                              </Card.Text>
                            </Card.Body>
                          </Link>
                        </Card>
                      </Card.Link>
                    </Col>

                    {index % 2 == 1 ? (
                      <>
                        <Col className='magzine_anchore'>
                          <Card className='MagzineCardAdd'>
                            {magzineBoxAdds?.length > 0 && (
                              <div
                                className='slide-imgAdd'
                                onClick={() =>
                                  addEmail(magzineBoxAdds[0]?.add_email)
                                }
                              >
                                <a
                                  href={magzineBoxAdds[0]?.url_adds}
                                  target='_blank'
                                >
                                  <img
                                    src={magzineBoxAdds[0]?.image}
                                    alt='Image'
                                    className='magzineImageAdd'
                                  />
                                </a>
                                <div className='overlay'></div>
                              </div>
                            )}
                          </Card>
                        </Col>
                      </>
                    ) : (
                      ""
                    )}
                  </Row>
                </div>
              </>
            );
          })
        ) : (
          <div className='text-center'>{t("common.noDataFound")}</div>
        )}

        <DocViewer
          documents={docs}
          pluginRenderers={DocViewerRenderers}
          sandboxed='allow-scripts'
        />
      </Container>

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

export default MagzinePage;
