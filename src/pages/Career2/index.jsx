import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { AccordionComponent, Footer, Header, SEO } from "../../components";
import {
  getGovernmentExams,
  reSetFilterValue,
  toggleCollapseValue,
} from "../../store/career";
import { noImage } from "../../utils/ApiServices";

import "../HomePage/index.scss";
import "./index.scss";

const CareerPage2 = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { governmentExams } = useSelector((state) => state.careerReducer);
  const { lan } = useSelector((state) => state.languageReducer);

  useEffect(() => {
    dispatch(reSetFilterValue());
    dispatch(getGovernmentExams());
  }, [dispatch, lan]);

  const transformPrice = (price) => {
    let nf = new Intl.NumberFormat("en-US");
    return nf.format(
      Number.isNaN(parseInt(price, 10)) ? 0 : parseInt(price, 10) || 0,
    );
  };

  const transformImg = (image) => {
    return image ? image : noImage;
  };

  const handleCollapse = (id, checked) => {
    dispatch(
      toggleCollapseValue(id, checked ? false : true, "governmentExams"),
    );
  };

  return (
    <div>
      <SEO title='Sheकुंज - Career' />
      <Header loginPage={true} page='career' subPage='govExams' />

      <div className='mainDiv_career'>
        <Container>
          <div className='career_tit noselect'>
            <h2>{t("careerGovExams.heading.1")}</h2>
          </div>
          <Row>
            <Col md={4} xs={12}>
              <AccordionComponent
                type='governmentExams'
                categories={{
                  name: t("careerGovExams.listItems.1"),
                  rows: governmentExams?.govt_category || [],
                }}
              />
            </Col>

            <Col md={8} xs={12}>
              {governmentExams?.govt_list?.length > 0 ? (
                governmentExams?.govt_list?.map((c) => (
                  c?.name && <div
                    className='career_box noselect'
                    style={{ height: "auto" }}
                  >
                    <Row>
                      <Col md={7} xs={12}>
                        <div className='top_col_content'>
                          <h3>{c?.name || t("common.n/a")}</h3>
                          <p style={{ textTransform: "capitalize" }}>
                            {c?.city || t("common.n/a")},{" "}
                            {c?.state || t("common.n/a")} •{" "}
                            <span style={{ textTransform: "capitalize" }}>
                              {c?.exam_type || t("common.n/a")}
                            </span>
                          </p>
                          <ul>
                            <li>
                              <span>{t("careerGovExams.other.1")}</span> : ₹{" "}
                              {transformPrice(c?.fees)}{" "}
                            </li>
                            <li>
                              <span>{t("careerGovExams.other.2")}</span> :{" "}
                              {c?.exam}
                            </li>
                          </ul>
                          {c?.is_collapse && (
                            // <div>{c?.about_exam.replace(/<br\s*[\/]?>/gi,'\n').replace(/<p\s*[\/]?>/gi,'\n') || t("common.n/a")}</div>
                            <div dangerouslySetInnerHTML={{ __html:`<div>${c.about_exam}</div>` }} />
                          )}
                          <button
                            className='btn_viewCour'
                            onClick={() =>
                              handleCollapse(c?.id, c?.is_collapse)
                            }
                          >
                            {!c?.is_collapse
                              ? t("common.more")
                              : t("common.less")}
                          </button>
                        </div>
                      </Col>

                      <Col md={5} xs={12}>
                        <div className='career_img'>
                          <img srcSet={transformImg(c?.image)} alt='...' />
                        </div>
                      </Col>
                    </Row>
                  </div>
                ))
              ) : (
                <div className='text-center'>{t("common.noDataFound")}</div>
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <Footer loginPage={false} />
    </div>
  );
};

export default CareerPage2;
