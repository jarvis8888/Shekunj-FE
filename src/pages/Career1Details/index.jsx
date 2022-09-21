import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AccordionComponent, Footer, Header, SEO } from "../../components";
import { Link, useParams } from "react-router-dom";
import {
    getTopCollages,
    reSetFilterValue,
    toggleCollapseValue,
    singleCareer1Details,
} from "../../store/career";
import TopCollage from "../../assets/images/Career/clg.jpg"
import "../HomePage/index.scss";
import "./index.scss";
import noImageIcon from "../../assets/images/no-image.jpeg";
import dummySchool from "../../assets/images/dummySchool.jpg";

const Career1Details = () => {

    const { id } = useParams();
    const { topSchools } = useSelector((state) => state.careerReducer);
    const dispatch = useDispatch();
    const { lan } = useSelector((state) => state.languageReducer);
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(singleCareer1Details(id));
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [dispatch, id, lan]);

    const transformImg = (image) => {
        return image ? image : TopCollage;
    };
    const transformGalley = (image) => {
        return image ? image : noImageIcon;
    };
    const transformCovImg = (image) => {
        return image ? image : dummySchool;
    };


    return (
        <div>
            <SEO title='Sheकुंज - Career' />
            <Header loginPage={true} page='career' subPage='colleges' />

            <Container className="coverMainSecSchool">
                <div className="school_detail_cover">
                    <img src={transformCovImg(topSchools?.Cover_photo)} alt='...' className="school_detail_cover_img" />
                </div>
            </Container>

            <Container>
                <Row>
                    <div md={12} xs={12}>
                        <div className="school_logo">
                            <img src={transformImg(topSchools?.logo)} alt='...'
                                className="school_logo_img" />
                        </div>
                    </div>
                </Row>
            </Container>
            {console.log("topSchools---", topSchools)}
            <div className='DetailMainDiv_career'>
                <Container>
                    <Row>
                        <Col md={8} xs={12}>
                            <div className='deatil_box'>
                                <h4 className='mb-3'>{topSchools && topSchools.name}</h4>
                                {console.log("")}
                                <Row>
                                    <Col md={12} xs={12}>
                                        {topSchools && topSchools.city} {topSchools.city && (",")}{" "}
                                        {topSchools && topSchools.state} {topSchools.state && ("•")}{" "}
                                        {/* <span style={{ textTransform: "capitalize" }}>
                                            {topSchools && topSchools.school_type && topSchools.school_type||{}}
                                        </span> */}

                                        {/* <h6>{topSchools.map(name => <h2>{name.name}</h2>)} </h6> */}
                                    </Col>
                                </Row>
                                <Row className='mt-3'>
                                    {topSchools.contact_no && (
                                        <Col md={6} xs={12}>
                                            <span style={{ textTransform: "capitalize" }}>
                                                <h6>
                                                    <span>{t("careerTopColleges.other.4")}</span>{" "}
                                                    : {topSchools && topSchools.contact_no}
                                                </h6>
                                            </span>
                                        </Col>
                                    )}

                                    {topSchools.board_type && (
                                        <Col md={6} xs={12}>
                                            <span>
                                                {t("careerTopSchools.other.1")}
                                            </span>{" "}
                                            :{" "}
                                            {topSchools && topSchools.board_type}
                                        </Col>
                                    )}
                                </Row>

                                <Row>
                                    {topSchools.email && (
                                        <Col md={6} xs={12}>
                                            <h6>
                                                <span>
                                                    {t("careerTopColleges.other.9")}
                                                </span>{" "}
                                                :{" "}
                                                {topSchools && topSchools.email}
                                            </h6>
                                        </Col>
                                    )}
                                    {topSchools.established_year && (
                                        <Col md={6} xs={12}>
                                            <span>
                                                {t("careerTopColleges.other.10")}
                                            </span>{" "}
                                            :{" "}
                                            {topSchools && topSchools.established_year}
                                        </Col>
                                    )}
                                </Row>

                                <Row>
                                    {topSchools.level && (
                                        <Col md={6} xs={12}>
                                            <h6>
                                                <span>
                                                    {t("careerTopColleges.other.14")}
                                                </span>{" "}
                                                :{" "}
                                                {topSchools && topSchools.level}
                                            </h6>
                                        </Col>
                                    )}
                                    {topSchools.website && (
                                        <Col md={6} xs={12}>
                                            <h6>
                                                <span>{t("careerTopSchools.other.3")}</span> :{" "}
                                                <Link
                                                    // to={{ pathname: topSchools?.website }}
                                                    to={topSchools?.website}

                                                    target='_blank'
                                                // rel='noreferrer'
                                                >
                                                    {topSchools && topSchools?.website}
                                                </Link>
                                            </h6>
                                        </Col>
                                    )}
                                </Row>

                                {topSchools.about_school && (
                                    <p style={{ textAlign: 'justify' }} className='mt-3'>
                                        <span>
                                            {t("careerTopSchools.other.6")}
                                        </span>{" "}
                                        :{" "}
                                        <div dangerouslySetInnerHTML={{ __html: `<div>${topSchools.about_school}</div>` }} />
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
                                            src={topSchools.url}
                                            allowfullscreen="true"
                                            title="YouTube video player" frameborder="0"
                                            allow="accelerometer; autoplay; clipboard-write; 
                                              encrypted-media; gyroscope; picture-in-picture"
                                        ></iframe>
                                    </Col>
                                </Row>

                                <hr />
                                <Row>
                                    <Col md={6} xs={12}>
                                        <img src={transformGalley(topSchools.image1)} alt='Image' className='right_gallery' />
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <img src={transformGalley(topSchools.image2)} alt='Image' className='right_gallery' />
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <img src={transformGalley(topSchools.image3)} alt='Image' className='right_gallery' />
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <img src={transformGalley(topSchools.image4)} alt='Image' className='right_gallery' />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer loginPage={false} />
        </div>
    );
};

export default Career1Details;