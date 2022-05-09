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
    singleCareerDetails,
} from "../../store/career";
import TopCollage from "../../assets/images/Career/clg.jpg"
import add from "../../assets/images/add.png";
import gallery1 from "../../assets/images/gal1.jpg";
import "../HomePage/index.scss";
import "./index.scss";

const CareerDetails = () => {

    const { id } = useParams();
    const { topCollages } = useSelector((state) => state.careerReducer);
    console.log('yesy', topCollages)
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

    return (
        <div>
            <SEO title='Sheकुंज - Career' />
            <Header loginPage={true} page='career' subPage='colleges' />

            <Container>
                <Row>
                    <div className='col-md-12 college_banner'>
                        <div className="college_detail_banner ">
                            <div className="college_logo">
                                <img src={transformImg(topCollages?.image)} alt='...' />
                            </div>

                        </div>
                    </div>
                </Row>
            </Container>

            <div className='mainDiv_career'>


                <Container>
                    <Row>
                        <Col md={8} xs={12}>
                            <div className='deatil_box'>
                                <h4>{topCollages && topCollages.name ? topCollages.name : t("common.n/a")}</h4>

                                {topCollages && topCollages.state ? topCollages?.state : t("common.n/a")} •{" "}
                                <span style={{ textTransform: "capitalize" }}>
                                    {topCollages && topCollages.collage_type
                                        ? topCollages?.collage_type
                                        : t("common.n/a")}

                                    <h6> <span>{t("careerTopColleges.other.4")}</span>{" "}
                                        : {/* {transformPrice(c?.fees)}{" "} */}
                                        {topCollages && topCollages.contact_no
                                            ? topCollages?.contact_no
                                            : t("common.n/a")}</h6>


                                </span>

                                <h6>
                                    <Link
                                        to={{ pathname: topCollages?.website }}
                                        target='_blank'
                                        rel='noreferrer'
                                    >
                                        {topCollages && topCollages.website
                                            ? topCollages.website
                                            : t("common.n/a")}
                                    </Link>
                                </h6>
                                <h6>
                                    <span>
                                        {t("careerTopColleges.other.9")}
                                    </span>{" "}
                                    :{" "}
                                    {topCollages && topCollages.email
                                        ? topCollages?.email
                                        : t("common.n/a")}
                                </h6>
                                <span>
                                    {t("careerTopColleges.other.10")}
                                </span>{" "}
                                :{" "}
                                {topCollages && topCollages.established_year
                                    ? topCollages?.established_year
                                    : t("common.n/a")}
                                <h6>
                                    <span>
                                        {t("careerTopColleges.other.7")}
                                    </span>{" "}
                                    :{" "}
                                    {topCollages && topCollages.accreditation
                                        ? topCollages?.accreditation
                                        : t("common.n/a")}
                                </h6>
                                <p>
                                    <span>
                                        {t("careerTopColleges.other.6")}
                                    </span>{" "}
                                    :{" "}
                                    <div dangerouslySetInnerHTML={{ __html: `<div>${topCollages.about_college}</div>` }} />
                                </p>

                                <p>
                                    <span>
                                        {t("careerTopColleges.other.8")}
                                    </span>
                                    :
                                    <div dangerouslySetInnerHTML={{ __html: `<div>${topCollages.courses_offered}</div>` }} />

                                </p>
                                <h6>
                                    <span>
                                        {t("careerTopColleges.other.11")}
                                    </span>{" "}
                                    :{" "}
                                    {topCollages && topCollages.gender_intech
                                        ? topCollages?.gender_intech
                                        : t("common.n/a")}
                                </h6>


                            </div>
                        </Col>

                        <Col md={4} xs={12}>
                            <div className='deatil_box_right'>
                                <h5>Photos & Videos</h5>

                                <Row>
                                    <Col md={12} xs={12}>
                                        <iframe className="responsive-iframe "
                                            src="https://www.youtube.com/embed/AMllH055W_E"
                                            title="YouTube video player" frameborder="0"
                                            allow="accelerometer; autoplay; clipboard-write; 
                                              encrypted-media; gyroscope; picture-in-picture"
                                            allowfullscreen></iframe>
                                    </Col>
                                </Row>

                                <hr />
                                <Row>
                                    <Col md={6} xs={12}>
                                        <img src={gallery1} alt='Image' className='right_gallery' />
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <img src={gallery1} alt='Image' className='right_gallery' />
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <img src={gallery1} alt='Image' className='right_gallery' />
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <img src={gallery1} alt='Image' className='right_gallery' />
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <img src={gallery1} alt='Image' className='right_gallery' />
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <img src={gallery1} alt='Image' className='right_gallery' />
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

export default CareerDetails;