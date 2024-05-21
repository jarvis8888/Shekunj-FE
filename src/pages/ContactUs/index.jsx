import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { TextareaAutosize } from "@mui/material";
import TextField from "@mui/material/TextField";

import { Header, Footer, Error } from "../../components";
import mail2 from "../../assets/icons/mail2.png";
import "./index.scss";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { contactUs } from "../../store/auth/action";

function ContactUs() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = Yup.object({
    name: Yup.string().required(t("Name is required")),
    email: Yup.string().email(t("login.form1.emailError.invalid")),
    // subject: Yup.string().required(t("Subject is required")),
    message: Yup.string().required(t("Message is required")),
    contact: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .min(10, "too short")
      .max(10, "too long")
      .required(t("Phone number is required")),
  });
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    setFieldValue,
    isSubmitting,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      // subject: "",
      message: "",
      contact: "",
    },
    validationSchema,
    onSubmit(values) {
      dispatch(contactUs(values));
      clearFields();
    },
  });

  const clearFields = () => {
    setFieldValue("name", "");
    setFieldValue("email", "");
    // setFieldValue("subject","")
    setFieldValue("message", "");
    setFieldValue("contact", "");
  };

  return (
    <div className='noselect'>
      <Header loginPage={false} page='home' />
      <div className='main_div_conUs'>
        <Container>
          <Row>
            <Col md={6} xs={12}>
              <div className='conUs_tit'>
                <h3>{t("contactUs.heading.1")}</h3>
                <h2>{t("contactUs.heading.2")}</h2>
              </div>
              <div className='add_con'>
                <Row>
                  <Col md={6} xs={12}>
                    <h3>{t("contactUs.heading.3")}</h3>
                    <p>
                      <img src={mail2} alt='' /> Info@shekunj.com
                    </p>
                  </Col>

                  <Col md={6} xs={12}>
                    <h3>{t("contactUs.heading.4")}</h3>
                    <p>
                      <img src={mail2} alt='' /> Support@shekunj.com
                    </p>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md={6} xs={12} className='contact_banner01'>
              <div className='ConUs_form'>
                <p>{t("contactUs.content.1")} </p>
                <form onSubmit={handleSubmit}>
                  <div className='form-group'>
                    <div className='mb-3'>
                      <TextField
                        name='name'
                        type='text'
                        placeholder={t("ContactUs.placeholders.name")}
                        onChange={handleChange}
                        value={values.name}
                        onBlur={handleBlur}
                        autoComplete='off'
                      />
                      <Error
                        error={errors.name}
                        touched={touched.name}
                        isSubmitting={isSubmitting}
                      />
                    </div>

                    <div className='mb-3'>
                      <TextField
                        name='email'
                        type='email'
                        placeholder={t("ContactUs.placeholders.email")}
                        autoComplete='off'
                        onChange={handleChange}
                        value={values.email}
                        onBlur={handleBlur}
                      />
                      <Error error={errors.email} touched={touched.email} />
                    </div>
                    <div className='mb-3'>
                      <TextField
                        name='contact'
                        type='text'
                        placeholder={t("ContactUs.placeholders.contact")}
                        autoComplete='off'
                        onChange={handleChange}
                        value={values.contact}
                        onBlur={handleBlur}
                      />
                      <Error
                        error={errors.contact}
                        touched={touched.contact}
                        isSubmitting={isSubmitting}
                      />
                    </div>
                    {/* <div className='mb-3'>
                        <TextField
                          name='subject'
                          type='text'
                          placeholder={t('ContactUs.placeholders.subject')}
                          autoComplete='off'
                          onChange={handleChange}
                          value={values.subject}
                          onBlur={handleBlur}
                        />
                        <Error
                          error={errors.subject}
                          touched={touched.subject}
                          isSubmitting={isSubmitting}
                        />
                      </div> */}

                    <div className='mb-3'>
                      <TextareaAutosize
                        className='textarea_set'
                        name='message'
                        aria-label='minimum height'
                        minRows={3}
                        placeholder={t("ContactUs.placeholders.msg")}
                        onChange={handleChange}
                        value={values.message}
                        onBlur={handleBlur}
                      />
                      <Error
                        error={errors.message}
                        touched={touched.message}
                        isSubmitting={isSubmitting}
                      />
                    </div>
                  </div>

                  <button type='submit' className='send_btn'>
                    {t("contactUs.button.1")}
                  </button>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Footer loginPage={false} />
    </div>
  );
}

export default ContactUs;
