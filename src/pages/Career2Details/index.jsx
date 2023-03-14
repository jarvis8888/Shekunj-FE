import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AccordionComponent, Footer, Header, SEO } from "../../components";
import { Link, useParams } from "react-router-dom";
import {
    reSetFilterValue,
    toggleCollapseValue,
    singleCareer2Details,
} from "../../store/career";
import TopCollage from "../../assets/images/Career/clg.jpg"
import "../HomePage/index.scss";
import "./index.scss";

const Career2Details = () => {

    const { id } = useParams();
    const { governmentExams } = useSelector((state) => state.careerReducer);
    const dispatch = useDispatch();
    const { lan } = useSelector((state) => state.languageReducer);
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(singleCareer2Details(id));
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [dispatch, id, lan]);

    const transformPrice = (price) => {
        let nf = new Intl.NumberFormat("en-US");
        return nf.format(
            Number.isNaN(parseInt(price, 10)) ? 0 : parseInt(price, 10) || 0,
        );
    };

    const transformImg = (image) => {
        return image ? image : TopCollage;
    };

    return (
        <div>
            <SEO title='Sheकुंज - Career' />
            <Header loginPage={true} page='career' subPage='colleges' />

            <Container className="coverMainSecGov">
                <div className="gov_detail_cover">
                    <img src={governmentExams?.image} alt='...' className="gov_detail_cover_img" />
                </div>
            </Container>

            <Container>
                <Row>
                    <div md={12} xs={12}>
                        <div className="gov_logo">
                            <img src={transformImg(governmentExams?.logo)} alt='...'
                                className="gov_logo_img" />
                        </div>
                    </div>
                </Row>
            </Container>

            <div className='DetailMainDiv_gov'>
                <Container>
                    <Row>
                        <Col md={12} xs={12}>
                            <div className='deatil_box'>
                                <h4>{governmentExams && governmentExams.name}</h4>
                                {governmentExams.state && (
                                    <span style={{ textTransform: "capitalize" }}>
                                        <span style={{ fontWeight: "bold"}}>{t("careerGovExams.other.8")}</span> : {" "}
                                        {governmentExams && governmentExams.state}
                                    </span>
                                )}

                                <Row className='mt-3'>
                                    {governmentExams.scheme_level && (
                                        <Col md={6} xs={12}>
                                            <span style={{ fontWeight: "bold"}}>{t("careerGovExams.other.4")}</span> : {" "}
                                            {governmentExams?.scheme_level}
                                        </Col>
                                    )}
                                    {governmentExams.age_criteria && (
                                        <Col md={6} xs={12}>
                                            <span style={{ fontWeight: "bold"}}>{t("careerGovExams.other.6")}</span> : {" "}
                                            {governmentExams?.age_criteria}
                                        </Col>
                                    )}
                                    {governmentExams.whom_this_scheme_for && (
                                        <Col md={6} xs={12}>
                                            <span style={{ fontWeight: "bold"}}>{t("careerGovExams.other.5")}</span> : {" "}
                                            {governmentExams?.whom_this_scheme_for}
                                        </Col>
                                    )}
                                    {governmentExams.benefits && (
                                        <Col md={12} xs={12}>
                                            <span style={{ fontWeight: "bold"}}>{t("careerGovExams.other.7")}</span> : {" "}
                                            <div className={"benifits_style"} dangerouslySetInnerHTML={{ __html: `${governmentExams?.benefits}` }} />
                                        </Col>
                                    )}
                                    {governmentExams.official_link && (
                                        <Col md={12} xs={12}>
                                            <span style={{ fontWeight: "bold"}}>{t("careerGovExams.other.9")}</span> : {" "}

                                            <Link
                                                to={{ pathname: governmentExams?.official_link }}
                                                target='_blank'
                                                rel='noreferrer'>
                                                {governmentExams && governmentExams.official_link}
                                            </Link>
                                        </Col>
                                    )}
                                </Row>

                                {governmentExams.about_exam && (
                                    <p style={{ textAlign: 'justify' }} className='mt-3'>
                                        <span style={{ fontWeight: "bold"}}>
                                            {t("careerTopColleges.other.6")}
                                        </span>{" "}
                                        :{" "}
                                        <div dangerouslySetInnerHTML={{ __html: `<div>${governmentExams.about_exam}</div>` }} />
                                    </p>
                                )}

                                {governmentExams.files && (
                                    <Col md={12} xs={12}>
                                        <h6 style={{ textAlign: 'right' }}>
                                            <a target="_blank" href={governmentExams.files}>Read More...</a>
                                        </h6>
                                    </Col>
                                )}
                            </div>
                        </Col>

                    </Row>
                </Container>
            </div>
            <Footer loginPage={false} />
        </div>
    );
};

export default Career2Details;