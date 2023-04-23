import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import or from "../../../../assets/images/login/or.png";
import User from "../../../../assets/icons/user.png";
import Lock from "../../../../assets/icons/lock.png";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import { CircularProgress } from "@mui/material";

import Error from "../../../../components/Error";
import { onLogin } from "../../../../store/auth/action";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

function LoginForm1() {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [visible, setVisible] = useState(false);

  const { isLoading } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();

  // const handleToggle = () => {
  //   if (type === "password") {
  //     setIcon(eye);
  //     setType("text");
  //   } else {
  //     setIcon(eyeOff);
  //     setType("password");
  //   }
  // };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("login.form1.emailError.invalid"))
      .required(t("login.form1.emailError.required")),
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
        email: "",
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
          <TextField
            name='email'
            type='email'
            className='form-control'
            onChange={handleChange}
            value={values.email}
            onBlur={handleBlur}
            autoComplete='off'
            placeholder={t("common.placeHolders.email")}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <img src={User} alt='...' />
                </InputAdornment>
              ),
            }}
          />

          <Error error={errors.email} touched={touched.email} />
        </div>

        {/* <div className='form-group'>
          <div>
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
            <span onClick={handleToggle} className='eyesOffIcon'>
              <Icon icon={eyeOff} size={20} />
            </span>
          </div> */}
          <div className='form-group mb-4'>
            <TextField
              name='password'
              type={visible ? "text" : "password"}
              className='form-control'
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={t("common.placeHolders.password")}
              autoComplete='off'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <img src={Lock} alt='...' />
                  </InputAdornment>
                ),
              }}
            />
            <p className='eye' onClick={(e) => setVisible(!visible)}>
              {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </p>

            <Error error={errors.password} touched={touched.password} />
          </div>

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

export default LoginForm1;
