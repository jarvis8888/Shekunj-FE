import { authTypes } from "./types";
import { toast } from "react-toastify";
import httpServices from "../../utils/ApiServices";
import toasterConfig from "../../utils/toasterCongig";
import Cookies from "js-cookie";
import moment from "moment";
import { apiConstants, routingConstants } from "../../utils/constants";
import i18njs from "../../assets/i18n/i18n";
import axios from "axios";
const constants = apiConstants.AUTH;

export const onLogin = (values, history, redirect) => async (dispatch) => {
  try {
    dispatch({ type: authTypes.LOGIN_REQUEST });
    const res = await httpServices.post(constants.LOGIN, values);
    dispatch({
      type: authTypes.LOGIN_FINISH,
      payload: { name: res.data.name, email: res.data.email },
    });
    Cookies.set("sheToken", res.data.tokens);

     // Redirect after successful login
   if (redirect) {
    history.push(redirect);
  } else {
    const from = history.location.state?.from || '/';
    history.push(from);
  }

    // Geolocation retrieval and update
  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };
  const position = await getCurrentPosition();
  const { latitude, longitude } = position.coords;

  let params = {
    latitude: latitude.toString(),
    longitude: longitude.toString(),
  };

  await httpServices.put(constants.LOCATION + res.data.id + "/", params);

  
    // if (redirect) {
    //   history.push(redirect);
    // } else {
    //   history.push(
    //     // routingConstants.MY_PROGESS,
    //     history.location.state || history.state.state.from
    //       ? history.location.state.from || history.state.state.from
    //       : "/",
    //     navigator.geolocation.getCurrentPosition(async function (
    //       position,
    //       values,
    //     ) {
    //       const latitude = position.coords.latitude;
    //       const longitude = position.coords.longitude;

    //       let params = {
    //         latitude: latitude.toString(),  
    //         longitude: longitude.toString(),
    //       };
    //       let result = await httpServices.put(
    //         constants.LOCATION + res.data.id + "/",
    //         params,
    //       );
    //     }),
    //   );
    // }
  } catch (error) {
    dispatch({ type: authTypes.LOGIN_FAIL });
    if (error && error.status === 500) {
      toast.error(error.data.message, toasterConfig);
    } else if (error && error.status === 400) {
      toast.error(error.data.errors.error[0], toasterConfig);
    }
  }
};

export const logOut = (history) => async (dispatch) => {
  Cookies.remove("sheToken");
  localStorage.removeItem("event_data");
  localStorage.removeItem("login_data");
  dispatch({ type: authTypes.LOGIN_FAIL });
  history.push({
    pathname: routingConstants.LOGIN,
    state: { from: history.location?.pathname },
  });
};

export const onSignup = (values, history) => async (dispatch) => {
  try {
    dispatch({ type: authTypes.SIGNUP_REQUEST });
    const res = await httpServices.post(constants.REGISTER, values);
    dispatch({ type: authTypes.SIGNUP_FINISH, payload: values });
    Cookies.set("sheToken", res.data.token);
    history.push(
      routingConstants.MY_PROGESS,
      navigator.geolocation.getCurrentPosition(async function (
        position,
        values,
      ) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        let params = {
          latitude: latitude.toString(),
          longitude: longitude.toString(),
        };
        let result = await httpServices.put(
          constants.LOCATION + res.data.id + "/",
          params,
        );
      }),
    );
  } catch (error) {
    dispatch({ type: authTypes.SIGNUP_FAIL });
    if (error?.status === 400) {
      toast.error(error.data.errors.error[0], toasterConfig);
    } else if (error?.status === 500) {
      toast.error(i18njs.t("error.mobile.2"), toasterConfig);
    }
  }
};

export const registerWithGoogle =
  (value, history, redirect) => async (dispatch) => {
    try {
      const res = await httpServices.post(
        constants.REGISTER_WITH_GOOGLE,
        value,
        navigator.geolocation.getCurrentPosition(function (position) {}),
      );
      dispatch({
        type: authTypes.LOGIN_FINISH,
        payload: { name: res.data.username, email: res.data.email },
      });
      Cookies.set("sheToken", res.data.tokens.access);
      if (redirect) {
        history.push(redirect);
      } else {
        history.push(
          routingConstants.MY_PROGESS,
          navigator.geolocation.getCurrentPosition(async function (
            position,
            value,
          ) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            let params = {
              latitude: latitude.toString(),
              longitude: longitude.toString(),
            };
            let result = await httpServices.put(
              constants.LOCATION + res.data.id + "/",
              params,
            );
          }),
        );
      }
    } catch (err) {
      toast.error(i18njs.t("error.login.1"), toasterConfig);
    }
  };

export const contactVerify = (value) => async (dispatch) => {
  try {
    dispatch({ type: authTypes.CONTACT_VERIFY_REQUEST });
    const res = await httpServices.post(constants.USER_SEND_OTP, {
      contact: value.contact.toString(),
    });
    dispatch({ type: authTypes.CONTACT_VERIFY_FINISH });
    toast.success(res.message, toasterConfig);
  } catch (error) {
    dispatch({ type: authTypes.CONTACT_VERIFY_FAIL });
    if (error?.status === 400) {
      toast.error(error?.data?.errors?.error[0], toasterConfig);
    }
  }
};

export const requestRestEmail = (values, history) => async (dispatch) => {
  try {
    dispatch({ type: authTypes.EMAIL_VERIFY_REQUEST });
    const res = await httpServices.post(constants.REQUEST_RESET_EMAIL, values);
    dispatch({ type: authTypes.EMAIL_VERIFY_FINISH });
    history.push(routingConstants.LOGIN);
    toast.success(res.data.success, toasterConfig);
  } catch (error) {
    dispatch({ type: authTypes.EMAIL_VERIFY_FAIL });
    toast.error(i18njs.t("error.login.2"), toasterConfig);
  }
};

export const changePassword = (values, history) => async (dispatch) => {
  try {
    dispatch({ type: authTypes.RESET_PASSWORD_REQUEST });
    const res = await httpServices.post(constants.CHANGE_PASSWORD, values);
    dispatch({ type: authTypes.RESET_PASSWORD_FINISH });
    Cookies.remove("sheToken");
    history.push(routingConstants.LOGIN);
    toast.success(res.message, toasterConfig);
  } catch (error) {
    dispatch({ type: authTypes.RESET_PASSWORD_FAIL });
    if (error.status === 400) {
      toast.error(error.data.errors.old_password.old_password, toasterConfig);
    }
  }
};

export const refreshPage = () => async (dispatch) => {
  const token = Cookies.get("sheToken");
  if (token) {
    dispatch({ type: authTypes.REFRESH });
  }
};

export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch({ type: authTypes.USER_PROFILE_REQUEST });
    const res = await httpServices.get(constants.USER_PROFILE);
    dispatch({
      type: authTypes.USER_PROFILE_FINISH,
      payload: {
        ...res?.data,
        contact: res?.data?.contact
          ? !res?.data?.contact?.includes("+91")
            ? `+91 ${res?.data?.contact}`
            : res?.data?.contact
          : null,
        profile_pic: res?.data?.profile_pic ? res?.data?.profile_pic : null,
        dob: res?.data?.dob
          ? moment(res?.data?.dob).format("DD-MM-YYYY")
          : null,
      },
    });
  } catch (error) {
    dispatch({ type: authTypes.USER_PROFILE_FAIL });
    if (error?.status === 400) {
      toast.error(error.data.errors.error[0], toasterConfig);
    } else if (error?.status === 500) {
      toast.error(i18njs.t("error.other.6"), toasterConfig);
    }
  }
};

export const updateProfile = (id, values) => async (dispatch) => {
  try {
    if (values.id) {
      delete values.id;
    }
    if (!values.contact) {
      delete values.contact;
    }
    if (!values.dob || values.dob === "Invalid date") {
      delete values.dob;
    }
    if (!values.city) {
      delete values.city;
    }
    if (!values.email) {
      delete values.email;
    }
    if (!values.highest_education) {
      delete values.highest_education;
    }
    if (!values.state) {
      delete values.state;
    }
    if (!values.stream) {
      delete values.stream;
    }
    dispatch({ type: authTypes.USER_PROFILE_UPDATE });
    const formData = httpServices.createFormData(values);
    const res = await httpServices.putForm(
      constants.USER_PROFILE_UPDATE + id + "/",
      formData,
    );
    dispatch(getUserProfile());
    toast.success(res.message, toasterConfig);
  } catch (error) {
    toast.error(error?.data?.message || "Internal Server Error", toasterConfig);
  }
};

export const contactUs = (values) => async (dispatch) => {
  try {
    dispatch({ type: authTypes.CONTACT_US_REQUEST });
    await httpServices.post("/authentication/contact-us/", values);
    toast.success("Sent Successfully", toasterConfig);
  } catch (err) {
    dispatch({ type: authTypes.CONTACT_VERIFY_FAIL });
  }
};

export const forgotPassword = (value) => async (dispatch) => {
  try {
    dispatch({ type: authTypes.FORGOT_PASSWORD_REQUEST });
    const res = await httpServices.post(
      "/authentication/forget-password/",
      value,
    );
    dispatch({ type: authTypes.FORGOT_PASSWORD_FINISH });
    toast.success(res.data, toasterConfig);
    return res;
  } catch (err) {
    dispatch({ type: authTypes.FORGOT_PASSWORD_FAIL });
    toast.error(err?.data?.errors?.error[0]);
  }
};
