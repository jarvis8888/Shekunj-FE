import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { CircularProgress } from "@mui/material";

import Error from "../Error";
import { onLogin } from "../../store/auth/action";


function LoginForm1() {
  const { isLoading } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const {t} = useTranslation();
  
  const validationSchema = Yup.object({
    email: Yup.string().email(t('login.form1.emailError.invalid')).required(t('login.form1.emailError.required')),
    password: Yup.string()
      .min(6, t('login.form1.passError.min'))
      .required(t('login.form1.passError.required')),
  });

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema,
      onSubmit(values) {
        dispatch(onLogin(values, history));
      },
    });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='form-group mb-4'>
          <input
            name='email'
            type='email'
            className='form-control'
            onChange={handleChange}
            value={values.email}
            onBlur={handleBlur}
            autoComplete='off'
            placeholder={t('login.form1.placeholder1')}
          />
          <Error error={errors.email} touched={touched.email} />
        </div>

        <div className='form-group'>
          <input
            name='password'
            type='password'
            className='form-control'
            onChange={handleChange}
            value={values.password}
            onBlur={handleBlur}
            autoComplete='off'
            placeholder={t('login.form1.placeholder2')}
          />
          <Error error={errors.password} touched={touched.password} />
        </div>

        <button type='submit' className='btn btn_login w-100'>
          {isLoading ? (
            <CircularProgress color='secondary' size={20} />
          ) : (
            t('login.button')
          )}
        </button>
      </form>
    </>
  );
}

export default LoginForm1;
