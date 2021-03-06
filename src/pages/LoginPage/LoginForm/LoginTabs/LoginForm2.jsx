import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Mobile from "../../../../assets/icons/phone.png";
import Lock from "../../../../assets/icons/lock.png";

import Error from "../../../../components/Error";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { onLogin } from "../../../../store/auth/action";
import { CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { routingConstants } from "../../../../utils/constants";

function LoginForm2() {
  const { isLoading } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    contact: Yup.number().required(t("login.form2.contactError")),
    password: Yup.string()
      .min(6, t("login.form1.passError.min"))
      .required(t("login.form1.passError.required")),
  });

  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();

  const redirect = query.get("redirect");

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        contact: "",
        password: "",
      },
      validationSchema,
      onSubmit(values) {
        dispatch(onLogin(values, history, redirect));
      },
    });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='form-group mb-4'>
          <label>
            {t("common.formHeadings.mobile")}
            <span>*</span>
          </label>
          <TextField
            name='contact'
            type='number'
            className='form-control'
            onChange={handleChange}
            value={values.contact}
            onBlur={handleBlur}
            autoComplete='off'
            placeholder={t("common.placeHolders.mobile")}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <img src={Mobile} alt='...' />
                </InputAdornment>
              ),
            }}
          />
          <Error error={errors.contact} touched={touched.contact} />
        </div>

        <div className='form-group'>
          <label>
            {t("common.formHeadings.password")} <span>*</span>
          </label>
          <TextField
            name='password'
            type='password'
            className='form-control'
            onChange={handleChange}
            value={values.password}
            onBlur={handleBlur}
            autoComplete='off'
            placeholder={t("common.placeHolders.password")}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <img src={Lock} alt='...' />
                </InputAdornment>
              ),
            }}
          />
          <Error error={errors.password} touched={touched.password} />
        </div>

        <Link to={routingConstants.FORGOT_PASSWORD} className='fer_pass'>
          forgot password?
        </Link>

        <button type='submit' className='btn btn_login w-100'>
          {isLoading ? (
            <CircularProgress color='secondary' size={20} />
          ) : (
            t("login.button")
          )}
        </button>
      </form>
    </>
  );
}

export default LoginForm2;
