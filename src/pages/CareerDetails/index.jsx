import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AccordionComponent, Footer, Header, SEO } from "../../components";
// import { Link, useParams } from "react-router-dom";
import ContentLoader, { Facebook } from 'react-content-loader';
import { Link, useParams, Route } from "react-router-dom";
import {
    getTopCollages,
    reSetFilterValue,
    toggleCollapseValue,
    singleCareerDetails,
} from "../../store/career";
import TopCollage from "../../assets/images/Career/clg.jpg"
import "../HomePage/index.scss";
import "./index.scss";
import noImageIcon from "../../assets/images/no-image.jpeg";
import dummyCollege from "../../assets/images/dummyCollege.PNG";

const CareerDetails = () => {

    const { id } = useParams();
    const { topCollages } = useSelector((state) => state.careerReducer);
    const dispatch = useDispatch();
    const { lan } = useSelector((state) => state.languageReducer);
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(singleCareerDetails(id));
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [dispatch, id, lan]);

    const transformImg = (image) => {
        return image ? image : TopCollage;
    };
    const transformGalley = (image) => {
        return image ? image : noImageIcon;
    };
    const transformCovImg = (image) => {
        return image ? image : dummyCollege;
    };

    return (
        <div>
            <SEO title='Sheकुंज - Career' />
            <Header loginPage={true} page='career' subPage='colleges' />

            <Container className="coverMainSecCollege">
                <div className="college_detail_cover">
                    <img src={transformCovImg(topCollages?.Cover_photo)} alt='...'
                        className="college_detail_cover_img" />
                </div>
            </Container>

            <Container>
                <Row>
                    <div md={12} xs={12}>
                        <div className="college_logo">
                            <img src={transformImg(topCollages?.logo)} alt='...'
                                className="college_logo_img" />
                        </div>
                    </div>
                </Row>
            </Container>

            <div className='DetailMainDiv_career'>

                <Container>
                    <Row>
                        <Col md={8} xs={12}>
                            <div className='deatil_box'>
                                <h4 className='mb-3'>{topCollages && topCollages.name}</h4>
                                <Row>
                                    <Col md={12} xs={12}>
                                        <h6>
                                        <span style={{fontWeight: "bold" }}>
                                            {t("careerTopColleges.other.13")}{" "}
                                            </span>{" "}
                                                :{" "}
                                        {topCollages && topCollages.city}
                                        {topCollages.city && (",")}
                                        {" "}

                                        {topCollages && topCollages.state}
                                        {topCollages.state && ("•")}{" "}
                                        <span style={{ textTransform: "capitalize" }}>
                                            {topCollages && topCollages.collage_type}
                                        </span>
                                        </h6>
                                    </Col>
                                </Row>
                                <Row className='mt-3'>
                                    {topCollages.email && (
                                        <Col md={6} xs={12}>
                                            <h6>
                                                <span style={{fontWeight: "bold" }}>
                                                    {t("careerTopColleges.other.9")}
                                                </span>{" "}
                                                :{" "}
                                                {topCollages && topCollages.email}
                                            </h6>
                                        </Col>
                                    )}
                                    {topCollages.contact_no && (
                                        <Col md={6} xs={12}>
                                            <span style={{ textTransform: "capitalize" }}>
                                                <h6>
                                                    <span style={{fontWeight: "bold" }}>{t("careerTopColleges.other.4")}</span>{" "}
                                                    : {topCollages && topCollages.contact_no}
                                                </h6>
                                            </span>
                                        </Col>
                                    )}
                                </Row>

                                <Row>
                                    {topCollages?.website && (
                                        <Col md={6} xs={12}>
                                            <h6>
                                                <span style={{fontWeight: "bold" }}>{t("careerTopColleges.other.5")}</span>:{" "}
                                                {/* <Link
                                                    to={{ pathname: topCollages?.website }}
                                                    target='_blank'
                                                    rel='noreferrer'>
                                                    {topCollages && topCollages.website}
                                                </Link> */}
                                                <Link
                                                    to={topCollages?.website}
                                                    target='_blank'
                                                >
                                                    {topCollages && topCollages?.website}
                                                </Link>
                                                <Route exact path={topCollages?.website} />

                                            </h6>
                                        </Col>
                                    )}
                                    {topCollages.gender_intech && (
                                        <Col md={6} xs={12}>
                                            <h6>
                                                <span style={{fontWeight: "bold" }}>
                                                    {t("careerTopColleges.other.12")}
                                                </span>{" "}
                                                :{" "}
                                                {topCollages && topCollages.gender_intech}
                                            </h6>
                                        </Col>
                                    )}
                                </Row>

                                <Row>
                                    {topCollages.established_year && (
                                        <Col md={6} xs={12}>
                                            <span style={{fontWeight: "bold" }}>
                                                {t("careerTopColleges.other.10")}
                                            </span>{" "}
                                            :{" "}
                                            {topCollages && topCollages.established_year}
                                        </Col>
                                    )}
                                </Row>

                                <Row className="mt-1">
                                    {topCollages.address && (
                                        <Col md={12} xs={12}>
                                            <h6>
                                                <span style={{fontWeight: "bold" }}>
                                                    {t("careerTopColleges.other.15")}
                                                </span>{" "}
                                                :{" "}
                                                {topCollages && topCollages.address}
                                            </h6>
                                        </Col>
                                    )}
                                </Row>
                                <Row className="mt-1">
                                    {topCollages.accreditation && (
                                        <Col md={12} xs={12}>
                                            <h6>
                                                <span style={{fontWeight: "bold" }}>
                                                    {t("careerTopColleges.other.7")}
                                                </span>{" "}
                                                :{" "}
                                                {topCollages && topCollages.accreditation}
                                            </h6>
                                        </Col>
                                    )}
                                </Row>

                                {topCollages.about_college && (
                                    <p style={{ textAlign: 'justify' }} className='mt-3'>
                                        <span style={{fontWeight: "bold" }}>
                                            {t("careerTopColleges.other.6")}
                                        </span>{" "}
                                        :{" "}
                                        <div dangerouslySetInnerHTML={{ __html: `<div>${topCollages.about_college}</div>` }} />
                                    </p>
                                )}

                                {topCollages.courses_offered && (
                                    <p>
                                        <span style={{fontWeight: "bold" }}>
                                            {t("careerTopColleges.other.8")}
                                        </span>
                                        :
                                        <div dangerouslySetInnerHTML={{ __html: `<div>${topCollages.courses_offered}</div>` }} />
                                    </p>
                                )}
                            </div>
                        </Col>

                        <Col md={4} xs={12}>
                            <div className='deatil_box_right'>
                                <h5>Photos & Videos</h5>

                                <Row>
                                    <Col md={12} xs={12}>
                                        <iframe className="responsive-iframe "
                                            src={topCollages.url}
                                            allowfullscreen="true"
                                            title="YouTube video player" frameborder="0"
                                            allow="accelerometer; autoplay; clipboard-write; 
                                              encrypted-media; gyroscope; picture-in-picture"
                                        ></iframe>
                                    </Col>
                                </Row>
                                {/* Photos videos section------------------------------------------------- */}
                                {/* <hr />
                                <Row>
                                    <Col md={6} xs={12}>
                                        <img src={transformGalley(topCollages.image1)} alt='Image' className='right_gallery' />
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <img src={transformGalley(topCollages.image2)} alt='Image' className='right_gallery' />
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <img src={transformGalley(topCollages.image3)} alt='Image' className='right_gallery' />
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <img src={transformGalley(topCollages.image4)} alt='Image' className='right_gallery' />
                                    </Col>
                                </Row> */}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer loginPage={false} />
        </div>
    );
};

export default CareerDetails;