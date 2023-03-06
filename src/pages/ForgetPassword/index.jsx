import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Error, Footer, Header } from "../../components";
import wrongpassword from "../../assets/images/ForgetPassword/wrong-password 1.png";
import "./index.scss";
import { Button, CircularProgress } from "@mui/material";

import * as Yup from "yup";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { forgotPassword, onLogin } from "../../store/auth/action";
import { toast } from "react-toastify";

function ForgetPassword() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [show, setShow] = useState(false);

  const { isLoading } = useSelector((state) => state.authReducer);

  const validationSchema = Yup.object({
    contact: Yup.number()
      .required(t("login.form1.contact.required"))
      .positive(),
    password: Yup.string()
      .min(6, t("login.form1.passError.min"))
      .required(t("login.form1.passError.required")),
  });
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        contact: "",
        password: "",
      },
      validationSchema,
      onSubmit(values) {
        const redirect = '/'
        dispatch(onLogin(values, history, redirect));
      },
    });

  const sendTempPass = async () => {
    const contact = values.contact;
    if (contact === "") {
      toast.error(t("error.other.4"));
    } else if (String(contact).length > 10 || String(contact).length < 10) {
      toast.error(t("error.other.5"));
    } else {
      const res = await dispatch(
        forgotPassword({ contact: String(values.contact) }, history),
      );
      if (res?.status_code === 200) {
        setShow((prev) => !prev);
      }
    }
  };

  return (
    <div className='noselect'>
      <Header loginPage={false} page='home' />
      <div className='main_div_ForPass'></div>
      <div className='container'>
        <div className='ForPass_feild'>
          <Row>
            <Col lg={6} md={6} xs={12}>
              <img src={wrongpassword} alt='' srcSet='' />
            </Col>

            <Col lg={6} md={6} xs={12}>
              <div className='ForPass_text'>
                <h2>
                  Forgot <br /> Password?
                </h2>
                <p>Enter Your Mobile number associated with your account.</p>
                <form onSubmit={handleSubmit}>
                  <input
                    name='contact'
                    type='number'
                    value={values.contact}
                    className='form-control'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete='off'
                    placeholder={t("common.placeHolders.mobile")}
                  />
                  <Error error={errors.contact} touched={touched.contact} />
                  {!show && (
                    <button className='req_btn' onClick={() => sendTempPass()}>
                      {isLoading ? (
                        <CircularProgress color='secondary' size={20} />
                      ) : (
                        "Request For Temporary Password"
                      )}
                    </button>
                  )}
                  {show && (
                    <input
                      name='password'
                      type='password'
                      value={values.password}
                      className='form-control'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete='off'
                      placeholder={t("common.placeHolders.password")}
                    />
                  )}
                  <Button type='submit' className='log_forg' variant='outlined'>
                    Login
                  </Button>
                </form>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <Footer loginPage={false} />
    </div>
  );
}

export default ForgetPassword;
